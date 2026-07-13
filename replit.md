# BioMinute Reels

A workspace for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel.

## Current state

- **Episodes 1–3:** `Complete` — exported as `episode.mp4` in their `exports/Episode-NN-slug/` folders and pushed to GitHub.
- **Episode 4 — Is 10,000 Steps Actually a Myth?:** `Built — awaiting export` (needs scenes rebuilt in the artifact, then MP4 export).
- **Episode 5 — Why Sleep Matters More Than You Think:** `Built — awaiting export` (needs scenes rebuilt in the artifact, then MP4 export).
- **Episodes 6–36:** `Uncomplete` (planned queue).
- **Live artifact:** `artifacts/biominute-reels` currently holds **Episode 5** scenes.
- **GitHub:** `scripts/push-to-github.sh` uses `GITHUB_TOKEN` (falls back to `GITHUB_ACCESS_TOKEN`).

## Run & Operate

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm --filter @workspace/biominute-reels run dev` | Run the reels video player |
| `pnpm --filter @workspace/api-server run dev` | Run the optional API server |
| `pnpm --filter @workspace/mockup-sandbox run dev` | Run the optional design mockup sandbox |
| `pnpm run typecheck` | Check all packages |
| `pnpm run build` | Typecheck + build all packages |
| `pnpm run dashboard:generate` | Regenerate `exports/dashboard.html` from the production log |
| `pnpm run export-video` | Export the current artifact's scenes to MP4 (requires the dev server running) |
| `bash scripts/push-to-github.sh "message"` | Push changes to GitHub (needs `GITHUB_TOKEN` secret) |

## Environment secrets

- `SESSION_SECRET` — already set by Replit; only needed for the optional API server sessions.
- `GITHUB_TOKEN` — set by you as a Replit Secret. Used by `scripts/push-to-github.sh` to auto-push exports to GitHub. Create a classic GitHub PAT with `repo` scope and add it via the Secrets tab. Falls back to `GITHUB_ACCESS_TOKEN` if not present.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Video: React 19 + Vite + Framer Motion + Tailwind CSS (9:16 vertical)
- Audio: HTML5 Audio engine with background music + scene SFX
- API: Express 5 (optional)
- DB: PostgreSQL + Drizzle ORM (optional)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/biominute-reels/` — video player + current episode's scenes
- `artifacts/biominute-reels/src/components/video/video_scenes/Scene0.tsx` through `Scene5.tsx` — the live episode
- `artifacts/biominute-reels/public/audio/` — background music and SFX
- `artifacts/biominute-reels/public/images/episode-thumbnail.png` — the current episode's thumbnail (used by Scene5 / ThumbnailSlide)
- `exports/production-log.md` — episode tracker (36 episodes, statuses, export folders)
- `exports/Episode-NN-slug/` — per-episode export folder for MP4 + user-provided thumbnail + notes
- `exports/dashboard.html` — generated production dashboard
- `attached_assets/BioMinute-Episode-Master-Plan_1783893698840.xlsx` — master scripts, citations, visual directions, hashtags, CTAs
- `WORKFLOW.md` — step-by-step production checklist
- `SETUP.md` — local setup + run guide
- `TEMPLATE.md` — import-as-template contract

## User preferences

- Keep BioMinute's existing brand identity; do not invent new creative directions for each episode.
- Read the exact episode row from the Excel master sheet before building.
- Always build in 9:16 vertical; never default to 16:9 widescreen.
- Add background music and minor SFX to every new episode.
- Update `exports/production-log.md` and per-episode `episode-notes.md` after each build/export.
- Regenerate `exports/dashboard.html` after every production-log change.
- Push `episode.mp4` to GitHub for each completed episode; the user provides the thumbnail separately.

## Gotchas

- The artifact holds **one episode at a time**. Building a new episode overwrites the previous scenes.
- Preview starts muted by default (browser autoplay policy). Use the `?export` URL or unmute manually for export.
- `exports/` is **not** in `.gitignore` — export folders, production log, and dashboard are tracked by design.
- Finished `episode.mp4` files are committed per episode so the project stays portable across Replit accounts. The user-provided `thumbnail.png` is included when supplied.
