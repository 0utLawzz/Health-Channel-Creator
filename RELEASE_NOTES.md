# BioMinute Reels — Final Working Project v1.2

## Released
2026-07-14

## Tag
`v1.0-final` (updated to latest commit)

## Includes
All **20 Episodes** from the BioMinute Health Reels channel are now fully scripted, animated, exported as 1080×1920 vertical MP4s, and pushed to the GitHub repository:

| Episode | Title | Duration | Export Folder |
|---|---|---|---|
| 1 | Walk After Meals | 36.4s | `exports/Episode-01-*/` |
| 2 | Drink Water Before Your Morning Coffee | 39.5s | `exports/Episode-02-*/` |
| 3 | Are You Eating Protein at the Wrong Time? | 37.8s | `exports/Episode-03-*/` |
| 4 | Is 10,000 Steps Actually a Myth? | 41.2s | `exports/Episode-04-*/` |
| 5 | Why Sleep Matters More Than You Think | 39.8s | `exports/Episode-05-*/` |
| 6 | Why Are You Still Hungry Right After Eating? | 41.0s | `exports/Episode-06-*/` |
| 7 | How Deep Breathing Reduces Stress | 42.3s | `exports/Episode-07-*/` |
| 8 | Does Drinking Water Really Boost Metabolism? | 38.5s | `exports/Episode-08-*/` |
| 9 | Morning Sunlight for Better Sleep | 39.8s | `exports/Episode-09-*/` |
| 10 | Can You Build Muscle Without Supplements? | 37.9s | `exports/Episode-10-*/` |
| 11 | Are Healthy Snacks Secretly Making You Gain Weight? | 35.5s | `exports/Episode-11-*/` |
| 12 | Sitting Too Long Harms Your Body | 35.5s | `exports/Episode-12-*/` |
| 13 | Is Breakfast Really the Most Important Meal? | 35.5s | `exports/Episode-13-*/` |
| 14 | Do You Really Need 8 Glasses of Water a Day? | 36.5s | `exports/Episode-14-*/` |
| 15 | Does Eating Late at Night Cause Weight Gain? | 35.5s | `exports/Episode-15-*/` |
| 16 | Are Saunas Actually Good for You? | 35.5s | `exports/Episode-16-*/` |
| 17 | What's the Best Food to Eat Before a Workout? | 35.5s | `exports/Episode-17-*/` |
| 18 | Does More Sweat Mean More Fat Burned? | 35.5s | `exports/Episode-18-*/` |
| 19 | Can You Lose Fat Without Doing Cardio? | 35.5s | `exports/Episode-19-*/` |
| 20 | How Much Protein Do You Really Need? | 35.5s | `exports/Episode-20-*/` |

## What's in the repo
- **React + Vite video renderer** at `artifacts/biominute-reels/`.
- **Scene components** at `src/components/video/video_scenes/Scene0.tsx` – `Scene4.tsx`.
- **Type-safe config** at `src/lib/video/config.ts` with per-episode durations and 1080×1920 constants.
- **Export pipeline** at `scripts/src/export-video.ts` using Playwright + ffmpeg with background music.
- **Production log** at `exports/production-log.md` tracking episode status.
- **Episode notes** inside each `exports/Episode-XX-*/episode-notes.md`.
- **Neo-Brutalist dashboard** at `exports/dashboard.html` with 9:16 video previews and working copy buttons.
- **Push script** at `scripts/push-to-github.sh` with `GITHUB_TOKEN` support.

## Pipeline
- **Typecheck:** `pnpm --filter @workspace/biominute-reels run typecheck`
- **Dev server:** `pnpm --filter @workspace/biominute-reels run dev`
- **Export:** `BIOMINUTE_EXPORT_URL=<url> BIOMINUTE_EXPORT_DIR=<dir> pnpm --filter @workspace/scripts export-video`
- **Push:** `bash scripts/push-to-github.sh "<message>"`

## Repository
https://github.com/0utLawzz/Health-Channel-Creator
