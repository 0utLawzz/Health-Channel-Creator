/**
 * Regression tests for the YouTube upload pipeline.
 *
 * Focus: pure-logic functions that have caused real bugs, plus TEST_MODE safety.
 * Run with: pnpm --filter @workspace/api-server test
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  buildYouTubeDescription,
  assertNotAlreadyPublished,
  uploadEpisodeVideo,
  addVideoToPlaylist,
} from "./youtube-upload.js";

// ---------------------------------------------------------------------------
// buildYouTubeDescription
// ---------------------------------------------------------------------------
describe("buildYouTubeDescription", () => {
  const base = {
    voScript: "Sleep is vital for recovery. Aim for eight hours every night.",
    citationCta: "Walker MA et al. (2017). Sleep and brain health. Nature.",
    hashtags: "#sleep #health #biominute",
    season: "S3",
  };

  it("never contains a raw CITATION: label in the output", () => {
    const result = buildYouTubeDescription({
      ...base,
      citationCta: "CITATION: Walker MA et al. (2017). Sleep and brain health.",
    });
    expect(result).not.toMatch(/CITATION:/i);
  });

  it("never contains a raw CTA: label in the output", () => {
    const result = buildYouTubeDescription({
      ...base,
      citationCta: "CTA: Some study. doi:10.1234/test",
    });
    expect(result).not.toMatch(/\bCTA:/i);
  });

  it("strips both CITATION: and CTA: when both appear in the same block", () => {
    const result = buildYouTubeDescription({
      ...base,
      citationCta:
        "CITATION: Walker MA et al. (2017). Sleep study.\nCTA: Subscribe now!",
    });
    expect(result).not.toMatch(/CITATION:/i);
    expect(result).not.toMatch(/\bCTA:/i);
  });

  it('prefixes the citation with "Backed by:"', () => {
    const result = buildYouTubeDescription(base);
    expect(result).toContain("Backed by:");
  });

  it("includes the Subscribe CTA line", () => {
    const result = buildYouTubeDescription(base);
    expect(result).toContain("Subscribe to BioMinute");
  });

  it("includes the Playlist line with the season name", () => {
    const result = buildYouTubeDescription(base);
    expect(result).toContain("📌 Playlist:");
    expect(result).toContain("S3");
  });

  it("handles a completely empty voScript without throwing", () => {
    expect(() =>
      buildYouTubeDescription({ ...base, voScript: "" }),
    ).not.toThrow();
  });

  it("handles a completely empty citationCta without throwing", () => {
    expect(() =>
      buildYouTubeDescription({ ...base, citationCta: "" }),
    ).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// assertNotAlreadyPublished — duplicate-upload guard
// ---------------------------------------------------------------------------
describe("assertNotAlreadyPublished", () => {
  it("throws if youtubeVideoId is a non-empty string", () => {
    expect(() =>
      assertNotAlreadyPublished({
        id: 1,
        epNumber: 4,
        youtubeVideoId: "dQw4w9WgXcQ",
      }),
    ).toThrow(/already on YouTube/);
  });

  it("includes the video ID in the error message", () => {
    expect(() =>
      assertNotAlreadyPublished({
        id: 1,
        epNumber: 4,
        youtubeVideoId: "dQw4w9WgXcQ",
      }),
    ).toThrow("dQw4w9WgXcQ");
  });

  it("does not throw when youtubeVideoId is null", () => {
    expect(() =>
      assertNotAlreadyPublished({ id: 1, epNumber: 4, youtubeVideoId: null }),
    ).not.toThrow();
  });

  it("does not throw when youtubeVideoId is undefined", () => {
    expect(() =>
      assertNotAlreadyPublished({ id: 1, epNumber: 4 }),
    ).not.toThrow();
  });

  it("does not throw when youtubeVideoId is an empty string", () => {
    // Empty string is falsy — treat as not yet uploaded
    expect(() =>
      assertNotAlreadyPublished({ id: 1, epNumber: 4, youtubeVideoId: "" }),
    ).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// TEST_MODE — uploadEpisodeVideo must never call the real YouTube API
// ---------------------------------------------------------------------------
describe("uploadEpisodeVideo — TEST_MODE", () => {
  beforeEach(() => {
    process.env.TEST_MODE = "true";
  });
  afterEach(() => {
    delete process.env.TEST_MODE;
  });

  it("returns a fake video ID starting with TEST_", async () => {
    const result = await uploadEpisodeVideo({
      videoPath: "/nonexistent/episode.mp4",
      title: "TEST: Sleep Facts",
      description: "A test description",
      tags: ["test", "sleep"],
      privacyStatus: "public",
    });
    expect(result.youtubeVideoId).toMatch(/^TEST_/);
  });

  it("returns a valid-looking youtubeUrl", async () => {
    const result = await uploadEpisodeVideo({
      videoPath: "/nonexistent/episode.mp4",
      title: "TEST: Exercise",
      description: "Another test",
      privacyStatus: "public",
    });
    expect(result.youtubeUrl).toMatch(/^https:\/\/youtu\.be\/TEST_/);
  });

  it("does not throw even though the video file does not exist", async () => {
    await expect(
      uploadEpisodeVideo({
        videoPath: "/nonexistent/path/episode.mp4",
        title: "TEST: Missing File",
        description: "File does not exist",
        privacyStatus: "public",
      }),
    ).resolves.toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// TEST_MODE — addVideoToPlaylist must never call the real YouTube API
// ---------------------------------------------------------------------------
describe("addVideoToPlaylist — TEST_MODE", () => {
  beforeEach(() => {
    process.env.TEST_MODE = "true";
  });
  afterEach(() => {
    delete process.env.TEST_MODE;
  });

  it("returns null without calling the API", async () => {
    const result = await addVideoToPlaylist({
      youtubeVideoId: "TEST_fake123",
      season: "S1",
    });
    expect(result).toBeNull();
  });
});
