# Episode 2: Drink Water Before Your Morning Coffee

- Status: Built — awaiting export
- Playlist: S1: Morning Habits
- Export folder: `exports/Episode-02-drink-water-before-your-morning/`

## Notes

Scenes rebuilt 2026-07-10 via design subagent to replace the leftover Episode 5 scenes in `artifacts/biominute-reels`. Verified vertical canvas: `src/lib/video/config.ts` defines VIDEO_WIDTH=1080, VIDEO_HEIGHT=1920; all scenes scale with `--cvw`/`--cvh` canvas-relative units, no 16:9 assumptions.

## Build/export notes

- Scene durations: 4500ms / 8500ms / 8000ms / 7500ms / 9000ms / 6000ms (total ~43.5s)
  - Scene 0: Hook — "Drink Water Before Your Morning Coffee"
  - Scene 1: Body naturally low on fluids after sleep
  - Scene 2: Glass of water replaces overnight losses
  - Scene 3: Coffee's mild diuretic effect, water first
  - Scene 4: Total caffeine intake still matters most + citation
  - Scene 5: Outro & CTA
- Audio: background music (`public/audio/background.mp3`) + scene-change SFX (`pop.mp3` / `swoosh.mp3`)
- Assets: reused `sunrise-bg.png`, `water-glass.png`, `coffee-cup.png`; generated `character-waking.png` and `kitchen-elements.png` for this episode
- Citation: General hydration physiology; Popkin BM et al. (2010), Nutrition Reviews — Water, hydration and health (shown in Scene 4)
- `episode.mp4` — awaiting export from the preview record control (this will overwrite Episode 5's scenes as the live build, so export before starting Episode 3)

## Files to add here

- `episode.mp4` — final exported video
- `thumbnail.png` (1080x1920) — final YouTube Shorts thumbnail
