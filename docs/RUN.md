# BioMinute Shorts Studio — Run Guide

How to run every artifact and common development workflows.

---

## Start the artifacts

Each artifact is a Vite or Express app managed by Replit workflows. You can also start them manually from the terminal.

### API Server

```bash
pnpm --filter @workspace/api-server run dev
```

- Serves the REST API on the port assigned by Replit (`$PORT`).
- Required by the publishing dashboard.

### Publishing Dashboard

```bash
pnpm --filter @workspace/publishing-dashboard run dev
```

- Browse to the Replit preview path for the dashboard.
- The dashboard calls the API server for episode data and YouTube status.

### BioMinute Reels (video player)

```bash
pnpm --filter @workspace/biominute-reels run dev
```

- Opens a 9:16 vertical canvas.
- The control bar lets you jump between scenes, loop a scene, and toggle audio.
- Preview starts muted by default (browser autoplay policy). Use the audio button to unmute.
- Add `?export` to the URL to hide controls and force audio on for recording/screen capture.

### Investor Deck

```bash
pnpm --filter @workspace/biominute-deck run dev
```

- Opens the slide deck. Navigate with arrow keys or on-screen controls.

### Mockup Sandbox (optional design preview)

```bash
pnpm --filter @workspace/mockup-sandbox run dev
```

---

## Local development without Replit

If you run the artifacts locally, set the base path to `/` and pick a free port:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev
PORT=5174 BASE_PATH=/ pnpm --filter @workspace/publishing-dashboard run dev
PORT=5175 BASE_PATH=/ pnpm --filter @workspace/api-server run dev
```

Then open:

- `http://localhost:5173` — reels
- `http://localhost:5174` — dashboard
- `http://localhost:5175` — API server

---

## Common workflows

### Re-seed the database from the master plan

```bash
pnpm --filter @workspace/db push-force
pnpm --filter @workspace/scripts exec tsx ./src/seed-episodes.ts
```

### Export an episode to MP4

Make sure the reels dev server is running first, then:

```bash
# Programmatic export (Playwright + ffmpeg)
pnpm run export-video
```

By default it writes to `/tmp/biominute-export/episode.mp4`. Set a custom output folder:

```bash
BIOMINUTE_EXPORT_DIR="exports/Episode-01-Walk-After-Meals" pnpm run export-video
```

### Verify the export resolution

```bash
pnpm --filter @workspace/scripts exec tsx ./src/verify-export.ts exports/Episode-01-Walk-After-Meals/episode.mp4
```

### Regenerate the static production dashboard

```bash
pnpm run dashboard:generate
```

This writes `exports/dashboard.html` from the current `exports/production-log.md`.

### Push exports to GitHub

```bash
bash scripts/push-to-github.sh "feat: export Episode 5"
```

Requires the `GITHUB_TOKEN` secret.

---

## Workflow notes

- The `biominute-reels` artifact holds **one episode at a time**. Building a new episode overwrites `Scene0.tsx`–`Scene5.tsx`; older `epNN_SceneX.tsx` files are kept for reference but not rendered.
- Export happens sequentially: write scenes → typecheck → export → copy MP4 into `exports/Episode-NN-slug/` → move to the next episode.
- The publishing dashboard has no background audio; audio is only part of the reels video content.
