# TypeMCP, TypeChain, and OpenVideo brand-home system — design specification

**Status:** approved design awaiting written-spec review  
**Scope:** product home routes only: `apps/type-mcp/app/page.tsx`, `apps/type-chain/app/page.tsx`, and `apps/openvideo/app/page.tsx`, plus their site-local styles, official local marks, and focused home tests.  
**Sequence:** TypeMCP → TypeChain → OpenVideo  
**Companion:** `2026-07-30-theorvane-developer-brand-home-design.md` defines the organization home. This document applies its selected visual language to product homes without turning products into copies of the organization page.

## 1. Purpose

Create a recognizable Theorvane product family: each product home should feel related to `theorvane.tech` through a dark technical shell, modest grid surfaces, clear large-type hierarchy, official product marks, constrained signal color, and immediate product navigation.

Each product still tells its own true technical story. The work does **not** create a generic SaaS marketing template, a documentation clone, a product bundle, or a shared platform claim.

## 2. Shared product-home system

All three sites use these consistent elements:

1. **Header**
   - Official product wordmark/mark links to the product home.
   - `Projects` is a semantic disclosure with TypeMCP, TypeChain, and OpenVideo official marks and canonical external destinations.
   - Product-specific primary navigation retains its existing valid anchors and documentation route.
   - A Theorvane organization link is available in the footer, rather than competing with the product action in the header.

2. **Hero**
   - Dark midnight field, technical grid, restrained product-colored aura, and the actual local product mark in a small framed visual object.
   - One short product boundary statement, a truthful supporting paragraph, and two actions at most: product documentation/getting-started plus source/package where appropriate.
   - No autoplay video, generated imagery, testimonial carousel, pricing, customer claim, account flow, or unrelated call to action.

3. **Product navigation**
   - A compact project strip after the hero makes family membership visible without taking over product-specific navigation.
   - Every cross-product link uses its canonical destination:
     - TypeMCP: `https://typemcp.theorvane.tech/`
     - TypeChain: `https://typechain.theorvane.tech/`
     - OpenVideo: `https://open-video.app/`

4. **Content surfaces**
   - Off-white content field, graphite text, cool borders, monospace labels, strong sans-serif headings, restrained radii, and explicit technical diagrams/lists.
   - Official SVG product icons are local public assets, never recreated from CSS or replaced with generic glyphs.
   - The product mark remains recognizable; hover treatment is limited to a surface sheen or small translate effect.

5. **Accessibility and responsive contract**
   - Visible keyboard focus, named primary navigation, skip link, logical heading order, external-link safety, and at least 44px header/menu targets.
   - Project disclosure remains usable by keyboard and touch; the visible main content retains product paths if JavaScript fails.
   - At a 375px CSS viewport, no horizontal overflow; all required navigation stays visible in a deliberate stacked/disclosure layout.
   - `prefers-reduced-motion: reduce` disables nonessential mark sheen, floating, and navigation transitions.

## 3. TypeMCP narrative

### Message

**Declare the contract. Validate it before runtime. Host it at an application-owned edge.**

### Page composition

1. Hero: TypeMCP official blue mark, direct declaration/validation statement, documentation and npm/source links.
2. Four-step contract rail: `Declare → Validate → Compile → Host`, retaining the published and truthful MCP boundary.
3. Architecture section: explicit metadata-to-MCP-surface path, showing that host, auth, policy, and deployment remain application-owned.
4. LangChain/LangGraph adapter boundary: retain the existing truthful “tools only; graph topology remains yours” content in a denser technical panel.
5. Documentation closing path and product footer.

### Non-negotiable product facts

- Do not imply TypeMCP owns LangGraph topology, model selection, authorization, state, persistence, or deployment.
- Preserve published package/version claims only when backed by current package metadata.
- Keep `stdio`, Streamable HTTP, validation, and official MCP SDK wording aligned with the published capability boundary.

## 4. TypeChain narrative

### Message

**Typed tools and agent declarations; application ownership stays explicit.**

### Page composition

1. Hero: official interlocking green TypeChain mark, typed-tool statement, documentation/getting-started/npm actions.
2. Four-step ownership rail: `Declare → Define → Adapt → Own`.
3. Boundary panel contrasting TypeChain’s typed metadata and adapters with user-owned models, credentials, authorization, policy, state, hosting, and deployment.
4. Product-specific getting-started close and existing documentation routes.

### Non-negotiable product facts

- TypeChain remains a decorator-first, type-safe authoring layer for LangChain JS tools and agents.
- Do not imply it hosts agents, provides model credentials, or owns policy/deployment.
- Keep Stage 3 decorator language and adapter references truthful and source-backed.

## 5. OpenVideo narrative

### Message

**A local-first editor that can operate with you, without making media or project folders a cloud product.**

### Page composition

1. Hero: official dark OpenVideo mark, local-first promise, source/docs actions, and compact verified run-from-source terminal card.
2. Capability index: retain the six existing, truthful capabilities, but present them as a clear numbered technical editor system rather than a generic feature grid.
3. Agent boundary: tools operate the application’s typed main-process surface; writes/jobs require approval; browser layer does not receive shell or path authority.
4. Provider and project data boundary: local Ollama/no-account option, connected-provider model policy, project-folder ownership, and local FFmpeg export facts stay visible.
5. Concise local-first guarantee and existing FAQ/footer routes.

### Non-negotiable product facts

- OpenVideo remains source-run today; do not imply a packaged installer or auto-update exists.
- Preserve the explicit FFmpeg requirement for export.
- Preserve the no-account/no-telemetry/no-analytics and provider-by-user-choice boundary only where it is implemented and documented.
- Do not claim a cloud service, hosted collaboration product, or provider capabilities that are not backed by a real adapter.

## 6. Component and asset boundaries

Each app keeps its own source-of-truth `products`/navigation descriptors in the homepage or a small site-local module. This avoids a product app importing runtime content from another app.

- A small app-local `ProjectMenu` component is permitted where a client component is required for Escape, outside click, focus restoration, and mobile disclosure behavior.
- A simple app-local product-strip component is permitted if it prevents the menu and visible strip from drifting.
- No shared UI package changes are required unless all three implementations independently reveal a stable, generic primitive.
- Copy official local SVG marks into each app’s `public/` asset tree only when that app does not already expose the official mark at an appropriate stable path.
- No remote media, generated visuals, raw creative prompts, credentials, or source-video artifacts are added.

## 7. Test and verification plan

### Test-first slices

For each product, before source implementation:

1. Add a focused failing home test that asserts its official mark, product-specific hero boundary, product canonical destinations in the new project disclosure/strip, and primary documentation/source destination.
2. Add a focused responsive CSSOM or equivalent layout contract that asserts a narrow-screen navigation rule, a 44px target rule, and reduced-motion suppression.
3. Run the targeted test to demonstrate an expected failure before code changes.

After each product slice:

- Run focused app tests, typecheck, lint, build, and `git diff --check`.
- Rebuild production artifacts and inspect desktop plus DevTools-emulated 375px mobile layout.
- Validate no broken icon, text overlap, clipped menu, or horizontal overflow.
- Inspect reduced-motion behavior and keyboard menu operation.

After all three slices:

- Run the root suite: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.
- Create a focused Issue before implementation, work from a branch based on `origin/dev`, open a PR into `dev`, apply `type: feature`, `area: website`, `area: brand`, and `priority: high`, assign `sjungwon03`, and request latest-head review from `sjungwon03-ai`.

## 8. Non-goals

- Changing canonical hosts, redirects, package boundaries, publishing, or release policy.
- Copying Prisma, NestJS, or another organization’s UI/copy/assets.
- Altering documentation information architecture except where a product home’s existing links need to be preserved.
- Adding backend services, CMS, analytics, authentication, download installers, paid media, or cloud product claims.
- Replacing validated product copy with broader claims just to match the visual system.
