# BioMinute Reels — Template Repository

A pnpm-workspace template for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel. Each video is built in the `artifacts/biominute-reels` video-js artifact, exported manually via the preview's record control, and tracked in `exports/production-log.md`.

## What this repo is

- **Monorepo**: `pnpm` workspace with an optional `api-server` and a `mockup-sandbox` for design prototypes.
- **Single video artifact**: `artifacts/biominute-reels` holds the React + Framer Motion video player and scene components.
- **Sequential build model**: only **one episode's scenes** live in the artifact at a time. Building a new episode overwrites the previous scenes. Export the MP4 before moving on.
- **Episode queue**: `exports/production-log.md` is the source of truth for all 36 planned episodes, their scripts, statuses, and export folders.
- **Master data**: `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx` (sheet `Content_Master`) has exact scripts, citations, visual directions, and hashtags.

## Pre-flight acknowledgment (AI contributors must confirm before building)

Before you touch any code, confirm this out loud in your first response:

> **"I acknowledge that all BioMinute videos are 9:16 vertical (1080×1920) YouTube Shorts. I will build every scene in the `artifacts/biominute-reels` video player in vertical format, not 16:9."**

The generic video-js skill defaults to 16:9 widescreen motion pieces. **BioMinute overrides that to 9:16.** If this confirmation is missing, stop and read `WORKFLOW.md` before proceeding.

## Quick start (for the next AI / contributor)

1. Install dependencies: `pnpm install`
2. Start the reels artifact: `pnpm --filter @workspace/biominute-reels run dev`
3. Open the preview and use the **record/export control** to capture the MP4.
4. Drop the MP4 + thumbnail into `exports/Episode-NN-slug/` and update `exports/production-log.md`.
5. Regenerate the dashboard: `pnpm --filter @workspace/scripts generate-dashboard`
6. Commit and push the MP4, thumbnail, and updated `exports/` files to git.

> **Self-contained repo policy:** every finished episode's `episode.mp4` and `thumbnail.png` are committed to its `exports/Episode-NN-slug/` folder. This keeps the repo portable — re-import into any Replit account and `exports/dashboard.html` still shows working video previews.

See [`WORKFLOW.md`](WORKFLOW.md) for the full step-by-step and [`TEMPLATE.md`](TEMPLATE.md) for the project template contract.

## Completed vs remaining

- Total planned episodes: **36**
- Currently loaded in the live artifact: **Episode 5** (`Why Sleep Matters More Than You Think`) — will be overwritten when the next episode is built.
- All episodes are now **Uncomplete**; the queue is being restarted from Episodes 1 and 2.
- No finished MP4s or thumbnails are currently present in the repo; they are committed per episode as each one is exported.

## Format note

The video player is **9:16 vertical** (1080×1920 YouTube Shorts format). The generic video-js skill mentions 16:9 as a default for wide motion pieces — **this project overrides that** to 9:16. Always keep the vertical aspect ratio.
