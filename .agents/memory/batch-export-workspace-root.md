---
name: batch-export-schedule WORKSPACE_ROOT fix
description: WORKSPACE_ROOT path resolution in batch-export-schedule.ts must use '..' not '../..' when run via pnpm exec.
---

# batch-export-schedule.ts WORKSPACE_ROOT path fix

**Rule:** Line 34 of `scripts/src/batch-export-schedule.ts` must use `path.resolve(process.cwd(), '..')`.

**Why:** `pnpm --filter @workspace/scripts exec` sets CWD to the package directory (`workspace/scripts`). Using `'../..'` resolves to `/home/runner` (one level too high). Using `'..'` correctly gives `workspace`.

**How to apply:** Any script in `scripts/src/` that needs the workspace root and runs via `pnpm --filter @workspace/scripts exec` should use `'..'` not `'../..'`.
