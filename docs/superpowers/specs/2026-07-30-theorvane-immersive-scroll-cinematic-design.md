# Theorvane immersive scroll-cinematic design

**Issue:** #122  
**Status:** Approved design; implementation and paid media generation remain separately gated.  
**Supersedes:** The Theorvane-pilot presentation details in `2026-07-29-four-site-scroll-world-design.md`; the shared media-contract and product-boundary constraints in that document remain in force.

## 1. Outcome

Turn `theorvane.tech` from a conventional product index with an isolated video into a single, immersive, scroll-driven studio world. The visitor moves through five native cinematic scenes while the entire page remains visually alive through an ambient background system. The experience must be striking without hiding the product boundaries, semantic content, or real destinations.

No generated visual may contain readable text, logos, product UI, or imply unshipped capabilities. HTML owns all claims, labels, navigation, and calls to action.

## 2. Chosen experience

### 2.1 Scroll-cinematic architecture

Use five scene/dive clips and four frame-matched connectors for each independently composed variant:

| Variant | Scenes | Connectors | Composition |
|---|---:|---:|---|
| Desktop | 5 | 4 | Native 16:9 |
| Mobile | 5 | 4 | Native 9:16; never center-cropped from desktop |

The bounded `ScrollWorld` maps local scroll progress to pre-rendered media time using request-animation-frame-coalesced seeks. It is poster-first, muted, `playsInline`, lazy-attached near the viewport, and has no scroll or focus trap. The current short `studio-beacon` file is a Scene 01 calibration enhancement only—not a claimed five-scene timeline.

### 2.2 Narrative and camera grammar

The world uses **dark technical dioramas**: warm black ground, mineral/steel forms, chartreuse signal light, restrained haze and paper texture. The camera flies down into each scene, holds on the product boundary, then ascends into a connector that lands on the actual first frame of the next clip.

| Scene | Cinematic subject | HTML message and destination |
|---|---|---|
| 01 — Boundary Atlas | A studio beacon above a terrain grid; three independent surfaces are visible as separate structures. | “Three surfaces. Explicit junctions.” → `#products` |
| 02 — TypeMCP Contract Island | Contract observatory; declaration forms pass through an open compiler bridge toward an MCP edge. | Explicit MCP declarations; runtime policy and deployment remain application-owned. → TypeMCP |
| 03 — TypeChain Composition Island | Modular typed tool workshop; rails stop visibly before the consumer application horizon. | Typed composition at the edge; models, credentials, policy, state, and hosting remain application-owned. → TypeChain |
| 04 — OpenVideo Local Studio | Contained local edit desk with capture object, timeline rails, and export case. | Capture, edit, and export stay on-device; no cloud uploads, accounts, or analytics. → OpenVideo |
| 05 — Product Constellation | Camera rises to the three independent product islands surrounding the beacon. | “Return with the system still yours.” → `#products` |

Connector generation must use the real extracted last frame of clip *n* and real extracted first frame of clip *n+1*. A visible seam stops the batch until corrected.

## 3. Site-wide ambient background

The homepage receives a separate, decorative `AmbientWorld` layer behind every section—not a canvas and not a second source of meaning.

1. **Foundation:** fixed near-black base, ultra-low-contrast grain, and a perspective terrain/grid that fades at readable-content edges.
2. **Depth:** three CSS-only, GPU-friendly layers (distant aura, grid/contour, foreground vignette). Their transforms and opacity consume a single scroll-progress CSS custom property; there is no WebGL dependency.
3. **Product echoes:** the world stage changes an accent variable by current scene—chartreuse base with restrained indigo/amber/oxide highlights—then returns to the studio palette. Product cards and ordinary content retain a neutral, calm treatment.
4. **Legibility:** every text section carries a solid or high-opacity surface/backdrop and meets contrast requirements. Background layers have `pointer-events: none`, are `aria-hidden`, and sit beneath landmarks.
5. **Motion fallback:** `prefers-reduced-motion` freezes transforms, omits video attachment, and retains a static grain/grid/poster treatment. On narrow screens the grid is simplified before it can cause overflow or visual noise.

The result is intentional between scenes and below the world stage: depth, texture, and continuity rather than empty flat black.

## 4. Component boundaries

- `@theorvane/ui/ScrollWorld`: neutral media manifest, native source selection, bounded controller, poster/error/reduced-motion behavior, scene navigation.
- `apps/theorvane/lib/scroll-world-manifest.ts`: five IDs, native local/public media paths, scene ranges, truthful destinations.
- `apps/theorvane/components/ambient-world.tsx`: client-side scroll-progress publisher only; no product claims or media logic.
- `apps/theorvane/components/boundary-atlas-stage.tsx`: calibration Scene 01 preview. It becomes a timeline scene only after approved full assets exist.
- `apps/theorvane/app/page.tsx` and `globals.css`: semantic story, document-flow CTAs, scoped visual composition.

## 5. Resilience and accessibility

- All headings, scene summaries, product claims, and CTAs remain complete without video or JavaScript.
- The scene index uses ordinary 44px-or-larger anchors and maintains logical keyboard order.
- On source error, preserve the poster and expose: “Cinematic preview unavailable. The product journey remains below.”
- Server-rendered markup must not emit a video `src`; it attaches only after client-side motion and viewport checks.
- Desktop and true 375px CSS viewport validation must confirm visible controls, no clipping, and `scrollWidth === innerWidth`.

## 6. Media spend gate and provenance

Before any asset batch, inspect the active provider workspace and render exactly one approved still plus one low-cost video probe. Report actual output, time, charge, inventory (10 stills, 18 clips before rerolls), estimate, and stop conditions. Proceed only after explicit in-chat spend approval.

Keep raw prompts, credentials, signed URLs, OAuth callbacks, raw renders, and seam frames outside the repository. Commit only approved optimized public assets plus a non-secret manifest/provenance record with relative paths, dimensions, duration, checksums, model/version, prompt hash, job ID, and human seam verdict.

## 7. Test and acceptance contract

Write RED tests before code for:

- exactly five ordered scene IDs, native 16:9/9:16 paths, valid CTA destinations, and complete ranges;
- desktop/mobile source selection and no initial SSR video source;
- bounded, coalesced seek behavior and no seeking for reduced motion;
- semantic scene navigation, media error fallback, and accessible product links;
- ambient layer decoration semantics, reduced-motion static behavior, z-index isolation, and narrow-screen overflow contract.

Completion requires focused GREEN results, full tests, lint, typecheck, build, high-severity production audit, `git diff --check`, and fresh production desktop/mobile visual inspection. Independent review must target the final exact commit SHA.

## 8. Non-goals

No WebGL, runtime generation, CMS, analytics, auth, server-side product feature, purchase/top-up, deployment, or product-boundary expansion. No desktop crop presented as mobile-native video. No production release is implied by this design or its implementation PR.
