# BioMinute Reel Production Workflow

This file is the step-by-step checklist for creating any BioMinute episode. Follow it exactly for every new video.

## Before you start

1. Confirm the 9:16 format commitment: **"I will build every BioMinute video in 9:16 vertical (1080×1920), not 16:9."**
2. Read `exports/production-log.md` and find the lowest-numbered episode with status `Queued`.
2. Read the matching row in `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx` (sheet `Content_Master`) for the exact script, citation, visual direction, CTA, hashtags, and thumbnail prompt.
3. Check the existing `artifacts/biominute-reels/src/components/video/video_scenes/` to understand the current brand execution.

## Build the episode

1. Build the new episode in `artifacts/biominute-reels` by overwriting `Scene0.tsx` through `Scene5.tsx` with the new episode's content.
2. Keep the brand identity: dark navy/slate `#0F172A`, teal `#14b8a6`, emerald `#10b981`, orange `#f97316`, blue `#2F6FED`, no red, BioMinute logo, DNA/heartbeat motif.
3. Keep **9:16 vertical** format (not 16:9). The video fills the viewport; all scenes are vertical.
4. Add background music and minor SFX where appropriate. Place audio files in `artifacts/biominute-reels/public/audio/` and wire them into `VideoTemplate`/`VideoWithControls`.
5. Use the video-js skill quality bar: layered scenes, choreographed intra-scene motion, custom transitions, no slideshow fades.
6. Include the citation on screen (small, unobtrusive corner or end-card).
7. End with the BioMinute logo/brand outro and the episode's CTA as on-screen text (not a button).

## Verify

1. Restart the workflow: `pnpm --filter @workspace/biominute-reels run dev` or use the Replit workflow restart.
2. Open the preview and watch the full loop at least twice.
3. Check that no generic 16:9 composition snuck in and all text is readable at 9:16.

## Export

1. Use the preview's built-in **record/export control** to capture the MP4.
2. Generate a 1080×1920 thumbnail matching the brand thumbnail spec (dark slate, bold white headline, one emerald/orange keyword, one rounded flat icon, blue glow, no stock photos).

> **Do not store finished MP4s in this repository.** The export folder is for tracking notes and thumbnails; actual MP4s are kept on the user's local machine or cloud storage. This repo only tracks status, timing/style decisions, and scene source code.
3. Place both files in `exports/Episode-NN-slug/` and update `exports/Episode-NN-slug/episode-notes.md` with build/export notes.
4. Update `exports/production-log.md`: set status to `Complete`, set `Date Completed`, and note the exported files.

## Important rule

The artifact holds **one episode at a time**. If you build Episode 7 before exporting Episode 6, Episode 6's scenes will be overwritten. Plan exports accordingly, or explicitly tell the user which episode is currently live.

## Status definitions

- `Queued` — not yet built
- `Built — awaiting export` — scenes rendered in the artifact, waiting for user to export MP4/thumbnail
- `Complete` — exported MP4 and thumbnail are in the episode's `exports/` folder
