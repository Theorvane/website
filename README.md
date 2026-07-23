# Theorvane website

A Next.js monorepo containing independently deployable public websites for **Theorvane**, **TypeMCP**, and **OpenVideo**.

## Apps

- `apps/theorvane` — the Theorvane brand homepage at `https://theorvane.tech`
- `apps/type-mcp` — the TypeMCP product site and technical documentation at `https://typemcp.theorvane.tech`
- `apps/openvideo` — the OpenVideo local-first hybrid AI video-editor product site at `https://openvideo.theorvane.tech`; current AI capabilities remain explicitly availability-scoped in the approved product direction

## TypeMCP documentation

The TypeMCP documentation portal is published at `https://typemcp.theorvane.tech/docs`. It renders the approved documents from `Theorvane/type-mcp/docs/` at a pinned source commit rather than maintaining a second authored documentation set. Run the following command to refresh the generated local cache after intentionally advancing the source commit in `apps/type-mcp/lib/docs/manifest.ts`:

```bash
npm run sync:docs --workspace=@theorvane/type-mcp-site
```

The portal distinguishes the installed `type-mcp@0.1.0` package—decorator declarations and immutable metadata reads—from repository-development documentation. Updating the pinned commit requires review of the manifest, generated documentation, and the published-package boundary.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

See [`docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md`](docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md), [`docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md`](docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md), and [`docs/superpowers/specs/2026-07-23-openvideo-product-site-design.md`](docs/superpowers/specs/2026-07-23-openvideo-product-site-design.md) for the approved scope.
