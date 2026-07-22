# Task brief — Organization avatar site icons

**Issue:** https://github.com/Theorvane/website/issues/12
**Branch:** `feat/12-org-avatar-site-icons`
**Status:** in-progress

## Goal

Use the current Theorvane GitHub Organization avatar as the website's browser favicon, Next.js site icon, and Apple touch icon.

## Scope

- Download the Organization avatar from GitHub as the controlled source.
- Produce `icon.png`, `apple-icon.png`, and a multi-resolution `favicon.ico`.
- Add explicit metadata icon declarations.
- Remove the prior custom SVG icon so all supported icon routes use the Organization identity.

## Test-first evidence

- Added an icon metadata expectation to `apps/theorvane/test/seo.test.tsx`.
- Observed the focused test fail because `metadata.icons` was undefined.
- Added the smallest explicit metadata and generated assets to satisfy that contract.

## Verification

- Focused SEO test.
- Full test, lint, typecheck, build, production dependency audit, and whitespace diff checks.
- Confirm build emits PNG icon and Apple-icon routes.
