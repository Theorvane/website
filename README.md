# Theorvane website

A Next.js monorepo containing independently deployable public websites for **Theorvane**, **TypeMCP**, **TypeChain**, and **OpenScene**.

## Apps

- `apps/theorvane` — the Theorvane brand homepage at `https://theorvane.tech`
- `apps/type-mcp` — the TypeMCP product site and technical documentation at `https://typemcp.theorvane.tech`
- `apps/type-chain` — the TypeChain product site and technical documentation at `https://typechain.theorvane.tech`
- `apps/openscene` — the OpenScene local-first hybrid AI video-editor product site at `https://openscene.app`; current AI capabilities remain explicitly availability-scoped in the approved product direction

## OpenScene documentation

The OpenScene usage documentation is published at `https://openscene.app/docs` in English and `https://openscene.app/docs/ko` in Korean. Unlike the TypeMCP portal it is authored in this repository as typed content blocks under `apps/openscene/lib/docs/`, because it documents how to use the desktop application rather than mirroring approved documents from a source repository.

- `content.en.ts` and `content.ko.ts` hold one entry per page; both must cover every slug in the outline or `validateContent()` fails the build.
- `manifest.ts` owns the outline, reading order, and locale-aware paths. English is served unprefixed; other locales sit under their own segment.
- Screenshots live in `apps/openscene/public/docs/` and are declared with fixed dimensions in `lib/docs/types.ts` so the browser reserves layout before they load.
- Every page publishes a canonical URL, `hreflang` alternates for both locales, and `TechArticle` plus `BreadcrumbList` JSON-LD. The sitemap lists each localized route with its alternates.

Claims in this documentation must match OpenScene's actual build. Pre-release limits — no packaged installer, no auto-update, Sora reference images unsupported — are stated rather than omitted.

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

See [`docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md`](docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md), [`docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md`](docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md), and [`docs/superpowers/specs/2026-07-23-openscene-product-site-design.md`](docs/superpowers/specs/2026-07-23-openscene-product-site-design.md) for the approved scope.
