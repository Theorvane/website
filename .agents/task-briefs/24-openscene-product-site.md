# Task brief: OpenScene product site

**Issue:** #24
**Branch:** `feat/24-openscene-product-site`
**Canonical host:** `https://openscene.app`

## Deliverable

A separate, static, independently deployable Next.js product site under `apps/openscene/`, plus documentation and workspace integration. It must present OpenScene as a local-first Electron recording and editing studio and point visitors to the official source and releases pages.

## Required public facts

- Selected-window capture and local recording.
- Timeline editing, best-effort Program Monitor preview, and local FFmpeg export.
- Projects, imported assets, recordings, voice profiles, and output remain local.
- No cloud upload, analytics, accounts, crash reporting, auto-update, or provider network calls.

## Required external destinations

- Source: `https://github.com/Theorvane/openscene`
- Releases: `https://github.com/Theorvane/openscene/releases`
- Studio: `https://theorvane.tech/`

## Quality gates

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
git diff --check
```

## Delivery constraints

- Do not commit directly to `dev` or `main`.
- PR targets `dev`, closes #24, mirrors Issue labels, and requests latest-head review from `sjungwon03-ai`.
- Vercel preview deployments remain disabled. Only a reviewed `dev` → `main` release may create the production deployment.
