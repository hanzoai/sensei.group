# sensei.group

Marketing site for Sensei Group, a fractional talent network (sensei.group). Connects companies with elite professionals across engineering, design, product, marketing, AI/ML, and architecture.

## Stack

- React 19 + TypeScript (Vite 8, SWC)
- React Router v6 (client-side routing)
- **@hanzo/design** tokens + **@hanzo/ui** on the **@hanzo/gui** backend
- Framer Motion (animations), Three.js (3D)
- DOMPurify (HTML sanitization -- unique to this project)

No Tailwind, no shadcn, no Radix: zero config, zero directives, zero utility
class names, zero `@radix-ui/*` dependencies.

### How styling works

`src/styles/index.css` imports exactly three things, in order:

1. `@hanzo/design/styles.css` — the tokens (colour, type, spacing, radius,
   elevation, motion, the z-ladder, element defaults, self-hosted Geist). The
   same file hanzo.ai, console, chat and app import. Dark is `:root`; `.light`
   is the light counterpart.
2. `src/styles/system.css` — this site's design-system class vocabulary
   (`hz-*`), written entirely in those tokens. Roles, not utilities: `hz-card`,
   `hz-btn`, `hz-container`, `hz-grid-3`, `hz-media`. Mobile-first — the base
   rule is the phone and the class itself scales up, so no call site spells out
   a breakpoint. The 44px minimum tap target is declared here, once.
3. `src/styles/site.css` — the handful of named treatments this surface owns
   (glass panels, the chrome wordmark, the mega-menu transition).

Nothing else. No per-page stylesheet, no utility framework, no inline colour.
The site is monochrome, because @hanzo/design is: one hue through an opacity
ladder. There is no accent, and this site does not invent one.

Components come from `@hanzo/ui` (233 import sites) and render inside
`<Hanzo>`, mounted in `src/main.tsx`. That root mounts the gui config, the
generated stylesheet and the theme; without it the first component to render
throws on first paint and the site serves a blank document behind a perfectly
green build.

**The theme classes live in `index.html`, not in JS.** @hanzo/design paints the
dark ground from `:root`, but @hanzo/gui's ink is a themed token whose default
is the LIGHT one — a document that waits for JS to add `t_dark` shows #050505
text on the #0a0a0a ground until the bundle lands. `<html class="t_dark dark">`
makes JS-off and JS-on measure identically.

### The migration

`scripts/migrate.sh` runs it end to end, against the ORIGINAL sources in git, so
the codemod can be corrected and re-run without compounding earlier passes:

- `scripts/detailwind.mjs` — the Tailwind → design-system translation. It works
  on whole class SETS, not token by token: `border rounded-xl p-6 bg-neutral-900`
  becomes `hz-card`; `grid grid-cols-1 md:grid-cols-3` becomes
  `hz-grid hz-grid-3`, because the responsive behaviour lives in the class.
  48,173 Tailwind occurrences over 1,676 distinct tokens collapsed to ~280 roles.
- `scripts/sweep-residual.mjs` — the class names that live in strings the
  `className=` walk cannot see (a status→colour map in a data file, a field
  named `iconTextClass`). It reuses detailwind's `translate()`; there is one
  translation in this repo, not two.

The `HAND=(…)` list in `migrate.sh` is the set of files the codemod does not
own — the stylesheets, the app root, and four components carrying fixes the
codemod cannot express (a class name half-built at runtime as
`text-${color}-400`, an accent override on a library component, a `<style>`
block that moved into site.css, and a page reading `{name, href}` records as
strings).

### The checks

- `node scripts/css-check.mjs` — every class the markup uses against every rule
  the shipped CSS defines, inline `<style>` included. 99.8% of occurrences.
- `node scripts/shots.mjs <outDir> [baseUrl]` — Playwright over all 93 routes at
  390px and 1280px: horizontal overflow, sub-44px tap targets, empty pages, page
  errors. Run it against a served `dist/` (`vite preview`, port 4173).

## Structure

```
src/
  App.tsx              # Root router -- SenseiLanding as homepage
  pages/
    SenseiLanding.tsx  # Homepage (/) -- talent network landing
    ...                # Shared pages (same as other Hanzo sites)
  components/          # Shared component library
  styles/              # index.css -> design tokens + system.css + site.css
```

## Key Routes

- `/` -- SenseiLanding (fractional talent marketplace)
- All other routes -- Shared product/marketing/account pages from common codebase

## How it ships
`.hanzo/workflows/deploy.yml` on the git.hanzo.ai forge (`hanzo-build-linux-amd64`):
build `dist` -> `POST /v1/projects/sensei-group/deploy` (202, carrying a presigned
upload grant) -> POST each file under that grant -> `POST .../complete` with the
file manifest as `keys`. The bytes never pass through the API; BodyLimit is
16 MiB. No GitHub Pages, no Cloudflare Pages, and no image -- a static export has
no compute to run.

This repo holds NO S3 credential. The grant is confined to this site's prefix and
expires in 30 minutes, so a leak here cannot reach another org's site the way the
old shared bucket keys could. Deletion rides the manifest: the grant permits
writes only, so cloud prunes the prefix against `keys`. The one secret is
`HANZO_DEPLOY_TOKEN`, set ON THE FORGE -- GitHub's secret store is not in this
path at all.

Telemetry is `@hanzo/event` (`src/analytics.tsx`, mounted inside the router in `src/App.tsx`) posting to `api.hanzo.ai/v1/event`. One
client for pageviews, events and errors: no GA, no Meta Pixel, no Plausible, no
separate error SDK.

## Commands

```bash
pnpm install
pnpm dev            # Vite dev server
pnpm build          # Production build to dist/
pnpm preview
pnpm lint
```

## SenseiLanding Focus

The homepage highlights:
- Fractional talent network (on-demand, world-class professionals)
- Categories: Engineering (500+), Design (200+), Product (150+), Marketing (180+), AI/ML (300+), Architecture (100+)
- Testimonials from startup founders/VPs
- It renders no Navbar and no Footer — a full-screen hero is the whole page.
  That is how it has always been, not something the migration removed.

## Notes

- Shares the same component library and routes as hanzo.app, hanzo.id, hanzo.network, and hanzo.one. Only `SenseiLanding.tsx` and `index.html` metadata are unique.
- Package name is `@sensei/site` (not `@hanzo/`). Only project with `dompurify` dependency.
- Standard static SPA deployment (no edge middleware).

## Known, and left alone deliberately

- **`src/pages/` has pages with no `<Route>`** — Privacy, Terms, About, Careers,
  Blog, Install, Calculator. A marketing site wants those URLs; the fix is to
  route them, not to delete them, and that is a product call.
- **`src/components/auth/Login.tsx` is a mock.** It writes a fake user to
  `localStorage` and navigates to `/account`. It is not auth and must not become
  auth: real sign-in is Hanzo IAM, and nothing here should grow a local
  password flow.
- **`tsc --noEmit` reports 31 errors**, all pre-existing: framer-motion v12
  narrowed `Transition['type'] | ['ease']` and this tree passes plain strings.
  `pnpm build` does not typecheck, which is why they survived.
- **`src/pages/Install.tsx` renders a shell script** carrying a standalone HTML
  document for hanzo.sh, which links `https://hanzo.sh/styles.css`. Its classes
  answer to another site's stylesheet, so the codemod ignores it by name
  (`IGNORE` in `detailwind.mjs`). Do not "fix" its Tailwind.
