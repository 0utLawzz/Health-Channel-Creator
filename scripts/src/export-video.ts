import { spawn, execSync } from 'child_process';
import { chromium } from 'playwright-chromium';
import fs from 'fs/promises';
import path from 'path';

const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const VIDEO_DURATION_MS = 40500; // scene durations sum: 4500+9000+8000+5500+7500+6000
const BROWSER_URL = process.env.BIOMINUTE_EXPORT_URL || 'http://localhost:25078/biominute-reels/';
const OUT_DIR = process.env.BIOMINUTE_EXPORT_DIR || '/tmp/biominute-export';

async function startXvfb(): Promise<{ display: string; stop: () => void }> {
  const display = ':99';
  const proc = spawn('Xvfb', [display, '-screen', '0', `${VIDEO_WIDTH}x${VIDEO_HEIGHT}x24`, '-ac', '+extension', 'GLX', '+render', '-noreset']);
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Xvfb failed to start')), 10000);
    proc.on('error', reject);
    proc.on('spawn', () => {
      clearTimeout(timeout);
      // Give Xvfb a moment to be ready
      setTimeout(resolve, 500);
    });
  });
  return {
    display,
    stop: () => {
      proc.kill('SIGTERM');
    },
  };
}

async function blobToBase64(page: any): Promise<string> {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      const url = (window as any).__biominuteExportUrl__;
      if (!url) return reject(new Error('No export URL'));
      fetch(url)
        .then(r => r.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  });
}

async function main() {
  const xvfb = await startXvfb();
  let browser;
  try {
    await fs.mkdir(OUT_DIR, { recursive: true });
    browser = await chromium.launch({
      headless: false,
      env: { ...process.env, DISPLAY: xvfb.display },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--auto-select-desktop-capture-source=.*',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
      ],
    });
    const context = await browser.newContext({
      viewport: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT },
    });
    const page = await context.newPage();
    await page.goto(BROWSER_URL, { waitUntil: 'networkidle' });

    // Simulate user gesture to unlock audio and start display capture
    await page.click('body');
    await page.evaluate(() => {
      (window as any).__biominuteAudioCapture__ = true;
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.click('body');

    await page.evaluate(async () => {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: 1080, height: 1920, frameRate: 60 },
        audio: true,
      });
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9,opus' });
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        (window as any).__biominuteExportUrl__ = URL.createObjectURL(blob);
      };
      (window as any).__biominuteRecorder__ = recorder;
      recorder.start(1000);
    });

    // Wait for the first full video loop
    await page.waitForTimeout(VIDEO_DURATION_MS + 1000);

    const base64 = await page.evaluate(() => {
      return new Promise<string>((resolve, reject) => {
        const recorder = (window as any).__biominuteRecorder__ as MediaRecorder;
        recorder.onstop = async () => {
          const url = (window as any).__biominuteExportUrl__ as string;
          if (!url) return reject(new Error('No export URL'));
          const res = await fetch(url);
          const blob = await res.blob();
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        };
        recorder.stop();
      });
    });

    const webmPath = path.join(OUT_DIR, 'episode.webm');
    const mp4Path = process.argv[2] || path.join(OUT_DIR, 'episode.mp4');
    const base64Data = base64.split(',')[1];
    await fs.writeFile(webmPath, Buffer.from(base64Data, 'base64'));

    // Convert to MP4 with faststart and yuv420p for compatibility
    execSync(
      `ffmpeg -y -i "${webmPath}" -vf "scale=${VIDEO_WIDTH}:${VIDEO_HEIGHT}:force_original_aspect_ratio=decrease,pad=${VIDEO_WIDTH}:${VIDEO_HEIGHT}:(ow-iw)/2:(oh-ih)/2,format=yuv420p" -c:v libx264 -preset fast -crf 23 -movflags +faststart -c:a aac -b:a 128k "${mp4Path}"`,
      { stdio: 'inherit' }
    );

    console.log('Exported MP4:', mp4Path);
  } finally {
    if (browser) await browser.close();
    xvfb.stop();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
