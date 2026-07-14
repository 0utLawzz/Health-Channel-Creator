import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

/**
 * Locates the exported MP4 for a given episode number.
 * Export folders follow `exports/Episode-{NN}-{slug}/episode.mp4`, but the
 * exact slug casing/wording varies per episode, so we glob for the numbered
 * folder instead of reconstructing the slug from the title.
 */
export function findEpisodeVideoPath(epNumber: number): string {
  // artifacts/api-server/src/lib -> workspace root is 4 levels up
  const workspaceRoot = path.resolve(import.meta.dirname, "../../../../");
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

export interface UploadEpisodeVideoParams {
  videoPath: string;
  title: string;
  description: string;
  tags?: string[];
  privacyStatus: "public" | "unlisted" | "private";
  publishAt?: string | null; // ISO datetime; requires privacyStatus "private"
}

export interface UploadEpisodeVideoResult {
  youtubeVideoId: string;
  youtubeUrl: string;
}

/**
 * Uploads an episode's MP4 to YouTube via the Data API v3 resumable upload
 * endpoint (videos.insert with a readable stream body).
 */
export async function uploadEpisodeVideo(
  params: UploadEpisodeVideoParams,
): Promise<UploadEpisodeVideoResult> {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "YouTube credentials are not configured (YOUTUBE_CLIENT_ID / YOUTUBE_CLIENT_SECRET / YOUTUBE_REFRESH_TOKEN).",
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  // Scheduling a future publish requires the video to be uploaded as
  // "private" with a publishAt timestamp; YouTube flips it to public/unlisted
  // automatically at that time.
  const usesSchedule = !!params.publishAt;
  const status = usesSchedule
    ? {
        privacyStatus: "private" as const,
        publishAt: new Date(params.publishAt as string).toISOString(),
        selfDeclaredMadeForKids: false,
      }
    : {
        privacyStatus: params.privacyStatus,
        selfDeclaredMadeForKids: false,
      };

  const response = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: params.title,
        description: params.description,
        tags: params.tags,
      },
      status,
    },
    media: {
      body: fs.createReadStream(params.videoPath),
    },
  });

  const youtubeVideoId = response.data.id;
  if (!youtubeVideoId) {
    throw new Error("YouTube upload succeeded but returned no video id.");
  }

  return {
    youtubeVideoId,
    youtubeUrl: `https://youtu.be/${youtubeVideoId}`,
  };
}
