# Theorvane Video-led Scroll World Implementation Plan

> **For Hermes:** Use `subagent-driven-development` to implement this plan one task at a time, with a spec-compliance review and a code-quality review against each exact head SHA.

**Goal:** Make Theorvane a video-led, immersive scroll-cinematic site: a poster-first Scene 01 hero background hands into a native desktop/mobile five-scene scroll journey, with continuous visual depth into the product index and full non-motion fallbacks.

**Architecture:** Keep `@theorvane/ui` product-neutral: it owns Scroll World source selection, lazy attachment, bounded scroll-to-time control, and semantic scene navigation. The Theorvane app owns the cinematic manifest, truthful copy, a new `VideoHero`/ambient backdrop composition, local asset paths, and scoped CSS. The existing `studio-beacon` remains a Scene 01 calibration preview; full media production is a separate, explicit-spend phase after runtime readiness is merged and validated.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict mode, Vitest + Testing Library, CSS custom properties/gradients/transforms, HTML video, `IntersectionObserver`, `matchMedia`, production `next build` inspection.

**Design source:** `docs/superpowers/specs/2026-07-30-theorvane-immersive-scroll-cinematic-design.md`
**Issue:** #122
**Branch:** `feat/122-immersive-scroll-cinematic`

---

## Delivery constraints

1. Preserve every product claim and destination in `apps/theorvane/app/page.tsx`; no generated asset may carry text, logos, product UI, or capability claims.
2. Server-rendered markup must not attach any background or scroll-video `src`. A client component attaches it only after `matchMedia` verifies motion is allowed and an `IntersectionObserver` sees the relevant viewport.
3. The initial runtime uses the existing `/scroll-world/desktop/studio-beacon.{mp4,poster.webp}` only as a Scene 01 calibration asset. Do **not** make or purchase new video in Tasks 1–6.
4. Native final sources are required: five dive clips plus four frame-matched connectors for desktop 16:9 and mobile 9:16. Mobile is never a crop of desktop.
5. Every code task follows RED → observed failure → minimal implementation → focused GREEN → commit/push. Do not start the next implementation task before independent review of the exact previous commit.
6. Final release remains a PR to `dev`; no deployment or direct branch merge is in scope.

## Task 1: Add video-hero contract coverage

**Objective:** Define the testable HTML/accessibility contract for a decorative Scene 01 hero background before creating its component.

**Files:**
- Create: `apps/theorvane/components/video-hero.test.tsx`
- Modify: `apps/theorvane/test/home.test.tsx`
- Later implementation: `apps/theorvane/components/video-hero.tsx`

**Step 1: Write failing component tests**

Create `apps/theorvane/components/video-hero.test.tsx` with a controllable `matchMedia` mock. Require:

```tsx
render(<VideoHero poster="/scroll-world/desktop/studio-beacon-poster.webp" src="/scroll-world/desktop/studio-beacon.mp4" />);

expect(screen.getByTestId("video-hero").getAttribute("aria-hidden")).toBe("true");
expect(screen.getByTestId("video-hero-poster").getAttribute("src")).toBe(
  "/scroll-world/desktop/studio-beacon-poster.webp",
);
expect(screen.getByTestId("video-hero-video").getAttribute("src")).toBeNull();
```

After triggering the intersection callback while reduced motion is false, assert the video receives the local source, is `muted`, `playsInline`, and has no controls. With `prefers-reduced-motion: reduce`, assert it never receives `src`.

Add a homepage assertion:

```tsx
expect(screen.getByTestId("video-hero")).toBeTruthy();
expect(screen.getByRole("heading", { name: /precise tools for/i })).toBeTruthy();
```

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/video-hero.test.tsx test/home.test.tsx
```

Expected: FAIL because `VideoHero` does not exist and homepage has no video-hero test id.

**Step 3: Implement the smallest client component**

Create `apps/theorvane/components/video-hero.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type VideoHeroProps = Readonly<{ poster: string; src: string }>;

export function VideoHero({ poster, src }: VideoHeroProps) {
  const root = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || !root.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setLoadVideo(true);
    }, { rootMargin: "200px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [reduced]);

  return <div aria-hidden="true" className="video-hero" data-testid="video-hero" ref={root}>
    <img alt="" className="video-hero__poster" data-testid="video-hero-poster" src={poster} />
    <video autoPlay loop muted playsInline preload="metadata" className="video-hero__video" data-testid="video-hero-video" poster={poster} src={!reduced && loadVideo ? src : undefined} />
  </div>;
}
```

Do not call `play()` imperatively. Browser autoplay is allowed only because the video is muted; the poster remains visible if it cannot play.

**Step 4: Compose it in the homepage**

In `apps/theorvane/app/page.tsx`, import `VideoHero` and place it as the first child of `<main>` (or inside the hero shell as an absolute decorative sibling), passing the existing Scene 01 calibration paths. Keep header, hero heading, buttons, and all landmark content in normal DOM order above it.

**Step 5: Run focused GREEN and static checks**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/video-hero.test.tsx test/home.test.tsx
npm run lint --workspace=@theorvane/theorvane-site
npm run typecheck --workspace=@theorvane/theorvane-site
```

Expected: all pass.

**Step 6: Commit and push**

```bash
git add apps/theorvane/components/video-hero.tsx apps/theorvane/components/video-hero.test.tsx apps/theorvane/app/page.tsx apps/theorvane/test/home.test.tsx
git commit -m "feat: add poster-first Theorvane video hero"
git push
```

## Task 2: Add an accessible ambient-world layer and its CSS contract

**Objective:** Put depth behind every page section without adding a second semantic experience or a WebGL dependency.

**Files:**
- Create: `apps/theorvane/components/ambient-world.tsx`
- Create: `apps/theorvane/components/ambient-world.test.tsx`
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/scroll-world-responsive-contract.test.ts`

**Step 1: Write failing tests**

Add a component test that asserts the ambient root is decorative and has no focusable content:

```tsx
render(<AmbientWorld />);
const layer = screen.getByTestId("ambient-world");
expect(layer.getAttribute("aria-hidden")).toBe("true");
expect(layer.querySelectorAll("a,button,input,video")).toHaveLength(0);
```

Extend the CSS contract with expectations that the committed CSS contains:

```ts
expect(css).toMatch(/\.ambient-world\{[^}]*pointer-events:none/);
expect(css).toMatch(/\.ambient-world\{[^}]*position:fixed/);
expect(css).toMatch(/\.ambient-world__grid\{/);
expect(css).toMatch(/\.video-hero\{[^}]*position:absolute/);
expect(css).toMatch(/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.ambient-world/);
```

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/ambient-world.test.tsx test/scroll-world-responsive-contract.test.ts
```

Expected: FAIL because the component and selectors do not exist.

**Step 3: Implement `AmbientWorld`**

Create a client component that publishes bounded page scroll progress without listening to keyboard events or mutating scroll position:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function AmbientWorld() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      element.current?.style.setProperty("--ambient-progress", String(Math.min(1, Math.max(0, window.scrollY / max))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div aria-hidden="true" className="ambient-world" data-testid="ambient-world" ref={element}>
    <div className="ambient-world__aura" />
    <div className="ambient-world__grid" />
    <div className="ambient-world__vignette" />
  </div>;
}
```

Render `<AmbientWorld />` as a direct child near the top of `<main>`, before semantic sections. It must be visually beneath all actual content.

**Step 4: Add scoped CSS**

In `apps/theorvane/app/globals.css`, implement:

- `.ambient-world { position: fixed; inset: 0; z-index: -2; overflow: hidden; pointer-events: none; }`
- aura, grid, and vignette as pseudo/child layers using radial and linear gradients;
- transforms/opacity based on `--ambient-progress`, with `will-change: transform` only on transformed layers;
- a `body::before` or `main` stacking context so the layer never falls below a browser background or above dialogs/skip links;
- hero-specific directional scrim (`.hero::before`) and `isolation: isolate` so hero text has predictable contrast;
- reduced-motion rules that remove transforms/transitions but preserve static grid/grain;
- `@media(max-width:700px)` rules that lower grid density and prevent visual overflow.

Do not change global anchor focus styling or existing product card sizing.

**Step 5: Run focused GREEN**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/ambient-world.test.tsx test/scroll-world-responsive-contract.test.ts
npm run lint --workspace=@theorvane/theorvane-site
npm run typecheck --workspace=@theorvane/theorvane-site
```

**Step 6: Commit and push**

```bash
git add apps/theorvane/components/ambient-world.tsx apps/theorvane/components/ambient-world.test.tsx apps/theorvane/app/page.tsx apps/theorvane/app/globals.css apps/theorvane/test/scroll-world-responsive-contract.test.ts
git commit -m "feat: add Theorvane ambient world backdrop"
git push
```

## Task 3: Make the Scroll World visually continuous with the hero and product index

**Objective:** Turn the existing world from a bordered content block into a full-bleed video-led section that hands off cleanly to product discovery.

**Files:**
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/home.test.tsx`
- Modify: `apps/theorvane/test/scroll-world-responsive-contract.test.ts`

**Step 1: Write failing semantic/CSS expectations**

Require a programmatic handoff marker without inventing new product claims:

```tsx
expect(screen.getByTestId("cinematic-handoff")).toBeTruthy();
expect(screen.getByRole("region", { name: /theorvane product world/i })).toBeTruthy();
```

Add CSS contract assertions:

```ts
expect(css).toMatch(/\.scroll-world\{[^}]*min-height:500vh/);
expect(css).toMatch(/\.scroll-world__stage\{[^}]*inset:0/);
expect(css).toMatch(/\.scroll-world__story\{[^}]*background:linear-gradient/);
expect(css).toMatch(/\.cinematic-handoff\{/);
expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.cinematic-handoff/);
```

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run test/home.test.tsx test/scroll-world-responsive-contract.test.ts
```

Expected: FAIL for the missing handoff marker and missing intentional CSS rules.

**Step 3: Implement visual composition**

- Add `<div aria-hidden="true" className="cinematic-handoff" data-testid="cinematic-handoff" />` between `ScrollWorld` and the product index.
- Keep all five `world-story` list items in normal document order.
- Change only the Scroll World CSS classes necessary to:
  - make `.scroll-world` full-bleed with `min-height: 500vh` and no card-like enclosing border;
  - keep `.scroll-world__stage` sticky, viewport-bounded, and behind the scene controls/story content;
  - use directional gradients and blur-backed story panels for reliable contrast over any frame;
  - make the final story scene and `.cinematic-handoff` fade the final palette into the product section;
  - preserve `min-height:44px` controls and a normal tab sequence;
  - switch to a shorter but still bounded section on mobile, with no horizontal overflow.

Do not move CTAs into the video or remove the product index.

**Step 4: Run focused GREEN**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run test/home.test.tsx test/scroll-world-responsive-contract.test.ts
npm run lint --workspace=@theorvane/theorvane-site
npm run typecheck --workspace=@theorvane/theorvane-site
```

**Step 5: Commit and push**

```bash
git add apps/theorvane/app/page.tsx apps/theorvane/app/globals.css apps/theorvane/test/home.test.tsx apps/theorvane/test/scroll-world-responsive-contract.test.ts
git commit -m "feat: make Theorvane Scroll World video-led"
git push
```

## Task 4: Harden hero and Scroll World motion/failure behavior

**Objective:** Ensure both video surfaces are harmless when motion is reduced, media fails, JavaScript is delayed, or native sources later change.

**Files:**
- Modify: `apps/theorvane/components/video-hero.test.tsx`
- Modify: `apps/theorvane/components/video-hero.tsx`
- Modify: `packages/ui/test/scroll-world-component.test.tsx`
- Modify: `packages/ui/src/scroll-world.tsx`
- Modify: `apps/theorvane/components/boundary-atlas-stage.tsx`
- Modify: `apps/theorvane/components/boundary-atlas-stage.test.tsx`

**Step 1: Write RED regressions**

Add tests for all of the following:

1. The hero shows its poster when its video emits `error`; it never removes semantic headline/CTAs because those are outside the decorative component.
2. With reduced motion mocked before render, both hero and `ScrollWorld` video elements have no `src` in the rendered result.
3. `ScrollWorld` resets its loaded/ready state when the selected variant changes, so an old desktop frame cannot incorrectly show as a new mobile source.
4. `BoundaryAtlasStage` is labelled as a calibration enhancement and does not duplicate a full timeline claim.

**Step 2: Run RED**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/video-hero.test.tsx components/boundary-atlas-stage.test.tsx
npm run test --workspace=@theorvane/ui -- --run test/scroll-world-component.test.tsx
```

Expected: FAIL for each currently unimplemented contract.

**Step 3: Implement the minimal hardening**

- In `VideoHero`, add `onError` state that leaves the poster visual layer in place; do not show a user-facing error because it is decorative.
- In `ScrollWorld`, reset `mediaReady` and `mediaFailed` in a `useEffect` keyed by `variant.src`; retain the existing visible failure message when the cinematic source itself errors.
- Keep SSR default source-free by initializing every attachment gate to `false` and enabling it only in effects.
- Change only `BoundaryAtlasStage` text/caption/test expectations needed to clarify that it is Scene 01 calibration media. Keep its current reduced-motion source omission.

**Step 4: Run GREEN**

```bash
npm run test --workspace=@theorvane/theorvane-site -- --run components/video-hero.test.tsx components/boundary-atlas-stage.test.tsx
npm run test --workspace=@theorvane/ui -- --run test/scroll-world-component.test.tsx
npm run lint --workspace=@theorvane/theorvane-site
npm run typecheck --workspace=@theorvane/theorvane-site
npm run lint --workspace=@theorvane/ui
npm run typecheck --workspace=@theorvane/ui
```

**Step 5: Commit and push**

```bash
git add apps/theorvane/components/video-hero.tsx apps/theorvane/components/video-hero.test.tsx apps/theorvane/components/boundary-atlas-stage.tsx apps/theorvane/components/boundary-atlas-stage.test.tsx packages/ui/src/scroll-world.tsx packages/ui/test/scroll-world-component.test.tsx
git commit -m "fix: preserve cinematic media fallbacks"
git push
```

## Task 5: Run full static and production-build verification

**Objective:** Prove the implemented visual runtime is clean before visual browser inspection or any paid media calibration.

**Files:** No intended source change. If a command discovers a defect, create a focused RED regression before fixing it and repeat this task after the final modification.

**Step 1: Run all mandatory gates**

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

Expected: all exit with status 0. Record exact output and any non-failing audit statement in the PR body.

**Step 2: Check artifact and source safety**

```bash
git status --short
git diff --name-only origin/dev...HEAD
find apps/theorvane/public/scroll-world -type f -maxdepth 3 -printf '%p %s bytes\n'
```

Expected: no `.next`, `node_modules`, credentials, signed URLs, raw provider output, or unapproved new media assets are staged. The only existing calibration source remains local and reviewable.

**Step 3: Commit verification-only changes only if necessary**

If no source changed, do not create a no-op commit. Otherwise use a focused conventional commit and restart Task 5.

## Task 6: Inspect a fresh production build on desktop and a true 375px mobile viewport

**Objective:** Validate the actual rendered video-led composition, not only DOM/source contracts.

**Files:** No intended source change. Visual defects must return to the relevant task with a focused RED regression.

**Step 1: Start a production server from final output**

```bash
ss -ltnp | grep ':3000' || true
npm run build --workspace=@theorvane/theorvane-site
npm run start --workspace=@theorvane/theorvane-site -- --port 3000
```

If the workspace has no `start` script, run the installed Next CLI from the app directory:

```bash
../../node_modules/.bin/next start --port 3000
```

Confirm response HTML contains `data-testid="video-hero"`, `data-testid="cinematic-handoff"`, and the expected current asset paths before accepting a screenshot.

**Step 2: Desktop inspection**

Use browser accessibility inspection and screenshot at a desktop viewport. Verify:

- wordmark, primary navigation, hero heading, and both CTAs remain visible above the decorative video;
- visual background is present, does not obscure copy, and no controls sit behind it;
- scroll stage remains cinematic/full-bleed while scene navigation and story panels remain readable;
- `#products` transition has visual continuity and real links retain their canonical URLs.

**Step 3: True mobile inspection**

Use Chrome DevTools Protocol device metrics override:

```js
await client.send("Emulation.setDeviceMetricsOverride", {
  width: 375, height: 812, deviceScaleFactor: 1, mobile: true,
});
```

Read back `window.innerWidth`, `document.documentElement.scrollWidth`, and `document.body.scrollWidth`. Require all three relevant layout widths to be `375`. Capture top hero and mid-world screenshots and verify:

- no horizontal overflow;
- all nav/scene controls remain fully visible and at least 44px tall;
- mobile composition uses the mobile source after client attachment;
- no text is clipped by safe-area or overlays.

**Step 4: Reduced-motion inspection**

Emulate `prefers-reduced-motion: reduce`, reload, and inspect that hero/Scroll World video elements have no `src`, poster/grid remain visually acceptable, and all headings/CTAs/scene copy still appear.

**Step 5: Record evidence and proceed to review**

Record exact build SHA, viewport data, route, and test/build gate output in the eventual PR. If visual defects are found, add regression coverage first, fix minimally, then repeat Tasks 5–6.

## Task 7: Prepare the future media-calibration gate (no generation)

**Objective:** Make the production media phase auditable without contacting a provider or spending credits.

**Files:**
- Create: `apps/theorvane/scroll-world/media/README.md` or update existing `apps/theorvane/scroll-world/README.md`
- Create: `apps/theorvane/scroll-world/media/production-checklist.md`
- Test: existing media manifest contract where applicable

**Step 1: Write a failing documentation contract only if the repository has a docs-contract convention**

Otherwise skip an artificial test and document the approved inventory exactly:

```text
Desktop: scene-01..scene-05 dive clips + connector-01-02..connector-04-05
Mobile: native scene-01..scene-05 dive clips + connector-01-02..connector-04-05
```

**Step 2: Write the non-secret production checklist**

Specify the mandatory sequence:

1. inspect provider balance/workspace/model start+end-frame capability;
2. produce one still plus one low-cost video probe;
3. report observed output, time, charge, inventory, reroll headroom, estimate, and stop conditions in chat;
4. wait for explicit user spend approval;
5. generate scene stills, then dive clips; extract actual boundary frames; generate connectors; verify every seam in both directions;
6. optimize selected deliverables and record relative paths, durations, dimensions, checksums, model/version, prompt hash, job ID, and reviewer verdict—never secrets or signed URLs.

**Step 3: Commit and push**

```bash
git add apps/theorvane/scroll-world/README.md apps/theorvane/scroll-world/media/production-checklist.md
git commit -m "docs: add scroll cinematic production gate"
git push
```

## Final pull-request procedure

1. Confirm the branch contains every planned commit and has no local changes.
2. Open a PR into `dev` titled `feat(website): build immersive Theorvane scroll-cinematic world` with `Closes #122`.
3. Apply `type: feature`, `area: website`, `area: brand`, and `priority: high`; assign `sjungwon03`.
4. Include the exact verification commands/results, desktop/mobile viewport evidence, reduced-motion result, and clear statement that full media generation remains pending explicit calibration/spend approval.
5. Request independent formal review from `sjungwon03-ai` against the latest exact head SHA. Do not merge before exact-head approval and required CI checks pass.
