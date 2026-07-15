# BioMinute Shorts Studio — Bug & Suggestion Form

Use this file to report bugs, code-smell issues, and improvement ideas without fixing them in code. Keep the list factual and cite file paths / line numbers where possible.

---

## How to file a bug or suggestion

Copy the template below and add it to the appropriate section.

```markdown
### <Short title>

- **Type:** Bug / Suggestion / Code smell
- **File(s):** `path/to/file.ts` (line ~NN)
- **Description:** What is wrong or what could be better?
- **Impact:** What breaks or slows down because of it?
- **Proposed fix (optional):** High-level idea, do not implement unless asked.
```

---

## Current known issues and suggestions

### Audio desync risk in export pipeline

- **Type:** Suggestion
- **File(s):** `scripts/src/export-video.ts` (~line 87–95)
- **Description:** Background music is mixed via ffmpeg using `-shortest` and `-stream_loop -1`. If the Playwright recording duration drifts from the scene manifest, the audio loop can fall out of sync with the visuals.
- **Impact:** Exported MP4s may have mismatched audio/video timing.
- **Proposed fix:** Derive the audio mix length from the scene manifest or the actual recorded duration rather than relying on `-shortest`.

### Hardcoded export fallback duration

- **Type:** Code smell
- **File(s):** `scripts/src/export-video.ts` (~line 31)
- **Description:** `FALLBACK_DURATION_MS = 43500` is hardcoded.
- **Impact:** The fallback does not adapt to episodes with different total durations.
- **Proposed fix:** Read the total duration from `config.ts` or the database.

### Duplicate audio handling across scene components

- **Type:** Code smell
- **File(s):** `artifacts/biominute-reels/src/components/video/video_scenes/*.tsx` (many files)
- **Description:** Each scene component manages its own `audioRef` and `play()` logic instead of delegating to the `AudioEngine`.
- **Impact:** Race conditions, duplicate SFX triggers, and inconsistent mute behavior during rapid scene scrubbing.
- **Proposed fix:** Centralize SFX triggers in a hook or event bus inside `AudioEngine`.

### Missing guard for critical environment variables

- **Type:** Code smell
- **File(s):** `artifacts/api-server/src/index.ts` and related DB init code
- **Description:** The server throws on missing `PORT`, but other critical variables such as `DATABASE_URL` rely on implicit failures deeper in the stack.
- **Impact:** Misleading error messages when a secret is missing.
- **Proposed fix:** Add explicit, early validation for `DATABASE_URL`, `SESSION_SECRET`, and YouTube secrets before starting the server.

### Scene component duplication

- **Type:** Suggestion
- **File(s):** `artifacts/biominute-reels/src/components/video/video_scenes/`
- **Description:** Many `epNN_SceneX.tsx` files repeat the same animation patterns and audio boilerplate.
- **Impact:** Hard to maintain; changing a common animation requires editing many files.
- **Proposed fix:** Introduce a higher-order component or a JSON-driven scene generator for common patterns.

### Master sheet / sheet-name mismatch

- **Type:** Bug / Documentation
- **File(s):** `scripts/src/seed-episodes.ts`, `scripts/src/read-master-sheet.ts`, `exports/production-log.md`
- **Description:** Older references call the sheet `Content_Master`, but the current master XLSX uses `Episode Master Plan`. Code has been updated to the new sheet name, but older docs, memory, and third-party tooling may still reference the old name.
- **Impact:** Outdated references can cause confusion or silent failures if a tool reads the wrong sheet.
- **Proposed fix:** Audit all references and align them to `Episode Master Plan`.

### Export pipeline dependency on system libraries

- **Type:** Suggestion
- **File(s):** `scripts/src/export-video.ts`, `replit.nix`
- **Description:** The export pipeline depends on system-level `ffmpeg`, `xvfb`, and several headless-browser libraries. Environment differences can break exports.
- **Impact:** Export may fail on new machines or after system updates.
- **Proposed fix:** Document dependencies more thoroughly or containerize the export pipeline.

### Redundant audio asset files

- **Type:** Code smell
- **File(s):** `artifacts/biominute-reels/public/audio/`
- **Description:** `pop.mp3` and `swoosh.mp3` may be redundant given the `sfx-` prefixed versions used in the code.
- **Impact:** Unused assets increase bundle size and confusion.
- **Proposed fix:** Remove unused assets after confirming they are not referenced.

### Boilerplate `hello.ts` script

- **Type:** Code smell
- **File(s):** `scripts/src/hello.ts`
- **Description:** A leftover boilerplate/test file with no production purpose.
- **Impact:** Adds noise to the scripts package.
- **Proposed fix:** Remove or convert into a real health-check script.

---

## Submitting changes

1. Add a new entry to this file using the template above.
2. Do **not** fix the issue unless explicitly asked — keep this file as a single source of truth for pending work.
3. If you open a Pull Request, reference the relevant entry here.
