# Theorvane and TypeMCP websites — design specification

**Status:** Implemented and merged in PR #2; release-boundary wording corrected in Issue #3
**Date:** 2026-07-22

## Goal

Build one public Next.js monorepo that delivers two independently deployable, responsive marketing sites:

- **Theorvane**: the parent brand’s editorial, high-trust company homepage.
- **TypeMCP**: the open-source project’s developer-first product site. Its public copy must distinguish the published npm package from unreleased repository-source work.

The first release is deliberately static. It does not include a CMS, user accounts, a blog engine, release feed, search service, or documentation migration.

## Architecture

The repository uses npm workspaces and Turborepo. npm is selected because it is available in the development environment and is pinned through the root `packageManager` field; CI installs the lockfile with `npm ci`.

```text
apps/
  theorvane/                 # Next.js App Router: the brand homepage
  type-mcp/                  # Next.js App Router: the open-source homepage
packages/
  ui/                        # accessible, unbranded React primitives
  design-tokens/             # CSS custom-property foundations and shared type scale
```

Each app owns its visual identity, page composition, copy, metadata, and public assets. Shared packages expose only neutral primitives and tokens; the TypeMCP product identity and Theorvane brand identity must not become mutually coupled.

## Site 1 — Theorvane

### Intent

A concise home for a technical studio that signals focus, craft, and open-source credibility. It must direct visitors to active projects without pretending to be a large enterprise.

### Page sections

1. **Navigation** — wordmark, Projects anchor, Principles anchor, and a GitHub external link.
2. **Hero** — short statement: building precise developer tools for the AI-native web; one primary project CTA and an outward GitHub CTA.
3. **Signal strip** — three proof points: TypeScript-first, protocol-aware, open-source.
4. **Featured project** — a TypeMCP card linking to the project repository. Public wording for the published package is limited to metadata declarations and immutable reads.
5. **Principles** — framework neutrality, explicit contracts, small verifiable releases.
6. **Closing CTA/footer** — GitHub organization and contact placeholder. The contact address is intentionally not invented.

### Visual direction

Dark, editorial, technical. Near-black canvas; high-contrast ivory text; a restrained warm lime highlight; oversized typography; subtle grid/noise treatment implemented in CSS rather than image assets. Animations respect `prefers-reduced-motion`.

## Site 2 — TypeMCP

### Published npm 0.1.0 boundary

The published package, `type-mcp@0.1.0`, supports **decorator declarations and immutable metadata reads only**. It **does not validate, compile, invoke, or transport** MCP operations. `createMcpServer()` and the `type-mcp/http` / `createMcpHandler()` entry points are reserved and throw in the published release.

Repository-source development can contain additional work, but it is not released npm API until published. The website must never present unreleased functionality as available from `type-mcp@0.1.0`.

### Intent

Explain the published capability honestly to TypeScript and agent-platform developers, then direct them to inspect the source, read the release-boundary documentation, or inspect the npm package.

### Page sections

1. **Navigation** — logo/wordmark, Overview, Architecture, published-release boundary, GitHub CTA.
2. **Hero** — decorator-first MCP declarations for strict TypeScript with a readable source-code panel and metadata-only wording.
3. **Capability cards** — decorators/metadata, immutable metadata inspection, and explicit release boundary.
4. **Architecture** — semantic HTML/CSS explanation of declaration input and metadata output; no runtime flow is claimed for npm `0.1.0`.
5. **Published release boundary** — state that `0.1.0` does not validate, compile, invoke, or transport MCP operations and that reserved server/HTTP entry points throw.
6. **Get started** — source and npm CTAs with release-boundary wording.
7. **Footer** — GitHub repository, npm, and Theorvane cross-link.

### Visual direction

Bright, developer-tool interface: warm off-white canvas, graphite type, cobalt blue focus/accent, mint status highlight, monospace code panels. Do not mimic the TypeMCP repository README image or claim unreleased APIs are published.

## Shared interaction and accessibility requirements

- Semantic landmarks: one `header`, `nav`, `main`, and `footer` per page.
- Visible keyboard focus and skip-to-content link.
- All target sizes at least 44px for interactive links/buttons.
- External links are marked with accessible labels; no blank/placeholder `href` values.
- Responsive behavior is verified at approximately 375px, 768px, and 1440px widths.
- Motion is limited to opacity/transform and disabled or reduced under `prefers-reduced-motion`.
- Every page supplies unique title and description.

## Quality gates

- TypeScript strict mode.
- ESLint checks.
- Unit tests for high-value static content contracts: headings, CTA destinations, metadata, and release-boundary copy.
- Production builds for both apps via Turborepo.
- Accessibility smoke checks based on rendered semantic landmarks and link labels.
- A documentation contract test prevents the known published-vs-unreleased TypeMCP claims from returning.

## Non-goals

- CMS, blog, documentation search, contact form delivery, analytics, authentication, database, or paid marketing integrations.
- Re-implementing the TypeMCP repository documentation site in this first release.
- Shared brand CSS that forces either site to use the other’s colors or layout.
- Domain wiring or hosting configuration until final domain ownership and deployment preferences are provided.
