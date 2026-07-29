# Guided Workspace Documentation Homes Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Rework TypeMCP and TypeChain `/docs` homes into the approved guided-workspace layout, making the shared Petstore stage, next local Build action, and remaining documentation intents immediately clear without changing canonical source content or article navigation.

**Architecture:** Keep both homes as server components that read the existing synchronized `RepositoryDocument[]`. Each route derives its local Build sequence by `document.group === "Build"` and sorts it numerically by `curriculumStep`; it keeps its existing route filters for Get started, Learn, Integrate, and Reference. Implement structurally parallel product-local JSX and CSS rather than a new shared package: the two apps already own their accent tokens, package-boundary copy, headers, and product-specific CTA semantics, while the scope is a one-page redesign.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript, CSS, Vitest + Testing Library, existing manifest/repository reader, Chrome DevTools Protocol for true 375px screenshots.

**Design source:** `docs/superpowers/specs/2026-07-30-guided-workspace-docs-homes-design.md` (commit `40abaa6b30e121a4597251ac5df814fec8dee2e8`)

**Issue / branch:** Theorvane/website#120 on `docs/120-guided-workspace-homes`, based on current protected `dev`.

---

## Guardrails

- Do **not** modify the TypeMCP or TypeChain canonical repositories, Website source pins, synchronized Markdown, manifests, sync scripts, sitemap/static params, article components, `DocumentPager`, or sidebar structure.
- Do **not** introduce client state, persisted progress, user accounts, charts, theme switching, network fetching, fake completion controls, or a dark-mode/site-wide rebrand.
- The workflow panel is descriptive navigation. Its `1 / 6` and `4 / 6` labels describe the canonical shared curriculum sequence, not saved user completion.
- The existing `DocsSidebar` must remain a closed-by-default `<details>` on narrow viewports and existing terminal `nextRoute: null` pager behavior must remain covered by its component suites.
- Portal-local home copy may summarize navigational intent and ownership boundaries; detailed tutorial prose remains immutable upstream source.
- Preserve external-link safety attributes and existing `Skip to documentation`, primary navigation, document taxonomy headings, source pin link, titles, canonical metadata, and product package versions.

## Baseline verification before Task 1

Run in `/tmp/theorvane-website-docs-116` after fetching `origin/dev` and confirming this branch is based on the approved spec commit:

```bash
git fetch --no-tags origin dev
git status --short --branch
git rev-parse HEAD
git merge-base --is-ancestor origin/dev HEAD
npm --workspace=@theorvane/type-mcp-site test
npm --workspace=@theorvane/type-chain-site test
npm --workspace=@theorvane/type-mcp-site run typecheck
npm --workspace=@theorvane/type-chain-site run typecheck
git diff --check
```

Expected: baseline tests/typechecks/diff check pass before adding new requirements. If dependencies are absent, run `npm ci` once first; do not commit `node_modules` or generated docs cache changes unless tracked and intentionally updated by existing sync workflow.

---

### Task 1: Add TypeMCP guided-workspace home RED contract

**Objective:** Express TypeMCP’s selected layout behavior before changing its route or CSS.

**Files:**
- Modify: `apps/type-mcp/app/docs/page.test.tsx`
- Do not change production code in this task.

**Step 1: Write the failing test**

Extend the existing `TypeMCP docs index` suite with a second focused test. Render real `await DocsIndex()` and assert the new semantic contract—not CSS class strings alone:

```tsx
it("makes the first Petstore stage a guided workspace instead of a second Build card grid", async () => {
  render(await DocsIndex());

  expect(screen.getByRole("heading", { name: /Build a typed Petstore workflow/i })).toBeTruthy();
  expect(screen.getByText(/Your learning path/i)).toBeTruthy();
  expect(screen.getByText(/Step 1 of 6/i)).toBeTruthy();

  const start = screen.getByRole("link", { name: /Start the Petstore workspace/i });
  expect(start.getAttribute("href")).toBe("/docs/build/petstore-project-setup");

  const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
  expect(workflow.getByRole("link", { name: /Petstore project setup/i }).getAttribute("href")).toBe("/docs/build/petstore-project-setup");
  expect(workflow.getByRole("link", { name: /Petstore TypeMCP foundation/i }).getAttribute("href")).toBe("/docs/build/petstore-typemcp-foundation");
  expect(workflow.getByRole("link", { name: /Petstore walkthrough/i }).getAttribute("href")).toBe("/docs/petstore-walkthrough");

  for (const name of ["Get started", "Learn", "Integrate", "Reference"]) {
    expect(screen.getByRole("heading", { name })).toBeTruthy();
  }
  expect(screen.queryByRole("heading", { name: "Build" })).toBeNull();
  expect(screen.getByText(/application owns hosting, authorization, durable state, models/i)).toBeTruthy();
});
```

If Testing Library does not expose `getByRole` as a method on the returned `HTMLElement`, scope it using `within(workflow)` and add `within` to the import. The required behavior is the named workflow region, ordered real links, the `Step 1 of 6` status, no second equal-weight Build `h2`, and preserved truthfulness copy.

**Step 2: Run the focused test to verify RED**

Run:

```bash
npm exec --workspace=@theorvane/type-mcp-site -- vitest run app/docs/page.test.tsx
```

Expected: FAIL because the current page has `TypeMCP documentation`, an equal-weight `Build` section, no named workflow region, and no `Step 1 of 6` label. The existing taxonomy test must still pass.

**Step 3: Preserve the RED evidence**

Record the exact missing semantic element in the issue/working brief (for example, `Unable to find an accessible element with the role "region" and name /Petstore workflow/i`). Do not weaken the expectation to match existing markup.

**Step 4: Commit test-only RED checkpoint**

```bash
git add apps/type-mcp/app/docs/page.test.tsx
git commit -m "test(docs): define TypeMCP guided workspace home"
git push
```

Do not begin production implementation until this test failure is reviewed locally and the immutable pushed checkpoint exists.

---

### Task 2: Add TypeChain guided-workspace home RED contract

**Objective:** Capture the distinct continuation stage and CTA for TypeChain before changing TypeChain markup or CSS.

**Files:**
- Modify: `apps/type-chain/app/docs/page.test.tsx`
- Do not change production code in this task.

**Step 1: Write the failing test**

Add a focused test analogous to Task 1, with TypeChain-specific values:

```tsx
it("continues the shared Petstore path from the TypeChain stage", async () => {
  render(await DocsIndex());

  expect(screen.getByRole("heading", { name: /Continue the typed Petstore workflow/i })).toBeTruthy();
  expect(screen.getByText(/Your learning path/i)).toBeTruthy();
  expect(screen.getByText(/Step 4 of 6/i)).toBeTruthy();

  expect(screen.getByRole("link", { name: /Continue the Petstore workspace/i }).getAttribute("href"))
    .toBe("/docs/build/petstore-typechain-foundation");

  const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
  expect(within(workflow).getByRole("link", { name: /Petstore TypeChain foundation/i }).getAttribute("href"))
    .toBe("/docs/build/petstore-typechain-foundation");
  expect(within(workflow).getByRole("link", { name: /Petstore policy and composition/i }).getAttribute("href"))
    .toBe("/docs/build/petstore-policy-and-composition");
  expect(within(workflow).getByRole("link", { name: /Petstore walkthrough/i }).getAttribute("href"))
    .toBe("/docs/petstore-walkthrough");

  for (const name of ["Get started", "Learn", "Integrate", "Reference"]) {
    expect(screen.getByRole("heading", { name })).toBeTruthy();
  }
  expect(screen.queryByRole("heading", { name: "Build" })).toBeNull();
  expect(screen.getByText(/application owns models, credentials, policy enforcement, state, hosting, and deployment/i)).toBeTruthy();
});
```

**Step 2: Run focused RED**

Run:

```bash
npm exec --workspace=@theorvane/type-chain-site -- vitest run app/docs/page.test.tsx
```

Expected: FAIL because the existing equal-weight layout has no guided workflow region or `Step 4 of 6` label.

**Step 3: Confirm unrelated contracts remain green**

Run both current article/component suites (they must not be altered to accommodate a home-only redesign):

```bash
npm exec --workspace=@theorvane/type-mcp-site -- vitest run components/docs/docs-components.test.tsx
npm exec --workspace=@theorvane/type-chain-site -- vitest run components/docs/docs-components.test.tsx
```

Expected: existing pager/sidebar/article tests remain PASS; only new home tests are RED.

**Step 4: Commit and push the test checkpoint**

```bash
git add apps/type-chain/app/docs/page.test.tsx
git commit -m "test(docs): define TypeChain guided workspace home"
git push
```

---

### Task 3: Implement semantic TypeMCP guided-workspace markup

**Objective:** Replace the TypeMCP home’s equal Build card section with a named guided workflow, retaining truthfulness and intent routes.

**Files:**
- Modify: `apps/type-mcp/app/docs/page.tsx`
- Test: `apps/type-mcp/app/docs/page.test.tsx`

**Step 1: Derive the Build sequence from existing metadata**

Immediately after the existing `build` filter, create a non-mutating step-order copy:

```tsx
const workflow = [...build].sort(
  (left, right) => (left.document.curriculumStep ?? Number.MAX_SAFE_INTEGER)
    - (right.document.curriculumStep ?? Number.MAX_SAFE_INTEGER),
);
```

Do not use `documents` manifest adjacency as sequence ordering and do not inspect Markdown body text. The manifest curriculum metadata is the route-local navigation source of truth.

**Step 2: Replace the title/header content with the action-led hero**

Within `<article id="docs-content" className="docs-index">`, retain the eyebrow/version and replace the generic `h1`/lede area with:

```tsx
<div className="docs-workspace-hero">
  <div>
    <p className="eyebrow">TypeMCP technical documentation · Published 0.2.2</p>
    <h1>Build a typed Petstore workflow, one boundary at a time.</h1>
    <p className="docs-lede">
      Start with a small application-owned workspace. Learn the declaration, compiler,
      and runtime seams before you compose a real MCP server.
    </p>
  </div>
  <aside className="docs-workspace-status" aria-label="Your learning path">
    <p>Your learning path</p>
    <strong>Petstore workflow<br />6 focused steps</strong>
    <div className="docs-workspace-progress" aria-hidden="true"><span style={{ width: "17%" }} /></div>
    <span>Step 1 of 6 · Ready to start</span>
  </aside>
</div>
```

Use CSS for uppercase treatment; do not replace visible text with a background image or encode progress as an inaccessible-only visual.

**Step 3: Add the named workflow region**

Replace the current workflow section and separate `Build` section with a single named section. Render real metadata, making the CTA and each build card an anchor:

```tsx
<section className="docs-workspace-flow" aria-labelledby="workflow-heading">
  <div className="docs-section-heading">
    <div>
      <p className="eyebrow">A canonical, source-owned curriculum</p>
      <h2 id="workflow-heading">Petstore workflow</h2>
    </div>
    <p>Start with the workspace, then make each runtime choice explicitly.</p>
  </div>
  <div className="docs-workflow-grid">
    {workflow.map(({ document }, index) => (
      <a
        className={index === 0 ? "docs-workflow-card docs-workflow-card-primary" : "docs-workflow-card"}
        href={document.route}
        key={document.route}
      >
        <span>Step {document.curriculumStep} of {document.curriculumTotal}</span>
        <strong>{index === 0 ? "Start the Petstore workspace" : document.title}</strong>
        <p>{document.summary}</p>
        {index === 0 ? <em>Begin Build →</em> : null}
      </a>
    ))}
  </div>
</section>
```

The first card’s accessible name must include `Start the Petstore workspace` and route to `/docs/build/petstore-project-setup`. Preserve a paragraph near it containing the existing explicit resolver/runtime and lifecycle boundary phrasing required by the existing test; keep or adapt the current `release-callout` unchanged enough that its truthful package ownership copy remains visible.

**Step 4: Replace intent sections with the quiet intent grid**

Keep real headings and cards for `Get started`, `Learn`, `Integrate`, and `Reference`; remove only the duplicate `Build` home section. Use an intent grid wrapper such as:

```tsx
<section className="docs-intent-section" aria-labelledby="intent-heading">
  <div className="docs-section-heading">
    <h2 id="intent-heading">Continue by intent</h2>
    <p>Short, focused reading paths</p>
  </div>
  <div className="docs-intent-grid">
    <section aria-labelledby="get-started-heading">…existing cards(getStarted)…</section>
    <section aria-labelledby="learn-heading">…existing cards(learn)…</section>
    <section aria-labelledby="integrate-heading">…existing cards(integrate)…</section>
    <section aria-labelledby="reference-heading">…existing cards(reference)…</section>
  </div>
</section>
```

Do not nest an `h2` inside an anchor or fabricate a build completion state.

**Step 5: Run focused GREEN and article regression checks**

```bash
npm exec --workspace=@theorvane/type-mcp-site -- vitest run app/docs/page.test.tsx
npm exec --workspace=@theorvane/type-mcp-site -- vitest run components/docs/docs-components.test.tsx app/docs/[...slug]/page.test.tsx
npm --workspace=@theorvane/type-mcp-site run typecheck
git diff --check
```

Expected: home contracts and existing article/pager/sidebar/static-route suites pass. TypeScript must reject neither inline progress markup nor document metadata access.

**Step 6: Commit and push the TypeMCP slice**

```bash
git add apps/type-mcp/app/docs/page.tsx apps/type-mcp/app/docs/page.test.tsx
git commit -m "feat(docs): guide the TypeMCP Petstore workspace"
git push
```

---

### Task 4: Implement semantic TypeChain guided-workspace markup

**Objective:** Apply the same layout system while truthfully continuing the shared journey at TypeChain step 4.

**Files:**
- Modify: `apps/type-chain/app/docs/page.tsx`
- Test: `apps/type-chain/app/docs/page.test.tsx`

**Step 1: Derive ordered TypeChain Build documents**

Use the same metadata-only sorted sequence as Task 3:

```tsx
const workflow = [...build].sort(
  (left, right) => (left.document.curriculumStep ?? Number.MAX_SAFE_INTEGER)
    - (right.document.curriculumStep ?? Number.MAX_SAFE_INTEGER),
);
```

**Step 2: Add TypeChain-specific hero/status semantics**

Use product-specific truthful wording:

```tsx
<p className="eyebrow">TypeChain technical documentation · Published 0.1.1</p>
<h1>Continue the typed Petstore workflow at the composition boundary.</h1>
<p className="docs-lede">
  Continue the workspace with typed tools, policy intent, and a composition boundary
  your application controls.
</p>
```

The status panel must visibly state `Step 4 of 6` and `Petstore workflow / 6 focused steps`. The decorative progress fill may use `width: "67%"`; it is not a persisted user state.

**Step 3: Render TypeChain workflow cards**

Create the same named `Petstore workflow` region, but use TypeChain stage routing. The primary card name/CTA must be `Continue the Petstore workspace`, link to `/docs/build/petstore-typechain-foundation`, and still expose the real document title in the ordered list so the test can find both desired terms. A minimal pattern is:

```tsx
<strong>{index === 0 ? "Continue the Petstore workspace" : document.title}</strong>
<p>{index === 0 ? `${document.title}: ${document.summary}` : document.summary}</p>
```

Retain a visible boundary statement that TypeChain does not provide models, credentials, policy enforcement, or transport; retain the existing published package boundary callout.

**Step 4: Keep four intent groups, remove duplicate Build group**

Use exactly the same section shape as Task 3 for Get started, Learn, Integrate, and Reference. Keep their current filters and genuine card hrefs. Do not move TypeMCP content into TypeChain or imply that TypeChain owns prior workspace setup.

**Step 5: Run focused GREEN and static route checks**

```bash
npm exec --workspace=@theorvane/type-chain-site -- vitest run app/docs/page.test.tsx
npm exec --workspace=@theorvane/type-chain-site -- vitest run components/docs/docs-components.test.tsx app/docs/[...slug]/page.test.tsx
npm --workspace=@theorvane/type-chain-site run typecheck
git diff --check
```

Expected: new TypeChain home contract is green; existing terminal pager, sidebar, article curriculum context, and static params contracts remain green.

**Step 6: Commit and push the TypeChain slice**

```bash
git add apps/type-chain/app/docs/page.tsx apps/type-chain/app/docs/page.test.tsx
git commit -m "feat(docs): guide the TypeChain Petstore workspace"
git push
```

---

### Task 5: Add product-local guided-workspace CSS and a narrow-layout contract

**Objective:** Implement the approved light guided-workspace visual hierarchy in each product’s existing tokenized CSS without changing article/sidebar behavior.

**Files:**
- Modify: `apps/type-mcp/app/globals.css`
- Modify: `apps/type-chain/app/globals.css`
- Modify: `apps/type-mcp/app/docs/page.test.tsx`
- Modify: `apps/type-chain/app/docs/page.test.tsx`

**Step 1: Add layout assertions before CSS**

Add one assertion per home test that checks structural classes required for responsive layout, not pixel values:

```tsx
expect(document.querySelector(".docs-workspace-hero")).toBeTruthy();
expect(document.querySelector(".docs-workflow-grid")).toBeTruthy();
expect(document.querySelector(".docs-intent-grid")).toBeTruthy();
```

This test should be RED until Tasks 3–4 markup exists; if markup is already green, this is a structural regression lock before styling. The true responsive proof is Task 7’s CDP inspection.

**Step 2: Append or carefully replace only docs-home style rules**

Because these files are currently minified, first format only the affected docs-related rule block or append a clearly grouped unminified section at the end. Do not reformat unrelated site CSS in the same commit.

Add equivalent product-local rules using existing custom properties (`--bg`, `--ink`, `--muted`, `--line`, `--blue`) and these key declarations:

```css
/* Guided workspace docs home */
.docs-workspace-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.65fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: end;
  padding-bottom: clamp(2rem, 5vw, 3rem);
  border-bottom: 1px solid var(--line);
}
.docs-workspace-status {
  background: var(--ink);
  color: #fff;
  border-radius: 1rem;
  padding: 1.35rem;
}
.docs-workflow-grid,
.docs-intent-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.docs-workflow-card,
.docs-intent-grid > section {
  min-width: 0;
}
.docs-workflow-card {
  display: flex;
  min-height: 10.5rem;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 0.9rem;
  padding: 1.25rem;
  text-decoration: none;
}
.docs-workflow-card-primary {
  border-color: var(--blue);
  background: color-mix(in srgb, var(--bg) 94%, var(--blue));
}
.docs-workflow-card:focus-visible,
.docs-card:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 3px;
}
```

Do not use `color-mix` if the project browser-support policy prohibits it or current builds reject it; substitute a fixed product-local neutral tint. Preserve the old `.docs-card` article/intention styles where they remain in use.

**Step 3: Add narrow viewport rules**

At the existing mobile breakpoint, explicitly set:

```css
.docs-workspace-hero,
.docs-workflow-grid,
.docs-intent-grid {
  grid-template-columns: minmax(0, 1fr);
}
.docs-workspace-status { margin-top: 1.25rem; }
.docs-workflow-card,
.docs-card { min-height: 44px; }
```

Do not force the `.docs-sidebar details` open. Do not hide the home `h1`, CTA, or source link.

**Step 4: Run per-app focused GREEN tests and static checks**

```bash
npm exec --workspace=@theorvane/type-mcp-site -- vitest run app/docs/page.test.tsx components/docs/docs-components.test.tsx
npm exec --workspace=@theorvane/type-chain-site -- vitest run app/docs/page.test.tsx components/docs/docs-components.test.tsx
npm --workspace=@theorvane/type-mcp-site run lint
npm --workspace=@theorvane/type-chain-site run lint
npm --workspace=@theorvane/type-mcp-site run typecheck
npm --workspace=@theorvane/type-chain-site run typecheck
git diff --check
```

Expected: all commands PASS. If a style lint error requires changing CSS structure, re-run the same suite after the final adjustment.

**Step 5: Commit and push the style slice**

```bash
git add apps/type-mcp/app/globals.css apps/type-chain/app/globals.css \
  apps/type-mcp/app/docs/page.test.tsx apps/type-chain/app/docs/page.test.tsx
git commit -m "design(docs): style guided workspace homes"
git push
```

---

### Task 6: Run complete local verification and inspect generated output

**Objective:** Prove the new home pages build statically and do not regress navigation, source synchronization, article routes, or security gates.

**Files:**
- No source changes expected.
- If a command reveals a real defect, return to the relevant TDD task: write a focused regression first, demonstrate RED, apply a minimal correction, repeat all affected checks.

**Step 1: Run full quality gates**

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
git status --short
```

Expected: every command exits 0; production dependency audit reports no high-or-higher vulnerabilities; status contains only the intended tracked changes. The `build` must generate TypeMCP and TypeChain `/docs` plus all existing curriculum/article static routes.

**Step 2: Start fresh production servers on unused ports**

Do not touch historical 3101/3102 owners. Confirm ports are free before starting:

```bash
ss -ltn "sport = :3201" || true
ss -ltn "sport = :3202" || true
```

Start after the final successful build:

```bash
../../node_modules/.bin/next start --port 3201
# workdir: apps/type-mcp
../../node_modules/.bin/next start --port 3202
# workdir: apps/type-chain
```

Use tracked Hermes background processes only. Do not use shell `&`, and record process IDs. Verify readiness and then fetch:

```bash
curl -fsS http://127.0.0.1:3201/docs > /tmp/typemcp-docs-home.html
curl -fsS http://127.0.0.1:3202/docs > /tmp/typechain-docs-home.html
```

**Step 3: Verify generated HTML semantics**

Use a short Python parser or focused assertions to prove each rendered home includes:

- TypeMCP: the action-led heading, `Step 1 of 6`, named `Petstore workflow` region, first CTA route, all four intent headings, source pin link, and no second `Build` h2.
- TypeChain: corresponding `Step 4 of 6`, continuation CTA, workflow links, four intent headings, source pin, no second `Build` h2.
- Both: primary navigation labels, skip link, external source link `rel="noopener noreferrer"`/new-tab semantics, and no output that claims stored completion.

Example command outline:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
# Parse headings/links from /tmp/*-docs-home.html and assert the listed route/text contract.
PY
```

**Step 4: Commit verification-only changes only if they are intentional docs/test updates**

No commit should be created merely for generated output or `/tmp` artifacts. If no source changed, continue to Task 7.

---

### Task 7: Perform desktop and true-375px visual/accessibility verification

**Objective:** Confirm the selected guided-workspace visual design is usable on both products without hiding content or changing mobile sidebar behavior.

**Files:**
- Temporary only: `/tmp/verify-guided-docs-mobile.py`, `/tmp/typemcp-guided-docs-375.png`, `/tmp/typechain-guided-docs-375.png`
- Do not commit temporary scripts/screenshots.

**Step 1: Desktop inspection**

Use browser tooling against `http://127.0.0.1:3201/docs` and `http://127.0.0.1:3202/docs` to verify:

- labelled primary navigation and document main landmark;
- one visible `h1`, one named Petstore workflow region, CTA and intent-card destinations;
- no overlap between hero copy and dark status card;
- real source provenance link remains available;
- hover/focus affordances are visible.

**Step 2: Run true mobile CDP inspection**

Start an isolated Chrome with a dedicated temporary profile and a new CDP port only if free. Use `Emulation.setDeviceMetricsOverride` exactly as follows:

```json
{"width":375,"height":812,"deviceScaleFactor":1,"mobile":true}
```

For each docs home, capture and evaluate:

```js
JSON.stringify({
  innerWidth: window.innerWidth,
  documentScrollWidth: document.documentElement.scrollWidth,
  bodyScrollWidth: document.body.scrollWidth,
  hasHomeHeading: document.querySelector("h1")?.textContent,
  closedSidebar: !document.querySelector(".docs-sidebar details")?.open,
  primaryHref: document.querySelector(".docs-workflow-card-primary")?.getAttribute("href")
})
```

Required numeric evidence: `innerWidth === 375`, `documentScrollWidth <= 375`, and `bodyScrollWidth <= 375` for each page. Required state evidence: the sidebar `details` is closed and the primary CTA route is correct.

**Step 3: Visually inspect screenshots**

Confirm on each 375px capture:

- home heading and primary workflow CTA appear above the fold or begin naturally without a collapsed/blank hero;
- no clipped status panel, heading, card text, or source bar;
- one-column workflow and intent cards have individually tappable, visually separated rows;
- no horizontal scrolling/overflow;
- sidebar is closed by default.

If a defect is found, add a narrowly scoped regression contract first (semantic layout class/closed sidebar plus any specific affected route), then fix minimal CSS and repeat Tasks 5–7 after the final CSS edit.

**Step 4: Stop only controller-owned temporary servers and Chrome**

Verify listener ownership with `ss -ltnp` and `ps`; terminate only the processes started for this verification. Recheck ports `3201`, `3202`, and the chosen CDP port are free. Do not remove the Git worktree until post-review delivery is complete.

---

### Task 8: Prepare durable review checkpoint and protected PR

**Objective:** Deliver a reviewable exact head to `dev` without mixing generated artifacts or unrelated live-site changes.

**Files:**
- Add only if missing: `.agents/task-briefs/120-guided-workspace-homes.md`
- Otherwise modify only implementation/test/CSS files from Tasks 1–5 and the pre-approved design/plan documents.

**Step 1: Write/update recovery brief**

Create a concise durable brief with:

- issue URL, branch, base `origin/dev`, exact feature SHA;
- selected A design direction and explicitly rejected dark command-center/complete editorial alternatives;
- non-goals: no source pin/content/article/pager/sidebar changes;
- exact RED evidence, focused GREEN commands, full quality results, and mobile CDP metric results;
- temporary process/asset cleanup status.

**Step 2: Inspect final change scope**

```bash
git status --short
git diff --check origin/dev...HEAD
git diff --name-status origin/dev...HEAD
git diff --stat origin/dev...HEAD
git ls-files --others --exclude-standard
```

Expected: only issue #120 scope files. Remove temporary caches, CDP profile, generated output, and screenshots from the repository before commit; `/tmp` remains outside git.

**Step 3: Final durable commit and push**

```bash
git add \
  apps/type-mcp/app/docs/page.tsx \
  apps/type-mcp/app/docs/page.test.tsx \
  apps/type-mcp/app/globals.css \
  apps/type-chain/app/docs/page.tsx \
  apps/type-chain/app/docs/page.test.tsx \
  apps/type-chain/app/globals.css \
  .agents/task-briefs/120-guided-workspace-homes.md
git commit -m "feat(docs): guide TypeMCP and TypeChain workspaces"
git push
```

If earlier task commits already contain these files, the final commit should include only the brief or final corrective changes. Never create an empty commit solely to match this example.

**Step 4: Open PR and request independent review**

Create an open PR from `docs/120-guided-workspace-homes` to `dev` with:

- linked Issue #120;
- exact head SHA;
- summary of semantic/UI behavior, source/provenance preservation, and TDD proof;
- full gate output and true 375px evidence;
- explicit note that production release is separate and no registry/package release is involved.

Request `sjungwon03-ai` only after the head is final. Do not label an approval before it exists.

**Step 5: Exact-head review gates**

Before merging, independently verify:

```bash
PR_NUMBER="$(GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr list --repo Theorvane/website --head docs/120-guided-workspace-homes --base dev --state open --json number --jq '.[0].number')"
test -n "$PR_NUMBER"
HEAD=$(git rev-parse HEAD)
test "$(GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr view "$PR_NUMBER" --repo Theorvane/website --json headRefOid --jq .headRefOid)" = "$HEAD"
GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr checks "$PR_NUMBER" --repo Theorvane/website --required
GH_CONFIG_DIR=/home/heeho3/.config/gh gh api graphql -f query="query { repository(owner:\"Theorvane\", name:\"website\") { pullRequest(number:$PR_NUMBER) { reviewThreads(first:100) { nodes { isResolved } } } } }" --jq '[.data.repository.pullRequest.reviewThreads.nodes[].isResolved] | all'
GH_CONFIG_DIR=/home/heeho3/.config/gh gh pr view "$PR_NUMBER" --repo Theorvane/website --json headRefOid,mergeable,mergeStateStatus,reviewDecision,reviews,statusCheckRollup,url
```

Required: current SHA matches, required checks pass, every review thread resolved, independent approval is attached to this exact SHA, and branch protection reports `CLEAN`/mergeable. Any push invalidates prior review evidence and requires a new exact-head review.

**Step 6: Merge only through protected policy**

Use the repository’s approved merge strategy for `dev`, then verify the Issue closes, remote `dev` matches the merge commit, and the push verification workflow succeeds. Do not begin `dev → main` promotion until this integration verification is complete.

---

## Final release note (separate future task)

Website #120 remains an integration delivery after Task 8. Production requires a separate `dev → main` promotion issue/PR, exact-head review, `verify` and `release-promotion` checks, ancestry verification, merge through protection, `main` CI/deployment verification, and production desktop/375px route checks. It is source-only: do not publish npm packages, create registry artifacts, modify package versions, or create a GitHub Release.

## Plan review checklist

- [x] Exact route/test/CSS paths stated.
- [x] Separate TDD RED and GREEN commands for each product.
- [x] Build-order logic uses curriculum metadata rather than manifest adjacency.
- [x] Existing terminal pager, article, source pin, and sidebar contracts are protected.
- [x] Accessibility, true-mobile CDP, final build, audit, and diff checks are explicit.
- [x] Independent review and protected integration/release boundaries are explicit.
- [x] No canonical source content, pin, registry, or runtime scope expansion is included.
