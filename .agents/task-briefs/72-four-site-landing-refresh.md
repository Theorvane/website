# Issue #72 — Four-site landing refresh

## Recovery identity

- Repository: `Theorvane/website`
- Base branch: `origin/dev` at `7c84b3a2695d3eaf3b2f3a41b98acd913d6c79c0`
- Feature branch: `feat/72-four-site-landing-refresh` after the design-document PR is merged
- Design-document branch: `docs/72-four-site-landing-refresh`
- Issue: https://github.com/Theorvane/website/issues/72

## Approved scope

Refresh the public landing pages in `apps/theorvane`, `apps/type-mcp`, `apps/type-chain`, and `apps/openscene`. They share a conversion and accessibility rhythm, but each keeps its own color, typography, product copy, and truthful runtime boundary.

## Required evidence

Use focused RED/GREEN tests for the affected page contracts and responsive CSS contracts. Before the implementation PR, run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`. Inspect production builds at desktop and a 375px CSS viewport. The final PR must receive independent `sjungwon03-ai` review on its latest head.

## Prohibited claims

Do not introduce fabricated social proof. Preserve the published TypeMCP and TypeChain package boundaries. Present OpenScene AI functions only as planned if mentioned; do not describe them as released.
