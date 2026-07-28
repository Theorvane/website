# Issue #58 — TypeChain landing page and documentation portal

## Scope

Create the independently deployable `apps/type-chain` Next.js application for `https://typechain.theorvane.tech`: a TypeChain landing page plus a static documentation portal at `/docs` and `/docs/[...slug]`.

## Product boundary

The portal renders only manifest-approved Markdown from `Theorvane/type-chain/docs/` at a full immutable commit SHA. The published `@theorvane/type-chain@0.1.1` package provides Stage 3 decorator declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Applications own models, credentials, policy enforcement, state, hosting, and deployment.

## Verification

Run source sync, app and workspace tests, lint, typecheck, production build, production dependency audit, diff check, and desktop/mobile route checks. Advance the pinned source commit only after the canonical TypeChain docs are promoted to `main`; request latest-head independent review before merge.
