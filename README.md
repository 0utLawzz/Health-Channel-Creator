# BioMinute Reels — Template Repository

A pnpm-workspace template for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel. Each video is built in the `artifacts/biominute-reels` video-js artifact, exported manually via the preview's record control, and tracked in `exports/production-log.md`.

## What this repo is

- **Monorepo**: `pnpm` workspace with an optional `api-server` and a `mockup-sandbox` for design prototypes.
- **Single video artifact**: `artifacts/biominute-reels` holds the React + Framer Motion video player and scene components.
- **Sequential build model**: only **one episode's scenes** live in the artifact at a time. Building a new episode overwrites the previous scenes. Export the MP4 before moving on.
- **Episode queue**: `exports/production-log.md` is the source of truth for all 36 planned episodes, their scripts, statuses, and export folders.
- **Master data**: `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx` (sheet `Content_Master`) has exact scripts, citations, visual directions, and hashtags.

## Quick start (for the next AI / contributor)

1. Install dependencies: `pnpm install`
2. Start the reels artifact: `pnpm --filter @workspace/biominute-reels run dev`
3. Open the preview and use the **record/export control** to capture the MP4.
4. Drop the MP4 + thumbnail into `exports/Episode-NN-slug/` and update `exports/production-log.md`.

See [`WORKFLOW.md`](WORKFLOW.md) for the full step-by-step and [`TEMPLATE.md`](TEMPLATE.md) for the project template contract.

## Completed vs remaining

- Total planned episodes: **36**
- Currently built in the live artifact: **Episode 5** (`Why Sleep Matters More Than You Think`)
- Episodes marked `Built — awaiting export`: 2, 3, 4, 5 (must be rebuilt before exporting unless already exported)
- Episodes not yet built: 1, 6–36
- Episode 1 status is intentionally **not marked Complete** — final exported MP4/thumbnail were never provided.

## Format note

The video player is **9:16 vertical** (1080×1920 YouTube Shorts format). The generic video-js skill mentions 16:9 as a default for wide motion pieces — **this project overrides that** to 9:16. Always keep the vertical aspect ratio.
