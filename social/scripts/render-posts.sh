#!/bin/sh
# Renderiza los carruseles (1080×1350, una PNG por diapositiva).
# Uso: sh scripts/render-posts.sh [ids...]   (por defecto: intro y los partidos del Root)
set -e
cd "$(dirname "$0")/.."
B=$(ls -d ~/Library/Caches/ms-playwright/chromium_headless_shell-*/*/ | tail -1)chrome-headless-shell
IDS=${*:-"intro pp psoe vox sumar podemos"}
for id in $IDS; do
  n=$(npx tsx -e "import { partySlides } from './src/Carousel'; import { INTRO } from './src/intro-script'; console.log('$id' === 'intro' ? INTRO.length : partySlides('$id').count)")
  mkdir -p "out/final/post-$id"
  i=0
  while [ $i -lt "$n" ]; do
    npx remotion still src/index.ts "post-$id" "out/final/post-$id/$(printf %02d $((i + 1))).png" --frame=$((i * 1000)) --browser-executable="$B" --log=error >/dev/null
    i=$((i + 1))
  done
  echo "✓ out/final/post-$id ($n diapositivas)"
done
