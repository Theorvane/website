# Four-site Landing Refresh Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Refresh the four public Theorvane landing pages with a shared product-discovery rhythm while preserving their distinct visual identities and accurate product boundaries.

**Architecture:** Keep each app self-contained in its existing Next.js App Router workspace. Update only static page composition, app-local CSS, and focused Vitest contracts. Theorvane becomes the product index; TypeMCP and TypeChain expose documentation-first developer flows with their published boundaries; OpenVideo foregrounds its released local workflow and privacy boundary.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, CSS custom properties, Vitest 4, Testing Library, npm workspaces, Turborepo.

---

## Delivery rules

Work from `origin/dev` on `feat/72-four-site-landing-refresh`. Preserve all existing canonical links, external-link behavior, skip links, named navigation, footer navigation, metadata, sitemap, robots, and JSON-LD. Do not add dependencies, remote images, analytics, accounts, APIs, CMS content, downloads, customer logos, testimonials, AI providers, or runtime product capabilities.

For every production-code task, add or amend the specified test first and run it before changing the page or CSS. Record a failing result that shows the target behavior is absent, then make the smallest page/CSS change and re-run the same command green. Commit each completed site slice and push it before moving to the next one.

## Task 1: Add Theorvane product-index contracts

**Objective:** Define the new product-discovery behavior before changing the brand homepage.

**Files:**
- Modify: `apps/theorvane/test/home.test.tsx`
- Create: `apps/theorvane/test/responsive-contract.test.ts`

**Step 1: Write failing page tests.** Add assertions that the hero primary action is named `Explore products` and targets `#products`, and that the product index contains one canonical external destination for TypeMCP (`https://typemcp.theorvane.tech/`), TypeChain (`https://typechain.theorvane.tech/`), and OpenVideo (`https://openvideo.theorvane.tech/`). Assert that the principles and closing product CTA remain discoverable.

**Step 2: Write a failing narrow-layout contract.** Read `app/globals.css` and assert that the compact breakpoint makes the product grid one column, stacks the hero actions, and permits navigation to wrap inside the viewport.

**Step 3: Run RED.**

Run:

```bash
npm run test --workspace=@theorvane/theorvane-site
```

Expected: FAIL because the `Explore products` action, product index, and responsive CSS contract do not exist.

## Task 2: Implement the Theorvane product index

**Objective:** Turn the studio homepage into a clear path to all three products without changing the brand promise.

**Files:**
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/home.test.tsx`
- Create: `apps/theorvane/test/responsive-contract.test.ts`

**Step 1: Implement the minimal semantic composition.** Keep the current hero statement and GitHub secondary action. Replace the primary TypeMCP-only action with an in-page `Explore products` action. Add a `#products` section immediately after the hero/signals containing three semantic articles. Each article needs an ordinal, product name, short truthful description, one distinguishing signal, and its existing canonical external product-site link.

**Step 2: Keep evidence concise.** Retain product proof code/workflow panels below the index, but reduce excess section whitespace. Keep principles as the existing three claims and add a closing in-page product action rather than another GitHub-only action.

**Step 3: Implement only app-local CSS.** Preserve near-black, ivory, lime, editorial serif accent, and monospace labels. Use a bounded `minmax()` product grid at desktop; below the compact breakpoint use one column, `min-width: 0`, wrapped navigation, and stacked actions. Do not use a horizontal carousel.

**Step 4: Run GREEN.**

Run:

```bash
npm run test --workspace=@theorvane/theorvane-site
```

Expected: PASS.

**Step 5: Commit and push.**

```bash
git add apps/theorvane/app/page.tsx apps/theorvane/app/globals.css apps/theorvane/test/home.test.tsx apps/theorvane/test/responsive-contract.test.ts
git commit -m "feat(theorvane): add product discovery index"
git push
```

## Task 3: Add TypeMCP documentation-first flow contracts

**Objective:** Define the primary documentation flow and explicit compile pipeline without changing the published package boundary.

**Files:**
- Modify: `apps/type-mcp/test/home.test.tsx`
- Create: `apps/type-mcp/test/responsive-contract.test.ts`

**Step 1: Write failing page tests.** Assert that the hero primary action is `Read documentation` and targets `/docs`, the page includes a four-step progression with `Declare`, `Validate`, `Compile`, and `Host`, and the existing `@theorvane/type-mcp@0.2.0` release boundary remains present. Assert that the page does not say TypeMCP owns authorization, policy, state, deployment, models, or LangGraph topology.

**Step 2: Write a failing narrow-layout contract.** Assert the existing compact breakpoint collapses the hero and capability layout to one column, wraps navigation, and keeps code panels at `max-width: 100%` with overflow handling.

**Step 3: Run RED.**

Run:

```bash
npm run test --workspace=@theorvane/type-mcp-site
```

Expected: FAIL because the documentation primary CTA and four named stages do not yet exist.

## Task 4: Implement the TypeMCP conversion flow

**Objective:** Make the route from a declaration to application-owned hosting obvious to a first-time developer.

**Files:**
- Modify: `apps/type-mcp/app/page.tsx`
- Modify: `apps/type-mcp/app/globals.css`
- Modify: `apps/type-mcp/test/home.test.tsx`
- Create: `apps/type-mcp/test/responsive-contract.test.ts`

**Step 1: Implement the minimal action hierarchy.** Keep GitHub and npm destinations, but make `/docs` the hero primary action named `Read documentation`. Keep GitHub and npm as verification/inspection actions, not the sole first action.

**Step 2: Convert the capability cards into a four-stage flow.** Use named semantic steps `Declare`, `Validate`, `Compile`, and `Host`. The host stage must state that application-owned stdio or Streamable HTTP hosting sits at the edge.

**Step 3: Preserve the exact product truth.** Keep the published package reference and explain that the tools-only LangChain adapter does not own LangGraph topology, models, authorization, state, persistence, or deployment. Do not add a product feature, installation command, or release assertion.

**Step 4: Implement CSS without copying another site.** Preserve warm off-white, graphite, cobalt, mint, and monospace code treatment. Add restrained step markers and a vertically readable narrow layout. Ensure code blocks scroll internally rather than widening the document.

**Step 5: Run GREEN.**

Run:

```bash
npm run test --workspace=@theorvane/type-mcp-site
```

Expected: PASS.

**Step 6: Commit and push.**

```bash
git add apps/type-mcp/app/page.tsx apps/type-mcp/app/globals.css apps/type-mcp/test/home.test.tsx apps/type-mcp/test/responsive-contract.test.ts
git commit -m "feat(type-mcp): clarify documentation-first product flow"
git push
```

## Task 5: Add TypeChain ownership-flow contracts

**Objective:** Define a clear declaration-to-adapter path while protecting the consumer-owned boundary.

**Files:**
- Modify: `apps/type-chain/test/home.test.tsx`
- Create: `apps/type-chain/test/responsive-contract.test.ts`

**Step 1: Write failing page tests.** Assert that `Read documentation` targets `/docs`, `Getting started` targets `/docs/getting-started`, and the runtime section contains the sequence `Declare`, `Define`, `Adapt`, and `Own`. Assert the exact `@theorvane/type-chain@0.1.1` reference remains visible and that models, credentials, authorization, policy, state, hosting, and deployment are application-owned.

**Step 2: Write a failing narrow-layout contract.** Assert the compact breakpoint stacks hero, capability panels, actions, and the ownership flow while navigation wraps and code remains constrained.

**Step 3: Run RED.**

Run:

```bash
npm run test --workspace=@theorvane/type-chain-site
```

Expected: FAIL because the named flow and getting-started hero action are absent.

## Task 6: Implement the TypeChain ownership flow

**Objective:** Make TypeChain useful to evaluate without implying that it owns an application runtime.

**Files:**
- Modify: `apps/type-chain/app/page.tsx`
- Modify: `apps/type-chain/app/globals.css`
- Modify: `apps/type-chain/test/home.test.tsx`
- Create: `apps/type-chain/test/responsive-contract.test.ts`

**Step 1: Implement the primary reading path.** Keep `/docs` as the primary hero action and surface `/docs/getting-started` as an explicit next action. Keep source and npm as secondary verification paths.

**Step 2: Replace the loose runtime list with four semantic stages.** Represent Stage 3 decorator intent, immutable definitions, LangChain or in-process TypeMCP adaptation, and application ownership as `Declare`, `Define`, `Adapt`, and `Own`.

**Step 3: Preserve truth-boundary copy.** Continue to identify the `@theorvane/type-chain@0.1.1` scope. Explicitly retain consumer ownership of models, credentials, authorization, policy, state, hosting, and deployment. Do not claim that TypeChain provisions, hosts, authorizes, or runs an application.

**Step 4: Implement CSS.** Retain TypeChain’s warm light and violet identity but add step rhythm, visible action hierarchy, and a narrow one-column layout. Do not import TypeMCP styling or alter shared tokens.

**Step 5: Run GREEN.**

Run:

```bash
npm run test --workspace=@theorvane/type-chain-site
```

Expected: PASS.

**Step 6: Commit and push.**

```bash
git add apps/type-chain/app/page.tsx apps/type-chain/app/globals.css apps/type-chain/test/home.test.tsx apps/type-chain/test/responsive-contract.test.ts
git commit -m "feat(type-chain): clarify ownership-first evaluation flow"
git push
```

## Task 7: Add OpenVideo released-workflow contracts

**Objective:** Define a visible local capture-to-export flow without overstating AI availability.

**Files:**
- Modify: `apps/openvideo/test/home.test.tsx`
- Modify: `apps/openvideo/test/responsive-contract.test.ts`

**Step 1: Write failing page tests.** Assert that the local workflow contains `Capture`, `Edit`, and `Export`; that the privacy section lists recordings, projects, imported assets, voice profiles, and exports as local; and that no text claims AI-assisted editing, AI generation, or connected services are currently available.

**Step 2: Extend the failing responsive contract.** Assert that the compact breakpoint stacks the workflow stages and feature grid, keeps actions vertical, wraps navigation, and uses a single column.

**Step 3: Run RED.**

Run:

```bash
npm run test --workspace=@theorvane/openvideo-site
```

Expected: FAIL because the structured workflow and complete local-storage boundary do not yet exist.

## Task 8: Implement OpenVideo’s local workflow and privacy boundary

**Objective:** Improve product comprehension while keeping all current claims factual.

**Files:**
- Modify: `apps/openvideo/app/page.tsx`
- Modify: `apps/openvideo/app/globals.css`
- Modify: `apps/openvideo/test/home.test.tsx`
- Modify: `apps/openvideo/test/responsive-contract.test.ts`

**Step 1: Implement the released workflow.** Keep the existing hero title and GitHub/release destinations. Rework the adjacent preview into three named semantic stages: `Capture` a selected window, `Edit` on a local timeline, and `Export` an MP4 to the device.

**Step 2: Make feature and privacy copy inspectable.** Retain released local capture, timeline, export, and optional user-configured local narration tooling. Expand the local-control section into readable lists or paragraphs that name locally stored recordings, projects, imported assets, voice profiles, and exports. Retain the absence of built-in cloud uploads, accounts, and analytics.

**Step 3: Protect the availability boundary.** Do not add AI-assisted edits, AI generation, connected service operation, automatic remote processing, provider calls, or model downloads. If future AI direction appears anywhere, label it `Planned` in text.

**Step 4: Implement CSS.** Retain dark navy, mint, and violet accents. Use bounded workflow cards and a one-column compact layout. Keep the main visual proof abstract and CSS-based rather than using product screenshots or external assets.

**Step 5: Run GREEN.**

Run:

```bash
npm run test --workspace=@theorvane/openvideo-site
```

Expected: PASS.

**Step 6: Commit and push.**

```bash
git add apps/openvideo/app/page.tsx apps/openvideo/app/globals.css apps/openvideo/test/home.test.tsx apps/openvideo/test/responsive-contract.test.ts
git commit -m "feat(openvideo): surface local capture-to-export workflow"
git push
```

## Task 9: Run complete static verification

**Objective:** Validate all four application changes together from a clean workspace state.

**Files:**
- Modify: only files required to fix an observed verification failure.

**Step 1: Run the root suite.**

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: every command exits 0. If any command fails, add a focused regression test first when the failure reflects missing behavior, then make the smallest correction and re-run the affected focused test plus all six root checks.

**Step 2: Confirm tracked scope.**

```bash
git status --short
git diff --stat origin/dev...HEAD
git diff --check origin/dev...HEAD
```

Expected: only the four app page/CSS/test slices and their responsive tests are included; no `node_modules`, `.next`, `.turbo`, coverage, generated caches, credentials, or unrelated files are tracked.

## Task 10: Inspect fresh production builds at desktop and narrow viewport

**Objective:** Verify rendered behavior rather than relying solely on DOM and CSS contracts.

**Files:**
- Modify: only files required to fix an observed visual defect, with a RED test before each correction.

**Step 1: Start each production app from its final build.** Use a separate port per app, for example:

```bash
npm run build --workspace=@theorvane/theorvane-site
npm run build --workspace=@theorvane/type-mcp-site
npm run build --workspace=@theorvane/type-chain-site
npm run build --workspace=@theorvane/openvideo-site
```

Start the corresponding production server only after its final build and verify the served document uses current assets.

**Step 2: Inspect desktop.** For every root route, verify one named primary navigation, a main landmark, the hero primary CTA destination, the product/trust section, visible focus treatment, and external-link safety.

**Step 3: Inspect mobile using a true 375px CSS viewport.** Use Chrome DevTools Protocol `Emulation.setDeviceMetricsOverride` with width `375`, height `812`, device scale factor `1`, and mobile `true`. Read back `window.innerWidth`, `document.documentElement.scrollWidth`, and `document.body.scrollWidth`; require width `375` and both scroll widths no greater than `375`. Capture a screenshot for each app and inspect that all controls are visible, tappable, and not clipped.

**Step 4: Correct defects using TDD.** For any visual overflow or hidden control, add the smallest CSS/page regression assertion, observe RED, change minimal CSS, rebuild/restart the affected app, then repeat desktop and narrow inspection.

## Task 11: Deliver the implementation PR

**Objective:** Submit exactly the reviewed implementation state to `dev`.

**Files:**
- Modify: only final verified implementation files from Tasks 1–10.

**Step 1: Create the implementation branch from current `origin/dev`.**

```bash
git fetch origin
git switch dev
git pull --ff-only origin dev
git switch -c feat/72-four-site-landing-refresh
```

**Step 2: Push the verified commits and create the PR.** Use title `feat: refresh all public landing pages`, base `dev`, body containing `Closes #72`, the exact verification commands and results, and labels `type: feature`, `area: website`, `area: brand`, and `priority: high`. Assign `sjungwon03`.

**Step 3: Request independent review against the exact current SHA.** Request `sjungwon03-ai`, invoke the code-reviewer profile with a fresh-clone exact-SHA prompt, and require a formal `APPROVE` or `CHANGES_REQUESTED` review. Do not merge from a branch name alone.

**Step 4: Address feedback safely.** Every accepted finding gets a focused RED test before a correction. Push a new commit, re-run the focused and complete verification, then request a new latest-head review.

**Step 5: Merge only when current-head evidence matches.** Confirm GitHub’s PR head SHA equals local `HEAD`, the required `verify` check is successful, the latest formal `sjungwon03-ai` review approves that SHA, all threads are resolved, and the PR is mergeable. Squash merge to `dev`, confirm Issue #72 closes, and fast-forward the local `dev` checkout. Do not create a `dev` to `main` release PR in this task.
