# Reference-first TypeMCP and TypeChain learning curricula Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Deliver source-owned, release-accurate Petstore curricula for TypeMCP and TypeChain, then synchronize the immutable source releases into a more navigable, accessible website documentation portal.

**Architecture:** The two library repositories own every detailed runnable tutorial and validate it against their published package surfaces. The website owns only navigation/presentation metadata plus source pins and rendered Markdown; it advances a pin only after the related canonical `main` release is merged. The portal exposes a shared reader journey without merging the runtime boundaries of two independent libraries.

**Tech Stack:** TypeScript, Stage 3 decorators, Node.js, npm, Vitest (TypeMCP/website), Node test runner (TypeChain), Next.js 16 App Router, React Testing Library, GitHub Actions, protected `dev`/`main` promotion flow.

**Source design:** `docs/superpowers/specs/2026-07-29-reference-first-learning-curricula-design.md`

---

## Delivery order and non-negotiable gates

1. Deliver TypeMCP canonical documentation and promote it to `Theorvane/type-mcp:main`.
2. Deliver TypeChain canonical documentation and promote it to `Theorvane/type-chain:main`.
3. Read the two resulting full immutable SHAs from GitHub. Only then change website manifests/synchronized Markdown.
4. Deliver the website portal PR to `dev`, then a separately reviewed `dev` → `main` release PR.

For every implementation PR: create/update one focused Issue; assign `sjungwon03`; apply one primary type label and applicable area labels; branch from current `origin/dev` using `<type>/<issue>-<slug>`; request `sjungwon03-ai` formal exact-head review; never push directly to protected branches.

Use a separate linked worktree for each repository and task. Never modify `/tmp/hermes-webui-tests/webui-test-c56d9910-44405/test-workspace` except for Git metadata managed by the existing parent checkout; do all actual work in the task worktrees.

---

## Phase 1 — TypeMCP source-owned curriculum

### Task 1: Create the focused TypeMCP issue and isolated worktree

**Objective:** Establish a release-scoped source-docs change before modifying any canonical content.

**Repository / base:** `Theorvane/type-mcp`, current `origin/dev`.

**Files:**
- Create: `.agents/task-briefs/<issue>-petstore-learning-curriculum.md` when the implementation comprises more than one behavior.

**Step 1: Inspect existing issue/PRs and labels**

Run:

```bash
GH_CONFIG_DIR=/home/heeho3/.config/gh gh issue list --repo Theorvane/type-mcp --state open --limit 50
GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr list --repo Theorvane/type-mcp --state open --limit 50
```

Expected: no open issue already owns the new project-starting TypeMCP curriculum. If one does, update it rather than creating a duplicate.

**Step 2: Create/update the issue**

Include acceptance criteria that the source-owned chapters cover: strict TypeScript setup, named files, TypeMCP declaration, application-owned resolver seam, definition inspection, explicit `createMcpServer(PetstoreServer, resolver)` compilation, stdio command/expected behavior, failure guidance, boundary callout, and next links. Explicitly exclude auth/hosting/persistence/model/deployment claims.

**Step 3: Create task branch/worktree**

```bash
git fetch origin dev --prune
git worktree add -b docs/<issue>-petstore-learning-curriculum /tmp/theorvane-type-mcp-<issue> origin/dev
```

**Step 4: Install and establish baseline**

```bash
npm ci
npm test
npm run typecheck
npm run lint
```

Expected: baseline passes. If it does not, record the unrelated failure on the Issue before proceeding.

### Task 2: Extend the TypeMCP documentation contract (RED)

**Objective:** Make the source repository reject incomplete curriculum chapters before prose changes exist.

**Files:**
- Modify: `test/reference-documentation-contract.test.ts`
- Test source: `test/reference-documentation-contract.test.ts`

**Step 1: Add failing assertions**

Add a `describe`/`it` case that reads these planned source paths:

```ts
const curriculumDocuments = [
  "docs/guides/petstore-project-setup.md",
  "docs/guides/petstore-typemcp-foundation.md",
  "docs/guides/petstore-walkthrough.md",
] as const;
```

For every chapter require the literal structural headings (or a narrowly documented equivalent):

```ts
expect(content).toMatch(/## Before you start/);
expect(content).toMatch(/## Workspace checkpoint/);
expect(content).toMatch(/## Install/);
expect(content).toMatch(/## Run and verify/);
expect(content).toMatch(/## Expected behavior/);
expect(content).toMatch(/## Failure guide/);
expect(content).toMatch(/## Responsibility boundary/);
expect(content).toMatch(/## Next steps/);
```

Add TypeMCP-specific assertions across the concatenated documents for all of:

```ts
expect(allContent).toContain("@theorvane/type-mcp@0.2.2");
expect(allContent).toContain("createMcpServer(PetstoreServer, resolver)");
expect(allContent).toContain("runStdioServer");
expect(allContent).toContain("declare const petstoreClient");
expect(allContent).toMatch(/hosting, authorization,.*deployment/i);
expect(allContent).not.toMatch(/TypeMCP (?:owns|chooses) (?:a model|authorization|deployment)/i);
```

**Step 2: Run the single test and observe RED**

```bash
npx vitest run test/reference-documentation-contract.test.ts
```

Expected: FAIL because the new files and required curriculum markers do not yet exist.

### Task 3: Add the strict TypeScript project setup chapter

**Objective:** Give a reader a reproducible, minimal starting workspace without claiming TypeMCP scaffolds it.

**Files:**
- Create: `docs/guides/petstore-project-setup.md`
- Modify: `docs/README.md`
- Modify: `test/reference-documentation-contract.test.ts` only if a precise assertion is missing.

**Step 1: Write the smallest complete chapter**

Use the exact tutorial contract. Include:

- Node/npm and strict TypeScript precondition;
- `mkdir petstore-workspace && cd petstore-workspace`, `npm init -y`, and exact released-package install;
- `tsconfig.json` with the Stage 3 decorator configuration required by the published package, after checking the existing `getting-started.md` against the installed consumer;
- named `src/` files and a baseline package script;
- a concrete command that compiles/typechecks the workspace;
- expected success behavior;
- common incorrect decorator/ESM configuration guidance;
- an explicit statement that the reader owns project creation, dependencies, and credentials;
- a next link to `petstore-typemcp-foundation.md`.

**Step 2: Validate every command and import in an isolated temporary consumer**

Create a temporary directory outside the repo, install `@theorvane/type-mcp@0.2.2`, and compile the exact setup configuration. Do not substitute unpublished source behavior.

**Step 3: Re-run focused test**

```bash
npx vitest run test/reference-documentation-contract.test.ts
```

Expected: still FAIL only for the absent foundation/runtime requirements.

### Task 4: Add the TypeMCP declaration, inspection, compilation, and stdio foundation (GREEN)

**Objective:** Create a single runnable TypeMCP path through an explicit resolver and stdio boundary.

**Files:**
- Create: `docs/guides/petstore-typemcp-foundation.md`
- Modify: `docs/guides/petstore-walkthrough.md`
- Modify: `docs/README.md`
- Test: `test/reference-documentation-contract.test.ts`

**Step 1: Use named files**

The foundation chapter must create these files in order:

```text
src/petstore-client.ts
src/petstore-server.ts
src/run-stdio.ts
```

Keep the client application-owned:

```ts
declare const petstoreClient: {
  findProduct(sku: string): Promise<{ sku: string; name: string }>;
};
```

Document the exact release-validated decorator/import shapes from the installed consumer. Define `PetstoreServer`, inspect its definition, provide the resolver, and compile exactly through:

```ts
await createMcpServer(PetstoreServer, resolver)
```

Do not wrap the resolver as `{ resolver }` unless the published package test demonstrates that exact form.

**Step 2: Make stdio the default runnable route**

Use the published stdio helper with a direct runnable command. Explain expected local behavior without claiming client discovery, auth, durable sessions, or deployment.

**Step 3: Convert `petstore-walkthrough.md` into the next bounded branch**

Keep it as the runtime-selection continuation: stdio recap, Fetch/Next.js HTTP as optional integration, and tools-only LangChain reuse as optional integration. It must link backward to the foundation instead of repeating its entire code listing.

**Step 4: Run the documentation contract (GREEN)**

```bash
npx vitest run test/reference-documentation-contract.test.ts
```

Expected: PASS.

**Step 5: Compile all exact snippets in a clean consumer**

Create a small `tsconfig.json` and named files from the guide. Run the documented command. Expected: TypeScript compile succeeds against `@theorvane/type-mcp@0.2.2`.

### Task 5: Verify TypeMCP source delivery and open the docs PR

**Objective:** Publish only source docs proven by repository and consumer verification.

**Files:**
- Modify if necessary: source Markdown and `test/reference-documentation-contract.test.ts`

**Step 1: Run focused and full verification**

```bash
npx vitest run test/reference-documentation-contract.test.ts
npm test
npm run typecheck
npm run lint
npm run verify:publish
npm run audit:prod
git diff --check
```

**Step 2: Read exact diff, commit, and push**

```bash
git add docs test .agents/task-briefs
git commit -m "docs: add TypeMCP Petstore learning curriculum"
git push -u origin docs/<issue>-petstore-learning-curriculum
```

**Step 3: Open PR to `dev`**

The PR body must contain `Closes #<issue>`, source/API boundaries, exact package version, clean-consumer compilation evidence, all verification results, and explicit non-goals. Apply the issue labels and request `sjungwon03-ai` only on the open PR.

**Step 4: Obtain latest-head CI and independent review, then squash merge**

After merge, create a separate release Issue and `dev` → `main` PR. Wait for exact-head `verify`/release checks and independent approval. Verify the resulting immutable `main` SHA and retain it for Phase 3.

---

## Phase 2 — TypeChain source-owned curriculum

### Task 6: Create the focused TypeChain issue and isolated worktree

**Objective:** Create a separate source-owned delivery stream; do not piggyback on TypeMCP changes.

**Repository / base:** `Theorvane/type-chain`, current `origin/dev`.

**Files:**
- Create: `.agents/task-briefs/<issue>-petstore-learning-curriculum.md` when needed.

**Step 1: Triage existing TypeChain work**

```bash
GH_CONFIG_DIR=/home/heeho3/.config/gh gh issue list --repo Theorvane/type-chain --state open --limit 50
GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr list --repo Theorvane/type-chain --state open --limit 50
git fetch origin dev --prune
```

**Step 2: Create issue and worktree**

Issue scope: TypeChain continuation of the shared Petstore workspace, direct typed-tool route, policy intent versus application enforcement, composition selection, tested optional subpaths, and no model/credential/transport ownership claim.

```bash
git worktree add -b docs/<issue>-petstore-learning-curriculum /tmp/theorvane-type-chain-<issue> origin/dev
cd /tmp/theorvane-type-chain-<issue>
npm ci
npm run verify
```

### Task 7: Extend TypeChain curriculum contract (RED)

**Objective:** Prevent incomplete TypeChain chapters from reaching the canonical source.

**Files:**
- Modify: `test/reference-documentation-contract.test.mjs`

**Step 1: Add the new curriculum chapter list**

```js
const curriculumGuides = [
  "docs/guides/petstore-typechain-foundation.md",
  "docs/guides/petstore-policy-and-composition.md",
  "docs/guides/petstore-walkthrough.md",
];
```

**Step 2: Require the shared tutorial contract**

Assert headings equivalent to prerequisites, workspace checkpoint, install, configure TypeScript, named `src/` files, run/verify, expected behavior, failure guide, responsibility boundary, and next steps.

**Step 3: Require exact TypeChain boundaries**

Require the exact published version plus:

```js
assert.match(allContent, /@theorvane\/type-chain@0\.1\.1/);
assert.match(allContent, /@Tool\(\)/);
assert.match(allContent, /@Policy\(\)/);
assert.match(allContent, /declare const petstoreClient:/);
assert.match(allContent, /\/langchain/);
assert.match(allContent, /\/agent/);
assert.match(allContent, /\/typemcp/);
assert.doesNotMatch(allContent, /TypeChain (?:owns|starts|chooses) (?:a model|credentials|deployment|transport)/i);
```

**Step 4: Run RED test**

```bash
node --test test/reference-documentation-contract.test.mjs
```

Expected: FAIL because the new curriculum documents do not exist yet.

### Task 8: Add TypeChain typed-tool foundation chapter

**Objective:** Continue the same workspace using direct typed-tool metadata and a real application-owned invocation seam.

**Files:**
- Create: `docs/guides/petstore-typechain-foundation.md`
- Modify: `docs/README.md`
- Test: `test/reference-documentation-contract.test.mjs`

**Step 1: Write complete reader path**

The chapter must start from either completed TypeMCP workspace setup or an equivalent strict TypeScript application. It creates a named file such as `src/petstore-tools.ts`, imports only released root surface APIs, declares a catalog tool with `@Tool()`, inspects immutable definitions, and demonstrates direct application-owned invocation.

**Step 2: State what does not happen**

Explain that tool declarations do not create a model, invoke a provider, authorize a caller, persist state, or host any service.

**Step 3: Validate released consumer compile**

Build the exact named files from a temporary installed `@theorvane/type-chain@0.1.1` consumer. Include any real peer dependencies only where a chosen adapter requires them.

### Task 9: Add policy and composition continuation (GREEN)

**Objective:** Guide readers from declared tool metadata to one selected composition without collapsing ownership boundaries.

**Files:**
- Create: `docs/guides/petstore-policy-and-composition.md`
- Modify: `docs/guides/petstore-walkthrough.md`
- Modify: `docs/guides/composition-selection.md`
- Modify: `docs/README.md`
- Test: `test/reference-documentation-contract.test.mjs`

**Step 1: Show policy intent and enforcement handoff**

Use a named `src/petstore-admin-tools.ts` file and make dependencies explicit. `@Policy()` records metadata only. The expected behavior section must state that a provided application guard decides access and that the library does not enforce it by itself.

**Step 2: Offer mutually exclusive next routes**

Document `/langchain`, `/agent`, and `/typemcp` as three clearly separated options:

- `/langchain`: typed tool adaptation for an existing application-owned LangChain runtime;
- `/agent`: caller supplies model and operational policy; no credentials/model behavior is invented;
- `/typemcp`: reuse of a TypeMCP server inside one Node process, explicitly not a cross-process client or transport.

Each option links to its exact existing guide and names required optional peer/configuration inputs.

**Step 3: Update the existing Petstore walkthrough**

Make it a concise continuation/router after foundation and policy chapters. It must link backward and avoid duplicate long code blocks.

**Step 4: Run GREEN contract**

```bash
node --test test/reference-documentation-contract.test.mjs
```

Expected: PASS.

### Task 10: Verify, review, and release TypeChain source docs

**Objective:** Promote only exact verified source content to canonical main.

**Step 1: Run full source verification**

```bash
node --test test/reference-documentation-contract.test.mjs
npm run verify:publish
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: all success; audit reports no high-or-higher production dependency vulnerabilities.

**Step 2: Clean-consumer check**

Compile the documented root, `/langchain`, `/agent`, and `/typemcp` snippets against the installed release only where their optional dependencies are satisfied. Do not use repository internals as an API substitute.

**Step 3: Commit, PR, independent review, and release**

Use a docs commit, PR into `dev`, exact-head CI/approval, then a separate labeled release PR `dev` → `main`. Record the final canonical `main` SHA for Phase 3.

---

## Phase 3 — Website immutable-source synchronization and portal UI

### Task 11: Reconcile website #97 issue details and create implementation worktree

**Objective:** Ensure website work begins only with source-release evidence and a clean `origin/dev` base.

**Repository / base:** `Theorvane/website`, `origin/dev`.

**Files:**
- Modify: GitHub Issue #97 body only if source issue/PR/release references need recording.
- Create: `.agents/task-briefs/97-reference-first-learning-curriculum.md`

**Step 1: Fetch and record source-main SHAs**

```bash
GH_CONFIG_DIR=/home/heeho3/.config/gh gh api repos/Theorvane/type-mcp/git/ref/heads/main --jq .object.sha
GH_CONFIG_DIR=/home/heeho3/.config/gh gh api repos/Theorvane/type-chain/git/ref/heads/main --jq .object.sha
```

Expected: two full 40-character SHAs whose commits include the reviewed source-release work. Add them to the issue/brief.

**Step 2: Create a fresh implementation worktree from current `origin/dev`**

```bash
git fetch origin dev --prune
git worktree add -b feat/97-reference-first-learning-curriculum /tmp/theorvane-website-curriculum-97 origin/dev
cd /tmp/theorvane-website-curriculum-97
npm ci
npm test
```

### Task 12: Add website manifest/sync tests (RED)

**Objective:** Prove the portal cannot present a curriculum route until an allowlisted canonical source document and immutable SHA exist.

**Files:**
- Modify: `apps/type-mcp/lib/docs/manifest.test.ts`
- Modify: `apps/type-chain/lib/docs/manifest.test.ts`
- Modify: `apps/type-mcp/lib/docs/sync.test.ts` as needed
- Create/modify: equivalent TypeChain sync test if absent
- Modify: `apps/type-mcp/app/sitemap.test.ts`
- Modify: `apps/type-chain/app/sitemap.test.ts`

**Step 1: Add expected entries**

Add expected `Build` documents, routes, titles, source paths, and new canonical full source SHAs. Examples:

```ts
expect(publicDocuments).toEqual(expect.arrayContaining([
  expect.objectContaining({
    group: "Build",
    route: "/docs/build/petstore-project-setup",
    sourcePath: "docs/guides/petstore-project-setup.md",
  }),
]));
```

Use the actual canonical source file names and routes chosen in Phase 1/2 rather than inventing alternatives.

**Step 2: Extend source metadata contract**

Introduce a small typed metadata shape for `curriculumStep`, `curriculumTotal`, `prerequisites`, `nextRoute`, `outcome`, and `applicationBoundary` only if needed by UI. Validate no duplicate step numbers, referenced routes exist, all Build docs have complete metadata, and non-Build docs do not need it.

**Step 3: Run focused tests and observe RED**

```bash
npm --workspace=@theorvane/type-mcp-site test -- --run lib/docs/manifest.test.ts
npm --workspace=@theorvane/type-chain-site test -- --run lib/docs/manifest.test.ts
```

Expected: FAIL until canonical source pins, allowlisted documents, and implementation exist.

### Task 13: Synchronize immutable source manifests (GREEN)

**Objective:** Advance only to source-main commits proven in Phase 1/2 and generate all approved Markdown.

**Files:**
- Modify: `apps/type-mcp/lib/docs/manifest.ts`
- Modify: `apps/type-chain/lib/docs/manifest.ts`
- Generated/update as governed by scripts: source caches used by `apps/type-mcp/scripts/sync-typemcp-docs.ts` and `apps/type-chain/scripts/sync-typechain-docs.ts`
- Test: manifest and sync tests from Task 12

**Step 1: Update full SHA and allowlist**

Never point a source commit at `main`, a tag name, or a shortened SHA. Add Build documents to each manifest with current published `sourceStatus` values.

**Step 2: Run sync commands**

```bash
npm --workspace=@theorvane/type-mcp-site run sync:docs
npm --workspace=@theorvane/type-chain-site run sync:docs
```

Expected: each prints the exact full canonical source SHA and synchronized document count.

**Step 3: Verify generated content**

Programmatically assert generated Markdown contains the chapter H1, package version, expected code form, responsibility boundary, troubleshooting heading, and next link. Ensure unresolved relative links either map to approved portal routes or become safe source links.

**Step 4: Run focused tests (GREEN)**

Run the tests from Task 12. Expected: PASS.

### Task 14: Add docs-home curriculum tests (RED)

**Objective:** Specify the new entry surfaces before changing page implementation.

**Files:**
- Modify: `apps/type-mcp/app/docs/page.test.tsx`
- Modify: `apps/type-chain/app/docs/page.test.tsx`

**Step 1: Add TypeMCP assertions**

Require exact headings/links:

```ts
expect(screen.getByRole("heading", { name: "Build your first Petstore workflow" })).toBeTruthy();
expect(screen.getByRole("link", { name: /Start the Petstore workspace/i }))
  .toHaveAttribute("href", "/docs/build/petstore-project-setup");
expect(screen.getByRole("heading", { name: "Get started" })).toBeTruthy();
expect(screen.getByRole("heading", { name: "Learn" })).toBeTruthy();
expect(screen.getByRole("heading", { name: "Build" })).toBeTruthy();
expect(screen.getByRole("heading", { name: "Integrate" })).toBeTruthy();
expect(screen.getByRole("heading", { name: "Reference" })).toBeTruthy();
```

Assert the primary path names the explicit resolver/runtime boundary and says application lifecycle remains owned by the reader.

**Step 2: Add TypeChain assertions**

Require equivalent taxonomy and a handoff-aware Build route. Assert it explicitly says readers can continue the Petstore workspace and that TypeChain does not supply model/credential/policy enforcement/transport behavior.

**Step 3: Run RED tests**

```bash
npm --workspace=@theorvane/type-mcp-site test -- --run app/docs/page.test.tsx
npm --workspace=@theorvane/type-chain-site test -- --run app/docs/page.test.tsx
```

Expected: FAIL due to missing taxonomy/path selector.

### Task 15: Implement docs-home taxonomy and progressive curriculum rail (GREEN)

**Objective:** Make the next correct reader action obvious while preserving complete reference navigation.

**Files:**
- Modify: `apps/type-mcp/app/docs/page.tsx`
- Modify: `apps/type-chain/app/docs/page.tsx`
- Modify: `apps/type-mcp/app/globals.css`
- Modify: `apps/type-chain/app/globals.css`
- Test: both page tests

**Step 1: Define compact portal-local selectors**

Use module-local constants or a focused shared presentation helper (not a second docs data source) to select manifest routes by group and curriculum metadata. Avoid hand-maintaining duplicate summaries when manifest fields already contain them.

**Step 2: Add the home structure**

Render in this order:

1. current product/version/status and ownership map;
2. primary **Build your first Petstore workflow** action;
3. four outcome cards: first workflow, existing project, integration choice, API reference;
4. numbered progressive curriculum rail with TypeMCP-to-TypeChain relationship described as reader progression, not a shared runtime;
5. complete `Get started`, `Learn`, `Build`, `Integrate`, and `Reference` groups;
6. immutable source provenance link.

**Step 3: Add restrained responsive styling**

Use the existing palettes and typography. Cards are limited to entry surfaces; article content stays prose-first. Ensure rail/card layout collapses cleanly at 700px and does not cause horizontal body overflow.

**Step 4: Run GREEN tests**

Run both page tests and expect PASS.

### Task 16: Add article curriculum/navigation tests (RED)

**Objective:** Define article-level progress, boundary, troubleshooting, and next-step behavior before component changes.

**Files:**
- Modify: `apps/type-mcp/components/docs/docs-components.test.tsx`
- Modify: `apps/type-chain/components/docs/docs-components.test.tsx`
- Modify: `apps/type-mcp/app/docs/[...slug]/page.test.tsx`
- Modify: `apps/type-chain/app/docs/[...slug]/page.test.tsx`

**Step 1: Add failing tests**

For a Build document fixture, require:

- visible `Build / Step N of M` label;
- prerequisite link where metadata has one;
- outcome/boundary summary with no misleading claim;
- `Troubleshooting and limitations` label derived from canonical headings or rendered content;
- `Next step` link uses curriculum `nextRoute` rather than the generic adjacent manifest route;
- existing generic pager remains for documents outside curriculum;
- mobile sidebar continues to be a closed `<details>` disclosure.

**Step 2: Run component tests and observe RED**

```bash
npm --workspace=@theorvane/type-mcp-site test -- --run components/docs/docs-components.test.tsx
npm --workspace=@theorvane/type-chain-site test -- --run components/docs/docs-components.test.tsx
```

Expected: FAIL due to absent curriculum context component/props.

### Task 17: Implement article curriculum context and safe sequencing (GREEN)

**Objective:** Give readers context while retaining source-owned detailed explanation.

**Files:**
- Modify: `apps/type-mcp/components/docs/docs-components.tsx`
- Modify: `apps/type-chain/components/docs/docs-components.tsx`
- Modify: `apps/type-mcp/app/docs/[...slug]/page.tsx`
- Modify: `apps/type-chain/app/docs/[...slug]/page.tsx`
- Modify: matching CSS files
- Test: Task 16 tests

**Step 1: Add a presentation-only curriculum context component**

Render only when current manifest document has complete curriculum metadata. It should contain step label, outcome, optionally prerequisite route, concise application boundary, and next curriculum route.

**Step 2: Preserve source ownership**

Do not render copied code, tutorial prose, or artificial troubleshooting text in the website component. The Markdown guide remains the full explanation. The portal layer can link to the heading if it exists but must not claim prose it does not own.

**Step 3: Extend pager selection safely**

Use `nextRoute`/`prerequisites` first for Build documents. Fall back to existing manifest sequence only when no curriculum metadata exists. Preserve terminal boundaries and accessible `aria-label` text.

**Step 4: Keep responsive behavior**

At <=700px, maintain a closed mobile sidebar, single central article column, code/table inner scrolling, visible focus, and no TOC collision. Add or adjust CSS only as required by tests/visual inspection.

**Step 5: Run GREEN tests**

Run both component and route tests. Expected: PASS.

### Task 18: Verify website routes, sitemap, accessibility contracts, and visual behavior

**Objective:** Exercise the complete portal behavior, not only unit rendering.

**Files:**
- Modify: `apps/type-mcp/app/sitemap.test.ts`
- Modify: `apps/type-chain/app/sitemap.test.ts`
- Modify only if necessary: `apps/type-mcp/app/sitemap.ts`, `apps/type-chain/app/sitemap.ts`
- Modify/add responsive contract tests if the existing suite lacks curriculum rail overflow coverage.

**Step 1: Write sitemap/static route expectations first**

Add each Build route to expected static params and sitemap URL sets. Run focused tests and observe RED if routes are absent.

**Step 2: Implement only necessary route generation changes**

Existing manifest-driven route generation should satisfy new entries; modify production code only if test identifies a real gap.

**Step 3: Run focused application verification**

```bash
npm --workspace=@theorvane/type-mcp-site test
npm --workspace=@theorvane/type-chain-site test
npm run test:contracts
```

**Step 4: Run full monorepo verification**

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: every command exits 0; audit reports no high-or-higher production vulnerabilities.

**Step 5: Production-build visual verification on free ports**

Before starting anything, identify ownership of candidate ports with `ss -ltnp`. Never terminate another worktree’s listener. Use `next start`, not missing workspace `npm run start` scripts:

```bash
# TypeMCP, from apps/type-mcp
../../node_modules/.bin/next start --port <verified-free-port>

# TypeChain, from apps/type-chain
../../node_modules/.bin/next start --port <verified-free-port>
```

Check `/docs`, each TypeMCP Build chapter, and each TypeChain Build chapter at desktop and a 375px viewport. Verify the primary path is visible, sidebars are closed initially on mobile, article begins in initial viewport, code/table boxes do not overflow the page, and previous/next links are reachable.

### Task 19: PR, independent review, and website release

**Objective:** Deliver the website sync through protected branches with production proof.

**Files:**
- Create/modify: `.agents/task-briefs/97-reference-first-learning-curriculum.md`
- Repository artifacts created during delivery: Issue #97 and one PR to `dev`; separate release issue/PR to `main`.

**Step 1: Commit and push focused website branch**

```bash
git add apps/type-mcp apps/type-chain docs .agents/task-briefs
git commit -m "feat: add reference-first documentation curricula"
git push -u origin feat/97-reference-first-learning-curriculum
```

**Step 2: Open PR to `dev`**

The PR body must state:

- exact upstream TypeMCP/TypeChain main SHAs;
- no mutable source branches were used;
- source docs remain canonical;
- exact tests, full verification, visual route evidence, and ownership-boundary assurances;
- `Closes #97`.

Request `sjungwon03-ai` formal review only after all pushes. If head changes, remove stale approval labels and obtain new exact-head CI/review.

**Step 3: Merge to `dev` only after clean checks/review**

Use squash merge for the feature PR, per repository workflow.

**Step 4: Create separate release Issue and `dev` → `main` PR**

Apply `release`, `type: feature`, `area: website`, and `priority: high`; assign `sjungwon03`; request independent review. Ensure required `verify` and `release-promotion` checks pass on the exact release head.

**Step 5: Post-merge production verification and issue closure**

After main merge, wait for production deployments and verify HTTP 200 plus expected titles/content for the docs homes and every new Build route. Verify responsive behavior on live public routes. Comment concrete deployment IDs and route evidence on the release Issue, then close it.

---

## Final acceptance checklist

- [ ] TypeMCP source guides are release-accurate, compiled as a clean `0.2.2` consumer, independently reviewed, and promoted to canonical `main`.
- [ ] TypeChain source guides are release-accurate, compiled as a clean `0.1.1` consumer, independently reviewed, and promoted to canonical `main`.
- [ ] Website source pins are full immutable SHAs of those releases; no portal examples are authored outside canonical sources.
- [ ] Both docs homes visibly provide Get started / Learn / Build / Integrate / Reference and a bounded Petstore path.
- [ ] Every curriculum chapter provides project setup/requirements, files, commands, expected behavior, failure guidance, boundaries, and next step.
- [ ] TypeMCP and TypeChain ownership claims are truthful and non-overlapping.
- [ ] Tests demonstrate each new contract began RED then passed GREEN.
- [ ] Full source and portal verification, exact-head independent reviews, CI, release checks, and live production route checks are recorded.
