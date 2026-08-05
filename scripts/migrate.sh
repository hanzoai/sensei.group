#!/usr/bin/env bash
# The Tailwind → design-system migration, end to end and repeatable.
#
# It runs against the ORIGINAL sources in git, so the codemod can be corrected
# and re-run without compounding earlier passes. The hand-authored layer (the
# stylesheets, the app root, the scripts) is never restored — those files are
# the destination, not the input.
set -euo pipefail
cd "$(dirname "$0")/.."

# Files the migration does not own. The stylesheets and the app root are the
# destination rather than the input; the three components are hand-authored
# fixes to things the codemod cannot express — a class name half-built at
# runtime (`text-${color}-400`), an accent override on a library component, and
# a `<style>` block that has moved into site.css.
HAND=(
  src/styles/system.css src/styles/site.css src/styles/index.css
  src/main.tsx
  src/components/commerce/UseCases.tsx
  src/components/commerce/APIEndpoints.tsx
  src/components/visual/chrome-text.tsx
  src/pages/SolutionIndustries.tsx
)

# 1. the codemod's inputs, back to their pre-migration state
git diff --name-only HEAD -- src \
  | grep -vxF -f <(printf '%s\n' "${HAND[@]}") \
  | xargs -r git checkout HEAD -- || true

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
