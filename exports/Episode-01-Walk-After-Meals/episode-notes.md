# Episode 1: Walk After Meals

- Status: Built — awaiting re-export (previous export rejected)
- Playlist: S1: Morning Habits
- Export folder: `exports/Episode-01-Walk-After-Meals/`

## Notes

Episode 1 was missing from the master spreadsheet, so the script was generated to match the BioMinute evidence-based format. Built in 9:16 vertical (1080×1920) with background music + SFX. Thumbnail generated at 1080×1920.

## Reviewed mistake (2026-07-10)

The uploaded `episode1.mp4` was **1280×720 (16:9)**, not the required 1080×1920 (9:16), even though `src/lib/video/config.ts` already defines the canvas as 1080×1920. The scene/canvas code was not the problem — this was a capture-time issue with how the browser recording was made (e.g. browser window/viewport not matched to the 1080x1920 canvas during recording). The bad `episode1.mp4` has been deleted from this folder. Episode 1 needs a fresh export: open the live preview outside the iframe, confirm the on-screen canvas is rendering at 1080×1920 before starting the record control, then export again. Thumbnail and notes are unaffected and remain valid.

## Build/export notes

- Scenes built: 2026-07-10
- Scene durations: 4500ms / 9000ms / 8000ms / 5500ms / 7500ms / 6000ms (total ~40.5s)
- Audio: background music + scene-change SFX (swoosh / pop)
- Citation: Dipietro L et al. (2013), Diabetes Care; Reynolds AN et al. (2016), Diabetologia
- Thumbnail: 1080×1920 PNG in this folder
- `episode.mp4` — awaiting export from the preview record control
