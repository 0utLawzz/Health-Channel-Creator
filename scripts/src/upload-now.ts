/**
 * Immediately upload one or more episodes to YouTube.
 * Usage:  tsx scripts/src/upload-now.ts 4
 *         tsx scripts/src/upload-now.ts 4 5 6
 *
 * Uses DATABASE_URL (Neon) and all YOUTUBE_* secrets from env.
 */
import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { episodes as episodesTable } from "../../lib/db/src/schema.js";

// ---------------------------------------------------------------------------
// DB
// ---------------------------------------------------------------------------
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// ---------------------------------------------------------------------------
// YouTube helpers
// ---------------------------------------------------------------------------
function getOAuth2Client() {
  const { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN } = process.env;
  if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET || !YOUTUBE_REFRESH_TOKEN) {
    throw new Error("Missing YOUTUBE_* credentials in env.");
  }
  const client = new google.auth.OAuth2(YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET);
  client.setCredentials({ refresh_token: YOUTUBE_REFRESH_TOKEN });
  return client;
}

function findVideoPath(epNumber: number): string {
  const exportsDir = path.resolve(process.cwd(), "../../exports");
  const padded = String(epNumber).padStart(2, "0");
  const entries = fs.existsSync(exportsDir) ? fs.readdirSync(exportsDir) : [];
  const match = entries.find((n) => n.startsWith(`Episode-${padded}-`));
  if (!match) throw new Error(`No export folder for episode ${epNumber}`);
  const p = path.join(exportsDir, match, "episode.mp4");
  if (!fs.existsSync(p)) throw new Error(`episode.mp4 missing: ${p}`);
  return p;
}

function seasonEnvKey(season: string): string {
  return `YOUTUBE_PLAYLIST_${season.split(":")[0].trim().toUpperCase()}`;
}

async function uploadEp(epNumber: number) {
  console.log(`\n=== Uploading Episode ${epNumber} ===`);

  const rows = await db.select().from(episodesTable).where(eq(episodesTable.epNumber, epNumber));
  if (!rows.length) throw new Error(`Episode ${epNumber} not found in DB.`);
  const ep = rows[0];

  if (ep.youtubeVideoId) {
    console.log(`  ⚠️  Already has YouTube ID: ${ep.youtubeVideoId} — skipping.`);
    return;
  }

  const videoPath = findVideoPath(epNumber);
  console.log(`  Video: ${videoPath}`);

  const tags = (ep.hashtags ?? "")
    .split(/[\s,]+/)
    .map((t: string) => t.replace(/^#/, ""))
    .filter(Boolean);

  const youtube = google.youtube({ version: "v3", auth: getOAuth2Client() });

  console.log(`  Uploading: "${ep.youtubeTitle}" ...`);
  const uploadRes = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: ep.youtubeTitle,
        description: `${ep.citationCta ?? ""}\n\n${ep.hashtags ?? ""}`,
        tags,
      },
      status: { privacyStatus: "public", selfDeclaredMadeForKids: false },
    },
    media: { body: fs.createReadStream(videoPath) },
  });

  const youtubeVideoId = uploadRes.data.id;
  if (!youtubeVideoId) throw new Error("Upload succeeded but no video ID returned.");
  const youtubeUrl = `https://youtu.be/${youtubeVideoId}`;
  console.log(`  ✓ Uploaded: ${youtubeUrl}`);

  // Add to season playlist
  const playlistId = process.env[seasonEnvKey(ep.season ?? "")];
  if (playlistId) {
    try {
      await youtube.playlistItems.insert({
        part: ["snippet"],
        requestBody: {
          snippet: {
            playlistId,
            resourceId: { kind: "youtube#video", videoId: youtubeVideoId },
          },
        },
      });
      console.log(`  ✓ Added to playlist ${playlistId}`);
    } catch (e) {
      console.warn(`  ⚠️  Playlist insert failed (non-fatal):`, (e as Error).message);
    }
  } else {
    console.warn(`  ⚠️  No playlist env var for season "${ep.season}"`);
  }

  // Mark published in DB
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

  console.log(`  ✓ DB updated — Episode ${epNumber} published.`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const epArgs = process.argv.slice(2).map(Number).filter((n) => n > 0);
if (!epArgs.length) {
  console.error("Usage: tsx scripts/src/upload-now.ts <ep_number> [ep_number ...]");
  process.exit(1);
}

(async () => {
  for (const n of epArgs) {
    await uploadEp(n);
  }
  await pool.end();
  console.log("\nDone.");
})().catch((e) => { console.error(e); process.exit(1); });
