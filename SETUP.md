# BioMinute Reels — Local Setup & Run Guide

Complete step-by-step instructions to install, run, and test any episode on your local machine.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Environment Variables & Secrets](#2-environment-variables--secrets)
3. [First-Time Install](#3-first-time-install)
4. [Run the App Locally](#4-run-the-app-locally)
5. [Viewing Episode 1 in the Browser](#5-viewing-episode-1-in-the-browser)
6. [Exporting a Video (MP4)](#6-exporting-a-video-mp4)
7. [Push to GitHub](#7-push-to-github)
8. [Project Structure at a Glance](#8-project-structure-at-a-glance)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

Install these tools on your machine before anything else.

| Tool | Minimum Version | Install |
|------|----------------|---------|
| **Node.js** | v20 or higher (v24 recommended) | https://nodejs.org |
| **pnpm** | v10 or higher | `npm install -g pnpm` |
| **Git** | any recent version | https://git-scm.com |

Check your versions:

```bash
node --version    # should print v20.x.x or higher
pnpm --version    # should print 10.x.x or higher
git --version
```

---

## 2. Environment Variables & Secrets

### Required for GitHub auto-push only

| Variable | Value | Where to set it |
|----------|-------|-----------------|
| `GITHUB_TOKEN` | Your GitHub Personal Access Token (classic, `repo` scope) | `.env` file or shell export (see below) |

**How to create a GitHub Personal Access Token (PAT):**
1. Go to https://github.com/settings/tokens → **Generate new token (classic)**
2. Give it a name (e.g. `biominute-push`)
3. Check the **`repo`** scope checkbox
4. Click **Generate token** and copy it

**How to set it locally:**

Option A — create a `.env` file in the project root (never commit this):
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Option B — export it in your terminal session:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Note:** The `.env` file is already listed in `.gitignore`. Never commit your token.

### No other secrets required

The video player, audio, images, and all scene animations run entirely in the browser with no external API calls. You do **not** need any API keys just to run and preview episodes locally.

---

## 3. First-Time Install

Clone the repo (skip if you already have it):
```bash
git clone https://github.com/0utLawzz/Health-Channel-Creator.git
cd Health-Channel-Creator
```

Install all dependencies (run this once, and again after any `package.json` changes):
```bash
pnpm install
```

This installs packages for all workspace projects at once:
- `artifacts/biominute-reels` — the video player
- `artifacts/api-server` — optional backend
- `artifacts/mockup-sandbox` — optional design sandbox

**Expected output:** `Done in Xs` with no errors. A warning about `playwright-chromium` is normal and can be ignored.

---

## 4. Run the App Locally

### Start the BioMinute Reels video player

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev
```

This starts a Vite dev server. You should see:

```
  VITE v7.x.x  ready in 400 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open your browser at: **http://localhost:5173/**

> **Why `PORT=5173 BASE_PATH=/`?**
> On Replit the app runs at `/biominute-reels/` on a specific port. Locally you want it at root `/` on the standard Vite port.

### Keep the terminal running

The dev server must stay running while you preview. Open a new terminal tab for any other commands.

---

## 5. Viewing Episode 1 in the Browser

Once the dev server is running at http://localhost:5173/ you will see:

- A **9:16 vertical canvas** (1080×1920, scaled to fit your screen) centered on a dark background
- The video loops automatically through all **7 scenes**:

| # | Scene | Duration |
|---|-------|----------|
| 0 | Hook — "What happens right after you eat?" + meal plate | 4.5 s |
| 1 | Blood sugar graph — orange spike vs emerald flatline | 9.0 s |
| 2 | Muscles as a glucose sponge + GLUT-4 animation | 8.0 s |
| 3 | 4 benefit cards (blood sugar / digestion / energy / burn) | 5.5 s |
| 4 | Walking shoes + 3 stat cards (10–15 min / relaxed / within 30 min) | 7.5 s |
| 5 | BioMinute logo + CTA "Do you walk after meals?" | 6.0 s |
| 6 | **Thumbnail end slide** (your thumbnail image, full-bleed) | 4.0 s |

**Total runtime: ~44.5 seconds, then loops**

### Controls at the bottom of the screen

| Control | What it does |
|---------|-------------|
| **Progress segments** (tap/click) | Jump directly to any scene |
| **🔁 Loop button** | Lock/unlock the current scene (loops it until you unlock) |
| **🔊 Audio button** | Toggle background music on/off |
| **∨ Collapse button** | Hide the control bar |

### Verify the aspect ratio

The canvas should appear **taller than it is wide** (portrait/vertical). If it looks square or landscape, the viewport is not correctly applying the 9:16 scale — see [Troubleshooting](#9-troubleshooting).

---

## 6. Exporting a Video (MP4)

The export flow works differently from a normal screen recorder. The app has a built-in export mode that renders at full 1080×1920.

### Step-by-step export

1. **Open the export URL** in a fresh browser tab:
   ```
   http://localhost:5173/?export
   ```
   The `?export` query parameter switches the player into export mode:
   - Controls are hidden
   - Audio plays unmuted
   - The canvas is rendered at exactly 1080×1920 CSS pixels (scaled to fit your screen)

2. **Resize your browser window** so the canvas fills as much of the screen as possible. The canvas will scale with the window.

3. **Use a screen recorder** to record the tab:
   - **Mac:** QuickTime Player → New Screen Recording → select the browser tab
   - **Windows:** Xbox Game Bar (`Win + G`) or OBS Studio
   - **Browser extension:** Loom, Screencastify, or similar

4. **Start recording, then wait** for the full loop to play through once (~44.5 seconds for Episode 1). Stop the recording after the thumbnail slide disappears.

5. **Save the file** as `episode.mp4` and move it into:
   ```
   exports/Episode-01-Walk-After-Meals/episode.mp4
   ```

6. **Update the production log** — open `exports/production-log.md` and change Episode 1's status from `Built — awaiting export` to `Complete` and set today's date.

---

## 7. Push to GitHub

Once you have recorded and saved the episode MP4, push everything to GitHub:

```bash
# Make sure GITHUB_TOKEN is set (see Section 2)
bash scripts/push-to-github.sh "EP1 Walk After Meals: exported"
```

This script will:
- `git add -A` (stage all changes including the new MP4)
- `git commit -m "your message"`
- `git push` to `https://github.com/0utLawzz/Health-Channel-Creator`

---

## 8. Project Structure at a Glance

```
Health-Channel-Creator/
├── artifacts/
│   ├── biominute-reels/          ← The video player app (this is what you run)
│   │   ├── src/
│   │   │   ├── App.tsx           ← Root: renders 9:16 VerticalFrame
│   │   │   ├── components/video/
│   │   │   │   ├── VideoTemplate.tsx     ← Scene list + durations
│   │   │   │   ├── VideoWithControls.tsx ← Player UI with control bar
│   │   │   │   └── video_scenes/
│   │   │   │       ├── Scene0.tsx  ← EP1 Hook
│   │   │   │       ├── Scene1.tsx  ← EP1 Blood sugar graph
│   │   │   │       ├── Scene2.tsx  ← EP1 Muscle sponge
│   │   │   │       ├── Scene3.tsx  ← EP1 Benefits
│   │   │   │       ├── Scene4.tsx  ← EP1 The dose
│   │   │   │       ├── Scene5.tsx  ← EP1 BioMinute outro
│   │   │   │       └── ThumbnailSlide.tsx ← Final thumbnail frame
│   │   │   └── lib/video/config.ts  ← VIDEO_WIDTH=1080, VIDEO_HEIGHT=1920
│   │   └── public/
│   │       ├── images/             ← All images used by scenes
│   │       │   ├── episode-thumbnail.png  ← Current episode thumbnail (end slide)
│   │       │   ├── plate-overhead.png
│   │       │   ├── walking-shoes-3d.png
│   │       │   ├── biominute-logo.png
│   │       │   └── ... (other brand images)
│   │       └── audio/
│   │           ├── background.mp3  ← Background music
│   │           ├── swoosh.mp3      ← Scene transition SFX
│   │           └── pop.mp3         ← Scene transition SFX
│   ├── api-server/               ← Optional backend (not needed for video preview)
│   └── mockup-sandbox/           ← Optional design prototyping (not needed)
│
├── exports/
│   ├── production-log.md         ← Episode queue & status (source of truth)
│   ├── dashboard.html            ← Auto-generated video dashboard
│   └── Episode-01-Walk-After-Meals/
│       ├── thumbnail.png         ← 1080×1920 thumbnail
│       ├── episode-notes.md      ← Build notes
│       └── episode.mp4           ← (place here after export)
│
├── attached_assets/
│   └── BioMinute-Episode-Master-Plan_1783643847514.xlsx  ← All 36 episode scripts
│
├── scripts/
│   └── push-to-github.sh         ← Auto-push script (needs GITHUB_TOKEN)
│
├── SETUP.md                      ← This file
├── WORKFLOW.md                   ← Episode build workflow
└── README.md                     ← Project overview
```

---

## 9. Troubleshooting

### The video looks 16:9 / landscape instead of 9:16 / portrait

The canvas is always 1080×1920 internally and scales to fit your browser window. If your browser window is wider than it is tall, the canvas will appear small and centered. **Make your browser window taller** (or use full-screen on a vertical monitor). The canvas itself is always correctly 9:16 regardless.

### Audio doesn't play

By default the preview is muted (to allow auto-play in browsers). Click the **🔊 audio button** at the bottom of the player to unmute. If you're recording for export, use the `?export` URL — it forces audio unmuted.

### `pnpm install` fails with "use pnpm instead"

You ran `npm install` or `yarn install` by mistake. Always use `pnpm install`.

### Port 5173 is already in use

Use a different port:
```bash
PORT=3456 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev
```
Then open http://localhost:3456/

### Scene images show as broken (404)

Make sure you're running with `BASE_PATH=/` locally. The images are served from `public/images/`. If you see 404s, check that the `public/images/` folder exists and contains the files listed in Section 8.

### Episode thumbnail end slide is blank / wrong image

The thumbnail slide always shows `public/images/episode-thumbnail.png`. When you switch to a new episode, copy that episode's thumbnail into that file:
```bash
cp exports/Episode-02-drink-water-before-your-morning/thumbnail.png \
   artifacts/biominute-reels/public/images/episode-thumbnail.png
```

### `GITHUB_TOKEN` not set error when pushing

Set the token in your terminal:
```bash
export GITHUB_TOKEN=ghp_your_token_here
bash scripts/push-to-github.sh "your commit message"
```

---

## Quick Reference Card

```bash
# 1. Install (first time only)
pnpm install

# 2. Run locally
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev

# 3. Open in browser
open http://localhost:5173/

# 4. Export mode (full quality, audio unmuted)
open "http://localhost:5173/?export"

# 5. Push to GitHub (after setting GITHUB_TOKEN)
bash scripts/push-to-github.sh "EP1 Walk After Meals: exported"
```
