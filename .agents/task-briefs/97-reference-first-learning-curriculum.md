# Website #97 — reference-first learning curriculum portal

## Recovery identity

- Repository: `Theorvane/website`
- Implementation branch: `feat/97-reference-first-learning-curriculum`
- Base: `origin/dev` at `0c5e1bfc92cb301341727f37488190651f918979`
- Issue: https://github.com/Theorvane/website/issues/97

## Immutable source releases

- TypeMCP canonical main: `c58f8f495d7c4eb05e2081a5fdd2a61995c1dece`
  - released curriculum source paths: `docs/guides/petstore-project-setup.md`, `docs/guides/petstore-typemcp-foundation.md`, `docs/guides/petstore-walkthrough.md`
- TypeChain canonical main: `90152f97834dacfe7211786bc98227185950e2e0`
  - released curriculum source paths: `docs/guides/petstore-typechain-foundation.md`, `docs/guides/petstore-policy-and-composition.md`, `docs/guides/petstore-walkthrough.md`

## Delivery scope

The website pins those full immutable SHAs, allowlists the source-owned Build curriculum Markdown, and adds only navigation/presentation metadata. It must not duplicate executable guide content or claim that either package owns application models, credentials, authorization, policy enforcement, persistence, hosting, deployment, or unsupported cross-process transport.

## Verification gates

1. Add focused RED manifest/sync/sitemap and portal presentation tests.
2. Sync each product's canonical Markdown using the repository scripts.
3. Implement Build metadata, reference-first home taxonomy, curriculum rail, article chapter context, curriculum pager, and accessible responsive navigation.
4. Run focused and full tests, lint, typecheck, build, production audit, diff check.
5. Verify built desktop and 375px layouts on confirmed free ports without stopping unrelated listeners.
6. Obtain exact-head independent review, merge into `dev`, then use separately reviewed `dev -> main` release promotion and verify live canonical routes.
