---
name: BioMinute production log
description: How the BioMinute reel production tracker works and the video-js export limitation to remember.
---

BioMinute (health YouTube channel) episodes are tracked in exports/production-log.md (one row per episode: status/date/export folder/notes) plus a per-episode exports/Episode-NN-slug/ folder with episode-notes.md. Read the log before starting new episode work; update status/date/notes when an episode's state changes.

**Why:** the user explicitly asked for this as persistent cross-session memory so episode context (script, citations, build state) isn't lost between chat sessions.

**How to apply:** video-js artifacts have no programmatic MP4 export tool available to the agent — export happens by the user opening the running app preview (outside the iframe) and using its built-in record/export control. Don't attempt to produce the MP4 yourself; document that step in episode-notes.md and leave status as "Built — awaiting export" until the user provides the exported files.
