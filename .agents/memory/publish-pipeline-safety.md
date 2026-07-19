---
name: Publish pipeline safety patterns
description: TEST_MODE flag, startup env validation, and regression test locations for the YouTube upload pipeline.
---

# Publish Pipeline Safety Patterns

## Hard startup validation (api-server)
`artifacts/api-server/src/index.ts` — `assertAndLogCredentials()` runs before `app.listen()` and calls `process.exit(1)` if any of these are missing: `DATABASE_URL`, `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`, `YOUTUBE_PLAYLIST_S1`–`S6`. Edit `REQUIRED_ENV_VARS` there if new required vars are added.

**Why:** Server previously started with missing creds and showed confusing "Backend Not Configured" errors later at feature-use time.

## TEST_MODE flag
Set `TEST_MODE=true` in env for dry runs. Affects:
- `uploadEpisodeVideo` (in `youtube-upload.ts`) — returns `TEST_<timestamp>` fake ID, logs "would upload: <title>", never reads the video file
- `addVideoToPlaylist` (in `youtube-upload.ts`) — returns null, no API call
- `upload-now.ts` — skips both the YouTube API call AND the DB update; only requires `DATABASE_URL`

**Why:** A real placeholder video was accidentally published to the live channel during a test run.

**How to apply:** All TEST-* episodes must be run with `TEST_MODE=true`. Never use real episode numbers without first verifying TEST_MODE is off.

## Regression tests
`artifacts/api-server/src/lib/youtube-upload.test.ts` — 17 tests covering:
- `buildYouTubeDescription`: CITATION:/CTA: labels never appear in output
- `assertNotAlreadyPublished`: throws with video ID when already uploaded
- `uploadEpisodeVideo` in TEST_MODE: fake ID, no file access
- `addVideoToPlaylist` in TEST_MODE: returns null

Run with: `pnpm --filter @workspace/api-server test`
Config: `artifacts/api-server/vitest.config.ts`

**Rule:** When fixing a pipeline bug, add a test that would catch the regression.

## upload-now.ts duplication note
`scripts/src/upload-now.ts` has local copies of `buildYouTubeDescription`, `assertNotAlreadyPublished`, `seasonEnvKey`, `findVideoPath` — identical logic to `youtube-upload.ts` but not imported from it. If description format ever changes, update both places.
