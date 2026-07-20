---
name: BioMinute scheduled time drift
description: Why uploaded YouTube videos can end up on a different publish hour than the DB, and how to keep them in sync.
---

**Rule:** After running `seed-episodes.ts`, always run `reschedule.ts` if any episodes have already been uploaded to YouTube.

**Why:** `seed-episodes.ts` recomputes `scheduledPublishAt` from `postDate` + `09:00:00Z` for every episode that has a `postDate`. It updates the DB but does **not** touch YouTube. If videos were previously uploaded at a different hour (e.g., `14:00:00Z`), the DB and YouTube will drift out of sync. The API server's scheduler relies on the DB time, and YouTube will publish at its own stored time.

**How to apply:**
- Use `pnpm --filter @workspace/scripts exec tsx ./src/reschedule.ts --hour <0-23>` to shift every already-uploaded `scheduled` video on YouTube to the desired UTC hour and update the DB to match.
- Dry-run first: append `--dry`.
- This only changes the hour, not the calendar date. If you need to change dates too, use a custom DB update plus a YouTube `videos.update` call, or re-upload.

**Current context:** As of 2026-07-20, episodes 6–36 are scheduled on YouTube at `14:00 UTC` while episodes 37–50 are stored at `09:00 UTC`. This is exactly the kind of drift the rule above prevents.
