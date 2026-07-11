---
name: React Fast Refresh and shared constants
description: Avoid re-exporting shared constants from React component files in Vite React apps; it breaks Fast Refresh and produces confusing HMR failures.
---

Re-exporting a shared constant (e.g., `SCENE_DURATIONS`) from a React component file and then importing it from that component file elsewhere will trigger a React Fast Refresh error:

> Could not Fast Refresh ("SCENE_DURATIONS" export is incompatible)

The symptom is that Vite says the page failed to reload, but TypeScript compiles and the production build works fine. The fix is to keep shared constants in a `lib/` package (e.g., `lib/video/config.ts`) and import them from there, not from the component file.

**Why:** React Fast Refresh treats components specially and expects a component file to export only React components. Re-exporting non-component values from a component file confuses the Fast Refresh boundary.

**How to apply:** For any shared constant used by both a React component and other logic, place it in the shared package (e.g., `src/lib/video/config.ts`) and import from that package in both places.
