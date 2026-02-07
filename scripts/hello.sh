#!/bin/bash
set -euo pipefail

# Compact repo orientation for agents
# Usage: bash scripts/hello.sh

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== xrisk-minigames ==="
echo "Root: $REPO_ROOT"
echo ""

# Git info
echo "Branch: $(git -C "$REPO_ROOT" branch --show-current 2>/dev/null || echo 'unknown')"
echo ""

# List projects
echo "Projects:"
for dir in "$REPO_ROOT"/projects/*/; do
  name=$(basename "$dir")
  [ "$name" = "_template" ] && continue
  if [ -f "$dir/package.json" ]; then
    echo "  $name/"
  fi
done

# Check if any projects exist (besides template)
project_count=$(find "$REPO_ROOT/projects" -mindepth 1 -maxdepth 1 -type d ! -name "_template" 2>/dev/null | wc -l)
if [ "$project_count" -eq 0 ]; then
  echo "  (none yet)"
fi
echo ""

# Compact file tree (depth 2)
echo "File tree:"
if command -v tree &>/dev/null; then
  tree -L 2 --dirsfirst -I 'node_modules|dist|.git' "$REPO_ROOT" 2>/dev/null | head -40
else
  find "$REPO_ROOT" -maxdepth 2 \
    -not -path '*/node_modules/*' \
    -not -path '*/.git/*' \
    -not -path '*/dist/*' \
    -not -name 'node_modules' \
    -not -name '.git' \
    -not -name 'dist' \
    | sort \
    | sed "s|$REPO_ROOT|.|" \
    | head -40
fi
