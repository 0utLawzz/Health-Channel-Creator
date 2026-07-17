import app from "./app";
import { logger } from "./lib/logger";
import { db, episodesTable } from "@workspace/db";
import { eq, and, lte, isNull } from "drizzle-orm";
import {
  findEpisodeVideoPath,
  uploadEpisodeVideo,
  addVideoToPlaylist,
  SEASON_PLAYLIST_ENV,
} from "./lib/youtube-upload";

// ---------------------------------------------------------------------------
// Startup credential check — logs which secrets are present and which are
// missing. Never crashes the server; missing optional credentials just mean
// those features are unavailable.
// ---------------------------------------------------------------------------
function logStartupCredentials(): void {
  const creds: Record<string, boolean> = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    SESSION_SECRET: !!process.env.SESSION_SECRET,
    YOUTUBE_CLIENT_ID: !!process.env.YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET: !!process.env.YOUTUBE_CLIENT_SECRET,
    YOUTUBE_REFRESH_TOKEN: !!process.env.YOUTUBE_REFRESH_TOKEN,
    YOUTUBE_CHANNEL_NAME: !!process.env.YOUTUBE_CHANNEL_NAME,
    YOUTUBE_CHANNEL_ID: !!process.env.YOUTUBE_CHANNEL_ID,
    GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
    // Season playlist IDs (one per season, S1–S6)
    YOUTUBE_PLAYLIST_S1: !!process.env.YOUTUBE_PLAYLIST_S1,
    YOUTUBE_PLAYLIST_S2: !!process.env.YOUTUBE_PLAYLIST_S2,
    YOUTUBE_PLAYLIST_S3: !!process.env.YOUTUBE_PLAYLIST_S3,
    YOUTUBE_PLAYLIST_S4: !!process.env.YOUTUBE_PLAYLIST_S4,
    YOUTUBE_PLAYLIST_S5: !!process.env.YOUTUBE_PLAYLIST_S5,
    YOUTUBE_PLAYLIST_S6: !!process.env.YOUTUBE_PLAYLIST_S6,
  };

  const present = Object.entries(creds)
    .filter(([, v]) => v)
    .map(([k]) => k);
  const missing = Object.entries(creds)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  logger.info({ present }, "Startup: credentials present");
  if (missing.length > 0) {
    logger.warn(
      { missing },
      "Startup: credentials missing — some features will be unavailable",
    );
  }
}

// ---------------------------------------------------------------------------
// Scheduler: every 15 minutes, find episodes where status = 'scheduled' AND
// scheduledPublishAt <= now, then upload them to YouTube and mark published.
// ---------------------------------------------------------------------------
async function runScheduledPublish(): Promise<void> {
  const hasYouTubeCredentials =
    !!process.env.YOUTUBE_CLIENT_ID &&
    !!process.env.YOUTUBE_CLIENT_SECRET &&
    !!process.env.YOUTUBE_REFRESH_TOKEN;

  if (!hasYouTubeCredentials) {
    // Nothing to do — YouTube is not configured yet
    return;
  }

  try {
    const now = new Date();
    // Only pick up episodes that have NOT yet been uploaded to YouTube.
    // Episodes uploaded via the live-mode publish route already have a
    // youtubeVideoId and are waiting for YouTube to flip them public at
    // scheduledPublishAt — the scheduler must not re-upload those.
    const due = await db
      .select()
      .from(episodesTable)
      .where(
        and(
          eq(episodesTable.status, "scheduled"),
          lte(episodesTable.scheduledPublishAt, now),
          isNull(episodesTable.youtubeVideoId),
        ),
      );

    if (due.length === 0) return;

    logger.info(
      { count: due.length },
      "Scheduler: found episodes due for publishing",
    );

    for (const episode of due) {
      try {
        const videoPath = findEpisodeVideoPath(episode.epNumber);

        const tags = (episode.hashtags ?? "")
          .split(/[\s,]+/)
          .map((t: string) => t.replace(/^#/, ""))
          .filter(Boolean);

        const { youtubeVideoId, youtubeUrl } = await uploadEpisodeVideo({
          videoPath,
          title: episode.youtubeTitle,
          description: `${episode.citationCta ?? ""}\n\n${episode.hashtags ?? ""}`,
          tags,
          privacyStatus: "public",
          publishAt: null,
        });

        // Add to season playlist (non-fatal)
        try {
          await addVideoToPlaylist({ youtubeVideoId, season: episode.season });
        } catch (playlistErr) {
          logger.warn(
            { playlistErr, episodeId: episode.id, season: episode.season },
            "Scheduler: playlist insert failed (episode still marked published)",
          );
        }

        await db
          .update(episodesTable)
          .set({
            status: "published",
            youtubeVideoId,
            publishedAt: now,
            scheduledPublishAt: null,
            updatedAt: now,
          })
          .where(eq(episodesTable.id, episode.id));

        logger.info(
          { episodeId: episode.id, epNumber: episode.epNumber, youtubeVideoId, youtubeUrl },
          "Scheduler: episode published successfully",
        );
      } catch (err) {
        logger.error(
          { err, episodeId: episode.id, epNumber: episode.epNumber },
          "Scheduler: failed to publish episode — will retry next cycle",
        );
      }
    }
  } catch (err) {
    logger.error({ err }, "Scheduler: runScheduledPublish encountered an error");
  }
}

// ---------------------------------------------------------------------------
// Manual publish trigger — POST /api/episodes/:epNumber/publish-now
// Immediately uploads and publishes a single scheduled episode.
// ---------------------------------------------------------------------------
app.post("/api/episodes/:epNumber/publish-now", async (req, res) => {
  const epNumber = parseInt(req.params.epNumber, 10);
  if (isNaN(epNumber) || epNumber <= 0) {
    res.status(400).json({ error: "Invalid episode number" });
    return;
  }

  const rows = await db
    .select()
    .from(episodesTable)
    .where(eq(episodesTable.epNumber, epNumber));

  if (!rows.length) {
    res.status(404).json({ error: `Episode ${epNumber} not found` });
    return;
  }

  const episode = rows[0];

  if (episode.youtubeVideoId) {
    res.status(409).json({
      error: "Episode already uploaded",
      youtubeVideoId: episode.youtubeVideoId,
      youtubeUrl: `https://youtu.be/${episode.youtubeVideoId}`,
    });
    return;
  }

  try {
    const videoPath = findEpisodeVideoPath(episode.epNumber);

    const tags = (episode.hashtags ?? "")
      .split(/[\s,]+/)
      .map((t: string) => t.replace(/^#/, ""))
      .filter(Boolean);

    const { youtubeVideoId, youtubeUrl } = await uploadEpisodeVideo({
      videoPath,
      title: episode.youtubeTitle,
      description: `${episode.citationCta ?? ""}\n\n${episode.hashtags ?? ""}`,
      tags,
      privacyStatus: "public",
      publishAt: null,
    });

    try {
      await addVideoToPlaylist({ youtubeVideoId, season: episode.season });
    } catch (playlistErr) {
      logger.warn({ playlistErr }, "publish-now: playlist insert failed (non-fatal)");
    }

    const now = new Date();
    await db
      .update(episodesTable)
      .set({
        status: "published",
        youtubeVideoId,
        publishedAt: now,
        scheduledPublishAt: null,
        updatedAt: now,
      })
      .where(eq(episodesTable.epNumber, epNumber));

    logger.info({ epNumber, youtubeVideoId, youtubeUrl }, "publish-now: episode published");
    res.json({ ok: true, epNumber, youtubeVideoId, youtubeUrl });
  } catch (err) {
    logger.error({ err, epNumber }, "publish-now: upload failed");
    res.status(500).json({ error: (err as Error).message });
  }
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

logStartupCredentials();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Start the background scheduler after the server is up
  const INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
  setInterval(runScheduledPublish, INTERVAL_MS);
  logger.info(
    { intervalMinutes: 15 },
    "Scheduler started — checking for due episodes every 15 minutes",
  );
});
