#!/usr/bin/env bash
# Publica o dist/ no branch gh-pages (GitHub Pages em "Deploy from a branch: gh-pages / root").
# Uso: npm run build && bash tools/publish-pages.sh
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
url=$(git -C "$root" remote get-url origin)
rev=$(git -C "$root" rev-parse --short HEAD)
tmp=$(mktemp -d)
cp -r "$root/dist/." "$tmp/"
rm -f "$tmp"/*.map
touch "$tmp/.nojekyll"
cd "$tmp"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$root" log -1 --format=%an)" -c user.email="$(git -C "$root" log -1 --format=%ae)" commit -qm "Site publicado (dist da main $rev)"
git push -qf "$url" gh-pages
cd "$root"; rm -rf "$tmp"
echo "gh-pages atualizado com o dist de $rev"
