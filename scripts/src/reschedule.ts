/**
 * Update the publish time on already-scheduled YouTube videos.
 *
 * Uses youtube.videos.update (no re-upload needed) to shift the publishAt
 * timestamp to a new UTC hour while keeping the same calendar date.
 *
 * Usage:
 *   tsx scripts/src/reschedule.ts --hour 14          # sets all to 14:00 UTC
 *   tsx scripts/src/reschedule.ts --hour 14 --dry    # dry-run, no changes
 *
 * Only touches episodes that:
 *   - have status = 'scheduled' in the DB
 *   - have a youtubeVideoId set (i.e. already uploaded)
 *   - have a scheduledPublishAt date stored
 */
import { google } from "googleapis";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, isNotNull } from "drizzle-orm";
import { episodesTable } from "@workspace/db";

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const hourArg = args[args.indexOf("--hour") + 1];
const DRY_RUN = args.includes("--dry");

if (!hourArg || isNaN(Number(hourArg))) {
  console.error("Usage: tsx scripts/src/reschedule.ts --hour <0-23> [--dry]");
  process.exit(1);
}
const NEW_HOUR_UTC = Number(hourArg);
if (NEW_HOUR_UTC < 0 || NEW_HOUR_UTC > 23) {
  console.error("--hour must be 0–23");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Env validation
// ---------------------------------------------------------------------------
const REQUIRED = [
  "DATABASE_URL",
  "YOUTUBE_CLIENT_ID",
  "YOUTUBE_CLIENT_SECRET",
  "YOUTUBE_REFRESH_TOKEN",
];
const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing env vars:\n" + missing.map((k) => `  • ${k}`).join("\n"));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// DB + YouTube
// ---------------------------------------------------------------------------
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function getOAuth2Client() {
  const client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
  );
  client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });
  return client;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const youtube = google.youtube({ version: "v3", auth: getOAuth2Client() });

// Load all episodes that are scheduled with a YouTube video ID
const episodes = await db
  .select()
  .from(episodesTable)
  .where(
    and(
      eq(episodesTable.status, "scheduled"),
      isNotNull(episodesTable.youtubeVideoId),
      isNotNull(episodesTable.scheduledPublishAt),
    ),
  );

if (!episodes.length) {
  console.log("No scheduled episodes with YouTube IDs found. Nothing to do.");
  await pool.end();
  process.exit(0);
}

console.log(
  `${DRY_RUN ? "[DRY-RUN] " : ""}Rescheduling ${episodes.length} episodes to ${String(NEW_HOUR_UTC).padStart(2, "0")}:00 UTC\n`,
);

let ok = 0;
let failed = 0;

for (const ep of episodes) {
  const oldDate = new Date(ep.scheduledPublishAt!);
  // Build new publishAt: same calendar date, new hour, 0 min/sec
  const newDate = new Date(oldDate);
  newDate.setUTCHours(NEW_HOUR_UTC, 0, 0, 0);

  const oldStr = oldDate.toISOString();
  const newStr = newDate.toISOString();

  console.log(
    `Ep${String(ep.epNumber).padStart(2, "0")}  ${ep.youtubeVideoId}  ${oldStr} → ${newStr}`,
  );

  if (DRY_RUN) {
    ok++;
    continue;
  }

  try {
    await youtube.videos.update({
      part: ["status"],
      requestBody: {
        id: ep.youtubeVideoId!,
        status: {
          privacyStatus: "private",
          publishAt: newStr,
          selfDeclaredMadeForKids: false,
        },
      },
    });

    // Update DB to match
    await db
      .update(episodesTable)
      .set({ scheduledPublishAt: newDate, updatedAt: new Date() })
      .where(eq(episodesTable.id, ep.id));

    console.log(`  ✓ Updated`);
    ok++;
  } catch (err) {
    console.error(`  ✗ FAILED:`, (err as Error).message);
    failed++;
  }
}

await pool.end();

console.log(
  `\n${DRY_RUN ? "[DRY-RUN] " : ""}Done. ${ok} updated${failed ? `, ${failed} FAILED` : ""}.`,
);
if (failed) process.exit(1);
