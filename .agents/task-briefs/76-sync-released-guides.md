# Issue #76 — Sync released TypeMCP and TypeChain guides

## Recovery identity

- Repository: `Theorvane/website`
- Base: `origin/dev` at `9f684e58a9d275a1f7f062fe489c0b5b9620132e`
- Branch: `docs/76-sync-released-guides`
- Canonical TypeMCP main source: `361c91fdb65cf111f2ca4a300ecb602af1858686`
- Canonical TypeChain main source: `033ad244a1be87093d4ad8748b16cf1034300adf`

## Scope

Update only the two documentation portal manifests and their contract tests to pin the canonical protected-main source commits and surface the two released selection guides.

## TDD evidence

1. Update the two manifest contracts first to require the new source commits and routes.
2. Run the focused TypeMCP and TypeChain manifest tests; they must fail while manifests retain stale pins/routes.
3. Update manifests with exact SHA pins, truthful release status labels, and unique guide orders.
4. Re-run focused tests, then full workspace verification.

## Exclusions

No package/source repo changes, no runtime feature work, no external fetch relaxation, no CMS, and no analytics changes.
