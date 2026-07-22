# Task brief — canonical domain and technical SEO

**Issue:** https://github.com/Theorvane/website/issues/10
**Branch:** `feat/10-canonical-domain-seo`
**Status:** in-progress

## Goal

Make `https://theorvane.tech` the canonical, crawlable Theorvane homepage with accurate search and social metadata.

## Scope

- Canonical metadata, robots directives, Open Graph, Twitter, and JSON-LD.
- Generated `robots.txt` and `sitemap.xml`.
- Vercel `www.theorvane.tech` → apex 308 redirect.

## Test-first evidence

| Stage | Command | Result |
| --- | --- | --- |
| Red | `npm run test --workspace=@theorvane/theorvane-site -- --run test/seo.test.tsx` | pending |
| Green | same | pending |
| Regression | root quality gates | pending |

## Boundaries

- Schema describes only visible homepage content.
- No ranking claims or fabricated rich-result data.
