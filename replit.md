# BioMinute Reels

A workspace for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel — 9:16 vertical videos built in React/Vite and exported to MP4.

## Current state

- Episodes 1–30: `Complete` (exported and pushed to GitHub per `exports/production-log.md`).
- Episodes 31–36: planned queue.
- **Live artifact:** `artifacts/biominute-reels` currently holds **Episode 30 — "Do Detox Drinks Really Clean Your Body?"** scenes.
- **GitHub:** `scripts/push-to-github.sh` uses `GITHUB_TOKEN` (falls back to `GITHUB_ACCESS_TOKEN`) — not yet configured in this workspace.

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

- `SESSION_SECRET` — already set; only needed for the optional API server sessions.
- `GITHUB_TOKEN` — not yet set. Only needed for `scripts/push-to-github.sh` to auto-push exports to GitHub (classic PAT with `repo` scope, falls back to `GITHUB_ACCESS_TOKEN`).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Video: React 19 + Vite + Framer Motion + Tailwind CSS (9:16 vertical, 1080×1920)
- Audio: HTML5 Audio engine with background music + scene SFX
- API: Express 5 (optional, unused by the video workflow)
- DB: PostgreSQL + Drizzle ORM (optional, unused by the video workflow)
- Export tooling: Playwright + Xvfb headless recorder (`scripts/src/export-video.ts`)

## Where things live

- `artifacts/biominute-reels/` — video player + current episode's scenes
- `artifacts/biominute-reels/src/components/video/video_scenes/Scene0.tsx` through `Scene5.tsx` — the live episode (overwritten per new build)
- `artifacts/biominute-reels/src/components/video/video_scenes/epNN_SceneX.tsx` — retained scenes from earlier episode builds, not wired into `VideoTemplate.tsx`
- `artifacts/biominute-reels/public/audio/` — background music and SFX
- `artifacts/biominute-reels/public/images/episode-thumbnail.png` — the current episode's thumbnail
- `exports/production-log.md` — episode tracker (statuses, export folders)
- `exports/Episode-NN-slug/` — per-episode export folder for MP4 + thumbnail + notes
- `exports/dashboard.html` — generated production dashboard
- `attached_assets/` — master plan spreadsheet (scripts, citations, visual directions) and reference images
- `scripts/src/` — dashboard generator, video exporter, master-sheet reader, GitHub pusher
- `WORKFLOW.md` / `SETUP.md` / `TEMPLATE.md` — production checklist, setup guide, import-as-template contract

## User preferences

- Keep BioMinute's existing brand identity; do not invent new creative directions for each episode.
- Read the exact episode row from the Excel master sheet before building a new one.
- Always build in 9:16 vertical; never default to 16:9 widescreen.
- Add background music and minor SFX to every new episode.
- Update `exports/production-log.md` and per-episode `episode-notes.md` after each build/export.
- Regenerate `exports/dashboard.html` after every production-log change.
- Push `episode.mp4` to GitHub for each completed episode; the user provides the thumbnail separately.

## Gotchas

- The artifact holds **one episode at a time**. Building a new episode overwrites the previous live `Scene0-5.tsx` files (older `epNN_SceneX.tsx` files are kept around but not rendered).
- Preview starts muted/autoplay-blocked by default (browser autoplay policy). Use the `?export` URL or unmute manually for export.
- `exports/` is **not** in `.gitignore` — export folders, production log, and dashboard are tracked by design.
- `scripts` package needs `exceljs` + `playwright-chromium`; Playwright build scripts are ignored by pnpm by default (`pnpm approve-builds` if the export script needs the browser binary installed).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
- See the `video-js` skill for scene/animation conventions when building new episodes.
