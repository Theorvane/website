# Issue #26 — TypeMCP technical documentation portal

## Scope

Create the static English documentation portal at `https://typemcp.theorvane.tech/docs` from the approved 13-document manifest at TypeMCP commit `6480a45887a262f354f5691d3d3d19ca04304e96`.

## Product boundary

`type-mcp@0.1.0` publishes only decorator declarations and immutable metadata reads. Pages classified as repository-development or product-target display the release-boundary callout and must not be presented as installed npm APIs.

## Verification

Run source sync, docs tests, full test suite, lint, typecheck, build, audit, diff check, and desktop/mobile production-route checks. Request latest-head independent review before merge.
