# Aspect Ratio — FIXED

## Status

✅ Resolved — the project is locked to 9:16 vertical (1080×1920) for all BioMinute Shorts.

## Root cause of the original bug

The video render pipeline and some scene components had hard-coded or default 16:9 assumptions (1920×1080 / 1280×720 / `aspect-ratio: 16/9`). When the export step was told to produce a vertical video, the underlying canvas still rendered in landscape dimensions, so text and visual elements were mis-positioned, cut off, or incorrectly scaled.

## What was changed

1. **Single source of truth for dimensions** — `artifacts/biominute-reels/src/lib/video/config.ts` defines:
   - `VIDEO_WIDTH = 1080`
   - `VIDEO_HEIGHT = 1920`
   - `VIDEO_ASPECT_RATIO = 9/16`
   - Safe-zone margins (8% all sides, 30% bottom reserved for YouTube UI)

2. **No 16:9 defaults anywhere** — all scene components, the export script, and the canvas wrapper use these constants. The export pipeline records a 1080×1920 viewport and ffmpeg scales/pads to the same dimensions.

3. **Automated QA in the export step** — `scripts/src/verify-export.ts` uses `ffprobe` to confirm every exported MP4 is exactly 1080×1920 before it is marked complete. `scripts/src/export-video.ts` will log a warning if the Playwright viewport does not match the canonical constants.

4. **1080×1920 is the only supported format** going forward. Any request to render in 16:9 must be intentional and temporary, and must explicitly override the constants.

## Verification

- All 36 existing episodes were exported at 1080×1920.
- `pnpm --filter @workspace/scripts exec tsx ./src/verify-export.ts <mp4>` confirms the resolution.
