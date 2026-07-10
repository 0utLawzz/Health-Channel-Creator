---
name: BioMinute production log
description: How the BioMinute reel production tracker works, the video-js export limitation, and the single-artifact build workflow to remember.
---

BioMinute (health YouTube channel) episodes are tracked in exports/production-log.md (one row per episode: status/date/export folder/notes) plus a per-episode exports/Episode-NN-slug/ folder with episode-notes.md. Read the log before starting new episode work; update status/date/notes when an episode's state changes.

**Why:** the user explicitly asked for this as persistent cross-session memory so episode context (script, citations, build state) isn't lost between chat sessions.

**How to apply:** video-js artifacts have no programmatic MP4 export tool available to the agent — export happens by the user opening the running app preview (outside the iframe) and using its built-in record/export control. Don't attempt to produce the MP4 yourself; document that step in episode-notes.md and leave status as "Built — awaiting export" until the user provides the exported files.

**Single-artifact sequential build:** `artifacts/biominute-reels` holds exactly one episode's scenes at a time (Scene0-5 get fully overwritten per episode via a design subagent per the video-js skill's delegation requirement). Building episode N+1 replaces episode N's live scenes — so only the most recently built episode is actually previewable/exportable at any moment; earlier "Built — awaiting export" episodes need to be rebuilt before they can be exported unless the user already exported them first. `public/images/` and `public/videos/` accumulate unused assets from prior episodes since old scenes get overwritten but their media isn't cleaned up — this is expected debris, not a bug; only clean it up if it grows large or the user asks.
