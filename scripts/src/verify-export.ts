import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VIDEO_WIDTH = 1080;
const VIDEO_HEIGHT = 1920;
const TOLERANCE = 2; // allow 2px rounding differences

function getDimensions(filePath: string) {
  try {
    const out = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`,
      { encoding: 'utf8' }
    ).trim();
    const [width, height] = out.split('x').map(Number);
    return { width, height };
  } catch (e) {
    return null;
  }
}

function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: pnpm verify-export <path-to-mp4>');
    process.exit(1);
  }

  const filePath = path.resolve(target);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
  }

  const dims = getDimensions(filePath);
  if (!dims) {
    console.error(`Could not read dimensions from ${filePath}`);
    process.exit(3);
  }

  const { width, height } = dims;
  const widthOk = Math.abs(width - VIDEO_WIDTH) <= TOLERANCE;
  const heightOk = Math.abs(height - VIDEO_HEIGHT) <= TOLERANCE;

  if (widthOk && heightOk) {
    console.log(`✅ PASS: ${width}x${height} matches ${VIDEO_WIDTH}x${VIDEO_HEIGHT}`);
    process.exit(0);
  } else {
    console.error(
      `❌ FAIL: ${width}x${height} does not match required ${VIDEO_WIDTH}x${VIDEO_HEIGHT}.\n` +
        `This export is not a 9:16 vertical BioMinute Reel. Re-export at ${VIDEO_WIDTH}x${VIDEO_HEIGHT}.`
    );
    process.exit(1);
  }
}

main();
