# Issue #87 — Reference-first library documentation portals

## Recovery identity

- Repository: `Theorvane/website`
- Base branch: `origin/dev` at `3da65c0a699a8d1b2cee44e1de39bf521791757b`
- Branch: `docs/87-library-docs-portal-design`
- Design source: `docs/superpowers/specs/2026-07-29-library-documentation-portals-design.md`
- Related source work: `Theorvane/type-mcp#115`, `Theorvane/type-chain#78`

## Scope

Deliver an accessible, reference-first documentation experience for `apps/type-mcp` and `apps/type-chain`. The portals provide task-oriented discovery, a supported-surface map, precise release-boundary presentation, improved article navigation, and immutable synchronization of detailed canonical source documents.

## Dependency order

1. TypeMCP #115 adds detailed canonical guides, receives independent review, and is promoted through a reviewed `dev` → `main` release.
2. TypeChain #78 adds detailed canonical guides, receives independent review, and is promoted through a reviewed `dev` → `main` release.
3. This website issue advances each source pin independently to the resulting canonical-main SHA, updates the allowlist, synchronizes the generated cache, and changes only the portal presentation needed for the approved documents.

## Non-goals

- No CMS, browser-time GitHub fetch, document editing, runtime library features, authentication, or unrelated landing-page work.
- No source SHA may point at a mutable branch or a source change that has not completed its canonical release path.
- Do not imply that TypeMCP owns hosting, authorization, persistence, models, LangGraph, or deployment, or that TypeChain owns models, credentials, policy enforcement, state, hosting, deployment, or cross-process MCP transport.

## Acceptance and verification

- Source manifest, source cache, document index, article navigation, metadata/sitemap, accessibility, and responsive contracts have focused tests with recorded red/green evidence for implementation behavior.
- Source-pinned docs include only manifest-approved canonical paths and present release state truthfully.
- Run source sync, focused app tests, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.
- Open one focused PR against `dev` with Issue #87 labels and `sjungwon03` assignment. Obtain an exact-head independent `sjungwon03-ai` formal review. Release separately from `dev` to `main`, then verify the public docs routes at desktop and mobile sizes.
