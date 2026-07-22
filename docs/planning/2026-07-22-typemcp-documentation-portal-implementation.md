# TypeMCP documentation portal implementation plan

> **For Hermes:** Use `subagent-driven-development` to execute this plan task-by-task, including a fresh specification review and code-quality review per task.

**Goal:** Turn `typemcp.theorvane.tech` into an English product site and static documentation portal that renders approved TypeMCP source documents from a pinned `Theorvane/type-mcp` commit.

**Architecture:** `apps/type-mcp` remains an App Router application. A typed public-document manifest names every allowed `Theorvane/type-mcp/docs/` source file, its route, group, order, summary, and release-boundary classification. A prebuild synchronizer downloads only those raw Markdown files at a fixed commit into an ignored local cache; server-only document utilities validate, parse, and render that cache into static `/docs` routes. There is no browser-time GitHub fetch or arbitrary Markdown ingestion.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript strict mode, Node 22 `fetch`, `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-sanitize`, `unified`/`remark-parse` AST utilities, Vitest, Testing Library, Node test contracts, ESLint, npm workspaces, Turborepo.

**Prerequisites:** Read `AGENTS.md`, `docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md`, the exact TypeMCP source documents at the pinned commit, and Issue #20. Update this plan if either source documentation paths or the published-package boundary changes before implementation starts.

---

## Approved public source manifest

Use Issue #20's approved fixed TypeMCP source commit: `6480a45887a262f354f5691d3d3d19ca04304e96`. Record that exact literal as `sourceCommit` in `apps/type-mcp/lib/docs/manifest.ts`; do not resolve `dev`, use `HEAD`, or use a floating URL during this implementation. A later documentation-refresh Issue and PR may intentionally advance this commit only after reviewing the changed source files and rerunning the full portal verification.

| Group | Source path | Route | Boundary classification |
| --- | --- | --- | --- |
| Start | `docs/guides/getting-started.md` | `/docs/getting-started` | published |
| Guides | `docs/guides/configuration.md` | `/docs/guides/configuration` | published-with-boundary |
| Guides | `docs/guides/agent-integration.md` | `/docs/guides/agent-integration` | published |
| Guides | `docs/guides/http-and-nextjs.md` | `/docs/guides/http-and-nextjs` | repository-development |
| Guides | `docs/guides/agile-delivery.md` | `/docs/guides/agile-delivery` | repository-development |
| Guides | `docs/guides/npm-release.md` | `/docs/guides/npm-release` | repository-development |
| Guides | `docs/guides/open-source-launch.md` | `/docs/guides/open-source-launch` | repository-development |
| API | `docs/api/decorator-api.md` | `/docs/api/decorator-api` | repository-development |
| Architecture | `docs/architecture/overview.md` | `/docs/architecture/overview` | repository-development |
| Architecture | `docs/architecture/adr/0001-framework-neutral-core.md` | `/docs/architecture/framework-neutral-core` | repository-development |
| Architecture | `docs/architecture/adr/0002-fetch-streamable-http.md` | `/docs/architecture/fetch-streamable-http` | repository-development |
| Product | `docs/product/vision.md` | `/docs/product/vision` | product-target |
| Product | `docs/product/mvp-scope.md` | `/docs/product/mvp-scope` | product-target |

Exclude `docs/planning/`, `docs/superpowers/specs/`, historical plans, repository README files, examples, and every document not listed here. An addition requires a manifest change, source review, route test, and an explicit release-boundary classification.

## Route contract

| Route | Required behavior | Boundary notice |
| --- | --- | --- |
| `/` | Product landing, `TYPEMCP` wordmark, navigation to `/docs`, GitHub, npm, and accurate `type-mcp@0.1.0` message | Existing published-package copy remains accurate |
| `/docs` | Documentation index, recommended reading order, group cards, source commit link | Always displays the package/repository distinction |
| `/docs/[...slug]` | Static article with breadcrumb, sidebar, article TOC, Markdown content, source link, and previous/next links | Display for all classifications other than `published` |
| `/sitemap.xml` | Include product root, docs index, and every manifest route | Not applicable |

## A/E/X behavior cases

| Case | Input/state | Expected outcome |
| --- | --- | --- |
| A | Approved source document at pinned commit | Build writes cache, route statically renders title, article, source link, and matching navigation state |
| E | Source path returns non-200 or has no level-one heading | Synchronizer exits non-zero with path and route in the message; build fails |
| E | Duplicate route, duplicate group/order position, or duplicate normalized heading identifier | Manifest/parser validation throws a deterministic error before route generation |
| E | Markdown link targets an approved source document | Renderer converts it to the matching `/docs/...` route; a non-manifest local source link remains a GitHub source URL |
| X | Raw HTML, `javascript:` URL, malformed table, or unknown local Markdown path | Renderer does not execute/inject raw HTML; unsafe URL is removed; malformed content remains text-safe; unknown local source link causes validation failure when it is intended as an internal doc link |
| X | Narrow viewport | Docs sidebar collapses behind a keyboard-accessible disclosure; article, tables, and code blocks never create page-level horizontal overflow |

---

### Task 1: Lock the documentation source boundary in executable contracts

**Objective:** Establish a single typed manifest and tests that prevent arbitrary TypeMCP repository documents from entering the public site.

**Files:**
- Create: `apps/type-mcp/lib/docs/manifest.ts`
- Create: `apps/type-mcp/lib/docs/manifest.test.ts`
- Create: `apps/type-mcp/lib/docs/types.ts`
- Modify: `apps/type-mcp/package.json`

**Step 1: Write failing tests**

Create tests that expect exactly the 13 manifest entries in the approved table, unique source paths/routes/group positions, a full-commit SHA, no `planning/` or `superpowers/` source path, and `published` only for `getting-started` and `agent-integration`.

```ts
expect(publicDocuments.map((document) => document.route)).toContain("/docs/api/decorator-api");
expect(() => validateManifest(duplicateRouteManifest)).toThrow(/duplicate route/i);
expect(publicDocuments.every((document) => !document.sourcePath.includes("planning/"))).toBe(true);
```

**Step 2: Verify red**

Run: `npm run test --workspace=@theorvane/type-mcp-site -- --run lib/docs/manifest.test.ts`

Expected: FAIL because `manifest.ts` and its exports do not exist.

**Step 3: Implement the minimal typed manifest**

Add discriminated types for group and classification, a literal pinned `sourceCommit`, title/summary/order metadata, and `validateManifest()`. Do not read a branch name or environment variable for the ref. Add only the dependencies needed for later Markdown parsing; leave rendering dependencies for Task 4.

**Step 4: Verify green**

Run the focused test. Expected: PASS.

**Step 5: Commit**

```bash
git add apps/type-mcp/lib/docs/manifest.ts apps/type-mcp/lib/docs/types.ts apps/type-mcp/lib/docs/manifest.test.ts apps/type-mcp/package.json package-lock.json
git commit -m "feat(docs): define TypeMCP source manifest"
```

### Task 2: Add deterministic prebuild synchronization

**Objective:** Fetch only manifest-approved Markdown from `raw.githubusercontent.com` at the pinned commit and make failures visible.

**Files:**
- Create: `apps/type-mcp/scripts/sync-typemcp-docs.mjs`
- Create: `apps/type-mcp/lib/docs/sync.test.ts`
- Modify: `apps/type-mcp/package.json`
- Modify: `.gitignore`

**Step 1: Write failing tests**

Test an injected `fetch` function with: successful responses writing all expected files, a non-200 response naming both source path and route, and a response missing an H1 failing before output is treated as valid.

```ts
await expect(syncDocuments({ fetch: failingFetch, outputDirectory })).rejects.toThrow(
  /docs\/api\/decorator-api\.md.*\/docs\/api\/decorator-api/i,
);
```

**Step 2: Verify red**

Run: `npm run test --workspace=@theorvane/type-mcp-site -- --run lib/docs/sync.test.ts`

Expected: FAIL because the synchronization module does not exist.

**Step 3: Implement synchronization**

Place reusable sync logic in a testable server-only module, with the `.mjs` script as a thin runner. Fetch `https://raw.githubusercontent.com/Theorvane/type-mcp/<sourceCommit>/<sourcePath>`. Write each file below `apps/type-mcp/.generated-docs/` using the source path structure and write `metadata.json` containing only source commit, timestamp-free source paths, route mapping, and content hashes. Add `.generated-docs/` to `.gitignore`.

Set `prebuild` to invoke the script before `next build`. Keep synchronization explicit for local development with `npm run sync:docs`; do not fetch on every request.

**Step 4: Verify green**

Run focused tests, then `npm run sync:docs --workspace=@theorvane/type-mcp-site`. Inspect that every manifest file exists beneath `.generated-docs/` and that no generated file is tracked.

**Step 5: Commit**

```bash
git add apps/type-mcp/scripts/sync-typemcp-docs.mjs apps/type-mcp/lib/docs/sync.ts apps/type-mcp/lib/docs/sync.test.ts apps/type-mcp/package.json .gitignore package-lock.json
git commit -m "feat(docs): sync pinned TypeMCP sources"
```

### Task 3: Parse cached Markdown into safe typed document data

**Objective:** Derive titles, headings, table of contents, source links, and validated document links without raw HTML injection.

**Files:**
- Create: `apps/type-mcp/lib/docs/parse.ts`
- Create: `apps/type-mcp/lib/docs/parse.test.ts`
- Create: `apps/type-mcp/lib/docs/repository.ts`
- Modify: `apps/type-mcp/package.json`

**Step 1: Write failing tests**

Use fixture Markdown for H1 extraction, nested heading slugging, duplicate headings, fenced TypeScript code, GFM tables, an approved relative document link, an unknown internal Markdown link, an external npm link, and a `javascript:` URL.

```ts
expect(document.toc).toEqual([
  { depth: 2, id: "published-release-boundary", title: "Published release boundary" },
]);
expect(document.internalLinks.get("../guides/configuration.md")).toBe("/docs/guides/configuration");
expect(() => parseDocument(unknownInternalLinkFixture, manifest)).toThrow(/unknown documentation link/i);
```

**Step 2: Verify red**

Run: `npm run test --workspace=@theorvane/type-mcp-site -- --run lib/docs/parse.test.ts`

Expected: FAIL because parser exports do not exist.

**Step 3: Implement parser and repository access**

Use `unified`, `remark-parse`, `remark-gfm`, `mdast-util-to-string`, and `unist-util-visit` to derive document data. Use a stable GitHub source URL builder such as `https://github.com/Theorvane/type-mcp/blob/<sourceCommit>/<sourcePath>`. Normalize headings once and reject collisions. Expose only server-side functions that read `.generated-docs/`; route components must never fetch GitHub.

Install `react-markdown`, `remark-gfm`, `rehype-slug`, and `rehype-sanitize` for Task 6. Configure rendering to disallow raw HTML and unsafe URL schemes.

**Step 4: Verify green**

Run focused parser tests. Expected: PASS.

**Step 5: Commit**

```bash
git add apps/type-mcp/lib/docs/parse.ts apps/type-mcp/lib/docs/repository.ts apps/type-mcp/lib/docs/parse.test.ts apps/type-mcp/package.json package-lock.json
git commit -m "feat(docs): parse safe TypeMCP articles"
```

### Task 4: Build reusable documentation navigation and article primitives

**Objective:** Create semantic, testable components for document navigation before attaching them to routes.

**Files:**
- Create: `apps/type-mcp/components/docs/docs-shell.tsx`
- Create: `apps/type-mcp/components/docs/docs-sidebar.tsx`
- Create: `apps/type-mcp/components/docs/article-toc.tsx`
- Create: `apps/type-mcp/components/docs/release-boundary-callout.tsx`
- Create: `apps/type-mcp/components/docs/markdown-article.tsx`
- Create: `apps/type-mcp/components/docs/docs-navigation.test.tsx`
- Modify: `apps/type-mcp/app/globals.css`

**Step 1: Write failing rendered-component tests**

Assert the desktop sidebar has a `Documentation` navigation label, each group contains only its manifest pages, the active page exposes `aria-current="page"`, the release callout exists for `published-with-boundary`, `repository-development`, and `product-target` classifications but not `published`, and the TOC links point to normalized heading anchors.

**Step 2: Verify red**

Run: `npm run test --workspace=@theorvane/type-mcp-site -- --run components/docs/docs-navigation.test.tsx`

Expected: FAIL because components do not exist.

**Step 3: Implement components**

Keep components server-first. Use semantic `aside`, `nav`, `article`, `section`, and ordered heading structure. The mobile sidebar must use native `details`/`summary` or an accessible client disclosure only if required; use native disclosure first to avoid unnecessary client JavaScript. Render Markdown through configured `react-markdown` components for links, code, tables, headings, and blockquotes. Tables/code blocks need dedicated scroll wrappers.

**Step 4: Verify green**

Run focused component tests and inspect the rendered DOM for a skip target and landmarks.

**Step 5: Commit**

```bash
git add apps/type-mcp/components/docs apps/type-mcp/app/globals.css
git commit -m "feat(docs): add accessible article components"
```

### Task 5: Add the docs index and static article routes

**Objective:** Publish the complete approved document set at `/docs` and `/docs/[...slug]`.

**Files:**
- Create: `apps/type-mcp/app/docs/page.tsx`
- Create: `apps/type-mcp/app/docs/[...slug]/page.tsx`
- Create: `apps/type-mcp/app/docs/docs-routes.test.tsx`
- Modify: `apps/type-mcp/app/layout.tsx`
- Modify: `apps/type-mcp/app/page.tsx`

**Step 1: Write failing route tests**

Test the docs index reading order, a getting-started route, `decorator-api`, architecture ADR, and product MVP scope. Assert static parameter generation contains every manifest slug, unknown routes call `notFound`, article pages include a source-commit link, and classifications show the expected release callout.

**Step 2: Verify red**

Run: `npm run test --workspace=@theorvane/type-mcp-site -- --run app/docs/docs-routes.test.tsx`

Expected: FAIL because `/docs` routes do not exist.

**Step 3: Implement routes**

Use `generateStaticParams` exclusively from the manifest. The docs index includes a package-boundary statement, Start/Guides/API/Architecture/Product cards, and source commit reference. The catch-all route resolves only manifest paths and uses `notFound()` otherwise. Add breadcrumbs, previous/next document links, article source URL, and route-specific metadata. Update product navigation to link to `/docs`; change the header wordmark to `TYPEMCP` only if the concurrent brand issue has not already delivered it. Do not duplicate or overwrite unrelated landing-page work.

**Step 4: Verify green**

Run focused route tests. Expected: PASS.

**Step 5: Commit**

```bash
git add apps/type-mcp/app/docs apps/type-mcp/app/layout.tsx apps/type-mcp/app/page.tsx apps/type-mcp/app/docs/docs-routes.test.tsx
git commit -m "feat(docs): publish static TypeMCP routes"
```

### Task 6: Complete responsive layout, metadata, and sitemap coverage

**Objective:** Make documentation routes readable, discoverable, and safe at desktop and mobile widths.

**Files:**
- Modify: `apps/type-mcp/app/globals.css`
- Modify: `apps/type-mcp/app/layout.tsx`
- Create: `apps/type-mcp/app/sitemap.ts`
- Create: `apps/type-mcp/test/docs-metadata.test.ts`
- Create: `apps/type-mcp/test/docs-responsive-contract.test.mjs`

**Step 1: Write failing tests**

Assert generated route metadata has an absolute canonical URL, the sitemap includes all docs routes, desktop CSS lays out sidebar/article/TOC without overlap, and mobile CSS collapses to one article column with scroll wrappers for code/tables.

**Step 2: Verify red**

Run the focused metadata and responsive contract tests. Expected: FAIL because sitemap and documentation CSS contracts do not exist.

**Step 3: Implement minimal discoverability and CSS**

Set `metadataBase` to `https://typemcp.theorvane.tech`, update root metadata only with accurate product/docs descriptions, and generate sitemap entries from the manifest. Use CSS grid with a readable article measure, `minmax(0, ...)` tracks, sticky sidebars only where viewport space permits, and `overflow-x:auto` on code/table wrappers. Preserve visible focus and `prefers-reduced-motion` behavior.

**Step 4: Verify green**

Run focused tests and local visual smoke tests at approximately 375px, 768px, and 1440px. Verify no page-level horizontal scrolling, keyboard reachability, correct active sidebar state, and readable code/table overflow behavior.

**Step 5: Commit**

```bash
git add apps/type-mcp/app/globals.css apps/type-mcp/app/layout.tsx apps/type-mcp/app/sitemap.ts apps/type-mcp/test/docs-metadata.test.ts apps/type-mcp/test/docs-responsive-contract.test.mjs
git commit -m "feat(docs): add TypeMCP docs metadata and layout"
```

### Task 7: Add build and source-integrity integration coverage

**Objective:** Verify the full production build consumes the pinned cache and emits every required static route.

**Files:**
- Create: `test/type-mcp-docs-build-contract.test.mjs`
- Modify: `test/ci-workflow-contract.test.mjs` only if an explicit docs sync/check needs CI assertion
- Modify: `apps/type-mcp/package.json` only if a named `verify:docs` command improves reuse

**Step 1: Write failing test**

Write a root contract that invokes/inspects the documented docs verification command and checks that all manifest routes are present in build output after sync. Include an assertion that source commit is a full SHA rather than a branch ref.

**Step 2: Verify red**

Run: `node --test test/type-mcp-docs-build-contract.test.mjs`

Expected: FAIL until the verification command/build route contract is added.

**Step 3: Implement only the required verification command**

Add a deterministic `verify:docs` command that synchronizes, validates the manifest/link graph, and reports document count plus pinned source commit. Avoid parsing generated framework internals when a stable route manifest or app-level generated route list can be asserted instead.

**Step 4: Verify green**

Run `npm run verify:docs --workspace=@theorvane/type-mcp-site`, then `npm run build --workspace=@theorvane/type-mcp-site`. Confirm all 13 routes plus `/docs` appear in the route listing.

**Step 5: Commit**

```bash
git add test/type-mcp-docs-build-contract.test.mjs test/ci-workflow-contract.test.mjs apps/type-mcp/package.json
git commit -m "test(docs): verify TypeMCP static portal build"
```

### Task 8: Update public documentation and release the integration branch

**Objective:** Document the new portal, verify the exact diff, and deliver one reviewable implementation PR into `dev`.

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md` only to mark implemented decisions accurately
- Modify: `.agent/task-briefs/20-typemcp-documentation-portal.md`

**Step 1: Write failing documentation contract**

Add a Node contract test requiring the README and TypeMCP app navigation to link `https://typemcp.theorvane.tech/docs` and requiring no copy to describe repository-development APIs as published npm behavior.

**Step 2: Verify red**

Run the focused contract. Expected: FAIL before the README/navigation is updated.

**Step 3: Update public docs**

Document the docs portal URL, that content is built from a pinned TypeMCP source commit, how a maintainer advances that commit, and the boundary between docs source and published npm package. Do not publish a misleading “live docs” claim if deployment has not happened.

**Step 4: Run final verification**

```bash
npm ci
npm run verify:docs --workspace=@theorvane/type-mcp-site
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
git status --short --branch
```

Expected: all commands exit zero; the cache is ignored; the diff includes only Issue #20 scope.

**Step 5: Local visual and link review**

Start the TypeMCP app after a production build. Visit `/`, `/docs`, `/docs/getting-started`, `/docs/api/decorator-api`, `/docs/architecture/framework-neutral-core`, and `/docs/product/mvp-scope` at desktop and mobile widths. Confirm source links use the pinned commit, approved internal links resolve internally, and the published/repository boundary callouts appear where classified.

**Step 6: Commit and delivery PR**

```bash
git add README.md docs/superpowers/specs/2026-07-22-typemcp-documentation-portal-design.md .agent/task-briefs/20-typemcp-documentation-portal.md test/
git commit -m "docs: publish TypeMCP portal guidance"
git push -u origin feat/20-typemcp-documentation-portal
gh pr create --base dev --title "feat: build TypeMCP documentation portal" --body-file /tmp/pr20-implementation.md
```

Apply Issue labels `type: feature`, `area: website`, `priority: high`, assign `sjungwon03`, request `sjungwon03-ai` review, and wait for latest-head approval plus `verify`. Do not dismiss, alter, or bypass review state or repository policy.

### Task 9: Promote only after integration verification

**Objective:** Release the merged documentation portal through the existing protected release path.

**Files:** No feature-source changes.

**Step 1: Create a release Issue and `dev` → `main` PR**

Create the release Issue and PR with the required primary type label `type: feature`, plus `release`, `area: website`, and `priority: high`; assign both to `sjungwon03`. The PR body names the pinned TypeMCP source commit and all published docs route groups. Request `sjungwon03-ai` formal independent review after the final release PR head is pushed and before waiting for its latest-head approval.

**Step 2: Verify required controls**

Confirm latest-head `sjungwon03-ai` approval, `verify`, and `release-promotion` success. Do not modify review state, rulesets, or required checks.

**Step 3: Merge and verify production**

After a normal squash merge, verify `https://typemcp.theorvane.tech/docs`, at least one route per group, `/sitemap.xml`, canonical metadata, the source link commit, and no 404s on sidebar destinations. Close the release Issue only after live evidence is recorded.
