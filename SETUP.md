# BioMinute Reels — Local Setup & Run Guide

Step-by-step instructions to install, run, and export a BioMinute episode on your own machine or Replit.

---

## 1. What you need first

- **Node.js** v20 or higher (v24 recommended)
- **pnpm** v10 or higher
- **Git**

Check your versions:

```bash
node --version    # should print v20.x.x or higher
pnpm --version    # should print 10.x.x or higher
git --version
```

---

## 2. Secrets & tokens

### `DATABASE_URL` (only for the API server)

This is already set in Replit. You do **not** need it just to run the video player.

### `GITHUB_TOKEN` (only for auto-pushing to GitHub)

If you want to push exported episodes to GitHub automatically:

1. Create a **classic** GitHub Personal Access Token at https://github.com/settings/tokens
2. Check the **`repo`** scope.
3. Copy the token.
4. Add it as a **Replit Secret** named `GITHUB_TOKEN`.

Then you can run:

```bash
bash scripts/push-to-github.sh "Episode 1: Walk After Meals exported"
```

No other secrets are required for the video player or audio.

---

## 3. First-time install

```bash
git clone https://github.com/0utLawzz/Health-Channel-Creator.git
cd Health-Channel-Creator
pnpm install
```

This installs packages for all workspace projects at once.

---

## 4. Run the video player

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev
```

Then open **http://localhost:5173/** in your browser.

Keep this terminal running. Open a new tab for other commands.

> On Replit, the artifact runs at `/biominute-reels/` on an assigned port automatically. The `PORT=5173 BASE_PATH=/` values are for local development only.

---

## 5. What you see in the preview

- A 9:16 vertical canvas centered on a dark background.
- The video loops through all scenes automatically.
- A control bar at the bottom lets you jump between scenes, loop a scene, toggle audio, and collapse the bar.
- Audio starts muted by default. Click the **🔊 audio button** to unmute.

If the canvas looks landscape instead of portrait, make your browser window taller.

---

## 6. Export an MP4

There are two ways to export. Pick the one that works for you.

### Option A — Programmatic export (Playwright + ffmpeg)

```bash
# Make sure the dev server is running on http://localhost:5173
pnpm run export-video
```

The script records the browser tab and saves an MP4. By default it writes to `/tmp/biominute-export/episode.mp4`. Set a custom output folder with:

```bash
cross-env BIOMINUTE_EXPORT_DIR="exports/Episode-01-Walk-After-Meals" pnpm run export-video
```

> This requires `ffmpeg` and `playwright-chromium` installed (already included as a dev dependency). On Linux, it also uses `Xvfb`.

### Option B — Manual screen recording (most reliable)

1. Open the export URL in a fresh browser tab:
   ```
   http://localhost:5173/?export
   ```
   This hides controls and forces audio unmuted.
2. Resize the browser so the canvas fills the screen.
3. Record the tab with QuickTime, OBS, Xbox Game Bar, or a browser extension.
4. Stop after the thumbnail slide finishes.
5. Save the recording as `episode.mp4` inside the correct `exports/Episode-NN-slug/` folder.

After exporting, run `pnpm verify-export exports/Episode-NN-slug/episode.mp4` to confirm the resolution is 1080×1920.

---

## 7. Update the production tracker

1. Open `exports/production-log.md`.
2. Set the episode's status to `Complete`, add the date, and write a short note.
3. Run `pnpm run dashboard:generate` to update `exports/dashboard.html`.

---

## 8. Push to GitHub

```bash
bash scripts/push-to-github.sh "Episode 1: Walk After Meals exported"
```

The script stages, commits, and pushes to GitHub. The `GITHUB_TOKEN` secret must be set.

---

## 9. Project structure

```
Health-Channel-Creator/
├── artifacts/
│   ├── biominute-reels/          ← The video player app
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── components/video/
│   │   │   │   ├── VideoTemplate.tsx
│   │   │   │   ├── VideoWithControls.tsx
│   │   │   │   └── video_scenes/
│   │   │   │       ├── Scene0.tsx  ← Hook scene
│   │   │   │       ├── Scene1.tsx
│   │   │   │       ├── Scene2.tsx
│   │   │   │       ├── Scene3.tsx
│   │   │   │       ├── Scene4.tsx
│   │   │   │       ├── Scene5.tsx  ← Outro / CTA
│   │   │   │       └── ThumbnailSlide.tsx
│   │   │   └── lib/video/config.ts  ← 1080×1920 constants
│   │   └── public/
│   │       ├── images/             ← Scene images
│   │       └── audio/              ← Background music + SFX
│   ├── api-server/                 ← Optional backend
│   └── mockup-sandbox/             ← Optional design sandbox
│
├── exports/
│   ├── production-log.md         ← Episode tracker
│   ├── dashboard.html            ← Auto-generated dashboard
│   └── Episode-01-Walk-After-Meals/  ← Episode 1 export folder
│       ├── episode.mp4
│       ├── thumbnail.png
│       └── episode-notes.md
│
├── attached_assets/
│   └── BioMinute-Episode-Master-Plan_1783643847514.xlsx  ← 36-episode master plan
│
├── scripts/
│   ├── push-to-github.sh
│   ├── finish-and-push.sh
│   ├── export-video.ts
│   ├── generate-dashboard.ts
│   └── verify-export.ts
│
├── README.md
├── WORKFLOW.md
├── TEMPLATE.md
└── SETUP.md
```

---

## 10. Troubleshooting

### The video looks 16:9 / landscape

Make your browser window taller. The canvas is always 1080×1920 internally; it only looks small if the window is wide.

### Audio does not play

The preview starts muted. Click the **🔊 audio button** to unmute. For export, use `http://localhost:5173/?export` to force audio on.

### `pnpm install` fails with "use pnpm instead"

You ran `npm install` or `yarn install`. Always use `pnpm install`.

### Port is already in use

Use a different port:

```bash
PORT=3456 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev
```

Then open http://localhost:3456/.

### Images show as broken (404)

Make sure the dev server is running with `BASE_PATH=/` locally. Also confirm the image files exist in `artifacts/biominute-reels/public/images/`.

### Thumbnail end slide is wrong

The thumbnail slide reads `public/images/episode-thumbnail.png`. Copy the correct episode thumbnail there before exporting:

```bash
cp exports/Episode-02-drink-water-before-your-morning/thumbnail.png \
   artifacts/biominute-reels/public/images/episode-thumbnail.png
```

### `GITHUB_TOKEN` not set error

Add `GITHUB_TOKEN` as a Replit Secret (classic PAT with `repo` scope). Do not paste it into chat or commit it.

---

## Quick reference

```bash
# Install
pnpm install

# Run video player
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/biominute-reels run dev

# Export (programmatic)
BIOMINUTE_EXPORT_DIR="exports/Episode-01-Walk-After-Meals" pnpm run export-video

# Verify resolution
pnpm verify-export exports/Episode-01-Walk-After-Meals/episode.mp4

# Update dashboard after production-log change
pnpm run dashboard:generate

# Push to GitHub (needs GITHUB_TOKEN secret)
bash scripts/push-to-github.sh "Episode 1: Walk After Meals exported"
```
