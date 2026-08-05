# sensei.group

Marketing site for Sensei Group, a fractional talent network (sensei.group). Connects companies with elite professionals across engineering, design, product, marketing, AI/ML, and architecture.

## Stack

- React 18 + TypeScript (Vite 5, SWC)
- React Router v6 (client-side routing)
- Tailwind CSS v4 + Radix UI primitives
- Framer Motion (animations), Three.js (3D)
- DOMPurify (HTML sanitization -- unique to this project)

## Structure

```
src/
  App.tsx              # Root router -- SenseiLanding as homepage
  pages/
    SenseiLanding.tsx  # Homepage (/) -- talent network landing
    ...                # Shared pages (same as other Hanzo sites)
  components/          # Shared component library
```

## Key Routes

- `/` -- SenseiLanding (fractional talent marketplace)
- All other routes -- Shared product/marketing/account pages from common codebase

## How it ships
`.hanzo/workflows/deploy.yml` on the git.hanzo.ai forge (`hanzo-build-linux-amd64`):
build `dist` -> `POST /v1/projects/sensei-group/deploy` (202, queued) -> `aws s3 sync`
to the bucket+prefix cloud names in that 202 -> `POST .../complete {"status":"live"}`.
The bytes never pass through the API; BodyLimit is 16 MiB. No GitHub Pages, no
Cloudflare Pages, and no image -- a static export has no compute to run.

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
- Brand: amber/orange gradient theme

## Notes

- Shares the same component library and routes as hanzo.app, hanzo.id, hanzo.network, and hanzo.one. Only `SenseiLanding.tsx` and `index.html` metadata are unique.
- Package name is `@sensei/site` (not `@hanzo/`). Only project with `dompurify` dependency.
- Standard static SPA deployment (no edge middleware).
