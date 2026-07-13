// BioMinute Reels: hard-coded 9:16 vertical format.
// 1080×1920 is the only supported export resolution. All scenes, components,
// and export tooling must use these constants.

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_ASPECT_RATIO = VIDEO_WIDTH / VIDEO_HEIGHT; // 9:16 ≈ 0.5625

export const SAFE_ZONE_PADDING = 0.08; // 8% minimum margin on all sides
export const SAFE_ZONE_PX = VIDEO_WIDTH * SAFE_ZONE_PADDING; // 86.4px
export const BOTTOM_SAFE_ZONE_RATIO = 0.30; // 30% bottom reserved for YouTube UI
export const BOTTOM_SAFE_ZONE_PX = VIDEO_HEIGHT * BOTTOM_SAFE_ZONE_RATIO; // 576px

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
  0: 4500, // Hook: "Drink Water Before Your Morning Coffee"
  1: 7000, // "You wake up already dehydrated — ~1L lost overnight via breathing & sweating"
  2: 6000, // "Replace overnight losses — support hydration & alertness"
  3: 5000, // "Balance the effect — water first, coffee mild diuretic"
  4: 6500, // "One small swap for an extra edge" + citation
  5: 6000, // Outro CTA: "Do you reach for water or coffee first thing?"
} as const;
