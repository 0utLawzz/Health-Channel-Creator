# Episode 2 — Drink Water Before Your Morning Coffee

- **Status:** Built — awaiting manual export (see below)
- **Planned post date:** Mon, Jul 13, 2026 (Season 1: Morning Habits)
- **Built as:** `artifacts/biominute-reels` (video-js artifact), 9:16, ~28s, brand palette (navy/teal/emerald/orange)

## Script / structure
1. Hook: "After 7 to 8 hours... breathing and sweating overnight" (BioMinute logo + title)
2. Water glass visual — glass of water helps replace overnight fluid losses before coffee
3. Coffee dimming — greyscaled coffee cup vs. vivid water glass, "Starting Hydrated" card
4. The Swap — "1. Water First", "2. Coffee Second" cards; citation: Popkin BM et al.
5. Outro — end-card question + BioMinute logo loop

Full VO script, citation text, hashtags, CTA, and thumbnail prompt are in `attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx`, row 2 (Content_Master sheet).

## Known limitations
- Background music generation failed: ElevenLabs account has insufficient credits (quota exceeded). The video currently has no audio track. Re-run music generation once credits are restored, following `.local/skills/video-js/references/audio.md`.
- No MP4/thumbnail exported yet — video export from this stack happens by opening the running app's preview (outside the iframe) and using its built-in export control, not something the agent can trigger from tools. Once exported, place the MP4 + thumbnail in this folder and update `exports/production-log.md` to Complete.
