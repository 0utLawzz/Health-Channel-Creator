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
  0: 4500, // "The 10,000 step goal started as a 1965 marketing campaign..."
  1: 4500, // "...for a Japanese pedometer, not a medical guideline."
  2: 7000, // "Research suggests health benefits begin well below 10,000 steps for many adults, with gains starting around 6,000 to 7,500 steps before leveling off."
  3: 5000, // "If you're only getting 3,000 steps a day, don't chase perfection."
  4: 6500, // "Gradually adding a few hundred more steps each week matters more than hitting an arbitrary number."
  5: 5000, // Outro CTA and citations
  6: 4000, // ThumbnailSlide end card
} as const;
