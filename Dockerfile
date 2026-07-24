# sensei.group — Vite/React SPA (react-router, multi-route) served by the house
# static server hanzoai/static (Go, scratch base), NOT nginx. The Dockerfile IS
# the CI gate: `pnpm build` fails the image on any type error or build break.
#
# Build → dist/, copied into /public; `-spa` makes hanzoai/static serve
# index.html (200) for client routes (/pricing, /login, /team, …). The static
# server's default CSP blocks all JS, so the runtime CSP is set on the operator
# App CR (HANZO_STATIC_CSP), not here.
#
# Built by the shared hanzoai/ci reusable workflow (arc pool
# hanzo-apps-build-linux-amd64) → ghcr.io/hanzoai/sensei-group:sha-<short>-amd64.
# Never built on a laptop.

# ---- build stage: Vite static build (-> /src/dist) -----------------------
# glibc (bookworm-slim, matches hanzoai/world) so the native toolchain
# (@tailwindcss/oxide, lightningcss, @swc/core) links without musl surprises.
FROM node:20-bookworm-slim AS build
RUN npm install -g pnpm@10
WORKDIR /src
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- serve stage: the house static server (Go binary on scratch) ---------
FROM ghcr.io/hanzoai/static:0.4.1
COPY --from=build /src/dist /public
EXPOSE 3000
ENTRYPOINT ["/static", "-port", "3000", "-root", "/public", "-spa"]
