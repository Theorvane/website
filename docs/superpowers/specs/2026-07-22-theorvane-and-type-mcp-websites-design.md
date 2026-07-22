# Theorvane and TypeMCP websites — design specification

**Status:** Approved direction; implementation plan pending final review
**Date:** 2026-07-22

## Goal

Build one public Next.js monorepo that delivers two independently deployable, responsive marketing sites:

- **Theorvane**: the parent brand’s editorial, high-trust company homepage.
- **TypeMCP**: the open-source project’s developer-first product site, positioned around decorators, framework-neutral MCP runtime composition, and the current LangChain/LangGraph integration boundary.

The first release is deliberately static. It does not include a CMS, user accounts, a blog engine, release feed, search service, or documentation migration.

## Architecture

The repository uses npm workspaces and Turborepo. npm is selected because it is available in the development environment and is pinned through the root `packageManager` field; Corepack activates the pinned package manager version in CI and developer machines.

```text
apps/
  theorvane/                 # Next.js App Router: the brand homepage
  type-mcp/                  # Next.js App Router: the open-source homepage
packages/
  ui/                        # accessible, unbranded React primitives
  design-tokens/             # CSS custom-property foundations and shared type scale
  config/                    # shared TypeScript configs
```

Each app owns its visual identity, page composition, copy, metadata, and public assets. Shared packages expose only neutral primitives and tokens; the TypeMCP product identity and Theorvane brand identity must not become mutually coupled.

## Site 1 — Theorvane

### Intent

A concise home for a technical studio that signals focus, craft, and open-source credibility. It must direct visitors to active projects without pretending to be a large enterprise.

### Page sections

1. **Navigation** — wordmark, Projects anchor, Principles anchor, and a GitHub external link.
2. **Hero** — short statement: building precise developer tools for the AI-native web; one primary project CTA and an outward GitHub CTA.
3. **Signal strip** — three proof points: TypeScript-first, protocol-aware, open-source.
4. **Featured project** — TypeMCP card linking to the TypeMCP deployment/site URL placeholder and GitHub repository.
5. **Principles** — framework neutrality, explicit contracts, small verifiable releases.
6. **Closing CTA/footer** — GitHub organization and contact placeholder. The contact address is intentionally not invented.

### Visual direction

Dark, editorial, technical. Near-black canvas; high-contrast ivory text; a restrained warm lime highlight; oversized typography; subtle grid/noise treatment implemented in CSS rather than image assets. Animations respect `prefers-reduced-motion`.

## Site 2 — TypeMCP

### Intent

Explain the open-source project clearly to TypeScript and agent-platform developers and turn product interest into one of three actions: inspect the source, read docs, or try the package when a release is available.

### Page sections

1. **Navigation** — logo/wordmark, Overview, Architecture, Integrations, GitHub CTA.
2. **Hero** — decorator-first MCP server declarations for strict TypeScript with a readable source-code panel.
3. **Capability cards** — decorators/metadata, SDK compiler + transports, explicit resolver boundary.
4. **Architecture** — declaration-to-runtime flow diagram rendered as semantic HTML/CSS.
5. **Integration boundary** — `type-mcp/langchain` as tools-only; LangGraph `ToolNode` composition stays consumer-owned. Explicitly distinguish repository-development support from published npm `0.1.0` availability.
6. **Quick start** — code snippet with package/install boundary wording; GitHub docs CTA.
7. **Footer** — GitHub repository, npm, license, Theorvane cross-link.

### Visual direction

Bright, developer-tool interface: warm off-white canvas, graphite type, cobalt blue focus/accent, mint status highlight, monospace code panels. Do not mimic the TypeMCP repository README image or claim unreleased APIs are published.

## Shared interaction and accessibility requirements

- Semantic landmarks: one `header`, `nav`, `main`, and `footer` per page.
- Visible keyboard focus and skip-to-content link.
- All target sizes at least 44px for interactive links/buttons.
- External links are marked with accessible labels; no blank/placeholder `href` values.
- Responsive behavior is verified at approximately 375px, 768px, and 1440px widths.
- Motion is limited to opacity/transform and disabled or reduced under `prefers-reduced-motion`.
- Every page supplies unique title, description, Open Graph basics, and canonical-friendly metadata fields.

## Quality gates

- TypeScript strict mode.
- ESLint and formatting checks.
- Unit tests for high-value static content contracts (page headings, key CTA destinations, and release-boundary copy).
- Production builds for both apps via Turborepo.
- Accessibility smoke checks based on rendered semantic landmarks and link labels.

## Non-goals

- CMS, blog, documentation search, contact form delivery, analytics, authentication, database, or paid marketing integrations.
- Re-implementing the TypeMCP repository documentation site in this first release.
- Shared brand CSS that forces either site to use the other’s colors or layout.

## Deployment assumption

Each app will be independently deployable to Vercel or another Next.js-compatible platform. Domain wiring is intentionally deferred until the user provides final domain ownership and deployment preferences.
