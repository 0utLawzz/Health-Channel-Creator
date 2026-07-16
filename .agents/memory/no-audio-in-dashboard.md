---
name: No audio/sound in dashboard artifacts
description: User explicitly requested all audio/BGM/SFX UI be removed from non-reel artifacts. Only biominute-reels may have audio.
---

# No Audio / BGM / SFX in Dashboard Artifacts

**Rule:** Never add audio playback, background music fields, SFX controls, or any sound-related UI to these artifacts:
- `artifacts/publishing-dashboard`
- `artifacts/biominute-deck`
- `artifacts/mockup-sandbox`

**Why:** User explicitly removed `bgSound` field from the publishing dashboard and episode detail view on 2026-07-16. Audio is solely the concern of `artifacts/biominute-reels` (the reel player) and the export pipeline scripts.

**How to apply:** If you are ever tempted to add a bgSound input, Audio/BGM display, Web Audio API usage, or any sound file import to any artifact other than `biominute-reels`, stop and don't do it. The `bgSound` column still exists in the database schema (used by the export script) — do not surface it in any UI.
