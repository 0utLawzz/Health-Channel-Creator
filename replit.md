# BioMinute Shorts Studio

A workspace for producing short animated health-science YouTube Shorts/Reels for the **BioMinute** channel — 9:16 vertical videos built in React/Vite, managed through a Neo-Brutalist publishing dashboard, and published via the YouTube Data API.

## Current state

- Episodes 1–24: `Complete` (exported and pushed to GitHub per `exports/production-log.md`).
- Episodes 25–30: `Built` (logged, some exported).
- Episodes 31–36: planned queue.
- **Live artifacts:** `artifacts/biominute-reels` (video player), `artifacts/publishing-dashboard` (control center), `artifacts/api-server` (REST API), `artifacts/biominute-deck` (investor deck), `artifacts/mockup-sandbox` (design preview).
- **GitHub:** `scripts/push-to-github.sh` uses `GITHUB_TOKEN` (falls back to `GITHUB_ACCESS_TOKEN`) — not yet configured in this workspace.

## Run & operate

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm run typecheck` | Check all packages |
| `pnpm run build` | Typecheck + build all packages |
| `pnpm --filter @workspace/biominute-reels run dev` | Run the reels video player |
| `pnpm --filter @workspace/publishing-dashboard run dev` | Run the publishing dashboard |
| `pnpm --filter @workspace/api-server run dev` | Run the API server |
| `pnpm --filter @workspace/biominute-deck run dev` | Run the investor deck |
| `pnpm --filter @workspace/mockup-sandbox run dev` | Run the design mockup sandbox |
| `pnpm --filter @workspace/db push-force` | Push Drizzle schema to PostgreSQL |
| `pnpm --filter @workspace/scripts exec tsx ./src/seed-episodes.ts` | Seed episodes from the master XLSX |
| `pnpm run export-video` | Export the current artifact's scenes to MP4 (requires the dev server running) |
| `pnpm --filter @workspace/scripts exec tsx ./src/verify-export.ts <path>` | Verify an MP4 is 1080×1920 |
| `pnpm run dashboard:generate` | Regenerate `exports/dashboard.html` from the production log |
| `bash scripts/push-to-github.sh "message"` | Push changes to GitHub (needs `GITHUB_TOKEN` secret) |

## Environment secrets

- `SESSION_SECRET` — set; needed for the API server sessions.
- `GITHUB_TOKEN` — set; used by `scripts/push-to-github.sh` to auto-push exports to GitHub.
- `YOUTUBE_CLIENT_ID` / `YOUTUBE_CLIENT_SECRET` / `YOUTUBE_REFRESH_TOKEN` — set; used by the API server's YouTube publish route to upload approved episodes.
- `DATABASE_URL` — runtime-managed Postgres connection (Replit or external Neon).

## Documentation

- `README.md` — high-level overview, badges, quick start, architecture.
- `docs/INSTALL.md` — detailed installation and secrets setup.
- `docs/RUN.md` — how to run every artifact and workflow.
- `docs/USAGE.md` — production workflow from plan to publish.
- `docs/CONTRIBUTING.md` — bug report / suggestion form and known issues.
- `docs/design-reference-neobrutalism.md` — brand/design system reference.
- `docs/bug-report-aspect-ratio.md` — historical aspect-ratio bug report.
- `docs/archive/` — older `SETUP.md`, `WORKFLOW.md`, `RELEASE_NOTES.md`, `TEMPLATE.md`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Video: React 19 + Vite + Framer Motion + Tailwind CSS (9:16 vertical, 1080×1920)
- Audio: HTML5 Audio engine with background music + scene SFX (reels only)
- API: Express 5 + Drizzle ORM + PostgreSQL
- Export tooling: Playwright + Xvfb + ffmpeg (`scripts/src/export-video.ts`)

## Where things live

- `artifacts/biominute-reels/` — video player + current episode's scenes
- `artifacts/biominute-reels/src/components/video/video_scenes/Scene0.tsx` through `Scene5.tsx` — the live episode (overwritten per new build)
- `artifacts/biominute-reels/src/components/video/video_scenes/epNN_SceneX.tsx` — retained scenes from earlier episode builds, not wired into `VideoTemplate.tsx`
- `artifacts/biominute-reels/public/audio/` — background music and SFX
- `artifacts/biominute-reels/public/images/` — scene images and current episode thumbnail
- `artifacts/publishing-dashboard/` — episode management dashboard
- `artifacts/api-server/` — REST API and YouTube upload logic
- `artifacts/biominute-deck/` — investor deck
- `artifacts/mockup-sandbox/` — design preview sandbox
- `exports/production-log.md` — episode tracker (statuses, export folders)
- `exports/Episode-NN-slug/` — per-episode export folder for MP4 + thumbnail + notes
- `attached_assets/` — master plan spreadsheet, logo, thumbnail pack, Fiverr gig image
- `scripts/src/` — dashboard generator, video exporter, master-sheet reader, seed script, verify script
- `lib/` — shared DB schema, API spec, generated client/schemas

## User preferences

- Keep BioMinute's existing brand identity; do not invent new creative directions for each episode.
- Read the exact episode row from the Excel master sheet before building a new one.
- Always build in 9:16 vertical; never default to 16:9 widescreen.
- Add background music and minor SFX to every new episode (reels only; dashboard/deck stay silent).
- Update `exports/production-log.md` and per-episode `episode-notes.md` after each build/export.
- Push `episode.mp4` to GitHub for each completed episode; the user provides the thumbnail separately.

## Gotchas

- The artifact holds **one episode at a time**. Building a new episode overwrites the previous live `Scene0-5.tsx` files (older `epNN_SceneX.tsx` files are kept around but not rendered).
- Preview starts muted/autoplay-blocked by default (browser autoplay policy). Use the `?export` URL or unmute manually for export.
- `exports/` is **not** in `.gitignore` — export folders, production log, and generated dashboard are tracked by design.
- `scripts` package needs `exceljs` + `playwright-chromium`; Playwright build scripts may need `pnpm approve-builds` if the browser binary is not installed.
- The master XLSX sheet is named `Episode Master Plan`. Older references may still call it `Content_Master`.

## Pointers

- See `docs/INSTALL.md` and `docs/RUN.md` for setup and operation.
- See `docs/CONTRIBUTING.md` for the current bug/suggestion list.
- See the `pnpm-workspace` skill for workspace structure details.
- See the `video-js` skill for scene/animation conventions when building new episodes.
