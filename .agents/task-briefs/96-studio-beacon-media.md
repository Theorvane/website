# Issue #96 — Studio Beacon validated media slice

## Recovery identity

- Repository: `Theorvane/website`
- Base: `origin/dev` at `0c5e1bfc92cb301341727f37488190651f918979`
- Branch: `feat/96-studio-beacon-media`
- Parent implementation: Scroll World design `docs/superpowers/specs/2026-07-29-four-site-scroll-world-design.md`; implementation PR #88.

## Scope

Promote only the approved desktop Studio Beacon calibration assets into public runtime media with deterministic provenance validation. This is a partial media slice—not a full five-scene timeline or a mobile substitute.

## Non-goals

- This follow-up is limited to the user-approved regeneration of one Boundary Atlas desktop still and one five-second I2V clip; it does not expand to mobile, connectors, or a full timeline.
- No mobile rendition, connectors, full timeline, deploy, or Vercel/provider configuration.
- No credentials, URLs, provider response records, or raw prompt payloads in Git.

## Regeneration evidence

- User explicitly approved a constrained Boundary Atlas replacement after rejecting the literal beacon creative direction.
- Still: `seedream-5-0-260128`; video: `seedance-1-5-pro-251215` with first/last-frame conditioning.
- Runtime candidate is the localized video-only derivative after stream inspection; it has no audio stream.
- Visual review found no visible watermark, text, logo, person, or UI. A full timeline must use a short poster/video crossfade rather than a hard pixel seam.

## RED evidence

- `node --test apps/theorvane/scroll-world/test/studio-beacon-slice.test.mjs` failed before implementation because `apps/theorvane/scroll-world/media/studio-beacon-desktop.json` did not exist (`ENOENT`).
- The implementation promotes only reviewed local calibration assets and makes this contract pass without altering the complete timeline manifest.

## Required verification

- Focused node contract test; app test/lint/typecheck/build; media `ffprobe`; SHA-256; `git diff --check`.
- Independent exact-head review and normal protected-`dev` PR path.
