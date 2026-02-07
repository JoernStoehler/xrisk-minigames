#!/bin/bash
set -euo pipefail

# SessionStart hook — runs on fresh session start only (matcher: "startup")
# Input arrives as JSON on stdin; we don't need to parse it.

echo "=== X-Risk Minigames — Session Start ==="
echo ""

# Show project listing
echo "Projects:"
has_projects=false
if [ -d "$CLAUDE_PROJECT_DIR/projects" ]; then
  for dir in "$CLAUDE_PROJECT_DIR"/projects/*/; do
    name=$(basename "$dir")
    [ "$name" = "_template" ] && continue
    has_projects=true
    if [ -f "$dir/CLAUDE.md" ]; then
      desc=$(head -5 "$dir/CLAUDE.md" | grep -m1 "^[^#]" | head -c 80 || echo "(no description)")
      echo "  - $name: $desc"
    else
      echo "  - $name"
    fi
  done
fi
if [ "$has_projects" = false ]; then
  echo "  (none yet — copy projects/_template/ to start)"
fi
echo ""

# Show git branch
echo "Branch: $(git -C "$CLAUDE_PROJECT_DIR" branch --show-current 2>/dev/null || echo 'unknown')"
echo ""

# CC Web: install gh CLI if not present
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  if ! command -v gh &> /dev/null; then
    echo "Installing gh CLI for CC Web..." >&2
    GH_VERSION="2.63.2"
    curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" \
      | tar xz -C /tmp
    sudo cp "/tmp/gh_${GH_VERSION}_linux_amd64/bin/gh" /usr/local/bin/gh
    rm -rf "/tmp/gh_${GH_VERSION}_linux_amd64"
    echo "gh CLI installed." >&2
  fi
fi
