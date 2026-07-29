# Issue #108 — Boundary Atlas runtime alignment

- Repository: `Theorvane/website`
- Base: `origin/dev` at `fd6ec7e007c4243857b91085d2086c452d07c157`
- Branch: `fix/108-boundary-atlas-runtime`

## Scope

Align Scene 01’s semantic copy and actual optional local media enhancement with the approved Boundary Atlas desktop calibration assets. Preserve the global 45-second Scroll World placeholders and the native mobile contract; do not claim this calibration slice replaces either.

## TDD evidence

- RED: `npm run test --workspace=@theorvane/theorvane-site -- components/boundary-atlas-stage.test.tsx test/home.test.tsx lib/scroll-world-manifest.test.ts` failed because the Boundary Atlas component did not exist and Scene 01 still exposed `Studio beacon`.
- GREEN: focused suite passed (10 tests), plus media contracts (6 tests) and `git diff --check`.
- Review remediation RED: server-render test failed because SSR markup contained the local MP4 URL.
- Review remediation GREEN: SSR markup now omits the MP4; the client attaches it only after checking that reduced motion is not requested.

## Runtime contract

- Scene 01 now exposes the local approved desktop poster and silent clip as an optional Boundary Atlas enhancement.
- The 45-second global Scroll World timeline and native mobile variant remain separate placeholders; the calibration slice does not claim to replace them.
- `prefers-reduced-motion` retains poster and semantic copy without attaching a video `src`.
