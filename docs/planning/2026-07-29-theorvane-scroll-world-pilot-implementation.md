# Theorvane Scroll World Pilot Implementation Plan

> **For Hermes:** Use `subagent-driven-development` only after this plan and its dedicated production-spend gate are approved. Execute one task at a time, bind all reviews to exact commit SHAs, and do not run Higgsfield generation until Task 10 has explicit in-chat cost approval.

**Goal:** Add an accessible, production-ready Scroll World system to the Theorvane site, then produce and wire a separately approved native 16:9/9:16 five-scene media pilot without changing any product capability claims.

**Architecture:** `@theorvane/ui` receives the small reusable Scroll World primitives: immutable manifest types, source-selection and time-mapping helpers, and a progressive-enhancement React stage. The Theorvane app owns its five-scene manifest, HTML copy, local media paths, CSS, and test contracts. Media generation occurs out of band behind a manifest/provenance and explicit-spend checkpoint; generated assets are added only after quality, license, repository-size, and fallback checks pass.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict mode, Vitest + Testing Library, CSS, HTML video, `requestAnimationFrame`, `matchMedia`, IntersectionObserver, Higgsfield MCP generation tools, `ffmpeg`/`ffprobe` for frame extraction and encode inspection.

**Design source:** `docs/superpowers/specs/2026-07-29-four-site-scroll-world-design.md` (merged in PR #83, commit `8adca93e9d2d3368305c0f865d977606c81d4888`).

---

## Preconditions and delivery rules

1. Work from a fresh branch rooted at current `origin/dev`: `feat/<issue>-theorvane-scroll-world`.
2. Create a focused implementation Issue before Task 1. Give it exactly one primary type label (`type: feature`) and scopes `area: website`, `area: brand`, `priority: high`; assign `sjungwon03`.
3. Create `.agents/task-briefs/<issue>-theorvane-scroll-world.md` recording base SHA, design source, branch, exact task sequence, and all media guardrails.
4. Keep this plan-only issue #84 separate. The implementation Issue/PR is for the code/media pilot only.
5. Do not commit `.next`, `node_modules`, credentials, OAuth callback URLs, tokens, signed Higgsfield URLs, temporary generation JSON, raw reroll outputs, or build logs.
6. Do not use Higgsfield website, sandbox, secrets, marketplace invocation, TikTok, deployment, credit-purchase, or account-modification tools. Only use image/video/media/job/model/balance tools that have been explicitly enabled.
7. Every code change follows RED → GREEN → focused verification → commit → push. Never begin a new slice with an outstanding exact-SHA review.

## Canonical media locations and repository policy

Add only reviewed, optimized public media to:

```text
apps/theorvane/public/scroll-world/
  manifest.json
  desktop/
    timeline.mp4
    poster.webp
  mobile/
    timeline.mp4
    poster.webp
  provenance.json
```

Keep prompts, raw downloaded media, extracted seam frames, checksums before final selection, and Higgsfield job responses in an ignored local work directory outside the repository:

```text
/tmp/theorvane-scroll-world-production/
```

`manifest.json` is a public, non-secret runtime manifest that contains only relative media paths, duration, scene IDs, per-scene normalized ranges, aspect ratios, and asset checksums. `provenance.json` contains no credential/signed URL data: selected model names, non-sensitive prompt hashes, source job IDs, output dimensions/duration, encoder settings, date, and reviewer verdict. If the repository’s file-size policy rejects the final source media, upload assets through the approved production asset channel and keep the same relative/public URLs in the runtime manifest; do not bypass GitHub limits with LFS or another storage service without a user-approved scope change.

## Task 1: Create the implementation issue, branch, and recovery brief

**Objective:** Establish a single durable feature-delivery identity before implementation.

**Files:**
- Create: `.agents/task-briefs/<issue>-theorvane-scroll-world.md`
- Reference: `docs/superpowers/specs/2026-07-29-four-site-scroll-world-design.md`

**Step 1: Create the Issue**

Use a factual body with scope, acceptance criteria, explicit non-goals, the merged design-document path/commit, and these gates:

- no paid media generation until the calibration report is approved in-chat;
- native 16:9 and native 9:16 sources;
- preserved semantic, keyboard, media-failure, and reduced-motion paths;
- independent exact-head review before merge.

**Step 2: Apply issue metadata**

Assign `sjungwon03`; use `type: feature`, `area: website`, `area: brand`, and `priority: high` on both Issue and future PR.

**Step 3: Branch from current integration tip**

Run:

```bash
git fetch origin dev --prune
git switch -c feat/<issue>-theorvane-scroll-world origin/dev
git status --short --branch
git rev-parse HEAD
```

Expected: clean branch with `origin/dev` as its base.

**Step 4: Write the recovery brief**

Record the Issue, base SHA, branch, design document/commit, approved scene IDs, media directory policy, no-spend gate, and commands used for each test cycle.

**Step 5: Commit and push only the brief**

```bash
git add .agents/task-briefs/<issue>-theorvane-scroll-world.md
git commit -m "docs: add Scroll World pilot task brief (#<issue>)"
git push -u origin HEAD
```

---

## Task 2: Define immutable shared Scroll World contracts

**Objective:** Give the UI package explicit, product-neutral types that separate media wiring from product copy.

**Files:**
- Create: `packages/ui/src/scroll-world.ts`
- Modify: `packages/ui/src/index.tsx`
- Create: `packages/ui/test/scroll-world.test.ts`

**Step 1: Write the failing type/helper tests**

Create `packages/ui/test/scroll-world.test.ts` with tests for:

```ts
import { describe, expect, it } from "node:test";
import {
  chooseScrollWorldVariant,
  clampScrollWorldProgress,
  scrollWorldTimeAtProgress,
  type ScrollWorldManifest,
} from "../src/scroll-world.js";

const manifest: ScrollWorldManifest = {
  id: "theorvane-pilot",
  ariaLabel: "Theorvane product world",
  scenes: [
    { id: "studio-beacon", title: "Studio beacon", start: 0, end: 0.2, href: "#products" },
    { id: "product-constellation", title: "Product constellation", start: 0.8, end: 1, href: "#products" },
  ],
  desktop: { src: "/scroll-world/desktop/timeline.mp4", poster: "/scroll-world/desktop/poster.webp", duration: 40, aspectRatio: "16:9" },
  mobile: { src: "/scroll-world/mobile/timeline.mp4", poster: "/scroll-world/mobile/poster.webp", duration: 40, aspectRatio: "9:16" },
};

describe("Scroll World manifest helpers", () => {
  it("clamps scroll progress and maps it to video time", () => {
    expect(clampScrollWorldProgress(-0.5)).toBe(0);
    expect(clampScrollWorldProgress(1.5)).toBe(1);
    expect(scrollWorldTimeAtProgress(manifest.desktop.duration, 0.25)).toBe(10);
  });

  it("chooses a native mobile source below the compact breakpoint", () => {
    expect(chooseScrollWorldVariant(manifest, 375)).toBe(manifest.mobile);
    expect(chooseScrollWorldVariant(manifest, 1024)).toBe(manifest.desktop);
  });
});
```

**Step 2: Run RED**

Run:

```bash
npm test --workspace=@theorvane/ui
```

Expected: FAIL because `scroll-world.ts` exports do not exist.

**Step 3: Implement minimal pure contracts**

In `packages/ui/src/scroll-world.ts`, export readonly types:

```ts
export type ScrollWorldVariant = Readonly<{
  src: string;
  poster: string;
  duration: number;
  aspectRatio: "16:9" | "9:16";
}>;

export type ScrollWorldScene = Readonly<{
  id: string;
  title: string;
  start: number;
  end: number;
  href: string;
}>;

export type ScrollWorldManifest = Readonly<{
  id: string;
  ariaLabel: string;
  scenes: readonly ScrollWorldScene[];
  desktop: ScrollWorldVariant;
  mobile: ScrollWorldVariant;
}>;

export const MOBILE_SCROLL_WORLD_BREAKPOINT = 700;
export function clampScrollWorldProgress(progress: number): number { /* return Math.min(1, Math.max(0, progress)) */ }
export function scrollWorldTimeAtProgress(duration: number, progress: number): number { /* duration × clamp */ }
export function chooseScrollWorldVariant(manifest: ScrollWorldManifest, width: number): ScrollWorldVariant { /* width <= breakpoint ? mobile : desktop */ }
```

Validate `duration` and scene ranges in a single `assertScrollWorldManifest()` helper before export/use. Reject duplicate IDs, missing `/`-rooted source/poster paths, invalid ranges, and a non-final `end` below `1`.

Re-export these symbols from `packages/ui/src/index.tsx`.

**Step 4: Run GREEN**

```bash
npm test --workspace=@theorvane/ui
npm run typecheck --workspace=@theorvane/ui
```

Expected: both pass.

**Step 5: Commit and push**

```bash
git add packages/ui/src/scroll-world.ts packages/ui/src/index.tsx packages/ui/test/scroll-world.test.ts
git commit -m "feat: add shared Scroll World contracts"
git push
```

**Step 6: Request exact-SHA review**

Ask the reviewer to check only this commit’s contract invariants and that shared code contains no product claims or external media URLs. Do not begin Task 3 until the exact commit passes review.

---

## Task 3: Add a test-first client controller with progressive enhancement

**Objective:** Implement the smallest client-side behavior that maps stage scroll progress to media time without trapping scroll or animating when reduced motion is active.

**Files:**
- Create: `packages/ui/src/scroll-world-controller.ts`
- Create: `packages/ui/test/scroll-world-controller.test.ts`
- Modify: `packages/ui/src/index.tsx`

**Step 1: Write RED tests using a real video-shaped object**

Use an object with `currentTime`, `readyState`, and a settable `src`; use a local `requestAnimationFrame` stub only for scheduling. Cover:

```ts
it("coalesces repeated scroll updates to the latest bounded time", () => { /* three progress events → one scheduled seek */ });
it("does not seek when reduced motion is enabled", () => { /* currentTime unchanged */ });
it("does not seek before media metadata is available", () => { /* readyState < 1 */ });
it("cleans up scheduled work on destroy", () => { /* RAF cancel observed */ });
```

**Step 2: Run RED**

```bash
npm test --workspace=@theorvane/ui
```

Expected: FAIL because `createScrollWorldController` is unavailable.

**Step 3: Implement `createScrollWorldController`**

Expose a narrow API:

```ts
export type ScrollWorldController = Readonly<{
  update(progress: number): void;
  setReducedMotion(reduced: boolean): void;
  destroy(): void;
}>;
```

Rules:

- retain only the latest progress until the next animation frame;
- set `video.currentTime` only when metadata is available, the requested time differs materially, and reduced motion is false;
- never call `play()`, set `window.scrollTo`, or install global handlers;
- take injected scheduling functions in tests and use browser `requestAnimationFrame`/`cancelAnimationFrame` by default;
- release all references in `destroy()`.

**Step 4: Run GREEN and static checks**

```bash
npm test --workspace=@theorvane/ui
npm run lint --workspace=@theorvane/ui
npm run typecheck --workspace=@theorvane/ui
```

**Step 5: Commit, push, and exact-SHA review**

```bash
git add packages/ui/src/scroll-world-controller.ts packages/ui/src/index.tsx packages/ui/test/scroll-world-controller.test.ts
git commit -m "feat: add scroll-scrub media controller"
git push
```

Review must confirm no autoplay/audio, bounded seek values, safe reduced-motion behavior, and teardown coverage.

---

## Task 4: Add the reusable accessible React stage

**Objective:** Wrap the controller in a client component whose semantic navigation and poster fallback work without media.

**Files:**
- Create: `packages/ui/src/scroll-world.tsx`
- Create: `packages/ui/test/scroll-world-component.test.tsx`
- Modify: `packages/ui/src/index.tsx`

**Step 1: Write RED component tests**

Using Testing Library, assert:

```tsx
render(<ScrollWorld manifest={manifest} />);
expect(screen.getByRole("region", { name: /theorvane product world/i })).toBeTruthy();
expect(screen.getByRole("navigation", { name: /world scenes/i })).toBeTruthy();
expect(screen.getByRole("link", { name: /studio beacon/i }).getAttribute("href")).toBe("#products");
expect(screen.getByTestId("scroll-world-video").getAttribute("poster")).toBe("/scroll-world/desktop/poster.webp");
```

Add a mocked `matchMedia` test that triggers a change from desktop to mobile and asserts the video source/poster change to the native mobile values. Add a reduced-motion test asserting `data-motion="reduced"`, poster visibility, and no controller initialization.

**Step 2: Run RED**

```bash
npm test --workspace=@theorvane/ui
```

Expected: FAIL because `ScrollWorld` is not exported.

**Step 3: Implement the client component**

Use `'use client'` only in this component. Render:

```tsx
<section className="scroll-world" aria-label={manifest.ariaLabel} data-motion={reduced ? "reduced" : "enabled"}>
  <div className="scroll-world__stage" data-testid="scroll-world-stage">
    <video data-testid="scroll-world-video" muted playsInline preload="metadata" poster={variant.poster} aria-hidden="true" />
    <img className="scroll-world__poster" src={variant.poster} alt="" />
  </div>
  <nav aria-label="World scenes">{/* normal anchors from manifest scenes */}</nav>
  <ol>{/* visible, HTML scene title/summary slot content passed as children */}</ol>
</section>
```

Implementation constraints:

- use IntersectionObserver only to attach the selected video `src` near the stage; until then show the poster;
- start with poster visible; hide only after `loadeddata`;
- on `error`, preserve poster and reveal a visually visible status message such as “Cinematic preview unavailable. The product journey remains below.”;
- use `matchMedia('(max-width: 700px)')` and the shared breakpoint constant; subscribe/unsubscribe on mount/unmount;
- use `matchMedia('(prefers-reduced-motion: reduce)')`; in reduced motion do not attach controller or media source;
- calculate progress from the component’s own stage geometry in a passive scroll listener only while the stage is active; schedule `controller.update()` through the controller;
- do not require image alt text because the generated media is decorative; critical scene explanation is provided by passed semantic children.

**Step 4: Run GREEN**

```bash
npm test --workspace=@theorvane/ui
npm run lint --workspace=@theorvane/ui
npm run typecheck --workspace=@theorvane/ui
```

**Step 5: Commit and push**

```bash
git add packages/ui/src/scroll-world.tsx packages/ui/src/index.tsx packages/ui/test/scroll-world-component.test.tsx
git commit -m "feat: add accessible Scroll World stage"
git push
```

---

## Task 5: Create a Theorvane-owned placeholder manifest and semantic scene content

**Objective:** Wire the five approved scene IDs, product destinations, and static-copy fallback before any real media exists.

**Files:**
- Create: `apps/theorvane/lib/scroll-world-manifest.ts`
- Create: `apps/theorvane/lib/scroll-world-manifest.test.ts`
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/test/home.test.tsx`

**Step 1: Write RED manifest and page tests**

In the manifest test, require exactly the approved IDs and valid canonical destinations:

```ts
expect(theorvaneScrollWorld.scenes.map((scene) => scene.id)).toEqual([
  "studio-beacon",
  "typemcp-contract-island",
  "typechain-composition-island",
  "openscene-local-studio",
  "product-constellation",
]);
expect(theorvaneScrollWorld.desktop.aspectRatio).toBe("16:9");
expect(theorvaneScrollWorld.mobile.aspectRatio).toBe("9:16");
```

In `home.test.tsx`, assert the new labelled region, `World scenes` navigation, all five anchor names, and that the existing product-card links and product-boundary statements still exist. Do **not** replace the existing assertions.

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run lib/scroll-world-manifest.test.ts test/home.test.tsx
```

Expected: FAIL because no manifest/region exists.

**Step 3: Implement only placeholder local paths**

Create the manifest with local, reviewable paths only:

```ts
export const theorvaneScrollWorld: ScrollWorldManifest = {
  id: "theorvane-pilot",
  ariaLabel: "Theorvane product world",
  desktop: { src: "/scroll-world/desktop/timeline.mp4", poster: "/scroll-world/desktop/poster.webp", duration: 45, aspectRatio: "16:9" },
  mobile: { src: "/scroll-world/mobile/timeline.mp4", poster: "/scroll-world/mobile/poster.webp", duration: 45, aspectRatio: "9:16" },
  scenes: [/* five approved scene IDs with normalized ranges and CTA anchors */],
};
```

In `app/page.tsx`, import `<ScrollWorld>` and render it after the semantic hero or immediately before the product index. Pass HTML scene content in document order. Use existing truthful product descriptions and headings; do not introduce generated-video text or add new capability claims.

**Step 4: Run GREEN**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run lib/scroll-world-manifest.test.ts test/home.test.tsx
```

**Step 5: Commit and push**

```bash
git add apps/theorvane/lib/scroll-world-manifest.ts apps/theorvane/lib/scroll-world-manifest.test.ts apps/theorvane/app/page.tsx apps/theorvane/test/home.test.tsx
git commit -m "feat: add Theorvane Scroll World narrative"
git push
```

---

## Task 6: Add the full CSS layout and responsive contracts

**Objective:** Give the stage a controlled sticky scroll area that remains readable and un-clipped on desktop and mobile.

**Files:**
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/responsive-contract.test.ts`
- Create: `apps/theorvane/test/scroll-world-responsive-contract.test.ts`

**Step 1: Write RED CSS contracts**

Assert source-level rules for:

```ts
expect(css).toMatch(/\.scroll-world\{[^}]*position:relative/);
expect(css).toMatch(/\.scroll-world__stage\{[^}]*position:sticky[^}]*top:0/);
expect(css).toMatch(/\.scroll-world__scene-nav a\{[^}]*min-height:44px/);
expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.scroll-world__stage/);
expect(css).toMatch(/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.scroll-world/);
```

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run test/scroll-world-responsive-contract.test.ts
```

Expected: FAIL because no Scroll World styles exist.

**Step 3: Implement CSS**

Add isolated classes:

- `.scroll-world`: `position: relative`, enough vertical block-size for the scrub journey (initially `min-height: 500vh`; tune only after real media test);
- `.scroll-world__stage`: sticky, viewport-bounded, overflow hidden, color contrast-safe overlay;
- `.scroll-world__video`, `.scroll-world__poster`: absolute full-stage layers; video opacity transitions only when motion is enabled and media loaded;
- `.scroll-world__scene-nav`: visible, non-overlapping index with normal anchors;
- `.scroll-world__story`: normal HTML content with readable contrast;
- mobile media rule that preserves safe area and fixes scene index/CTA layout without horizontal overflow;
- reduced motion rule that disables sticky cinematic behavior and shows poster + narrative as ordinary content.

Do not globally alter existing selectors except necessary stacking/z-index coordination with the homepage.

**Step 4: Run GREEN**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run test/responsive-contract.test.ts test/scroll-world-responsive-contract.test.ts
npm run lint --workspace=@theorvane/theorvane-site
npm run typecheck --workspace=@theorvane/theorvane-site
```

**Step 5: Commit and push**

```bash
git add apps/theorvane/app/globals.css apps/theorvane/test/responsive-contract.test.ts apps/theorvane/test/scroll-world-responsive-contract.test.ts
git commit -m "feat: style responsive Theorvane Scroll World"
git push
```

---

## Task 7: Verify pre-media fallback behavior in a production build

**Objective:** Prove the new section is useful before any paid generation and prevents broken-media regressions.

**Files:**
- Create: `apps/theorvane/test/scroll-world-fallback.test.tsx`
- Modify: `apps/theorvane/app/page.tsx` only if test exposes an implementation gap

**Step 1: Write RED fallback tests**

Test that an unavailable video event produces a visible fallback status while preserving all five HTML scene titles/links and product cards. Test the reduced-motion state by mocking `matchMedia`, confirming the stage does not set a video `src`.

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run test/scroll-world-fallback.test.tsx
```

Expected: FAIL until error and motion branches are correctly wired.

**Step 3: Implement minimal fallback state**

Keep fallback state inside the reusable component. The application must not depend on a generated asset existing to render headings, scene copy, links, or product index.

**Step 4: Run GREEN and full local verification**

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: all commands pass; audit reports no high-severity production vulnerabilities.

**Step 5: Build and inspect production fallback**

```bash
npm run build
npm run dev --workspace=@theorvane/theorvane-site
```

Use a freshly built/start process, not a stale server. Inspect desktop accessibility tree and a real 375px emulated CSS viewport. Confirm:

- visible main, `World scenes` navigation, scene anchors, and CTAs;
- `window.innerWidth === 375` and `document.documentElement.scrollWidth === 375`;
- no clipped scene-index/CTA controls;
- reduced-motion branch shows readable content;
- blocked/nonexistent media path keeps poster/fallback status and all semantic content.

**Step 6: Commit and push**

```bash
git add apps/theorvane/test/scroll-world-fallback.test.tsx [any minimal source fixes]
git commit -m "test: cover Scroll World fallback behavior"
git push
```

**Step 7: Exact-SHA review**

Request independent review of the implementation-only checkpoint. The reviewer must verify no asset generation/purchase happened and product boundaries remain truthful.

---

## Task 8: Prepare a non-secret media production workspace and inspect capability contracts

**Objective:** Create reproducible prompts and production scripts without generating or spending.

**Files:**
- Create: `apps/theorvane/scroll-world/README.md`
- Create: `apps/theorvane/scroll-world/desktop/scene-01-studio-beacon.txt` through `scene-05-product-constellation.txt`
- Create: `apps/theorvane/scroll-world/mobile/scene-01-studio-beacon.txt` through `scene-05-product-constellation.txt`
- Create: `apps/theorvane/scroll-world/scripts/validate-media-manifest.mjs`
- Create: `apps/theorvane/scroll-world/scripts/extract-boundary-frame.sh`
- Create: `apps/theorvane/scroll-world/scripts/verify-seams.mjs`
- Create: `apps/theorvane/scroll-world/test/media-manifest-contract.test.mjs`
- Modify: `.gitignore`

**Step 1: Write RED static-manifest validation tests**

The test must reject:

- a media manifest without exactly five approved IDs;
- desktop/mobile paths that are equal;
- a `9:16` variant that is a desktop crop flag;
- a connector with an original scene still as a boundary instead of an extracted frame;
- any `http`, signed query string, token-like field, or absolute filesystem path;
- total video count other than 9 per variant;
- unapproved model or missing duration/dimensions/checksum/reviewer verdict.

**Step 2: Run RED**

```bash
node --test apps/theorvane/scroll-world/test/media-manifest-contract.test.mjs
```

Expected: FAIL because validator/scripts do not exist.

**Step 3: Implement scripts and prompts**

`README.md` must document these no-spend facts:

- this folder contains prompt and verification sources, never OAuth data;
- raw work directory is `/tmp/theorvane-scroll-world-production/`;
- `ffprobe` must be used to record actual dimensions/duration;
- scripts refuse input paths outside the production workspace and output manifest paths under `public/scroll-world/` only;
- every connector invocation must use `dive-i-last.png` and `dive-i-plus-1-first.png` extracted from rendered clips;
- the operator must stop after one still and one clip calibration until user approval.

Every prompt begins with the unchanged style preamble:

```text
Quiet technical clay diorama, warm off-black environment, chartreuse signal light, understated steel and paper texture, isometric miniature, cinematic soft lighting, no text, no letters, no logos, no watermarks.
```

Desktop prompts explicitly compose 16:9. Mobile prompts explicitly compose a native 9:16 vertical frame with its own focal geometry, not a crop. Prompts must use only generic visual terms; product names and readable generated marks are prohibited.

`extract-boundary-frame.sh` accepts a clip and writes a first or final PNG using `ffmpeg`, fails on missing source, and does not download anything. `verify-seams.mjs` validates manifest linkage/checksum and calls `ffprobe`/frame comparison utilities; it reports defects and never rerolls automatically.

**Step 4: Run GREEN**

```bash
node --test apps/theorvane/scroll-world/test/media-manifest-contract.test.mjs
node apps/theorvane/scroll-world/scripts/validate-media-manifest.mjs --help
shellcheck apps/theorvane/scroll-world/scripts/extract-boundary-frame.sh
```

If `shellcheck` is unavailable, state that fact and run `bash -n` instead.

**Step 5: Commit and push**

```bash
git add apps/theorvane/scroll-world .gitignore
git commit -m "docs: add Scroll World production safeguards"
git push
```

---

## Task 9: Run a no-spend capability and balance preflight

**Objective:** Ground the selected model and budget in live account/model data before creating paid jobs.

**Files:**
- Create locally only: `/tmp/theorvane-scroll-world-production/preflight-<timestamp>.md`
- Do not commit dynamic balance values or OAuth data.

**Step 1: Verify allowed MCP scope**

Run `hermes mcp list` and `hermes mcp test higgsfield`. Confirm only the generation/media/model/job/balance scope is enabled; do not enable website, secret, sandbox, TikTok, marketplace, account-connection, purchase, or deployment tools.

**Step 2: Query active workspace and balance**

Use Higgsfield `list_workspaces`, select the explicitly chosen workspace only if no workspace is active, then `balance`. Record plan/balance and timestamp in the local preflight report. Do not write credentials or full account identifiers into the repository.

**Step 3: Inspect actual model schemas**

Use `models_explore` / model-contract tooling to identify one image model and one video model that presently accept:

- image generation in 16:9 and 9:16;
- start/first image for dive clips;
- both start/first and end/last images for connector clips;
- muted/no-audio output or a controllable audio-off setting.

If the selected model does not support native first+last frame conditioning, halt and report it; do not substitute a non-seamless model.

**Step 4: Produce a no-spend preflight report**

Calculate the immutable production inventory:

```text
10 scene stills
10 dives
8 connectors
18 total clips
+ explicitly stated reroll allowance
```

Report model IDs, requested duration/resolution, current available credits, and a *provisional* range only; do not claim a final estimate before calibration.

**Step 5: Commit no dynamic information**

Only update the task brief with `preflight completed`, date, selected non-secret model IDs, and a pointer to the local report—never balance numbers/tokens. Commit/push that brief update and obtain exact-SHA review before a calibration run.

---

## Task 10: Run a one-still + one-clip calibration and pause for explicit spend approval

**Objective:** Measure actual output quality, seam-capable first-frame behavior, cost, and file size before committing to the 18-clip batch.

**Files:**
- Local only: `/tmp/theorvane-scroll-world-production/calibration/`
- Local only: `calibration-report.md`
- No repository asset files yet.

**Step 1: Confirm the authorization boundary in chat**

Before calling generation, show the user:

- active workspace and balance;
- selected models and exact requested resolution/duration;
- one still + one dive clip calibration cost exposure;
- hard stop after the two jobs;
- no automatic rerolls/purchases.

Wait for explicit consent for these two calibration jobs. A generic implementation approval is not sufficient because it has a paid external side effect.

**Step 2: Generate one desktop scene still**

Use only the approved desktop `studio-beacon` prompt. Record job ID, output dimensions, duration (if any), cost/credit delta, model ID, and output checksum locally.

**Step 3: Human-review the still**

Verify no readable text/logo/watermark, consistent art direction, no accidental third-party identity, and scene suitability. If unacceptable, stop and present the result; do not reroll without a new user approval.

**Step 4: Generate one desktop dive clip conditioned on that still**

Use the model’s inspected start-frame contract. Request muted/no audio and the chosen duration/resolution. Record the first rendered frame and calculate/inspect its relation to the still; verify that the camera begins at the conditioned composition.

**Step 5: Create calibration report and present it**

Report actual still/clip spend, time, model behavior, first-frame quality, output file size, and revised pilot estimate:

```text
10 stills + 10 dives + 8 connectors + an explicitly itemized reroll allowance
```

Give a range for the 18 videos and separate desktop/mobile totals. Do not generate the remaining assets until the user explicitly approves the stated full pilot budget.

---

## Task 11: Generate, review, and encode the full Theorvane pilot media chain

**Objective:** Create the paid assets only after full-budget approval and make every seam/provenance decision verifiable.

**Files:**
- Local-only working assets: `/tmp/theorvane-scroll-world-production/`
- Candidate runtime output: `apps/theorvane/public/scroll-world/` only after review
- Create: `apps/theorvane/public/scroll-world/manifest.json`
- Create: `apps/theorvane/public/scroll-world/provenance.json`
- Create: `apps/theorvane/public/scroll-world/desktop/timeline.mp4`
- Create: `apps/theorvane/public/scroll-world/desktop/poster.webp`
- Create: `apps/theorvane/public/scroll-world/mobile/timeline.mp4`
- Create: `apps/theorvane/public/scroll-world/mobile/poster.webp`

**Step 1: Full production confirmation**

Restate the calibration evidence, full count, reroll allowance, total maximum spend, and halt conditions. Wait for explicit user approval of the stated maximum budget.

**Step 2: Generate and review five desktop scene stills**

Generate one scene at a time or bounded parallelism only if the account/model permits. After each, record job ID and quality verdict. Regenerate only after explicit approval for the specific reroll/remaining budget. Ensure all five share the fixed preamble and contain no generated text/logos.

**Step 3: Generate and review five native mobile stills**

Use the mobile prompt set and check that each is native portrait composition—not a crop or a scaled desktop output.

**Step 4: Generate desktop dive clips**

Generate all five dives conditioned on their desktop stills. Download completed results to the local production workspace. Use `ffprobe` to record actual duration, codec, and dimensions. Review every first/last frame.

**Step 5: Extract desktop boundaries and generate connectors**

For i = 1 through 4:

```bash
bash apps/theorvane/scroll-world/scripts/extract-boundary-frame.sh \
  --last /tmp/theorvane-scroll-world-production/desktop/dive-$i.mp4 \
  --output /tmp/theorvane-scroll-world-production/desktop/dive-$i-last.png

bash apps/theorvane/scroll-world/scripts/extract-boundary-frame.sh \
  --first "/tmp/theorvane-scroll-world-production/desktop/dive-$((i + 1)).mp4" \
  --output "/tmp/theorvane-scroll-world-production/desktop/dive-$((i + 1))-first.png"
```

Generate connector i only with those two actual extracted frames. Do not use the scene stills. Record the source clip/frame checksums in provenance.

**Step 6: Repeat dive + connector workflow for mobile**

Use the separate mobile stills and mobile boundaries. Desktop frames must never be used in mobile connector conditioning.

**Step 7: Seam review gate**

Extract the final/first frames at all eight seams. Review side-by-side and run the validation script. A visible pop, source mismatch, missing asset, or resolution mismatch stops further encoding and needs a specific reroll decision.

**Step 8: Encode delivery timelines and posters**

Concatenate validated dive/connector sequences to one desktop and one mobile timeline. Preserve native dimensions; no upscaling/cropping across variants. Generate lightweight poster WebP from an approved scene. Run `ffprobe` and checksum each final asset.

**Step 9: Fill public manifest/provenance**

`manifest.json` contains only public relative paths, duration, aspect ratio, scene IDs/ranges, and checksums. `provenance.json` contains model IDs, job IDs, prompt hashes, non-secret timings, media facts, and review state. Validate both using Task 8 tooling.

**Step 10: Repository size and content review**

Run:

```bash
git status --short
find apps/theorvane/public/scroll-world -type f -printf '%p %s bytes\n' | sort
node apps/theorvane/scroll-world/scripts/validate-media-manifest.mjs apps/theorvane/public/scroll-world/manifest.json
```

If file size exceeds repository/deployment limits, stop and use the approved asset-delivery alternative only after user approval. Do not force add or use LFS silently.

---

## Task 12: Wire final assets and test the true media path

**Objective:** Promote only reviewed media into the app manifest and verify desktop/mobile source selection, media loading, and fallback behavior against final files.

**Files:**
- Modify: `apps/theorvane/lib/scroll-world-manifest.ts`
- Modify: `apps/theorvane/lib/scroll-world-manifest.test.ts`
- Modify: `apps/theorvane/test/scroll-world-fallback.test.tsx`
- Modify: `apps/theorvane/test/scroll-world-responsive-contract.test.ts`
- Modify: `apps/theorvane/test/home.test.tsx`

**Step 1: Write RED final-media assertions**

Add assertions that public manifest paths exist and differ across variants, and that the declared durations/checksums match the JSON. Add a test that the five scene ranges cover `[0, 1]` in order without gaps/overlaps. Add a source-selection test at `375px` and `1024px`.

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run lib/scroll-world-manifest.test.ts test/scroll-world-fallback.test.tsx test/scroll-world-responsive-contract.test.ts
```

Expected: FAIL until placeholders are replaced with validated media metadata.

**Step 3: Replace placeholder values only from validated JSON**

Import/parse the committed public manifest with static TypeScript validation or mirror exact values in the TS manifest. Do not add network fetching or external URLs at runtime.

**Step 4: Run GREEN and complete suite**

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

**Step 5: Commit and push**

```bash
git add apps/theorvane/lib/scroll-world-manifest.ts apps/theorvane/lib/scroll-world-manifest.test.ts apps/theorvane/test apps/theorvane/public/scroll-world
git commit -m "feat: add reviewed Theorvane Scroll World media"
git push
```

---

## Task 13: Production UI and asset verification

**Objective:** Confirm the finalized page and media behave correctly in real desktop/mobile conditions.

**Files:**
- No source change unless a verified defect requires a new RED test first.

**Step 1: Start a fresh production server**

Build after final source/assets, then start the Theorvane app from the current checkout. Verify the served source is the current build before browser inspection.

**Step 2: Desktop inspection**

At a desktop viewport, verify:

- hero/main/scene navigation landmarks and accessible names;
- video is muted/inline/decorative and poster displays before readiness;
- each scene nav link reaches semantic copy or its stated destination;
- current scene state is exposed visually without relying on color alone;
- all original product CTA destinations still work;
- each of four desktop seams has no visible pop during controlled scroll forward/back.

**Step 3: Native mobile inspection**

Use Chrome DevTools Protocol device metrics:

```js
Emulation.setDeviceMetricsOverride({ width: 375, height: 812, deviceScaleFactor: 1, mobile: true })
```

Read back `window.innerWidth`, `document.documentElement.scrollWidth`, and `document.body.scrollWidth`; all must be 375. Confirm the mobile `<video>` source is `/scroll-world/mobile/timeline.mp4`, portrait composition is used, controls are visible/tappable, and all four mobile seams are clean.

**Step 4: Resilience inspection**

Test with reduced motion enabled and with media requests blocked/failed. Verify poster, fallback status, product narrative, scene copy, links, and keyboard navigation remain usable.

**Step 5: Performance evidence**

Record initial route transfer, poster size, video size, metadata load behavior, and LCP from the built site. Compare to the agreed pilot budget; if it fails, add a focused regression test before optimization (for example, delayed source assignment or poster compression), then rerun full verification.

---

## Task 14: Final review, PR delivery, and pilot closeout

**Objective:** Merge only a fully reviewed, evidence-backed pilot and preserve decision-quality output for the next three sites.

**Files:**
- Modify: `.agents/task-briefs/<issue>-theorvane-scroll-world.md`
- Create (if repository policy permits): `docs/production/2026-07-29-theorvane-scroll-world-pilot-report.md`

**Step 1: Final hygiene**

```bash
git status --short --branch
git diff --check
git log --oneline origin/dev..HEAD
```

Verify there are no generated source dirs, OAuth material, signed URLs, raw assets, or external credentials.

**Step 2: Record pilot report**

Include only non-secret facts:

- final scene IDs, model IDs, output resolution/duration/file sizes;
- media checksums and manifest schema version;
- calibrated/final spend totals and reroll count (if the user permits cost recording in the repository; otherwise record that a private report exists);
- desktop/mobile seam checklist;
- reduced-motion/media-failure result;
- exact verification command outcomes;
- rollout recommendation for TypeMCP, TypeChain, and OpenScene.

Do not write a claim that the rollout is authorized; it needs a new focused Issue and brief.

**Step 3: Open implementation PR**

Use `Closes #<implementation-issue>`, mirror labels/assignee, link the merged design and plan, and list actual verification outputs. Do not request reviewer action on stale SHA.

**Step 4: Exact-head independent review**

Require fresh-clone review by `sjungwon03-ai` at the exact current head. Reviewer checks:

- all assets/provenance match their manifest;
- no generated text/logos/watermarks or misleading product claims;
- 16:9 and 9:16 chains are distinct native media;
- actual-frame seam links are correct;
- no credentials/signed URLs/external unsafe configuration;
- test/build/audit/diff evidence and responsive QA;
- file-size/deployment policy compliance.

**Step 5: Merge through `dev` only**

After latest-head approval and required checks, squash merge into `dev`, close/verify the implementation Issue, and verify production deployment only through the separate release-promotion process. Do not merge directly into `main`.

**Step 6: Stop and report**

Report pilot results, real media evidence, and exact release status. Do not begin TypeMCP, TypeChain, or OpenScene generation until the user approves a new issue/brief based on the pilot report.

---

## Final plan review checklist

- [x] The plan distinguishes no-spend code/manifest work from paid generation.
- [x] All code tasks specify RED → GREEN commands and exact target paths.
- [x] The mobile chain is native 9:16, not a crop.
- [x] Connector endpoints are actual rendered frames.
- [x] Product claims and application-owned boundaries remain unchanged.
- [x] Reduced motion, blocked media, keyboard navigation, and semantic fallback are verified.
- [x] Every paid action has explicit user confirmation and halt conditions.
- [x] The Theorvane pilot ends before any TypeMCP, TypeChain, or OpenScene expansion begins.
