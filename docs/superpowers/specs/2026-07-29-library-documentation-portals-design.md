# Reference-first TypeMCP and TypeChain documentation portals — design specification

**Issue:** [Theorvane/website#87](https://github.com/Theorvane/website/issues/87)
**Related canonical-source issues:** [TypeMCP#115](https://github.com/Theorvane/type-mcp/issues/115), [TypeChain#78](https://github.com/Theorvane/type-chain/issues/78)
**Status:** Approved design; implementation in progress
**Language:** English for repository artifacts and public documentation

## Purpose

Make `typemcp.theorvane.tech/docs` and `typechain.theorvane.tech/docs` feel like polished library documentation rather than a flat list of source files. A developer should be able to identify a supported capability, understand its boundary, reach a verified example, and continue to the appropriate API or integration guide without guessing.

The public documentation will use a **reference-first** approach:

1. orient the reader around supported components and package boundaries;
2. offer purpose-driven routes for common integration goals;
3. lead from each route to detailed, source-owned tutorials and API contracts;
4. retain a compact Petstore scenario as a shared, practical example rather than treating documentation as a course.

FastMCP, Prisma ORM, and NestJS are information-architecture references only: grouped navigation, clear release status, concise entry pages, discoverable concepts, and task-oriented guides. This work must not copy their text, code, logos, screenshots, assets, or component implementation.

## Product truth and source ownership

The website is a static portal, not the authoring source for library behavior.

- TypeMCP canonical documentation lives in `Theorvane/type-mcp/docs/`.
- TypeChain canonical documentation lives in `Theorvane/type-chain/docs/`.
- The website renders only an explicit, manifest-approved allowlist from each canonical repository at an immutable full commit SHA.
- A source SHA can advance only after the related source documentation has passed its own review and been promoted to that repository's canonical `main` branch.
- The portal must describe only capabilities proven by the installed public release named by the source document. Repository-development and product-target pages remain visibly distinct.

At design time, the published surfaces are:

| Product | Published package boundary | Application-owned boundary |
| --- | --- | --- |
| TypeMCP | `@theorvane/type-mcp@0.2.2`: decorator declarations, definition validation, MCP SDK compilation, explicit resolver, stdio helper, Streamable HTTP, and tools-only LangChain adapter | hosting, authorization, session/persistence policy, models, provider credentials, LangGraph composition, deployment |
| TypeChain | `@theorvane/type-chain@0.1.1`: Stage 3 tool/policy declarations, immutable definitions, LangChain adapter, agent builder, and in-process TypeMCP bridge | models, provider credentials, policy enforcement, state, persistence, hosting, deployment, cross-process MCP transport |

Every current-facing version string, status badge, callout, and example must be aligned with the synchronized source manifest. A page must never imply that an adapter owns a consumer's policy or operational lifecycle.

## Information architecture

### Shared portal structure

Both documentation roots use this order:

1. **Overview** — what the package is, published release badge, explicit ownership boundary, and a supported-surface map.
2. **Start with a goal** — task cards that route to the smallest supported integration surface.
3. **Core concepts** — architectural nouns a developer needs before selecting an adapter.
4. **Integrations** — guides organized by real runtime boundary, not by implementation file names.
5. **API reference** — authoritative exported-contract pages.
6. **Support and release context** — compatibility, version/status information, source pin, and links to source/release material.

The sidebar follows the same hierarchy and remains the complete navigation source. It must not hide a public document merely because that document does not appear in a featured card.

### TypeMCP route intent

| Reader goal | Destination | Primary message |
| --- | --- | --- |
| Learn whether TypeMCP is appropriate | Overview / getting started | Decorate a server definition, then compile it through an explicit resolver. |
| Run locally over MCP stdio | runtime selection → stdio section | TypeMCP supplies the stdio helper; process lifecycle and access control remain application-owned. |
| Mount MCP HTTP in a Fetch or Next.js host | HTTP integration | The HTTP subpath owns MCP framing and in-process transport sessions; the host owns route, auth, origin policy, deployment, and durable session policy. |
| Reuse an MCP tool surface with LangChain | LangChain/LangGraph integration | The adapter produces tools only; application code owns models, agent/graph topology, and state. |
| Inspect exact decorators, resolver, and adapter signatures | API contract | Published semver-governed interface and exclusions. |

The detailed source guides will build one Petstore server progressively: declare catalog lookup, inspect the definition, compile it with an application resolver, then choose stdio, HTTP, or tools-only reuse. Each stage links forward to the precise integration page instead of duplicating full tutorials.

### TypeChain route intent

| Reader goal | Destination | Primary message |
| --- | --- | --- |
| Learn whether TypeChain is appropriate | Overview / getting started | Define explicit, typed tools and policy intent without taking over runtime control. |
| Declare and inspect reusable tools | tools and definitions | Runtime schemas and receiver-bound immutable definitions are the foundation. |
| Apply an authorization or audit decision | policy and guards | `@Policy()` records intent; a supplied application guard enforces it. |
| Use tools in an existing LangChain application | LangChain integration | TypeChain adapts structured tools; the application owns model and lifecycle. |
| Construct a small application-owned agent | agent builder | The caller supplies the model and all operational policy. |
| Reuse a TypeMCP server in the same Node.js process | TypeMCP bridge | This is in-process composition only; it does not start an MCP client or transport. |
| Inspect exact root and optional subpath contracts | API contract | Published imports, peers, guarantees, and exclusions. |

The detailed source guides use a Petstore catalog tool to show `@Tool()`, optional `@Policy()`, LangChain adaptation, agent construction, and the in-process TypeMCP bridge. The same example must make the boundary between declaration metadata, a supplied guard, and model/provider ownership explicit.

## Document-page model

Every detailed guide should render or contain the following reading sequence:

1. **Breadcrumb, section label, product/version status, and page title.**
2. **One-paragraph answer:** what problem this page solves and when to choose it.
3. **Before you start:** Node/runtime, dependencies, optional peers, TypeScript/decorator configuration, and required application-owned inputs.
4. **Minimal verified example:** named files, install command, code, expected outcome, and how to test/inspect it.
5. **Step-by-step explanation:** one responsibility per step; no unexplained leap from declaration to deployment.
6. **Boundary panel:** what the library/adapter does and what the application must still provide.
7. **Failure and limitation notes:** known invalid configuration, unsupported boundary, or safe error behavior where relevant.
8. **Next steps and related reference:** direct links to the next guide and exact API contract.

Long examples use code containers with a filename/language label and a copy control. Tables and code blocks remain scrollable inside their container without creating horizontal page overflow. A source link always identifies the pinned commit that supplied the Markdown.

## Visual and interaction design

The documentation surface is intentionally calmer and more information-dense than the product landing pages.

### Layout

- Desktop uses a three-column shell: persistent documentation sidebar, central article column with a readable maximum measure, and a sticky local table of contents / related-navigation column.
- At intermediate widths, the local table of contents disappears before it can collide with prose; the sidebar remains available.
- On narrow screens, the sidebar becomes a semantic, keyboard-accessible disclosure. The article uses full available width, and code/table containers retain independent horizontal scrolling.
- A skip link jumps to the article. Every navigation region has an accessible label and the current route uses `aria-current="page"`.

### Hierarchy and component language

- Use the existing warm off-white, graphite, monospace, and restrained product accent palette. TypeMCP keeps cobalt as its primary accent; TypeChain uses its own established accent rather than pretending the products are one package.
- Use a small release/status pill near the title and a visually distinct release-boundary panel near the first paragraph. Status must be text, not color-only communication.
- Use concise card components only for entry points, related guides, and supported-surface maps. Do not make every section a grid of indistinguishable cards.
- Give code blocks a dark, low-glare surface; label their file/language; make copy affordances accessible; and explain expected output below the code rather than embedding prose in images.
- Use subtle borders, spacing, and scroll-position cues rather than decorative gradients or animation. Honor `prefers-reduced-motion`.
- Add previous/next links selected from manifest ordering so reading can continue linearly without returning to the index.

### Documentation-index composition

Each `/docs` index contains:

1. product eyebrow and title;
2. concise published-package summary;
3. release/status callout;
4. a supported-surface map that states the package-owned and application-owned boundary;
5. a **Start with your goal** card grid with task-oriented destinations;
6. a **Core concepts** group;
7. a focused **Integrations** group;
8. API/reference and support/release links;
9. source-pinned disclosure.

It must not present repository-process pages (agile delivery, npm release, open-source launch, superseded ADRs, or product-target vision) with the same visual prominence as first-run developer documentation. Those pages remain reachable in their appropriate section and carry their existing release-boundary state.

## Content and synchronization delivery sequence

1. TypeMCP #115 adds and verifies the detailed canonical TypeMCP docs, merges to `dev`, then promotes through a reviewed `dev` → `main` release path.
2. TypeChain #78 adds and verifies the detailed canonical TypeChain docs, merges to `dev`, then promotes through a reviewed `dev` → `main` release path.
3. Website #87 advances each manifest independently to the exact immutable canonical-main SHA, expands the approved document routes, synchronizes generated Markdown, and changes portal presentation.
4. The website PR verifies source hash metadata, manifest allowlisting, local internal links, and rendered routes. It does not point public content at a mutable branch.
5. A separate website `dev` → `main` release PR is reviewed and merged. Production verification exercises both docs indexes and representative TypeMCP/TypeChain detail pages on desktop and mobile.

This ordering prevents portal code from presenting unpublished source behavior as a released capability.

## Failure behavior and security

- The build fails when an allowlisted source is unavailable at the pinned SHA, has no H1, has a duplicate route/order, lacks required source-status evidence, has an unresolved approved internal link, or fails content-hash verification.
- The portal never follows arbitrary Markdown paths, directory traversal, symlinks, browser-time GitHub requests, or unsafe `javascript:`, `data:`, or `vbscript:` hrefs.
- Markdown is rendered without raw HTML execution. External links declare that they open a new tab; source links use `noopener noreferrer`.
- A source sync failure names the source path and public route. A page is never silently omitted.

## Accessibility, metadata, and quality requirements

- Maintain logical heading order, visible keyboard focus, landmark labels, skip navigation, descriptive control names, readable text contrast, and non-color status labels.
- Each docs index and article provides a canonical URL, concise unique metadata description, Open Graph metadata, and sitemap inclusion.
- Test desktop, intermediate, and narrow contracts for navigation collision, code/table overflow containment, mobile disclosure semantics, current-route state, local TOC behavior, and previous/next links.
- Test the published-version callouts and responsibility boundaries for both products against their pinned canonical documentation.

## Verification strategy

### Canonical source repositories

For each source repository:

1. write a focused docs/example or contract test first where an example needs a new verification seam;
2. record the observed red result before minimal changes;
3. compile the exact documented snippets against a clean consumer installation of the public package;
4. run all repository-mandated validation commands and Markdown/link checks;
5. request exact-head independent review before merge and promotion.

### Website repository

1. write focused failing tests for the new index IA, navigation, status text, and sequencing before portal production code;
2. run source synchronization;
3. run focused tests, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`;
4. verify local documentation routes at desktop and narrow viewport sizes;
5. after release promotion, verify public `typemcp.theorvane.tech/docs` and `typechain.theorvane.tech/docs` plus at least one detailed guide per product.

## Non-goals

- No CMS, login, editing workflow, comments, analytics expansion, full-text search service, browser-time GitHub fetch, or dynamic version selector.
- No new TypeMCP or TypeChain runtime API, OAuth, persistence, automatic authorization/policy enforcement, provider/model implementation, LangGraph runtime, MCP host/client, or deployment feature.
- No broad landing-page redesign and no third-party visual/text/code copying.

## Implementation boundary

This specification defines the website portal work tracked by #87 and the upstream documentation prerequisites tracked separately by TypeMCP #115 and TypeChain #78. It intentionally does not authorize combining those three repositories into one PR or bypassing their independent review and protected release paths.
