# Task brief: Per-site RybbIt tracking scripts

**Issue:** #52
**Branch:** `feat/52-rybbit-tracking-scripts`

## Deliverable

Add the approved RybbIt tracking script to the document head of each independently deployed Next.js application. Each app must carry its own immutable site ID:

- OpenScene: `765035acbe87`
- TypeMCP: `c37c7591084c`
- Theorvane: `13051a0ca43f`

All scripts load from `https://rybbit.handgarden.kr/api/script.js` with deferred loading.

## Non-goals

- Do not modify the OpenScene desktop application.
- Do not introduce another provider, consent UI, cookies, runtime configuration, or deployment configuration.

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

- Target `dev` through a single focused PR that closes #52.
- Apply `type: feature`, `area: website`, and `priority: high`; assign `sjungwon03`.
- Request latest-head review from `sjungwon03-ai`.
- No direct commits to `dev` or `main`; no Vercel/deployment settings changes.
