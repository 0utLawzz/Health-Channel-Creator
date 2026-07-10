# BioMinute Reels — Template Contract

This repository is a **template** for producing a series of short animated health-science videos (YouTube Shorts / Reels) for the BioMinute channel.

## What importing this repo gives you

- A working `pnpm` workspace with Node.js 24 and TypeScript 5.9.
- A pre-scaffolded video-js artifact at `artifacts/biominute-reels` for React + Framer Motion animated shorts.
- A 36-episode production plan in `exports/production-log.md`.
- Episode master data in `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx`.

## State at import time

- Dependencies: run `pnpm install` first.
- Database: the API server expects `DATABASE_URL`. The video artifact itself does not need it.
- Audio: background music and SFX should be added to each new episode as it is produced (files live in `artifacts/biominute-reels/public/audio/`).

## How to continue production

1. Read `README.md` and `WORKFLOW.md`.
2. **Confirm the 9:16 acknowledgment:** state out loud that you will build every video in 9:16 vertical (1080×1920), not 16:9. The generic video-js skill defaults to 16:9; BioMinute requires 9:16.
2. Find the next `Queued` episode in `exports/production-log.md`.
3. Read that episode's row from the Excel master sheet.
4. Build the episode by overwriting `artifacts/biominute-reels/src/components/video/video_scenes/Scene0.tsx` through `Scene5.tsx`.
5. Keep the existing brand identity and **9:16 vertical** format.
6. Add background music and SFX.
7. Verify in the preview, then export via the record control.
8. Save exported MP4/thumbnail to `exports/Episode-NN-slug/` and update `exports/production-log.md`.

## Single-artifact constraint

Only one episode's scenes are live at any moment. The current live episode when this repo was last saved is noted in `exports/production-log.md` (highest-numbered `Built` or `Complete` episode). Rebuild any earlier episode before exporting it if it was never exported.
