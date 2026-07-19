/**
 * youtube-reauth.ts — Re-authorize YouTube with full `youtube` management scope.
 *
 * WHY: The existing refresh token only has `youtube.upload` scope. Adding a
 * video to a playlist requires the broader `youtube` scope. This script
 * generates a new token that covers both.
 *
 * USAGE (two steps):
 *
 *   Step 1 — Get the consent URL:
 *     npx tsx scripts/src/youtube-reauth.ts
 *     → Opens (prints) the URL. Open it in your browser, click "Allow".
 *       Google will show you a code — copy it.
 *
 *   Step 2 — Exchange the code for a refresh token:
 *     npx tsx scripts/src/youtube-reauth.ts <paste-code-here>
 *     → Prints your new YOUTUBE_REFRESH_TOKEN value.
 *       Paste that into Replit Secrets → YOUTUBE_REFRESH_TOKEN.
 */

import { google } from "googleapis";
import readline from "node:readline";

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\n❌  YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET must be set in Replit Secrets.\n",
  );
  process.exit(1);
}

// Out-of-band redirect — no web server needed; Google shows the code on screen.
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

const SCOPES = [
  "https://www.googleapis.com/auth/youtube",         // playlist management, video updates
  "https://www.googleapis.com/auth/youtube.upload",  // video upload (keep existing)
];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// ─── Step 2: exchange code ────────────────────────────────────────────────────
const authCode = process.argv[2];

if (authCode) {
  console.log("\n🔄  Exchanging authorization code for tokens…\n");
  try {
    const { tokens } = await oauth2Client.getToken(authCode.trim());

    if (!tokens.refresh_token) {
      console.error(
        "❌  No refresh_token in response.\n" +
          "    This usually means the account has already granted consent to this\n" +
          "    app — Google only issues refresh_tokens on the first consent.\n\n" +
          "    Fix: go to https://myaccount.google.com/permissions, revoke access\n" +
          "    for your app, then run Step 1 again.\n",
      );
      process.exit(1);
    }

    console.log("✅  SUCCESS! Your new refresh token:\n");
    console.log("    " + tokens.refresh_token + "\n");
    console.log("Next steps:");
    console.log("  1. Open Replit Secrets (lock icon in the sidebar).");
    console.log("  2. Find YOUTUBE_REFRESH_TOKEN and replace its value with the token above.");
    console.log("  3. Restart the API Server workflow so it picks up the new token.");
    console.log("  4. The next publish will automatically add the video to its season playlist.\n");
  } catch (err) {
    console.error("❌  Token exchange failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }

// ─── Step 1: print consent URL ───────────────────────────────────────────────
} else {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // force Google to issue a new refresh_token even if previously authorized
  });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  YouTube Re-Authorization — Full Scope");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("STEP 1 of 2 — Open this URL in your browser and click \"Allow\":\n");
  console.log(url);
  console.log("\n────────────────────────────────────────────────────────────");
  console.log("STEP 2 of 2 — Paste the code Google shows you:\n");
  console.log(
    "  npx tsx scripts/src/youtube-reauth.ts  <YOUR_CODE_HERE>\n",
  );
  console.log("  (Run that command in the Replit Shell tab)\n");
}
