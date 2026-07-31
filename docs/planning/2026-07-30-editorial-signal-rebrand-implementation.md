# Editorial Signal rebrand implementation plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace the Theorvane home page’s lime/olive Scroll World with an icon-derived Editorial Signal site: navy, porcelain, and magenta; original replacement stills and video; semantic responsive product storytelling.

**Architecture:** Keep product content and canonical links server-rendered in `app/page.tsx`. Replace the generic `@theorvane/ui` scroll-world integration with small site-owned components for hero media and a three-scene passage. Give every visual component its own media-state/fallback behavior and centralize the icon-derived palette in `globals.css` tokens.

**Tech stack:** Next.js App Router, React, TypeScript, Vitest + Testing Library, CSS, generated H.264/WebP media, ffmpeg/Pillow validation.

**Read first:**
- `docs/superpowers/specs/2026-07-30-editorial-signal-rebrand-design.md`
- `apps/theorvane/app/page.tsx`
- `apps/theorvane/app/globals.css`
- `apps/theorvane/components/video-hero.tsx`
- `apps/theorvane/test/home.test.tsx`

---

### Task 1: Establish the palette and prove the old identity is gone

**Objective:** Make the icon-derived navy/porcelain/magenta palette the single visual source of truth and remove all lime/olive values from Theorvane styles.

**Files:**
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/responsive-contract.test.ts`
- Create: `apps/theorvane/test/editorial-signal-contract.test.ts`

**Step 1: Write the failing test**

Create a contract test that reads computed token-bearing CSS through a public style export or a narrowly defined CSS contract fixture (do not source-regex test runtime source). It must assert the accessible output surface has:

```ts
expect(document.documentElement).toHaveStyle({
  "--ink-950": "#020817",
  "--porcelain": "#F4F2ED",
  "--signal": "#E91D6A",
});
```

Render the page and assert the primary CTA / current marker uses the `signal` class contract. Add an existing responsive contract assertion for the desktop and mobile grid behavior, not current CSS text.

**Step 2: Run red test**

Run: `cd apps/theorvane && npx vitest run test/editorial-signal-contract.test.ts`

Expected: FAIL because the tokens and design markers do not exist.

**Step 3: Implement the minimal brand token layer**

At the top of `globals.css`, define the exact tokens:

```css
:root {
  color-scheme: dark;
  --ink-950: #020817;
  --ink-900: #070f22;
  --porcelain: #f4f2ea;
  --porcelain-muted: #c8c8c5;
  --signal: #e91d6a;
  --signal-deep: #a80947;
}
```

Replace lime/olive colors and green grid effects; ensure primary action, active navigation, and focus rings use magenta only where they signal interaction. Preserve contrast and reduced-motion blocks.

**Step 4: Run green test**

Run: `cd apps/theorvane && npx vitest run test/editorial-signal-contract.test.ts test/responsive-contract.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add apps/theorvane/app/globals.css apps/theorvane/test/editorial-signal-contract.test.ts apps/theorvane/test/responsive-contract.test.ts
git commit -m "feat(theorvane): establish Editorial Signal palette"
```

### Task 2: Produce and validate the replacement media set

**Objective:** Replace the current green-toned world assets with coherent icon-derived artwork before wiring it into components.

**Files:**
- Create: `apps/theorvane/public/editorial-signal/{desktop,mobile}/...`
- Create: `apps/theorvane/editorial-signal/media-manifest.json`
- Create: `apps/theorvane/editorial-signal/test/media-manifest-contract.test.mjs`

**Step 1: Write the failing media-manifest contract**

Specify a manifest with these IDs and required variants:

```json
{
  "hero": { "desktop": { "poster": "...", "video": "..." }, "mobile": { "poster": "...", "video": "..." } },
  "products": ["typemcp", "typechain", "openscene"],
  "passage": ["declare", "compose", "local"]
}
```

The contract must verify every listed file exists, has no text/logo watermark in its generation brief metadata, and can be decoded by `ffprobe` (videos) or Pillow (stills). Do not snapshot byte sizes; assert video duration is 5–15 seconds and that desktop/mobile dimensions obey their respective aspect intent.

**Step 2: Run red test**

Run: `node apps/theorvane/editorial-signal/test/media-manifest-contract.test.mjs`

Expected: FAIL because the manifest/assets do not exist.

**Step 3: Create media**

Generate a coherent family with this shared prompt foundation:

> Editorial architectural studio still life; obsidian navy field, porcelain modular forms, one precise signal-magenta diagonal; quiet museum lighting; no visible text, logos, UI, or watermarks; no lime/green/yellow/cyan/purple.

Produce:

- hero desktop 16:9 and hero mobile 9:16 posters and silent loops;
- TypeMCP (`declare`): porcelain folded contract planes and a magenta registration edge;
- TypeChain (`compose`): independent modules at a precise open junction;
- OpenScene (`local`): contained physical edit / export object, no cloud symbolism;
- one passage poster/loop each for declare, compose, local plus mobile variants.

Use generated video only when native production is available; otherwise preserve the exact poster manifest and record a real blocker rather than fabricating a video. Encode generated loops as H.264 MP4 and derive poster WebP files from real frames.

**Step 4: Validate assets**

Run:

```bash
node apps/theorvane/editorial-signal/test/media-manifest-contract.test.mjs
for f in apps/theorvane/public/editorial-signal/*/*.mp4; do ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"; done
```

Expected: contract passes and every available loop reports a duration in range.

**Step 5: Commit**

```bash
git add apps/theorvane/public/editorial-signal apps/theorvane/editorial-signal
git commit -m "feat(theorvane): add Editorial Signal media set"
```

### Task 3: Build the resilient editorial hero

**Objective:** Deliver a visible, autoplaying (silent) hero without relying on IntersectionObserver for above-fold media.

**Files:**
- Create: `apps/theorvane/components/editorial-hero.tsx`
- Create: `apps/theorvane/components/editorial-hero.test.tsx`
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`

**Step 1: Write failing component tests**

Assert:

- an accessible `<section>` contains the title and canonical actions;
- the poster is visible before `loadeddata`;
- desktop and mobile source selection follows the existing 700px breakpoint;
- video is `muted`, `playsInline`, `autoPlay`, and `loop`;
- `error` returns to a non-empty poster-only state;
- reduced motion never sets a media `src`.

**Step 2: Run red test**

Run: `cd apps/theorvane && npx vitest run components/editorial-hero.test.tsx`

Expected: FAIL — component does not exist.

**Step 3: Implement `EditorialHero`**

Use a client component with a media query hook and no scroll scrub. Render poster first; attach source immediately unless reduced motion; use `onLoadedData` only to reveal the video over the poster. Do not place headline text inside generated media. Use CSS grid to reserve large negative space and a readable text backing layer.

**Step 4: Green test and browser probe**

Run:

```bash
cd apps/theorvane && npx vitest run components/editorial-hero.test.tsx
curl -I http://localhost:3000/editorial-signal/desktop/hero.mp4
```

Browser probe: verify `video.readyState >= 2` and `currentTime` advances over 750ms.

**Step 5: Commit**

```bash
git add apps/theorvane/components/editorial-hero.tsx apps/theorvane/components/editorial-hero.test.tsx apps/theorvane/app/page.tsx apps/theorvane/app/globals.css
git commit -m "feat(theorvane): add resilient editorial hero"
```

### Task 4: Replace product cards with semantic editorial features

**Objective:** Present TypeMCP, TypeChain, and OpenScene as a linear, responsive editorial product index.

**Files:**
- Create: `apps/theorvane/components/product-editorial.tsx`
- Create: `apps/theorvane/components/product-editorial.test.tsx`
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/test/home.test.tsx`
- Modify: `apps/theorvane/app/globals.css`

**Step 1: Write failing tests**

Test that each feature exposes a numbered label, heading, descriptive still with meaningful alt text, and canonical outbound URL. Assert DOM order is TypeMCP → TypeChain → OpenScene regardless of alternating desktop layout.

**Step 2: Run red test**

Run: `cd apps/theorvane && npx vitest run components/product-editorial.test.tsx test/home.test.tsx`

Expected: FAIL because `ProductEditorial` does not exist.

**Step 3: Implement minimal component**

Use one typed product data array in `page.tsx`. Render `article`, `h2/h3`, image, and `ExternalLink`. Use CSS grid only for visual alternation; do not use CSS `order` to make keyboard/tab flow diverge from text order.

**Step 4: Run green tests**

Run: `cd apps/theorvane && npx vitest run components/product-editorial.test.tsx test/home.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add apps/theorvane/components/product-editorial.tsx apps/theorvane/components/product-editorial.test.tsx apps/theorvane/app/page.tsx apps/theorvane/test/home.test.tsx apps/theorvane/app/globals.css
git commit -m "feat(theorvane): redesign product index editorially"
```

### Task 5: Replace Scroll World with an accessible three-scene Signal Passage

**Objective:** Remove the 500vh generic Scroll World/story-card pattern and use a short site-owned visual passage with a dependable poster fallback.

**Files:**
- Create: `apps/theorvane/components/signal-passage.tsx`
- Create: `apps/theorvane/components/signal-passage.test.tsx`
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/scroll-world-responsive-contract.test.ts` (rename to `signal-passage-responsive-contract.test.ts`)
- Remove: Scroll World references from `apps/theorvane/lib/scroll-world-manifest.ts` only after all imports are removed

**Step 1: Write failing tests**

Assert three semantic named figures (`Declare`, `Compose`, `Keep local`) in document order; each has an image poster and silent video contract. Assert failure leaves poster and caption visible. Assert reduced motion does not attach sources. Assert the section is bounded (not `min-height: 500vh`) and stacks on small screens.

**Step 2: Run red test**

Run: `cd apps/theorvane && npx vitest run components/signal-passage.test.tsx test/signal-passage-responsive-contract.test.ts`

Expected: FAIL because the component and renamed test do not exist.

**Step 3: Implement `SignalPassage`**

Use a static `passageScenes` data list and map semantic figures. Do not build a custom carousel or scroll controller. Video can lazily attach near the viewport, but each `figure` must remain complete as poster + caption without JavaScript. Render the three sources at most; do not retain `@theorvane/ui` ScrollWorld usage for this page.

**Step 4: Run green tests and inspect layout**

Run: `cd apps/theorvane && npx vitest run components/signal-passage.test.tsx test/signal-passage-responsive-contract.test.ts`

Browser verification at 1280px and 390px wide: each scene has visible media/caption; no sticky element obscures product content; active videos show advancing `currentTime` when in view.

**Step 5: Commit**

```bash
git add apps/theorvane/components/signal-passage.tsx apps/theorvane/components/signal-passage.test.tsx apps/theorvane/app/page.tsx apps/theorvane/app/globals.css apps/theorvane/test
git rm apps/theorvane/lib/scroll-world-manifest.ts
git commit -m "feat(theorvane): replace Scroll World with Signal Passage"
```

### Task 6: Remove superseded green visuals and validate the complete experience

**Objective:** Delete unreferenced former Scroll World media/components only after the new media is connected and keep generic shared packages untouched unless other apps still need them.

**Files:**
- Modify/remove: only unreferenced `apps/theorvane/public/scroll-world/**`, `apps/theorvane/components/video-hero.tsx`, and their tests
- Modify: `apps/theorvane/app/page.tsx`
- Modify: `apps/theorvane/app/globals.css`
- Modify: `apps/theorvane/test/seo.test.tsx` only if actual metadata behavior changes

**Step 1: Write the red cleanup/behavior test**

Add an app-level contract that the rendered page has one hero region, three product features, one passage region with three scenes, no stale `ScrollWorld` landmark, and all established canonical product links.

**Step 2: Run red test**

Run: `cd apps/theorvane && npx vitest run test/home.test.tsx`

Expected: FAIL until obsolete content is removed and assertions reflect the new architecture.

**Step 3: Delete only proven-dead assets/code**

Use `search_files` and `git grep` for every candidate before deletion. Do not delete shared `packages/ui/src/scroll-world*` if another app imports it. Remove all old green CSS selectors and legacy image paths from the Theorvane app.

**Step 4: Run final verification**

```bash
cd apps/theorvane && npx vitest run && npx tsc --noEmit
cd ../.. && npm run lint && npm test && npm run build
git diff --check
git status --short
```

Then verify using a real browser:

- desktop 1280px: hero and each passage clip visibly play; `currentTime` advances;
- mobile 390px: selected mobile source is present; no horizontal overflow; product content is readable and linear;
- reduced-motion emulation: no video sources attach and posters remain visible;
- asset URLs return HTTP 200 and correct media content types.

**Step 5: Commit**

```bash
git add -A apps/theorvane
git commit -m "feat(theorvane): complete Editorial Signal rebrand"
```

### Task 7: Review, push, and request an exact-head review

**Objective:** Deliver a reviewable branch without blending unrelated edits.

**Files:**
- Review: all changed files from Tasks 1–6

**Step 1: Inspect scope**

```bash
git diff origin/dev...HEAD --stat
git diff --check origin/dev...HEAD
npm test
npm run build
```

**Step 2: Request review**

Push the feature branch, update/open the PR against `dev`, request formal independent review at the exact head SHA, and do not self-approve. Confirm CI and reviewer status before merge.

**Step 3: Record verification**

Post a concise PR summary with the tests/build/browser media verification and note any intentionally preserved shared packages.
