// BioMinute Reels: hard-coded 9:16 vertical format.
// 1080×1920 is the only supported export resolution. All scenes, components,
// and export tooling must use these constants.

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_ASPECT_RATIO = VIDEO_WIDTH / VIDEO_HEIGHT; // 9:16 ≈ 0.5625

export const SAFE_ZONE_PADDING = 0.08; // 8% minimum margin on all sides
export const SAFE_ZONE_PX = VIDEO_WIDTH * SAFE_ZONE_PADDING; // 86.4px

// Canvas style used by the root wrapper: the video is always rendered at
// exactly 1080×1920 CSS pixels and then scaled to fit the browser viewport.
export const CANVAS_STYLE = {
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
} as const;

// Scene durations for the current episode. The video player uses these to
// advance scenes automatically. Keep the total loop duration in sync with
// the exported MP4 length so the record/export control captures the full video.
export const SCENE_DURATIONS = {
  0: 2500, // "Sleep isn't downtime."
  1: 6500, // "It's when your brain consolidates memory, your body repairs tissue, and hormones that regulate hunger and stress reset."
  2: 6500, // "Consistently sleeping under 7 hours is linked with reduced focus, slower reaction time, and greater long-term health risk."
  3: 4000, // "You also can't fully make up lost sleep over a weekend."
  4: 6500, // "Prioritizing a consistent 7 to 9 hour window may do more for your energy than any productivity hack."
  5: 5000, // Outro CTA and citations
  6: 4000, // ThumbnailSlide end card
} as const;
