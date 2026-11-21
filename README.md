# sensei.group

[![Open in Hanzo](https://hanzo.app/badges/open-in-hanzo.svg)](https://hanzo.app/dev/open?repo=github.com/hanzoai/sensei.group&ref=main&action=open) [![Edit with Hanzo](https://hanzo.app/badges/edit-with-hanzo.svg)](https://hanzo.app/dev/open?repo=github.com/hanzoai/sensei.group&ref=main&action=edit) [![Deploy with Hanzo](https://hanzo.app/badges/deploy-with-hanzo.svg)](https://hanzo.app/dev/open?repo=github.com/hanzoai/sensei.group&ref=main&action=deploy)

The Sensei Group site: a fractional talent network, one page.

```bash
pnpm install
pnpm dev        # Vite dev server on :8080
pnpm build      # static export to dist/
pnpm preview
```

`.hanzo/workflows/deploy.yml` publishes `dist` to the Sites plane as project
`sensei-group` on every push to main, and the edge serves that prefix at
sensei.group. No image, no pods.

`LLM.md` has the rest: how the styling works, what ships, and what is
deliberately left alone.
