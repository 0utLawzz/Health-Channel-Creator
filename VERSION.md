# BioMinute Shorts Studio — Version History

Project follows [Semantic Versioning](https://semver.org/).

## v0.1.0 — 2026-07-17

Initial versioned release after production pipeline launch.

### Added
- Canonical YouTube description builder (`buildYouTubeDescription`) locked to the BioMinute template.
- Duplicate-upload guard (`assertNotAlreadyPublished`) on every publish path (dashboard, scheduler, manual trigger).
- Live dashboard (`exports/dashboard.html`) reads from the database and shows YouTube status, publish dates, and scheduled times.
- Auto-dashboard generation after every `export-video` run.
- Manual `POST /api/episodes/:epNumber/publish-now` endpoint for immediate uploads.
- Two pipeline test slots (`TEST-1`, `TEST-2`) reserved for smoke-testing before daily rollout.
- Episode range extended from 36 to 50 topics in the master workbook.

### Fixed
- Duplicate YouTube upload for Episode 3 prevented by the new guard.
- Broken description template that leaked `CITATION:` / `CTA:` labels into live descriptions.
- API server port conflicts and stale Neon connection handling.

### Changed
- Database connection now prefers `DATABASE_URL` (Neon) with PG* vars as fallback.
- All 36 episodes marked `approved` in the database so no manual approval gate blocks publishing.
- Dashboard no longer relies solely on `exports/production-log.md`; it reflects live DB state.
