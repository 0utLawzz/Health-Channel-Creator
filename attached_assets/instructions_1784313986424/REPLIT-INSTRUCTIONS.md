# BioMinute — Replit Fix & Automation Instructions

Paste this whole file to your Replit agent as one task list. Each item names the exact
symptom seen in production, so the agent isn't guessing at "clean it up."

---

## 1. Fix: duplicate YouTube upload (Episode 3)

**Symptom:** "Are You Eating Protein at the Wrong Time?" is live on YouTube twice —
2026-07-16 (16 views, 1 comment) and 2026-07-17 (2 views, 1 comment). Only one
`exports/Episode-03-are-you-eating-protein-at/` folder exists, so this was published
twice from the same render, not rendered twice.

**Fix:**
- Add a publish guard in the YouTube publish step (wherever `api-server` calls the YouTube
  Data API `videos.insert`): before inserting, check the episodes DB table for an existing
  `youtube_video_id` on that episode row. If one is already set, refuse to publish again and
  log/return a clear error instead of silently re-inserting.
- Add a unique constraint (or at minimum an application-level check) so the same episode
  number can't transition to "published" twice.
- Manually delete or unlist the 2026-07-17 duplicate video in YouTube Studio, and fix the
  description on the 2026-07-16 video that's being kept (see item 2).

## 2. Fix: broken description template (stray "CITATION:" / "CTA:" text mid-description)

**Symptom:** The Jul-16 Episode 3 upload's description starts with
`CITATION: Morton RW et al. (2018)...CTA:` instead of the hook paragraph. Fields are
being concatenated in the wrong order or a label string is leaking into the body.

**Fix:** Find the description-builder function (likely in `api-server` or a publish
script) and lock it to exactly this order, with no other field-name labels inserted into
the body:

```
{hook — first 1–2 sentences of the VO script}

Backed by: {citation}

🔔 Subscribe to BioMinute for daily evidence-based health tips.
📌 Playlist: {season/playlist name}

{hashtags}
```

The canonical, ready-to-paste version for every existing episode is already generated in
the **Social** tab of `BioMinute-Master-Workbook.xlsx` — use those as the source of truth
and diff the publish code against them.

## 3. Dashboard: regenerate and keep automatic

**Symptom:** `exports/dashboard.html` / the project's `dashboard.html` still shows only
Episodes 1–5 as Complete and 6–36 as Queued, even though `exports/production-log.md`
confirms all 36 are rendered and the user has reviewed and approved every reel.

**Fix:**
- Run `pnpm run dashboard:generate` now and commit the refreshed `exports/dashboard.html`.
- Mark all 36 episodes' status as `approved` in whatever DB/table the dashboard reads from
  (episodes table via `seed-episodes.ts` / Drizzle schema) — the user has watched all 36
  reels and approved them, so no further manual review step should block publishing.
- Make `dashboard:generate` run automatically as a post-export hook (e.g. call it at the
  end of `export-video.ts`, or add it to `post-merge.sh`) so it never goes stale again
  without a manual reminder.
- Confirm the dashboard is wired to reflect **live YouTube status** too (published date,
  video ID/link), not just local export status — right now it only shows "Complete" vs
  "Queued" from the export, which is why it looked out of sync with YouTube Studio.

## 4. Enable GitHub Pages for the dashboard

`index.html` at the repo root already redirects to `exports/dashboard.html`, so Pages
can serve it with no code changes:

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder `/ (root)`
4. Save. It will publish at `https://0utlawzz.github.io/biominute-shorts-studio/`
5. Re-run `pnpm run dashboard:generate` after every export so Pages always serves the
   latest state (Pages just serves whatever's committed — no separate build step needed
   for a static HTML file).

## 5. Posting schedule — start tomorrow, daily cadence

Use the **Schedule** tab in `BioMinute-Master-Workbook.xlsx` as the source of truth. Summary:
- Today's date: 2026-07-17. Episodes 1, 2, 4 are already live; Episode 3's duplicate needs
  deleting (item 1).
- **2026-07-18 — TEST-1:** generate → export → push to dashboard → publish **instantly**,
  no approval gate. This is a pipeline smoke test, not a real content slot.
- **2026-07-19 — TEST-2:** same pipeline, but **scheduled** for the next day instead of
  instant, to confirm the scheduler actually fires unattended.
- **2026-07-20 onward:** Episode 5 through 36, then the 14 new topics (37–50), one per
  day, at the time noted in the Schedule tab (7:00 PM placeholder — replace with real data
  from YouTube Studio → Analytics → Audience → "When your viewers are on YouTube" once
  available).

## 6. Two dedicated test episodes — build these into the pipeline, not just docs

Add two lightweight "test" episode records (not counted in the 36/50) so the full
pipeline can be exercised without touching real content:
- **TEST-1:** any short placeholder script, immediate publish, no human approval step —
  proves the "generate → export → dashboard → publish now" path works unattended.
- **TEST-2:** same build, but scheduled for +1 day — proves the scheduler/cron actually
  publishes on its own without someone clicking "approve."

Once both pass, resume the real schedule from Episode 5.

## 7. Known issues already flagged in `docs/`

Two issues already exist in the repo's own doc files — fix both while in here:
- `docs/bug-report-aspect-ratio.md`: hard-code `VIDEO_WIDTH = 1080` / `VIDEO_HEIGHT = 1920`
  as a single constant used everywhere; remove any lingering 16:9 defaults across scenes.
- `docs/CONTRIBUTING.md` → "Audio desync risk in export pipeline": resolve or update status.

## 8. Content: extend from 36 to 50 episodes

36 episodes is enough to launch and get through Season 1–6 once, but not enough to keep a
daily posting cadence going for long — at 1/day it's used up in ~5 weeks. 14 new topics
(Episodes 37–50) are seeded in the **Production** tab with a one-line hook each, but still
need full VO script / visual direction / citation / thumbnail prompt — the same treatment
Episodes 1–36 already got in the master plan. Either:
- Have the Replit agent write the remaining fields per the locked style/timing template in
  `exports/production-log.md` (Scene durations, `SPRING_SNAPPY`/`SPRING_SMOOTH`, color lock,
  citation-treatment rules already documented there), or
- Send them back to me and I'll fully script them the same way the existing 36 are written.

---

**Order of operations:** fix 1 (duplicate) and 2 (description template) first since they're
live and visible to subscribers right now → then 3 (dashboard) and 4 (Pages) → then 6
(test episodes) before resuming 5 (daily schedule) → then 7 and 8 in parallel.
