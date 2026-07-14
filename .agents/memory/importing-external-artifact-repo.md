---
name: Importing an external artifacts-monorepo repo
description: How to bring a cloned Replit artifacts-monorepo project (e.g. a video-js/web artifact) into the current workspace without breaking scaffold conventions.
---

When importing an already-authored artifact from another Replit artifacts-monorepo clone:

- Clone the source repo to a scratch path outside the workspace (e.g. `/tmp/repo-check`) to inspect before merging. Delete it once done.
- Register the artifact with `createArtifact` first (correct slug/previewPath/type) instead of hand-copying `.replit-artifact/artifact.toml` — the artifact tooling owns that file.
- Do NOT overwrite the freshly-scaffolded `package.json`, `vite.config.ts`, `tsconfig.json`, `.replit-artifact/` with the cloned repo's versions wholesale — the scaffold's versions are tuned for the current template generation (e.g. stricter PORT/BASE_PATH env checks, pinned dep versions). Only copy `src/`, `public/`, and other real content over them.
- **Exception to check every time:** compare `tsconfig.json` `compilerOptions.lib` between the scaffold and the cloned repo before dropping in real source — a missing `"dom"` lib entry silently breaks typecheck on any file touching `window`/`document`/`HTMLAudioElement` once real source lands.
- Root-level `package.json`/`pnpm-workspace.yaml` differences between clone and workspace are usually just incremental (extra scripts/devDeps for the repo's own tooling, e.g. export/dashboard scripts) — diff and merge additively rather than replacing.
- New deps pulled in by imported tooling (e.g. `exceljs`) can drag in vulnerable transitive versions (e.g. old `uuid`) — add a pnpm override in `pnpm-workspace.yaml` proactively.
- rsync is not available in this environment; use `cp -r` per top-level item instead.
