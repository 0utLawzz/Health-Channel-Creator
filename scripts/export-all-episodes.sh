#!/usr/bin/env bash
set -euo pipefail

# Full sequential export for Episodes 25–30
# Usage: bash scripts/export-all-episodes.sh
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

EXPORT_URL="http://localhost:5173/"
VITE_PORT=5173
SCENES_DIR="artifacts/biominute-reels/src/components/video/video_scenes"
CONFIG_FILE="artifacts/biominute-reels/src/lib/video/config.ts"

# ─── Episode definitions ───────────────────────────────────────────────
# Format: "ep_num|scene_prefix|export_dir|config_comment_scene0"
EPISODES=(
  "25|ep25|exports/Episode-25-can-you-turn-fat-into|Hook: \"Can You Turn Fat Into Muscle?\""
  "26|ep26|exports/Episode-26-should-you-work-out-every|Hook: \"Should You Work Out Every Day?\""
  "27|ep27|exports/Episode-27-why-does-your-weight-change|Hook: \"Why Does Your Weight Change Overnight?\""
  "28|ep28|exports/Episode-28-can-your-metabolism-be-broken|Hook: \"Can Your Metabolism Be 'Broken'?\""
  "29|ep29|exports/Episode-29-are-eggs-actually-bad-for|Hook: \"Are Eggs Actually Bad for Your Heart?\""
  "30|ep30|exports/Episode-30-do-detox-drinks-really-clean|Hook: \"Do Detox Drinks Really Clean Your Body?\""
)

# ─── Start Vite dev server ─────────────────────────────────────────────
echo "▶ Starting Vite dev server on port $VITE_PORT..."
PORT=$VITE_PORT pnpm --filter @workspace/biominute-reels run dev &
VITE_PID=$!
trap "echo '⏹ Stopping Vite...'; kill $VITE_PID 2>/dev/null || true" EXIT

# Wait for server to be ready (up to 60s)
echo "⏳ Waiting for server to be ready..."
for i in $(seq 1 60); do
  if curl -sf "$EXPORT_URL" -o /dev/null 2>/dev/null; then
    echo "✅ Server ready after ${i}s"
    break
  fi
  if [ "$i" -eq 60 ]; then
    echo "❌ Server failed to start after 60s"; exit 1
  fi
  sleep 1
done

# Extra buffer for React hydration
sleep 3

# ─── Export each episode ───────────────────────────────────────────────
for ep_def in "${EPISODES[@]}"; do
  IFS='|' read -r ep_num prefix out_dir comment <<< "$ep_def"

  echo ""
  echo "══════════════════════════════════════════"
  echo "  EP${ep_num}: Swapping scenes & exporting"
  echo "══════════════════════════════════════════"

  # Swap scenes
  for i in 0 1 2 3 4; do
    cp "$SCENES_DIR/${prefix}_Scene${i}.tsx" "$SCENES_DIR/Scene${i}.tsx"
  done

  # Update config.ts scene 0 comment only (durations are the same for all)
  # The file already has the right durations; just update the comment line
  # Use a temp sed to update line with "Hook:" comment
  sed -i "s|0: 4500, // Hook:.*|0: 4500, // ${comment}|" "$CONFIG_FILE"

  echo "   Scenes swapped. Exporting MP4..."

  # Ensure output dir exists
  mkdir -p "$out_dir"
  MP4_PATH="$ROOT/$out_dir/episode.mp4"
  TMP_DIR="/tmp/biominute-ep${ep_num}"
  mkdir -p "$TMP_DIR"

  BIOMINUTE_EXPORT_URL="$EXPORT_URL" \
  BIOMINUTE_EXPORT_DIR="$TMP_DIR" \
    pnpm --filter @workspace/scripts exec tsx src/export-video.ts "$MP4_PATH"

  echo "   ✅ EP${ep_num} exported → $out_dir/episode.mp4"

  # Give Vite a moment to pick up file changes before next episode
  sleep 3
done

echo ""
echo "══════════════════════════════════════════"
echo "  All 6 episodes exported. Pushing to GitHub..."
echo "══════════════════════════════════════════"

# Update production log statuses for all 6 episodes are already "Built — awaiting export"
# (they're already set in the log) — just commit everything

git add -A
git commit -m "ep25-30: export 6 episodes (Can Fat Into Muscle → Detox Drinks)" || true
git push origin "$(git branch --show-current)"

echo ""
echo "🎉 Done! Episodes 25–30 exported and pushed to GitHub."
