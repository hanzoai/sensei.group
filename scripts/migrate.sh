#!/usr/bin/env bash
# The Tailwind → design-system migration, end to end and repeatable.
#
# It runs against the ORIGINAL sources — the tree as it stood at $BASE, before
# any of this landed — so the codemod can be corrected and re-run without
# compounding earlier passes. Every rule in detailwind.mjs was corrected at
# least once against a screenshot, and each correction meant replaying the whole
# translation from scratch rather than translating already-translated markup.
#
# $BASE is a commit, not HEAD, precisely because the output is now committed:
# restoring from HEAD would restore the migrated files and the codemod would
# find nothing to do.
set -euo pipefail
cd "$(dirname "$0")/.."

# The last commit before the codemod ran: "drop the inline accent palette".
BASE=${BASE:-901d10b}

# Files the migration does not own. The stylesheets and the app root are the
# destination rather than the input; the four components carry hand-authored
# fixes the codemod cannot express — a class name half-built at runtime
# (`text-${color}-400`), an accent override on a library component, a `<style>`
# block that has moved into site.css, and a page that read `{name, href}`
# records as if they were strings.
HAND=(
  src/styles/system.css src/styles/site.css src/styles/index.css
  src/main.tsx
  src/components/commerce/UseCases.tsx
  src/components/commerce/APIEndpoints.tsx
  src/components/visual/chrome-text.tsx
  src/pages/SolutionIndustries.tsx
)

# 1. the codemod's inputs, back to their pre-migration state. Files deleted
#    since $BASE stay deleted: `git checkout` is given only paths that still
#    exist in the working tree.
git diff --name-only "$BASE" -- src \
  | grep -vxF -f <(printf '%s\n' "${HAND[@]}") \
  | while read -r f; do [ -e "$f" ] && printf '%s\n' "$f"; done \
  | xargs -r git checkout "$BASE" -- || true

# 2. translate every Tailwind class into the design-system vocabulary
node scripts/detailwind.mjs

# 3. the class names that live in strings the className walk cannot see
node scripts/sweep-residual.mjs

# 4. the stylesheet layers the design system replaces. base/typography/themes/
#    utilities were the hand-rolled Tailwind substitute; index.css now imports
#    @hanzo/design + system.css + site.css and nothing else.
rm -f src/styles/{base,themes,typography,utilities}.css src/App.css
git rm -q --cached --ignore-unmatch src/styles/{base,themes,typography,utilities}.css src/App.css 2>/dev/null || true

echo "migration complete"
