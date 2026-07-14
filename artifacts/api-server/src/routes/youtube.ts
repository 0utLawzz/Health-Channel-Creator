import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, episodesTable } from "@workspace/db";
import { PublishToYouTubeBody, PublishToYouTubeParams } from "@workspace/api-zod";

const router = Router();

// GET /youtube/status
router.get("/youtube/status", async (req, res): Promise<void> => {
  // Returns connection status based on whether YT credentials are configured
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
router.get("/youtube/auth-url", async (req, res): Promise<void> => {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI ?? "urn:ietf:wg:oauth:2.0:oob";

  if (!clientId) {
    // Return placeholder URL with instructions until credentials are configured
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
  if (isNaN(id)) {
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

  if (!hasCredentials) {
    // Draft mode — no credentials yet, just mark as scheduled
    const [episode] = await db
      .select()
      .from(episodesTable)
      .where(eq(episodesTable.id, id));

    if (!episode) {
      res.status(400).json({ error: "Episode not found" });
      return;
    }

    if (episode.status !== "approved") {
      res.status(400).json({ error: "Episode must be approved before publishing" });
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

    res.json({
      success: true,
      youtubeVideoId: null,
      youtubeUrl: null,
      scheduledAt: scheduledAt.toISOString(),
      message: "Marked as scheduled. Connect YouTube account to publish live.",
    });
    return;
  }

  // Real YouTube publish — placeholder for when credentials arrive
  // This will be wired up once YOUTUBE_CLIENT_ID + SECRET + REFRESH_TOKEN are set
  res.json({
    success: false,
    youtubeVideoId: null,
    youtubeUrl: null,
    scheduledAt: null,
    message: "YouTube publishing requires a video file. Export the episode first, then publish.",
  });
});

export default router;
