# OpenVideo product site — design specification

**Status:** Approved for implementation
**Date:** 2026-07-23
**Issue:** #24

## Goal

Publish a standalone, truthful product landing page for OpenVideo at `https://openvideo.theorvane.tech`. The site must make OpenVideo easy to discover without extending the desktop product's local-first privacy boundary.

## Architecture

Add `apps/openvideo/` as a third independently deployable Next.js App Router application in the existing npm-workspace/Turborepo repository. It owns its page composition, visual styling, metadata, crawler routes, and static tests; it depends only on the repository's neutral `@theorvane/ui` and `@theorvane/design-tokens` packages.

A separate Vercel project will build from the monorepo root with `apps/openvideo` as its Root Directory. It will serve exactly one canonical production hostname: `https://openvideo.theorvane.tech`.

## Product boundary and claims

OpenVideo is an open-source, local-first Electron studio for recording and editing video. The page may accurately describe:

- selected-window capture and local WebM recording;
- a local timeline editing workspace and Program Monitor preview;
- local MP4 export through FFmpeg;
- optional local, user-configured narration tooling; and
- local project and media storage.

The page must not claim cloud upload, analytics, account management, crash reporting, auto-updates, network provider integrations, or downloadable installer binaries. It must direct interested users to the GitHub source repository and its releases page rather than inventing a download flow.

## Page composition

1. **Header and navigation** — OpenVideo wordmark, in-page links for Features and Privacy, and an external GitHub source link.
2. **Hero** — clear local-first positioning; source and releases CTAs; an explicit statement that projects and media remain on the user's device.
3. **Feature grid** — focused capability cards for capture, timeline work, local export, and local narration controls.
4. **Privacy boundary** — factual statement of what the product does not include: cloud upload, analytics, or accounts.
5. **Open-source CTA/footer** — links to source, releases, and Theorvane.

## Accessibility and responsive behavior

- Render exactly one header, named primary navigation, main landmark, and footer.
- Include the shared skip link and maintain visible keyboard focus.
- Use semantic headings and link labels; all non-local destinations are external links.
- Ensure controls have at least 44px target height.
- Use a responsive single-column layout on narrow screens and enhance it with grids at larger widths.
- Avoid nonessential animation and respect `prefers-reduced-motion`.

## Technical SEO

- Use `metadataBase` set to `https://openvideo.theorvane.tech` and a relative canonical alternate (`/`).
- Provide truthful title, description, Open Graph, Twitter, and indexing directives.
- Expose `robots.txt` and `sitemap.xml` containing only the canonical root URL.
- Render factual `SoftwareApplication` and `WebSite` JSON-LD. The application is categorized as `VideoApplication`; no operating-system availability or price is fabricated.

## Verification

- Tests must cover page landmarks, public copy boundary, CTA destinations, metadata, robots, sitemap, and JSON-LD.
- Root quality gates must pass: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.
- After a reviewed release reaches `main`, Vercel and live HTTPS checks must confirm the custom domain responds with the deployed application.

## Non-goals

No product backend, cloud service, account system, CMS, analytics, download installer hosting, or changes to the existing Theorvane and TypeMCP routing are included.
