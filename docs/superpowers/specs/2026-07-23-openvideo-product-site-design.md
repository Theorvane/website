# OpenVideo product direction and website — design specification

**Status:** Approved product direction; implementation planning required before runtime claims change
**Date:** 2026-07-23
**Issue:** #40

## Goal

Position OpenVideo as an open-source **hybrid AI video editor**: local editing is the primary workflow, while users can optionally use local AI models or explicitly connect AI services for assisted editing and media generation.

The product must preserve user control over projects and media while making AI assistance a visible, credible part of the product direction. The public website must never describe a planned AI capability as already released.

## Product model

### Local editing is the system of record

OpenVideo keeps recordings, imported media, projects, timelines, and exports on the user's device by default. The local timeline, preview, and export workflow remains useful without an AI connection.

### Optional AI assistance

AI assistance may be provided by either of these user-controlled paths:

1. **Local model path** — a user-configured model processes supported work on the user's device.
2. **Connected service path** — a user explicitly chooses and authorizes a compatible external AI model or service for a requested operation.

OpenVideo must make the chosen path understandable before a remote request occurs. The desktop product's future runtime policy must state what material is sent, which connected service receives it, and how the user can avoid or stop the operation. This specification does not authorize a provider integration, account system, telemetry, or secret-storage design; each requires its own approved implementation scope.

## AI capability direction

The first product narrative covers two complementary capability groups. Their availability must be labeled accurately at release time.

### AI-assisted editing

- propose cuts and remove pauses;
- identify highlights and assemble candidate sequences;
- propose reframing for target aspect ratios; and
- generate, refine, or align caption suggestions.

### AI-assisted generation

- create optional scene or B-roll suggestions;
- create optional voice or narration assets; and
- create optional image assets for a video project.

These capabilities support the local editing workflow; they do not replace the timeline as the primary place for review, editing, and export.

## Current implementation boundary

The currently released OpenVideo site truthfully represents a local-first Electron studio for selected-window recording, local timeline editing, and local export. It does **not** currently offer the AI-assisted editing or generation capabilities defined above.

Until an implementation PR delivers each capability, public website copy must use explicit future-facing language such as “planned”, “in development”, or “designed for”. It must not claim that OpenVideo already performs automatic edits, AI generation, external model calls, or connected-service processing.

## Website information architecture after an implementation scope is approved

1. **Header and navigation** — OpenVideo wordmark, in-page links for Features, AI workflow, and Local control, plus an external GitHub source link.
2. **Hero** — introduce OpenVideo as an AI video editor built around a local editing workflow; distinguish the present local editor from planned/available AI functions accurately.
3. **AI workflow** — explain the progression from local timeline to an optional AI operation, generated or suggested output, human review, and local export.
4. **Feature grid** — cover capture, timeline work, assisted editing, optional generation, and local export according to the actual release boundary.
5. **Data and connection control** — explain that projects and media are local by default, local models are optional, and any remote operation requires a user-selected connected service and operation-specific disclosure.
6. **Open-source CTA/footer** — link to source, releases, and Theorvane.

## Architecture

`apps/openvideo/` remains the independently deployable Next.js App Router application in the npm-workspace/Turborepo repository. It owns its page composition, visual styling, metadata, crawler routes, and static tests; it depends only on the repository's neutral `@theorvane/ui` and `@theorvane/design-tokens` packages.

A separate Vercel project builds from the monorepo root with `apps/openvideo` as its Root Directory and serves the canonical production hostname `https://openvideo.theorvane.tech`.

## Accessibility and responsive behavior

- Render exactly one header, named primary navigation, main landmark, and footer.
- Include the shared skip link and maintain visible keyboard focus.
- Use semantic headings and descriptive link labels; all non-local destinations are external links.
- Ensure controls have at least 44px target height.
- Use a responsive single-column layout on narrow screens and enhance it with grids at larger widths.
- Avoid nonessential animation and respect `prefers-reduced-motion`.
- Explain AI connection and data-handling choices in readable text, not color or iconography alone.

## Technical SEO

- Use `metadataBase` set to `https://openvideo.theorvane.tech` and a relative canonical alternate (`/`).
- Provide truthful title, description, Open Graph, Twitter, and indexing directives.
- Expose `robots.txt` and `sitemap.xml` containing only the canonical root URL.
- Render factual `SoftwareApplication` and `WebSite` JSON-LD. The application is categorized as `VideoApplication`; no operating-system availability, price, AI availability, or provider relationship is fabricated.

## Verification for the future website implementation

- Tests cover page landmarks, AI positioning, current-versus-planned copy boundary, local-control copy, CTA destinations, metadata, robots, sitemap, and JSON-LD.
- Include regression tests ensuring remote processing is not described as automatic or invisible, and unavailable AI capabilities are not presented as shipped.
- Root quality gates pass: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.
- After a reviewed release reaches `main`, Vercel and live HTTPS checks confirm the custom domain responds with the deployed application.

## Non-goals

- No provider or model integration in this documentation-only change.
- No cloud storage, automatic telemetry, analytics, account system, CMS, installer hosting, or download flow.
- No claim that planned AI capabilities are currently released.
- No changes to the existing Theorvane or TypeMCP routing in this documentation-only change.
