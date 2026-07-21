import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, episodesTable } from "@workspace/db";
import {
  PublishToFacebookParams,
  PublishToFacebookBody,
  FacebookPublishResult,
} from "@workspace/api-zod";
import {
  findEpisodeVideoPath,
  uploadEpisodeToFacebook,
  buildFacebookDescription,
  assertNotAlreadyOnFacebook,
  checkFacebookConnection,
} from "../lib/facebook-upload";
import { logger } from "../lib/logger";

const router = Router();

// ---------------------------------------------------------------------------
// GET /facebook/status
// ---------------------------------------------------------------------------
router.get("/facebook/status", async (_req, res): Promise<void> => {
  const { connected, pageId } = await checkFacebookConnection();
  res.json({ connected, pageId });
});

// ---------------------------------------------------------------------------
// POST /facebook/publish/:id
// ---------------------------------------------------------------------------
router.post("/facebook/publish/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const paramParsed = PublishToFacebookParams.safeParse({ id });
  if (!paramParsed.success) {
    res.status(400).json({ error: paramParsed.error.message });
    return;
  }

  const bodyParsed = PublishToFacebookBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const { scheduleAt, published } = bodyParsed.data;

  const [episode] = await db.select().from(episodesTable).where(eq(episodesTable.id, id));
  if (!episode) {
    res.status(404).json({ error: "Episode not found" });
    return;
  }

  // Facebook can be uploaded from any status that has a video file. We do
  // not require YouTube-style "approved" gating because the same video may
  // be uploaded to multiple platforms.
  try {
    assertNotAlreadyOnFacebook(episode);
  } catch (err) {
    logger.warn({ episodeId: id, epNumber: episode.epNumber }, "Duplicate Facebook upload blocked");
    res.status(409).json({ error: err instanceof Error ? err.message : "Already on Facebook" });
    return;
  }

  let videoPath: string;
  try {
    videoPath = findEpisodeVideoPath(episode.epNumber);
  } catch (err) {
    logger.error({ err, epNumber: episode.epNumber }, "Episode video file not found");
    res.status(400).json({
      error: err instanceof Error ? err.message : "Episode video file not found. Export the episode first.",
    });
    return;
  }

  try {
    const description = buildFacebookDescription({
      voScript: episode.voScript,
      citationCta: episode.citationCta,
      hashtags: episode.hashtags,
    });

    const { facebookVideoId, facebookUrl } = await uploadEpisodeToFacebook({
      videoPath,
      title: episode.youtubeTitle,
      description,
      scheduleAt: scheduleAt ?? null,
      published: published !== false,
    });

    logger.info(
      { episodeId: id, facebookVideoId, scheduled: !!scheduleAt },
      "Facebook upload succeeded",
    );

    await db
      .update(episodesTable)
      .set({
        facebookVideoId,
        updatedAt: new Date(),
      })
      .where(eq(episodesTable.id, id));

    const result: FacebookPublishResult = {
      success: true,
      facebookVideoId,
      facebookUrl,
      scheduledAt: scheduleAt ?? null,
      message: scheduleAt
        ? `Uploaded to Facebook and scheduled to publish at ${scheduleAt}.`
        : "Uploaded and published to Facebook.",
    };

    res.json(result);
  } catch (err) {
    logger.error({ err, episodeId: id }, "Facebook upload failed");
    res.status(502).json({
      success: false,
      facebookVideoId: null,
      facebookUrl: null,
      scheduledAt: scheduleAt ?? null,
      message: err instanceof Error ? err.message : "Facebook upload failed",
    });
  }
});

export default router;
