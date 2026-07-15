# BioMinute Shorts Studio — Usage Guide

Full production workflow: from a new episode row in the master plan to a published YouTube Short.

---

## 1. Plan the episode

1. Open `attached_assets/BioMinute-Episode-Master-Plan_1783893698840.xlsx` (sheet `Episode Master Plan`).
2. Read the target episode's row for the exact script, citation, visual direction, CTA, hashtags, and thumbnail prompt.
3. Confirm the post date, season, and episode number.

> Do not rely on the title alone. The master sheet is the source of truth for every episode.

---

## 2. Build the scenes

1. Open `artifacts/biominute-reels`.
2. Create or overwrite `Scene0.tsx` through `Scene5.tsx` with the episode content.
3. Update `src/lib/video/config.ts` with the correct scene durations (total ~35–60 seconds).
4. Add any required images to `artifacts/biominute-reels/public/images/`.
5. Run the reels dev server and review the animation:

   ```bash
   pnpm --filter @workspace/biominute-reels run dev
   ```

6. Confirm the canvas is 1080×1920 and all text is inside the safe zones.

---

## 3. Export the MP4

### Option A — Programmatic export

Make sure the reels dev server is running, then:

```bash
BIOMINUTE_EXPORT_DIR="exports/Episode-NN-<slug>" pnpm run export-video
```

The script records the running tab and merges the audio track with ffmpeg.

### Option B — Manual screen recording

1. Open the export URL: `http://localhost:5173/?export` (or the Replit preview URL with `?export`).
2. The controls are hidden and audio is forced on.
3. Resize the browser so the canvas fills the viewport.
4. Record with OBS, QuickTime, or a browser extension.
5. Save the recording as `episode.mp4` in the correct `exports/Episode-NN-slug/` folder.

After exporting, verify the resolution:

```bash
pnpm --filter @workspace/scripts exec tsx ./src/verify-export.ts exports/Episode-NN-<slug>/episode.mp4
```

---

## 4. Update the production tracker

1. Open `exports/production-log.md`.
2. Set the episode's status to `Complete`, add the date, and write a short note.
3. (Optional) Regenerate the static dashboard:

   ```bash
   pnpm run dashboard:generate
   ```

---

## 5. Review and approve in the dashboard

1. Start the API server and publishing dashboard:

   ```bash
   pnpm --filter @workspace/api-server run dev
   pnpm --filter @workspace/publishing-dashboard run dev
   ```

2. Open the dashboard, find the episode, and click through to the episode detail page.
3. Review the VO script, visual direction, thumbnail prompt, and YouTube metadata.
4. Edit the title, hashtags, or schedule if needed.
5. Click **Approve Episode**.

---

## 6. Publish to YouTube

1. Make sure the YouTube secrets (`YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`) are set.
2. On the approved episode detail page, click **Publish to YouTube**.
3. The API server uploads the MP4 via the YouTube Data API v3.
4. If a schedule date is set, the video is uploaded as private and YouTube flips it to public at the scheduled time.

---

## 7. Push the exported assets to GitHub

```bash
bash scripts/push-to-github.sh "feat: export Episode NN — <title>"
```

This stages, commits, and pushes the new `exports/Episode-NN-slug/` folder and updated `production-log.md`.

---

## Audio policy

- Background music and scene SFX are part of the **video reels** only.
- The publishing dashboard, investor deck, and mockup sandbox do **not** play background music or sound effects.
