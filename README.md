# BioMinute Shorts Studio 🎬

> AI-powered health-science YouTube Shorts production pipeline — from master plan spreadsheet to published video, fully automated.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-24-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-orange.svg)](https://pnpm.io)

---

## Overview

**BioMinute Shorts Studio** is a monorepo production system for the BioMinute health channel — a YouTube Shorts series delivering 60-second, science-backed health insights. The studio covers the full episode lifecycle:

```
XLSX Master Plan → Video Builder → MP4 Export → Publishing Dashboard → YouTube
```

36 episodes are planned across 6 thematic seasons (Jul – Oct 2026). Each episode is researched, scripted, animated, exported, and published through a unified toolchain — no manual handoffs.

---

## Architecture

```
biominute-shorts-studio/
├── artifacts/
│   ├── biominute-reels/        # React/Vite animated video player (9:16, 1080×1920)
│   ├── api-server/             # Express 5 REST API + Drizzle ORM (PostgreSQL)
│   ├── publishing-dashboard/   # React/Vite publishing control center
│   └── mockup-sandbox/         # Vite component preview server (design iterations)
├── lib/
│   ├── db/                     # Drizzle schema, migrations, seed data
│   ├── api-spec/               # OpenAPI 3.1 spec (source of truth)
│   ├── api-client-react/       # Auto-generated TanStack Query hooks
│   └── api-zod/                # Auto-generated Zod validation schemas
├── scripts/
│   └── src/                    # Video exporter, dashboard generator, GitHub pusher
├── exports/
│   ├── production-log.md       # Episode tracker (status, export folders)
│   └── Episode-NN-*/           # Per-episode MP4 + thumbnail + notes
└── attached_assets/
    └── BioMinute-Episode-Master-Plan*.xlsx   # 36-episode content bible
```

---

## Artifacts

### 🎥 BioMinute Reels (`artifacts/biominute-reels`)
Animated video player built in React 19 + Framer Motion. Each episode consists of 6 scenes rendered at 1080×1920 (9:16 vertical). Playwright + Xvfb headless export produces MP4 files ready for upload.

- **Stack:** React 19, Vite, Framer Motion, Tailwind CSS, HTML5 Audio
- **Output:** 1080×1920 MP4 @ 30fps, ~60 seconds per episode
- **Audio:** Background music + scene SFX (no audio added to slides/dashboard)

### 📊 Publishing Dashboard (`artifacts/publishing-dashboard`)
Neo-Brutalism control center for managing all 36 episodes. Features a stats overview, upcoming-episode strip, season/status filters, per-episode metadata editor, and one-click YouTube publishing.

- **Stack:** React 19, Vite, TanStack Query, Wouter, Tailwind CSS
- **Design:** Neo-Brutalism — `#EDEAE0` canvas, teal `#0A6B52` primary, orange `#C94A00` secondary
- **Integrations:** YouTube Data API v3 (publish, schedule, privacy control)

### 🔌 API Server (`artifacts/api-server`)
REST API serving both the publishing dashboard and external tooling.

- **Stack:** Express 5, Drizzle ORM, PostgreSQL, Zod, Pino
- **Endpoints:** `GET/PATCH /episodes`, `POST /episodes/:id/approve`, `POST /youtube/publish/:id`, `GET /youtube/status`
- **Auth:** Session-based (SESSION_SECRET), YouTube OAuth2 refresh token flow

---

## Episode Plan

| Season | Theme | Episodes | Dates |
|--------|-------|----------|-------|
| S1 | Morning Habits | Ep 1–6 | Jul 13 – Jul 23, 2026 |
| S2 | Movement & Body | Ep 7–12 | Jul 25 – Aug 4, 2026 |
| S3 | Sleep & Recovery | Ep 13–18 | Aug 6 – Aug 16, 2026 |
| S4 | Stress & Mind | Ep 19–24 | Aug 18 – Aug 28, 2026 |
| S5 | Nutrition & Myths | Ep 25–30 | Aug 30 – Sep 11, 2026 |
| S6 | Healthy Aging & Longevity | Ep 31–36 | Sep 13 – Sep 25, 2026 |

Every episode row in the master XLSX contains: hook title, VO script, visual direction, thumbnail prompt, BGM/SFX notes, hashtags, YouTube title, and post date.

---

## Getting Started

### Prerequisites
- Node.js 24+
- pnpm 9+
- PostgreSQL (or a Replit managed DB)

### Install & Run

```bash
# Install all workspace dependencies
pnpm install

# Start the API server
pnpm --filter @workspace/api-server run dev

# Start the publishing dashboard
pnpm --filter @workspace/publishing-dashboard run dev

# Start the video builder
pnpm --filter @workspace/biominute-reels run dev
```

### Database Setup

```bash
# Push schema to DB
pnpm --filter @workspace/db run push

# Seed all 36 episodes from master plan
pnpm --filter @workspace/db run seed
```

### Export a Video

```bash
# Make sure biominute-reels dev server is running first, then:
pnpm run export-video
```

Exports go to `exports/Episode-NN-<slug>/episode.mp4`.

### Push Exports to GitHub

```bash
bash scripts/push-to-github.sh "feat: export Episode 5"
```

---

## Environment Secrets

| Secret | Purpose | Required |
|--------|---------|---------|
| `SESSION_SECRET` | Express session signing | Yes |
| `GITHUB_TOKEN` | Push exports to GitHub (classic PAT, `repo` scope) | For exports |
| `YOUTUBE_CLIENT_ID` | YouTube OAuth2 client ID | For publishing |
| `YOUTUBE_CLIENT_SECRET` | YouTube OAuth2 client secret | For publishing |
| `YOUTUBE_REFRESH_TOKEN` | Long-lived refresh token for YouTube API | For publishing |

Set all secrets via Replit's Secrets manager (never commit to `.env`).

---

## Publishing Workflow

1. **Build episode** — Open `biominute-reels`, load episode scenes from master plan
2. **Export MP4** — Run `pnpm run export-video` (Playwright headless recorder)
3. **Review in dashboard** — Open publishing dashboard, check stats and episode card
4. **Edit metadata** — Update YouTube title, hashtags, schedule date inline
5. **Approve** — Click "Approve Episode" on the episode detail page
6. **Publish** — Click "Publish to YouTube" → uploads via YouTube Data API v3

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 24 |
| Language | TypeScript 5.9 |
| Package manager | pnpm workspaces |
| Video renderer | React 19 + Framer Motion |
| Build tool | Vite 7 |
| API framework | Express 5 |
| ORM | Drizzle ORM |
| Database | PostgreSQL |
| Validation | Zod (auto-generated from OpenAPI) |
| API client | TanStack Query (auto-generated hooks) |
| Styling | Tailwind CSS v4 |
| Video export | Playwright + Xvfb |
| YouTube integration | YouTube Data API v3 |
| Logging | Pino |

---

## Scripts Reference

| Command | Description |
|---------|------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm run typecheck` | TypeScript check across all packages |
| `pnpm run build` | Build all packages |
| `pnpm run export-video` | Export current episode to MP4 |
| `pnpm run dashboard:generate` | Regenerate `exports/dashboard.html` |
| `bash scripts/push-to-github.sh "message"` | Push exports to GitHub |

---

## Project Status

- ✅ Episodes 1–30: Complete (exported, logged in `exports/production-log.md`)
- 🔄 Episodes 31–36: Planned
- ✅ Publishing dashboard: Live (Neo-Brutalism UI, full CRUD + YouTube publish)
- ✅ API server: Running with full OpenAPI spec
- ✅ Database: 36 episodes seeded
- 🔄 YouTube credentials: Being configured

---

## License

MIT © BioMinute Studio
