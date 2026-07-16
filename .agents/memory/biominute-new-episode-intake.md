---
name: BioMinute new-episode intake flow
description: New Episode form structure, file upload parsing, and how it creates building/script_ready episodes without AI generation.
---

## Intake design
- `/new` is a single form, not a choice gate.
- Two ways to fill it:
  1. **Type directly** — primary fields: Topic/Hook Title, YouTube Title, VO Script (textarea), Visual Direction (textarea), Citation, CTA/Comment Prompt, Hashtags, Season (S1–S6 dropdown), Duration target (30s/45s/60s/90s), plus Episode Number, Post Date, Background Sound, Thumbnail Prompt, Aspect Ratio.
  2. **Upload a file** — drop zone accepts `.md`, `.txt`, `.json`. If the file matches the episode structure, the same fields auto-fill so the user can review/edit before submitting.
- No AI generation step. The form submits directly to `POST /api/episodes`.

## File upload parsing behavior
- `.json` — parsed as JSON object.
- `.md` / `.txt` — first tries to extract a JSON code block or leading JSON object; if none, parses markdown headers into fields (see `parseMarkdownFields` in `NewEpisode.tsx`).
- Recognized upload keys: `epNumber`, `postDate`, `season`, `duration`, `hookTitle`, `youtubeTitle`, `voScript`, `visualDirection`, `bgSound`, `thumbnailPrompt`, `citationCta`, `ctaComment`, `hashtags`, `aspectRatio`.
- `citationCta` and `ctaComment` are concatenated with a space on save, so the backend single `citationCta` column stores both.

## Submission result
- `POST /api/episodes` creates the row with:
  - `status = 'building'`
  - `buildStage = 'script_ready'`
- This is the entry point for the four-stage build pipeline: `script_ready → rendering → exported → preview_ready`.

## AI generation is removed
- `POST /episodes/generate-script` is removed from the API.
- `GenerateScriptBody` / `GenerateScriptResult` / `useGenerateScript` are removed from generated API libraries.
