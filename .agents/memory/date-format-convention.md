---
name: Date format convention
description: All user-facing episode dates in the dashboard must show date+time, never date-only.
---

# Date Format Convention

**Rule:** Use `formatPKT` (DD-MMM-YY hh:mm AM/PM) for all episode date display in the publishing dashboard. Never use `formatPKDate` (date-only) for episode-facing timestamps.

**Why:** User explicitly requested date+time everywhere. `formatPKDate` is now only acceptable for structural/calendar UI (e.g., calendar picker month labels). All post dates, publish dates, schedule dates, timeline entries must show both date and time in PKT.

**How to apply:**
- `EpisodeCard.tsx`, `Dashboard.tsx`, `EpisodeDetail.tsx`, `PreviewQueue.tsx`, `Scheduled.tsx`, `Published.tsx` — all use `formatPKT` for episode.postDate and related fields.
- `lib/date.ts` exports: `formatPKT` (date+time), `formatPKTimeSec` (time+seconds, live clock only), `formatPKDateLong` (weekday+date, live clock label only), `formatPKTime` (time only, deprecated for episode display).
