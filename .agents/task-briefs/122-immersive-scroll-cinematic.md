# Issue #122 — Immersive Theorvane scroll cinematic

- **Branch:** `feat/122-immersive-scroll-cinematic`
- **Base:** `origin/dev` at `53a739c`
- **Issue:** https://github.com/Theorvane/website/issues/122
- **Design:** `docs/superpowers/specs/2026-07-30-theorvane-immersive-scroll-cinematic-design.md`

## Approved direction

- Theorvane is an immersive five-scene scroll-cinematic studio world.
- Each story has five dive clips plus four exact-frame connectors in native desktop 16:9 and mobile 9:16 variants.
- The whole site is a video-led cinematic world: Scene 01 provides a poster-first, muted hero background that hands off to the scroll-scrubbed timeline; the timeline then transitions visually into the product index.
- The site-wide CSS ambient layer supports—rather than replaces—the video with depth grid, restrained grain, scene accent light, and content-safe vignettes.
- Semantic document-flow copy, product CTA links, keyboard navigation, media failure UI, and reduced-motion poster/static fallback remain mandatory.

## Guardrails

- The existing Scene 01 `studio-beacon` asset is calibration-only until a reviewed timeline is complete.
- Do not produce paid media without an in-chat calibration/spend report and explicit user approval.
- Never commit tokens, signed URLs, OAuth data, raw provider payloads, raw media, or generated build output.
- Never claim product features beyond the current product boundary.
- Use test-first slices and bind independent review to the final exact head SHA.

## Planned sequence

1. Write a detailed implementation plan after the design-document review gate.
2. Add RED contracts for the complete scene/media/ambient experience.
3. Implement scroll runtime and semantic fallbacks, then ambient backdrop.
4. Verify desktop and true 375px mobile build artifacts.
5. Calibrate media provider and return for explicit spend approval before production assets.
