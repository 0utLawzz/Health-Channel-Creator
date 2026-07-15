There's a recurring bug: without explicit instructions the render defaults to 16:9, and
even when told to switch to 9:16, elements keep their original positions/sizes, causing
text to get cut off or mis-scaled. Fix the root cause, not just the export step.

1. Hard-code the canvas/viewport size as a single constant used everywhere in the project
   (e.g. VIDEO_WIDTH = 1080, VIDEO_HEIGHT = 1920). Do not let any component, scene, or
   render config default to 1920x1080 anywhere. Search the whole codebase for any hardcoded
   16:9 dimensions (1920x1080, 1280x720, aspect-ratio: 16/9, etc.) and remove them.

2. Audit every Scene component (Scene1–6.tsx, VideoTemplate.tsx) for absolute pixel
   positioning that assumes a wide landscape canvas (e.g. text positioned at x:800 assuming
   a 1920px-wide frame). Convert these to:
   - Relative units (%, vw/vh) or flexbox/grid centering instead of fixed x/y pixel coordinates
   - A safe-zone margin of at least 8% padding on all sides so text never touches the edge
   - Font sizes set relative to canvas width (e.g. clamp() or vw-based sizing), not fixed px,
     so text automatically scales correctly for a 1080px-wide portrait frame instead of a
     1920px-wide landscape one

3. After making this fix, render one full test scene at 1080x1920 and visually confirm no
   text is clipped, cut off, or overflowing before touching any real episode content.

4. Add an automated check to the export step: after rendering, run the output through
   ffprobe (or equivalent) to confirm the file is exactly 1080x1920 before marking it
   complete. If it isn't, stop and flag it — don't let a wrong-ratio file silently pass QA.

5. Once fixed, treat 1080x1920 as the only supported format going forward. Do not accept
   any instruction (from me or otherwise) that would render in 16:9 without also confirming
   this rule is intentional and temporary.

Confirm the fix by describing what caused the original bug and what you changed.