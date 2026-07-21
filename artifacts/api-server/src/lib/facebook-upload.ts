import fs from "node:fs";
import path from "node:path";
import { logger } from "./logger";

// ---------------------------------------------------------------------------
// Facebook Page video upload helper
// ---------------------------------------------------------------------------

export interface EpisodeGuard {
  id: number;
  epNumber: number;
  facebookVideoId?: string | null;
  status?: string | null;
}

export interface BuildFacebookDescriptionParams {
  voScript: string;
  citationCta: string;
  hashtags: string;
}

export interface UploadEpisodeToFacebookParams {
  videoPath: string;
  title: string;
  description: string;
  scheduleAt?: string | null;
  published?: boolean;
}

export interface UploadEpisodeToFacebookResult {
  facebookVideoId: string;
  facebookUrl: string;
}

/**
 * Builds a Facebook description in the BioMinute format:
 *   {hook}
 *
 *   Backed by: {citation}
 *
 *   {hashtags}
 */
export function buildFacebookDescription(params: BuildFacebookDescriptionParams): string {
  const { voScript, citationCta, hashtags } = params;

  const sentences = (voScript ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  let hook = sentences.slice(0, 2).join(" ").trim();
  if (hook.length > 240) {
    hook = hook.slice(0, 240).replace(/\s+\S*$/, "").trim() + ".";
  }

  const cleanedBlock = (citationCta ?? "")
    .replace(/^CITATION:\s*/i, "")
    .replace(/\bCTA:\s*/gi, "")
    .replace(/HASHTAGS:.*$/s, "")
    .replace(/\r?\n+/g, "\n")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  const citationLine = cleanedBlock
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .find((l) => /^[A-Z][a-z]+\s+\w+.*\(\d{4\)|^doi:|^pmid:|^https?:\/\//i.test(l));

  const citation = citationLine ?? cleanedBlock;

  const parts = [
    hook,
    "",
    citation ? `Backed by: ${citation}` : "",
    "",
    (hashtags ?? "").trim(),
  ];

  return parts
    .filter((p) => p !== "")
    .join("\n")
    .trim();
}

/** Throws if the episode already has a Facebook video ID. */
export function assertNotAlreadyOnFacebook(episode: EpisodeGuard): void {
  if (episode.facebookVideoId) {
    throw new Error(
      `Episode ${episode.epNumber} is already on Facebook (${episode.facebookVideoId}). ` +
        `Delete the existing video first if you want to re-upload.`,
    );
  }
}

/** Locates the exported MP4 for a given episode number. */
export function findEpisodeVideoPath(epNumber: number): string {
  const workspaceRoot = path.resolve(process.cwd(), "../..");
  const exportsDir = path.join(workspaceRoot, "exports");
  const padded = String(epNumber).padStart(2, "0");

  const entries = fs.existsSync(exportsDir) ? fs.readdirSync(exportsDir) : [];
  const match = entries.find((name) => name.startsWith(`Episode-${padded}-`));

  if (!match) {
    throw new Error(
      `No export folder found for episode ${epNumber} (expected exports/Episode-${padded}-*)`,
    );
  }

  const videoPath = path.join(exportsDir, match, "episode.mp4");
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Export folder found but episode.mp4 is missing: ${videoPath}`);
  }

  return videoPath;
}

/** Returns the Facebook Graph API base URL. */
function graphApiBase(): string {
  return `https://graph.facebook.com/${process.env.FACEBOOK_API_VERSION ?? "v18.0"}`;
}

/** Returns a configured access token or throws. */
function getCredentials(): { pageAccessToken: string; pageId: string } {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    throw new Error(
      "Facebook credentials are not configured " +
        "(FACEBOOK_PAGE_ACCESS_TOKEN / FACEBOOK_PAGE_ID).",
    );
  }

  return { pageAccessToken, pageId };
}

/**
 * Uploads an episode's MP4 to a Facebook page via the Graph API.
 *
 * - If scheduleAt is provided, the video is uploaded as unpublished and
 *   scheduled for that time using scheduled_publish_time.
 * - If published=false and no scheduleAt, the video is saved as a draft.
 */
export async function uploadEpisodeToFacebook(
  params: UploadEpisodeToFacebookParams,
): Promise<UploadEpisodeToFacebookResult> {
  if (process.env.TEST_MODE === "true") {
    const fakeId = `FBTEST_${Date.now()}`;
    logger.info({ title: params.title }, `TEST_MODE: would upload to Facebook: ${params.title}`);
    return { facebookVideoId: fakeId, facebookUrl: `https://facebook.com/${fakeId}` };
  }

  const { pageAccessToken, pageId } = getCredentials();

  const url = new URL(`${graphApiBase()}/${pageId}/videos`);
  const form = new FormData();

  form.append("access_token", pageAccessToken);
  form.append("file", new Blob([fs.readFileSync(params.videoPath)]), "episode.mp4");
  form.append("title", params.title);
  form.append("description", params.description);
  form.append("published", params.published !== false ? "true" : "false");

  if (params.scheduleAt) {
    const scheduleTime = Math.floor(new Date(params.scheduleAt).getTime() / 1000);
    form.append("scheduled_publish_time", String(scheduleTime));
    form.append("published", "false");
  }

  logger.info(
    { title: params.title, pageId, scheduleAt: params.scheduleAt ?? null },
    "Uploading episode to Facebook",
  );

  const response = await fetch(url.toString(), {
    method: "POST",
    body: form,
  });

  const result = (await response.json()) as Record<string, unknown>;

  if (!response.ok || result.error) {
    const errorMessage =
      (result.error as Record<string, string>)?.message ??
      `Facebook upload failed (status ${response.status})`;
    throw new Error(errorMessage);
  }

  const facebookVideoId = result.id as string;
  if (!facebookVideoId) {
    throw new Error("Facebook upload succeeded but returned no video id.");
  }

  return {
    facebookVideoId,
    facebookUrl: `https://facebook.com/${pageId}/videos/${facebookVideoId}`,
  };
}

/** Checks whether the Facebook page credentials are valid. */
export async function checkFacebookConnection(): Promise<{ connected: boolean; pageId: string | null }> {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID ?? null;

  if (!pageAccessToken || !pageId) {
    return { connected: false, pageId };
  }

  try {
    const url = new URL(`${graphApiBase()}/${pageId}`);
    url.searchParams.set("access_token", pageAccessToken);
    url.searchParams.set("fields", "id");

    const response = await fetch(url.toString(), { method: "GET" });
    const result = (await response.json()) as Record<string, unknown>;

    return { connected: response.ok && !result.error, pageId };
  } catch (err) {
    logger.warn({ err }, "Facebook connection check failed");
    return { connected: false, pageId };
  }
}
