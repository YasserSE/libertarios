#!/bin/sh
# Renderiza los Reels y normaliza el audio a -14 LUFS (Instagram).
# Uso: sh scripts/render-all.sh [ids...]   (por defecto: intro y los partidos del Root)
set -e
cd "$(dirname "$0")/.."
B=$(ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-*/*/ | tail -1)chrome-headless-shell
IDS=${*:-"intro pp psoe vox sumar podemos"}
mkdir -p out/final
for id in $IDS; do
  npx remotion render src/index.ts "reel-$id" "out/reel-$id.mp4" --browser-executable="$B" --log=error
  ffmpeg -v error -y -i "out/reel-$id.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k -ar 48000 "out/final/libertarios-reel-$id.mp4"
  echo "✓ out/final/libertarios-reel-$id.mp4"
done
