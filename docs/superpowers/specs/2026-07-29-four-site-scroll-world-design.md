# Four-site Scroll World production design

**Issue:** #82
**Status:** Proposed — no media generation, purchase, deployment, or product-copy change is authorized by this document alone.

## 1. Purpose and product boundary

Create a shared scroll-driven cinematic presentation system for four independently deployed Theorvane sites:

- `theorvane.tech` — the brand and product index
- `typemcp.theorvane.tech` — TypeMCP’s declared-contract boundaries
- `typechain.theorvane.tech` — TypeChain’s optional composition boundaries
- `open-video.app` — OpenVideo’s released local workflow

The design borrows only the *interaction pattern* of a scroll-scrubbed cinematic world: scrolling controls elapsed time in pre-rendered media. It does not copy another company’s images, wording, branding, or visual identity.

The first production slice is a fully validated Theorvane pilot. TypeMCP, TypeChain, and OpenVideo reuse the media-manifest and scrub-engine contract only after the pilot’s media quality, user experience, accessibility, and cost results are accepted.

The system must not create product claims. In particular:

- TypeMCP remains declarations/compiler/stdio, an HTTP subpath, and a tools-only LangChain adapter. Consumer applications own models, auth, policy, graphs, state, persistence, hosting, and deployment.
- TypeChain remains metadata plus optional LangChain, agent-builder, and in-process TypeMCP composition. Consumer applications own models, credentials, authorization, policy judgment, state, persistence, hosting, and deployment.
- OpenVideo remains a local-first application for capture, edit, and export. It must not imply hosted, cloud, analytics, account, or AI-generation functionality.

## 2. Experience model

### Scroll behavior

A client-side scroll controller maps a bounded `Scroll World` section’s progress to the current time of a pre-rendered video timeline. The user scrolls forward or backward through one connected miniature world; scrolling never asks the browser to synthesize video.

Each scene has semantic copy in normal document order. The media is visual support, not the sole way to understand or navigate the product. A persistent scene index exposes the current narrative point and jumps to the matching copy section. Every product CTA retains a real link destination.

The controller must:

- lazy-load video only when the world nears the viewport;
- coalesce seeks using `requestAnimationFrame`;
- avoid autoplay with audio; all clips are muted and `playsInline`;
- use a static poster while media is loading, unavailable, or disabled;
- yield a readable, non-animated narrative if `prefers-reduced-motion: reduce` is set;
- avoid setting a fixed scroll position, preventing keyboard and browser-history traps.

### Desktop and mobile

Each production world has two independently rendered sources:

- Desktop: 16:9
- Mobile: 9:16

Mobile is not a crop of desktop footage. CSS and `matchMedia` choose the appropriate manifest at the established breakpoint. Both variants share scene identifiers and copy but use separately composed first/last frames and separate chains.

### Visual language

The pilot uses a Theorvane-specific art direction: **quiet technical clay dioramas**, warm off-black environments, chartreuse signal light, understated steel and paper textures, and no readable generated text or logos. It is not a recreation of any cited site.

The camera grammar is **Fly through the world**:

1. descend from a high miniature-world overview into a scene;
2. pause visually at the scene’s focal idea while copy is most prominent;
3. climb out into an aerial connective flight;
4. land on the actual first frame of the following scene.

For every connector, the start image is extracted from the previous rendered dive clip’s real last frame and the end image is extracted from the following dive clip’s real first frame. Original scene stills must never be substituted at these boundaries.

## 3. Narrative map

### 3.1 Theorvane pilot — five scenes

| ID | World scene | Semantic content | Primary destination |
|---|---|---|---|
| `studio-beacon` | A compact night studio atop a luminous terrain grid; focused light reveals a precise working table. | Independent studio; durable, inspectable developer products. | `#products` |
| `typemcp-contract-island` | A small TypeScript contract observatory: declaration cards flow through a visible compiler bridge toward an MCP gateway. | TypeMCP’s explicit declaration and MCP boundary. | `https://typemcp.theorvane.tech/` |
| `typechain-composition-island` | A modular tool workshop with typed connections that stop at a clearly open application boundary. | TypeChain composition; applications retain ownership. | `https://typechain.theorvane.tech/` |
| `openvideo-local-studio` | A local editing desk with camera, timeline rails, and an export case inside a contained workstation. | Local capture, local edit, local export. | `https://open-video.app/` |
| `product-constellation` | The camera rises to reveal all three products as connected, independent islands surrounding the studio beacon. | Choose a focused tool; preserve system ownership. | `#products` |

The final scene ends in a still frame with readable HTML headline and a product-index CTA. Generated media must not contain real words, product marks, or interface labels.

### 3.2 TypeMCP rollout map

1. **Declaration shelf** — TypeScript metadata near real methods.
2. **Validation chamber** — definitions checked before compilation.
3. **Compiler bridge** — explicit instance resolution produces a real MCP surface.
4. **Transport edge** — stdio and Streamable HTTP at the application boundary.
5. **Consumer horizon** — models, LangGraph topology, policy, auth, state, persistence, hosting, and deployment remain outside the product world.

### 3.3 TypeChain rollout map

1. **Decorator desk** — Stage 3 metadata and schemas beside methods.
2. **Definition library** — immutable receiver-bound definitions.
3. **LangChain tool bay** — optional adapter produces standard tools.
4. **Composition bridge** — optional direct agent-builder and in-process TypeMCP bridge.
5. **Application-owned horizon** — model, credentials, authorization, policy judgment, state, persistence, hosting, and deployment stay with the application.

### 3.4 OpenVideo rollout map

1. **Capture room** — selected-window capture stays on the device.
2. **Local media shelf** — files and projects remain local.
3. **Timeline workshop** — local edit workspace and preview.
4. **Export press** — FFmpeg export produces a local file.
5. **Ownership home** — no accounts, uploads, analytics, connected services, or unavailable AI features are implied.

## 4. Media production contract

### Asset inventory

For each five-scene site, production requires:

| Variant | Scene stills | Dive clips | Connector clips | Total video clips |
|---|---:|---:|---:|---:|
| 16:9 desktop | 5 | 5 | 4 | 9 |
| 9:16 mobile | 5 | 5 | 4 | 9 |
| **Per site** | **10** | **10** | **8** | **18** |

Across all four sites this is 40 scene stills and 72 video clips before rerolls. The planned pilot only spends for the Theorvane row: 10 stills and 18 clips, plus explicitly approved reroll headroom.

### Generation sequence

1. Query the Higgsfield balance and active workspace. No automatic top-up or purchase is allowed.
2. Inspect the chosen image and video model contracts; use only a video model that supports both start and end frames for connector duty.
3. Generate all desktop scene stills using one fixed style preamble. Review cohesion before video work.
4. Generate all mobile scene stills using the same identity but native 9:16 composition. Review them independently; they are not crops.
5. Generate the five dive clips for each aspect ratio.
6. Download clips, extract real boundary frames, and generate four connectors for each aspect ratio using those frames.
7. Review every seam frame-by-frame, then encode web delivery artifacts, poster frames, and immutable manifest entries.
8. Stop after the Theorvane pilot and record actual credit spend, timing, rerolls, media sizes, and seam verdicts before any product-site generation begins.

The selected video model, duration, resolution, model contract, prompt files, job IDs, checksums, and reviewer verdicts are recorded in a non-secret asset manifest. OAuth tokens, signed URLs, and credentials are never committed.

### Cost and side-effect gate

Before any real generation, report the observed available credits, a calibrated one-still/one-clip result, the full pilot estimate, and the reroll allowance. The user must explicitly approve that spend in the active conversation. A generation failure, low-credit signal, or visible seam defect halts the batch rather than silently consuming more credits.

## 5. Application architecture

### Reusable package boundary

A neutral shared UI package owns small framework-neutral types and behavior:

- `ScrollWorldManifest`: scenes, source variants, posters, duration, dwell/linger values, accessibility label, and content links.
- `ScrollWorldController`: scroll-to-time mapping, lazy initialization, source selection, coalesced seek behavior, and cleanup.
- `ScrollWorld` React wrapper: semantic scene navigation, video/poster rendering, reduced-motion behavior, and progressive enhancement.

Product applications own their manifest and all product copy. Shared code must not encode product claims or import product application files.

### Content and CSS

Each homepage retains a semantic hero, heading hierarchy, navigation, and CTA structure. A world section may be the hero’s visual layer or follow it, depending on measured readability; it does not replace landmarks with canvas-only content.

The visual layer uses:

- `<video>` with a poster and no audio;
- `object-fit: cover` only within its native aspect-ratio container, never for the mobile fallback source;
- a controlled sticky viewport stage with documented scroll height;
- CSS custom properties for scene accent, progress, and safe-area insets;
- visible focus styling and 44px-or-larger scene navigation targets.

The controller has no dependency on a network request at scroll time. Media is static and cacheable, served from committed/deployment-approved asset locations.

## 6. Accessibility, resilience, and performance

- `prefers-reduced-motion`: show poster art plus all scene copy in document flow; no scrub controller.
- Keyboard: scene index and all CTAs are normal focusable controls; video itself is not an inaccessible interaction requirement.
- Screen readers: concise `aria-label`/descriptions identify the visual journey; generated video contains no critical text.
- Loading: poster first, `preload="metadata"`, lazy full source load; source failure reveals a visible fallback message and the semantic story.
- Narrow viewport QA uses a real 375px CSS viewport and confirms `scrollWidth` does not exceed `innerWidth`.
- Performance budgets are established from pilot output: media dimensions/duration, AV1/H.264 fallback decision, poster size, initial route JS, and largest-contentful-paint measurement.

## 7. Test and review strategy

Before production code:

1. Add a focused failing manifest/scene contract test for Theorvane’s five scene IDs, desktop/mobile source selection, valid CTA targets, and reduced-motion fallback.
2. Add a focused failing responsive contract asserting that a 375px viewport selects the mobile media source and preserves un-clipped controls.
3. Add a focused failing controller test for bounded time mapping and no seek mutation when reduced motion is active.

After implementation:

- run focused tests, full `npm test`, lint, typecheck, build, high-severity production audit, and `git diff --check`;
- inspect production artifacts and source manifests for accidental tokens, signed URLs, generated build output, and unexpected media files;
- perform desktop and 375px visual checks against a freshly built production server;
- verify actual media route loading and poster fallback with network blocked;
- bind independent review to the exact commit SHA.

### Pilot acceptance gate

The pilot is accepted only if all of the following hold:

- desktop and mobile sources are separate native renders;
- no perceptible pop occurs at any of the eight connectors (four per aspect ratio);
- product claims remain within approved boundaries;
- reduced-motion and failed-media paths preserve the complete journey and CTA access;
- measured spend is within the user-approved budget;
- page performance and responsive QA meet the recorded budget;
- reviewer approval and protected-branch CI pass.

Only then may a new issue/brief advance TypeMCP, TypeChain, and OpenVideo from the rollout maps in section 3.

## 8. Explicit non-goals

- No generated source code or visual media is committed before a dedicated asset review confirms licensing, quality, and repository size policy.
- No direct production deployment, branch-protection change, secret mutation, account connection, TikTok action, credit purchase, analytics addition, or hosted product capability.
- No version, API, dependency, package, or product-boundary changes in TypeMCP, TypeChain, or OpenVideo.
