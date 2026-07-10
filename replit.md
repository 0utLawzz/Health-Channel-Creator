# BioMinute Reels

A pnpm-workspace template for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel. The active video artifact lives in `artifacts/biominute-reels`; episodes are tracked in `exports/production-log.md`.

## Run & Operate

- `pnpm install` — install dependencies
- `pnpm --filter @workspace/biominute-reels run dev` — run the reels video player
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/mockup-sandbox run dev` — run the design mockup sandbox
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (only needed for the API server)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Video: React 19 + Vite + Framer Motion + Tailwind CSS (video-js artifact)
- Audio: HTML5 Audio engine with generated background music + scene SFX
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/biominute-reels/` — runnable video player + scene components for the current episode
- `artifacts/biominute-reels/src/components/video/video_scenes/Scene0.tsx` through `Scene5.tsx` — current episode's scenes
- `artifacts/biominute-reels/public/audio/` — background music and SFX assets
- `exports/production-log.md` — source-of-truth episode tracker (36 episodes, statuses, export folders)
- `exports/Episode-NN-slug/` — per-episode export folder for final MP4 + thumbnail + notes
- `exports/dashboard.html` — generated production dashboard; run `pnpm dashboard:generate` to regenerate it from `exports/production-log.md`
- `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx` — master scripts, citations, visual directions, hashtags, CTAs
- `WORKFLOW.md` — step-by-step production checklist for every episode
- `TEMPLATE.md` — contract for anyone importing this repo as a template

## Architecture decisions

- **Single video artifact, sequential episodes:** only one episode's scenes live in `artifacts/biominute-reels` at a time. Building a new episode overwrites the previous scenes, so export the MP4 before moving on.
- **9:16 vertical format:** the video player is designed for 1080×1920 YouTube Shorts. The generic 16:9 motion-graphics default from the video-js skill is intentionally overridden here.
- **Audio engine:** generated background music and SFX are wired in. The iframe preview control bar starts muted by default (browser autoplay policy + persisted user preference) and the viewer can unmute. The non-iframe export path forces `muted={false}` so final MP4 exports always include audio.
- **No programmatic MP4 export:** final export is done by the user through the preview's built-in record/export control.

## Product

- Produces a queue of 36 evidence-based health tip shorts for YouTube Shorts/Reels.
- Each episode follows a 6-scene structure (hook → context → science → payoff → caveat → outro/CTA).
- Visual identity: dark navy/slate background, teal-to-emerald gradients, orange accent dot, blue glow, DNA/heartbeat motif, Kurzgesagt-inspired flat design, no red.

## User preferences

- Keep BioMinute's existing brand identity; do not invent new creative directions for each episode.
- Read the exact episode row from the Excel master sheet before building.
- Always build in 9:16 vertical; never default to 16:9 widescreen.
- Add background music and minor SFX to every new episode.
- Update `exports/production-log.md` and per-episode `episode-notes.md` after each build/export.
- Commit and push the actual `episode.mp4` and `thumbnail.png` for each completed episode.
- Regenerate `exports/dashboard.html` after every production-log change.

## Gotchas

- Only the most recently built episode is live in the artifact. If you need to export an earlier episode, rebuild it first.
- Audio is muted by default in the iframe preview control bar (browser autoplay policy). The export path is forced unmuted, so exported MP4s include audio.
- `exports/` is **not** in `.gitignore` — export folders, production log, and dashboard are tracked by design.
- Finished `episode.mp4` and `thumbnail.png` files are committed to the repo per episode so the project stays self-contained and portable across Replit accounts.

## Pointers

- See `WORKFLOW.md` for the full production checklist.
- See `TEMPLATE.md` for how this repo should behave when imported as a template.
- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
