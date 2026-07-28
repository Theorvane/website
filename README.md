# Theorvane website

A Next.js monorepo containing independently deployable public websites for **Theorvane**, **TypeMCP**, **TypeChain**, and **OpenVideo**.

## Apps

- `apps/theorvane` — the Theorvane brand homepage at `https://theorvane.tech`
- `apps/type-mcp` — the TypeMCP product site and technical documentation at `https://typemcp.theorvane.tech`
- `apps/type-chain` — the TypeChain product site and technical documentation at `https://typechain.theorvane.tech`
- `apps/openvideo` — the OpenVideo local-first hybrid AI video-editor product site at `https://openvideo.theorvane.tech`; current AI capabilities remain explicitly availability-scoped in the approved product direction

## TypeMCP documentation

The TypeMCP documentation portal is published at `https://typemcp.theorvane.tech/docs`. It renders the approved documents from `Theorvane/type-mcp/docs/` at a pinned source commit rather than maintaining a second authored documentation set. Run the following command to refresh the generated local cache after intentionally advancing the source commit in `apps/type-mcp/lib/docs/manifest.ts`:

```bash
npm run sync:docs --workspace=@theorvane/type-mcp-site
```

The portal distinguishes the installed `type-mcp@0.1.0` package—decorator declarations and immutable metadata reads—from repository-development documentation. Updating the pinned commit requires review of the manifest, generated documentation, and the published-package boundary.

## TypeChain documentation

The TypeChain portal is published at `https://typechain.theorvane.tech/docs`. It renders a manifest-approved subset of `Theorvane/type-chain/docs/` from a full immutable source commit and verifies cache integrity before rendering. After intentionally advancing the canonical TypeChain `main` source commit in `apps/type-chain/lib/docs/manifest.ts`, refresh the local cache with:

```bash
npm run sync:docs --workspace=@theorvane/type-chain-site
```

The portal describes the published `@theorvane/type-chain@0.1.1` boundary: Stage 3 decorator declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Applications retain ownership of models, credentials, policy enforcement, state, hosting, and deployment.

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
