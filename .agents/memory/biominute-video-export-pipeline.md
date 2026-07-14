---
name: BioMinute Reels video export pipeline
description: How episode video export works in the biominute-reels artifact — sandbox deps, URL, and the single-live-episode build constraint.
---

Playwright/Chromium headless launch in this Nix sandbox needs `libgbm` as a system dependency (in addition to xvfb/glib/nss/nspr/dbus/atk/cups/cairo/pango/mesa/alsa/gtk3/libdrm/xorg libs). Missing it surfaces as `libgbm.so.1: cannot open shared object file`.

**Why:** the export script (`scripts/src/export-video.ts`) launches a real Chromium via Playwright to record the running dev server, so all headless-browser system libs must be present, not just Node deps.

**How to apply:** if Playwright launch fails in this project (or similar video/screenshot pipelines) with a missing `.so`, install the missing system library via package management rather than reinstalling Playwright or switching tools.

The export script reads the target URL from `BIOMINUTE_EXPORT_URL` (defaults to `http://localhost:5173/`), but the artifact's actual dev server binds to the Replit-assigned `PORT` (check the running workflow log for the real port, e.g. `http://localhost:<PORT>/biominute-reels/`). Always pass `BIOMINUTE_EXPORT_URL` explicitly to match the live workflow's port + artifact base path, or the export silently fails with `ERR_CONNECTION_REFUSED` — and don't reuse a stale output file from a previous run if that happens.

Episodes are built by overwriting `Scene0.tsx`–`Scene4.tsx` + `config.ts` `SCENE_DURATIONS` + `public/images/episode-thumbnail.png` in place — there is no per-episode source directory. Only one episode can be "live" in the artifact at a time, so episodes must be built and exported strictly sequentially (write scenes → typecheck → export → copy mp4 into `exports/Episode-NN-slug/` → move to next episode), never in parallel.
