import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, episodesTable } from "@workspace/db";
import { PublishToYouTubeBody, PublishToYouTubeParams } from "@workspace/api-zod";
import { findEpisodeVideoPath, uploadEpisodeVideo } from "../lib/youtube-upload";
import { logger } from "../lib/logger";

const router = Router();

// GET /youtube/status
router.get("/youtube/status", async (_req, res): Promise<void> => {
  // Returns connection status based on whether YT credentials are configured.
  // This route must never return a 500 — it is polled by the dashboard on every load.
  const hasCredentials =
    !!process.env.YOUTUBE_CLIENT_ID &&
    !!process.env.YOUTUBE_CLIENT_SECRET &&
    !!process.env.YOUTUBE_REFRESH_TOKEN;

  res.json({
    connected: hasCredentials,
    channelName: hasCredentials ? (process.env.YOUTUBE_CHANNEL_NAME ?? null) : null,
    channelId: hasCredentials ? (process.env.YOUTUBE_CHANNEL_ID ?? null) : null,
  });
});

// GET /youtube/auth-url
router.get("/youtube/auth-url", async (_req, res): Promise<void> => {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const redirectUri =
    process.env.YOUTUBE_REDIRECT_URI ?? "urn:ietf:wg:oauth:2.0:oob";

  if (!clientId) {
    // Return an instructional placeholder until credentials are configured.
    res.json({
      url: "https://console.cloud.google.com/apis/credentials — Add YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET as secrets first",
    });
    return;
  }

  const scopes = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
  ].join(" ");

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scopes);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");

  res.json({ url: url.toString() });
});

// POST /youtube/publish/:id
router.post("/youtube/publish/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const paramParsed = PublishToYouTubeParams.safeParse({ id });
  if (!paramParsed.success) {
    res.status(400).json({ error: paramParsed.error.message });
    return;
  }

  const bodyParsed = PublishToYouTubeBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const { scheduleAt, privacyStatus } = bodyParsed.data;

  const hasCredentials =
    !!process.env.YOUTUBE_CLIENT_ID &&
    !!process.env.YOUTUBE_CLIENT_SECRET &&
    !!process.env.YOUTUBE_REFRESH_TOKEN;

  // -------------------------------------------------------------------------
  // DRAFT MODE — no YouTube credentials configured yet.
  // Mark the episode as scheduled in the DB so the scheduler can pick it up
  // once credentials are added, and return a success response to the client.
  // -------------------------------------------------------------------------
  if (!hasCredentials) {
    const [episode] = await db
      .select()
      .from(episodesTable)
      .where(eq(episodesTable.id, id));

    if (!episode) {
      res.status(404).json({ error: "Episode not found" });
      return;
    }

    if (episode.status !== "approved") {
      res.status(400).json({
        error: "Episode must be approved before publishing",
      });
      return;
    }

    const scheduledAt = scheduleAt ? new Date(scheduleAt) : new Date();

    await db
      .update(episodesTable)
      .set({
        status: "scheduled",
        scheduledPublishAt: scheduledAt,
        updatedAt: new Date(),
      })
      .where(eq(episodesTable.id, id));

    logger.info(
      { episodeId: id, scheduledAt },
      "Draft mode: episode marked as scheduled (no YT credentials)",
    );

    res.json({
      success: true,
      youtubeVideoId: null,
      youtubeUrl: null,
      scheduledAt: scheduledAt.toISOString(),
      message: "Marked as scheduled. Connect YouTube account to publish live.",
    });
    return;
  }

  // -------------------------------------------------------------------------
  // LIVE MODE — credentials present, upload to YouTube now.
  // -------------------------------------------------------------------------
  const [episode] = await db
    .select()
    .from(episodesTable)
    .where(eq(episodesTable.id, id));

  if (!episode) {
    res.status(404).json({ error: "Episode not found" });
    return;
  }

  if (episode.status !== "approved") {
    res.status(400).json({
      error: "Episode must be approved before publishing",
    });
    return;
  }

  let videoPath: string;
  try {
    videoPath = findEpisodeVideoPath(episode.epNumber);
  } catch (err) {
    logger.error(
      { err, epNumber: episode.epNumber },
      "Episode video file not found",
    );
    res.status(400).json({
      error:
        err instanceof Error
          ? err.message
          : "Episode video file not found. Export the episode first, then publish.",
    });
    return;
  }

  try {
    // Guard: hashtags may be empty or null on older rows
    const tags = (episode.hashtags ?? "")
      .split(/[\s,]+/)
      .map((tag: string) => tag.replace(/^#/, ""))
      .filter(Boolean);

    const { youtubeVideoId, youtubeUrl } = await uploadEpisodeVideo({
      videoPath,
      title: episode.youtubeTitle,
      description: `${episode.citationCta ?? ""}\n\n${episode.hashtags ?? ""}`,
      tags,
      privacyStatus,
      publishAt: scheduleAt ?? null,
    });

    const scheduledAt = scheduleAt ? new Date(scheduleAt) : new Date();

    await db
      .update(episodesTable)
      .set({
        status: scheduleAt ? "scheduled" : "published",
        youtubeVideoId,
        scheduledPublishAt: scheduleAt ? scheduledAt : null,
        publishedAt: scheduleAt ? null : scheduledAt,
        updatedAt: new Date(),
      })
      .where(eq(episodesTable.id, id));

    logger.info(
      { episodeId: id, youtubeVideoId, scheduled: !!scheduleAt },
      "YouTube upload succeeded",
    );

    res.json({
      success: true,
      youtubeVideoId,
      youtubeUrl,
      scheduledAt: scheduleAt ? scheduledAt.toISOString() : null,
      message: scheduleAt
        ? `Uploaded and scheduled to publish at ${scheduledAt.toISOString()}.`
        : "Uploaded and published to YouTube.",
    });
  } catch (err) {
    logger.error({ err, episodeId: id }, "YouTube upload failed");
    res.status(502).json({
      error: err instanceof Error ? err.message : "YouTube upload failed",
    });
  }
});

export default router;
