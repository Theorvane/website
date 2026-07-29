# Issue #96 — Studio Beacon validated media slice

## Recovery identity

- Repository: `Theorvane/website`
- Base: `origin/dev` at `0c5e1bfc92cb301341727f37488190651f918979`
- Branch: `feat/96-studio-beacon-media`
- Parent implementation: Scroll World design `docs/superpowers/specs/2026-07-29-four-site-scroll-world-design.md`; implementation PR #88.

## Scope

Promote only the approved desktop Studio Beacon calibration assets into public runtime media with deterministic provenance validation. This is a partial media slice—not a full five-scene timeline or a mobile substitute.

## Non-goals

- No new provider calls, credits, or media generation.
- No mobile rendition, connectors, full timeline, deploy, or Vercel/provider configuration.
- No credentials, URLs, provider response records, or raw prompt payloads in Git.

## RED evidence

- `node --test apps/theorvane/scroll-world/test/studio-beacon-slice.test.mjs` failed before implementation because `apps/theorvane/scroll-world/media/studio-beacon-desktop.json` did not exist (`ENOENT`).
- The implementation promotes only reviewed local calibration assets and makes this contract pass without altering the complete timeline manifest.

## Required verification

- Focused node contract test; app test/lint/typecheck/build; media `ffprobe`; SHA-256; `git diff --check`.
- Independent exact-head review and normal protected-`dev` PR path.
