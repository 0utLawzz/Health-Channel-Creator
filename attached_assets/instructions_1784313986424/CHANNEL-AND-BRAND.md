# BioMinute — Channel & Brand Reference

Single-page reference for brand identity + channel/account details. Full visual system
(logo prompts, banner prompts, thumbnail system, SEO templates) lives in
`BioMinute-Brand-Guide.md` — this file adds the channel/account layer on top of it and
should be updated here first if anything changes, then propagated to `replit.md` and
platform bios.

## Identity

| Field | Value |
|---|---|
| Display name | BioMinute |
| Tagline | Your daily dose of health science, in under a minute |
| YouTube handle | @BioMinutesh |
| Instagram handle | @BioMinutesh |
| Facebook Page handle | @BioMinutesh |
| Format | 1080×1920 (9:16) YouTube Shorts / Reels |
| Episode length | 30–40 seconds |
| GitHub repo | github.com/0utLawzz/biominute-shorts-studio |
| Repo license | MIT (`LICENSE`) |

## Channel account details

Real IDs and tokens live only in Replit Secrets, never in this repo or this file:

| Secret name | Purpose |
|---|---|
| `YOUTUBE_CHANNEL_ID` | The channel's YouTube ID |
| `YOUTUBE_CHANNEL_NAME` | Display name used by the publish scripts |
| `YOUTUBE_CLIENT_ID` / `YOUTUBE_CLIENT_SECRET` / `YOUTUBE_REFRESH_TOKEN` | YouTube Data API OAuth for automated publishing |
| `YOUTUBE_PLAYLIST_S1` – `YOUTUBE_PLAYLIST_S6` | One playlist ID per season |
| `GITHUB_TOKEN` | Used to push exports back to this repo |
| `SESSION_SECRET` | Express session signing for the publishing dashboard |

If you need to look up or rotate any of these, do it in Replit → Secrets, and update this
table's *field names* only if a secret is renamed — never paste the actual values here or
in any commit.

## Color palette (locked)

| Role | Hex |
|---|---|
| Primary Blue | `#2F6FED` |
| Emerald Green | `#10B981` |
| Warm Orange (highlights only) | `#F97316` |
| White | `#FFFFFF` |
| Dark Slate (background) | `#0F172A` |

Never use red anywhere in the brand system.

## Typography & motion

- **Headlines:** Outfit
- **Body:** Plus Jakarta Sans
- **Motion:** smooth camera movement, soft zoom, parallax depth, floating elements — nothing static
- Full spring/timing constants are documented in `exports/production-log.md` under
  "Style & timing decisions log" — reuse those values for every new episode.

## Playlists / seasons

- S1: Morning Habits
- S2: Movement & Body
- S3: Sleep & Recovery
- S4: Stress & Mind
- S5: Nutrition & Myths
- S6: Healthy Aging & Longevity
- Fan Favorites (auto-curated by views once 15+ episodes are live)

## Default hashtags (every upload)

```
#BioMinute #HealthShorts #HealthTips #EvidenceBased #DailyHabits
```

## Where the rest lives

- Full logo/banner/thumbnail production prompts → `BioMinute-Brand-Guide.md`
- Episode scripts, visuals, citations → `BioMinute-Master-Workbook.xlsx` (Production tab)
- Post-ready titles/descriptions/hashtags/CTAs/thumbnail prompts → same workbook (Social tab)
- Posting calendar → same workbook (Schedule tab)
