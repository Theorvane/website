# TypeMCP documentation portal — design specification

**Issue:** [Theorvane/website#20](https://github.com/Theorvane/website/issues/20)
**Status:** Approved for planning
**Language:** English
**Supersedes:** the documentation-migration non-goal in `2026-07-22-theorvane-and-type-mcp-websites-design.md`

## Purpose

Expand `https://typemcp.theorvane.tech` from a product landing page into a public documentation portal for TypeMCP. The portal must give developers a fast route from product context to installation, configuration, API contracts, architecture, and release-boundary details.

The TypeORM documentation site is a reference for high-level information architecture: product navigation, grouped documentation, clear page hierarchy, persistent navigation, and readable code-oriented content. TypeMCP must not copy TypeORM’s artwork, components, branding, wording, or layout details.

## Product truth

The website must distinguish two facts on every relevant surface:

- The published npm package is [`type-mcp@0.1.0`](https://www.npmjs.com/package/type-mcp). It provides standard decorators and immutable metadata reads.
- Repository-development documents can describe work that is implemented in the repository, planned, deferred, or not yet published. They must not be represented as installed npm APIs.

A visible release-boundary callout appears on the docs index and on pages whose source labels a behavior as planned, deferred, repository-development-only, or otherwise not part of the published npm package.

## Information architecture

The product site remains at `/`. Documentation uses `/docs` and is organized into four public groups:

```text
/docs
├── getting-started
├── guides/
│   ├── configuration
│   ├── agent-integration
│   ├── http-and-nextjs
│   ├── agile-delivery
│   ├── npm-release
│   └── open-source-launch
├── api/
│   └── decorator-api
├── architecture/
│   ├── overview
│   ├── framework-neutral-core
│   └── fetch-streamable-http
└── product/
    ├── vision
    └── mvp-scope
```

The first route is a documentation index, not a copied Markdown page. It introduces the published package boundary, provides a recommended reading order, and links to the four groups.

The sidebar displays the same groups in this order: Start, Guides, API, Architecture, Product. It highlights the current page and remains available on desktop. On narrow viewports it becomes a keyboard-accessible disclosure control. Each article provides a local table of contents from level-two and level-three headings; the table of contents is omitted when a page has too few headings to be useful.

The top navigation connects Product, Documentation, GitHub, and npm. The TypeMCP wordmark is displayed as `TYPEMCP`. Product and documentation routes share a recognizably common header, but documentation prioritizes dense reading over the landing page’s promotional composition.

## Canonical source and synchronization

`Theorvane/type-mcp/docs/` is the canonical source for public documentation. The website does not become a second authored documentation set.

The website contains a typed, explicit public-document manifest. Each manifest entry names one approved source file, destination slug, title, group, ordering position, and release-boundary classification. Planning files, historical specifications, internal task documents, and arbitrary Markdown files are excluded by default.

A build-time synchronization step retrieves only manifest-approved files from a pinned TypeMCP source commit. It transforms Markdown into typed page data and emits static routes. The pinned commit is recorded in the generated documentation metadata and displayed as a source link on every article. Updating documentation is an intentional website pull request that advances the source commit, reviews the resulting static content, and reruns validation.

There are no browser-time GitHub requests. There is no CMS, runtime source fetch, full-text search service, version selector, or editable web content in this scope.

## Rendering model

The documentation layer is implemented within `apps/type-mcp` using App Router routes. A server-only documentation module is responsible for source acquisition, frontmatter/status extraction, Markdown parsing, heading identifier generation, internal-link resolution, and manifest validation. Route components receive typed page data and render:

- breadcrumb and group label;
- article title and source status;
- release-boundary callout when required;
- Markdown prose, links, lists, tables, block quotes, and fenced code blocks;
- stable heading anchors and local table of contents;
- source file and pinned-commit links.

Raw Markdown is never injected as untrusted HTML. The renderer must sanitize or avoid raw HTML support, preserve literal code blocks, and reject unsupported link schemes. External links open as normal external links with accessible labels. Internal links between approved source documents resolve to website documentation routes; links outside the manifest remain GitHub source links when appropriate.

## Visual system and accessibility

The current TypeMCP warm off-white, graphite, cobalt, mint, and monospace visual language remains the baseline. Documentation introduces semantic layout primitives rather than duplicating landing-page styles: documentation shell, navigation sidebar, article measure, callout, code block, table wrapper, and local table of contents.

The article column must maintain a readable maximum line length. The sidebar and local table of contents must not overlap the article at intermediate desktop widths. Tables and long code blocks must scroll horizontally within their own containers instead of widening the viewport.

The implementation provides a skip link to the article, uses semantic `nav`, `main`, `aside`, and heading structure, exposes the mobile documentation navigation with a descriptive label and expanded state, preserves visible keyboard focus, and respects reduced-motion preferences.

## Metadata and discoverability

Every documentation page supplies a title composed from its source title and TypeMCP, a short description derived from approved summary text, canonical URL, Open Graph metadata, and breadcrumbs where structured data is appropriate. The sitemap includes all generated documentation pages. The existing TypeMCP product metadata remains accurate and is updated only where the documentation portal changes the public navigation or description.

## Failure behavior

The build fails if any manifest source file cannot be retrieved at the pinned commit, if source content has no title, if two routes collide, if a generated heading identifier collides, if an internal documentation link cannot resolve, or if a page is classified inconsistently with release-boundary text.

A page is not silently omitted because an upstream source changed. The failure must name the source path and intended route so the documentation-refresh pull request can be corrected.

## Verification strategy

Implementation must use tests before production changes. The suite includes:

1. Manifest validation tests for source paths, unique routes, group ordering, and exclusion of planning/specification files.
2. Markdown transformation tests for titles, headings, code fences, tables, release-boundary callouts, safe links, and internal-link conversion.
3. Route tests for the docs index, a guide, the decorator API page, an architecture ADR page, and a product page.
4. Accessibility tests for navigation landmarks, current-page state, skip links, mobile disclosure semantics, and heading order.
5. Metadata, sitemap, and source-link tests for generated pages.
6. Full `npm test`, lint, typecheck, production build, dependency audit, and `git diff --check`.

The final release requires an independent latest-head review, successful required checks, and a production route verification after the separate `dev` → `main` promotion.

## Non-goals

This work does not add runtime GitHub fetches, documentation editing in the browser, analytics, authentication, comments, search indexing infrastructure, API version switching, a blog, or TypeORM-derived visual assets/copy. It does not widen the published `type-mcp@0.1.0` capability boundary.
