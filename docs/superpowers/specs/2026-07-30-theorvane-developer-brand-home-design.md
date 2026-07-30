# Theorvane developer-brand home — design specification

**Status:** proposed for user review  
**Scope:** `apps/theorvane` homepage only  
**Supersedes:** The Theorvane homepage composition, navigation labels, visual direction, and motion/media treatment in `2026-07-30-editorial-signal-rebrand-design.md` and `2026-07-30-theorvane-immersive-scroll-cinematic-design.md`. Product destinations, truthful product summaries, accessibility requirements, and canonical-host requirements from earlier specifications remain in force.

## 1. Purpose

Reposition `https://theorvane.tech` as an open-source developer-tools organization homepage—not a product-sales or creative-studio landing page.

The desired experience takes cues from the *information hierarchy* of Prisma and NestJS: a clear technical brand promise, calm typography and spacing, navigation that makes product discovery immediate, and a visible path to each product. It does not reproduce their visual assets, wording, logos, components, source code, or layout pixel-for-pixel.

The homepage introduces Theorvane and lets a visitor choose a project. It does not become a second documentation portal, a pricing page, or an installation surface. Each product continues to own its documentation, API reference, package instructions, and source-specific release information.

## 2. User goals and success criteria

A new developer should be able to:

1. Understand within the first viewport that Theorvane builds focused, open-source developer tools.
2. Open **Projects** in the primary navigation and choose TypeMCP, TypeChain, or OpenVideo without scrolling.
3. Reach the selected product's canonical public site in one click.
4. Scan a concise project overview and understand each tool's role without encountering sales-style conversion copy.
5. Use the homepage on keyboard, touch, narrow mobile, and reduced-motion settings without losing navigation or meaning.

The page succeeds when its visual hierarchy signals a technical organization and product ecosystem: restrained interface chrome, readable content, compact project navigation, neutral surfaces, and sparse use of the existing magenta signal color.

## 3. Information architecture

### 3.1 Primary header

The persistent top-level header contains:

- **THEORVANE** wordmark linking to `/`.
- **Projects** disclosure button. It exposes a structured panel with all three products; every item includes product name, one truthful sentence, and a canonical external destination.
  - **TypeMCP** → `https://typemcp.theorvane.tech/`
  - **TypeChain** → `https://typechain.theorvane.tech/`
  - **OpenVideo** → `https://open-video.app/`
- **Principles** anchor link to the homepage's principles section.
- **GitHub** external link to `https://github.com/Theorvane`, with correct new-tab semantics.

The desktop panel opens on pointer activation and follows an accessible disclosure pattern: a named button, `aria-expanded`, Escape to close, outside-click close, and focus restoration to its trigger. On narrow viewports, the header becomes an explicit menu/disclosure that retains all destinations in source and tab order. It must not rely on hover alone.

### 3.2 Homepage sections

1. **Hero — organization introduction**
   - Eyebrow: `Open-source developer tools`.
   - Proposed heading: `Tools that make software boundaries explicit.`
   - Short supporting paragraph: Theorvane creates focused tools for typed integrations and local-first work; applications retain ownership.
   - Primary action: `Explore projects`, which opens/focuses the Projects disclosure on desktop and the projects section/menu path on mobile.
   - Secondary action: `View GitHub` external link.
   - No large photographic/3D artwork, video, customer-logo carousel, testimonial carousel, price, trial, booking, or repeated conversion CTA.

2. **Product architecture / project overview**
   - A concise introductory line establishes that the tools are independent projects with focused surfaces—not a bundled platform.
   - A three-item project grid visually groups TypeMCP, TypeChain, and OpenVideo.
   - Every item retains its truthful product boundary, a canonical destination, and a direct `Explore <product>` link. Cards are useful navigation, not simulated product ads.

3. **Shared principles**
   - Keep the verified principles: framework-neutral, explicit by default, and small proven releases.
   - Present them as compact technical commitments with simple supporting text, not large editorial story blocks.

4. **Source / closing path**
   - A calm close links to the GitHub organization and returns to Projects; it does not repeat a bright primary purchase-style button.

5. **Footer**
   - Copyright, GitHub organization link, and canonical Theorvane link behavior remain.

## 4. Visual system

### 4.1 Direction

Use a light, neutral, developer-tool interface: off-white page field, white surfaces, graphite text, cool-gray borders, and magenta only for small taxonomy labels, active/focus states, and an occasional primary-action emphasis. This deliberately removes the current near-black, high-contrast editorial-cinematic world.

The composition follows a broad readable content container, modest hero height, clear horizontal rules, and compact cards. Typography uses a strong sans-serif headline hierarchy with sensible reading measures; monospace is reserved for small labels rather than body copy. Cards and navigation use modest radii and subtle borders/shadows.

### 4.2 Explicit exclusions

The implementation removes from the Theorvane homepage:

- Fixed cinematic backgrounds, scroll-driven video, generated editorial images, and the associated ambient/video components.
- Oversized artistic product passages and alternating media/text storytelling.
- Full-bleed dark surfaces, dense magenta glow, serif-display contrast, and decorative geometric artwork as primary content.
- Sales language such as product shopping metaphors, platform promises, conversion urgency, and repeated rounded CTA pills.
- Any third-party visual asset, logo, customer claim, or copy lifted from Prisma or NestJS.

Existing prior-preview media remains retained in repository history/assets as a design reference where applicable; it is not treated as an active homepage asset after this redesign.

## 5. Component boundaries

- `app/page.tsx` owns semantic page content, the source-of-truth product descriptor array, external destinations, JSON-LD, landmarks, and section composition.
- A new app-local `components/project-menu.tsx` owns the accessible desktop/narrow navigation disclosure state and only receives typed product entries plus the GitHub URL. It must not become a shared product package.
- A new app-local `components/project-grid.tsx` renders the same typed product entries as visible project navigation so the menu and grid cannot drift in product order, copy, or destinations.
- `app/globals.css` owns site-local tokens, responsive layout, focus states, disclosure/menu appearance, and reduced-motion-safe transitions. It replaces the current visual system rather than layering override CSS on cinematic selectors.
- Obsolete app-local cinematic/editorial components and their homepage-specific style rules are deleted only after confirming no other deployed app imports them.

## 6. State, accessibility, and failure behavior

- The Projects panel begins closed on server render and hydrates as an ordinary semantic button and list. No JavaScript is required to read the hero, product grid, principles, or external links.
- Keyboard behavior: Enter/Space toggles Projects; Escape closes it; focus returns to the trigger; Tab moves through visible menu links in logical order.
- Pointer behavior: clicking outside closes the opened Projects panel. A link click follows the selected canonical destination.
- Navigation remains usable at a 375px CSS viewport with no horizontal overflow. Touch targets are at least 44px tall.
- `aria-current` is used only for a meaningful current route, not for external product links. External GitHub and product links declare a new tab only if that is the chosen product-site convention; when `target="_blank"` is used, include `rel="noopener noreferrer"` and an accessible indication.
- `prefers-reduced-motion: reduce` disables nonessential transitions. The redesign ships no video source, media autoplay, scroll scripting, or image-dependent information.
- If JavaScript fails, the Project grid and GitHub link still provide every product path. The menu itself may remain noninteractive, but it cannot be the only product navigation.

## 7. SEO and truthful content

Maintain the current canonical `https://theorvane.tech/`, organization and WebSite JSON-LD, skip link, named primary navigation, main landmark, heading order, robots, sitemap, and host redirect policy. Update title/description only if required to reflect the approved organization wording, while preserving the truthful organization boundary.

Do not add analytics, account flows, a CMS, documentation search, pricing, customer logos, testimonials, customer metrics, package claims, or remote media.

## 8. Verification plan

### Automated contracts

1. Start with focused failing tests that assert:
   - the exact wordmark destination;
   - a named Projects button with closed/open `aria-expanded` states;
   - TypeMCP, TypeChain, and OpenVideo are each present in both menu and grid with their canonical URL;
   - Escape and outside click close the disclosure and restore trigger focus;
   - header and compact mobile menu preserve every destination;
   - no deprecated cinematic component/test selector is rendered;
   - page retains organization JSON-LD, landmarks, headings, and truthful product descriptions.
2. Add a stylesheet/CSSOM contract for light-theme tokens, narrow-screen navigation layout, visible focus style, 44px target rule, and reduced-motion transition suppression.
3. Run focused RED before production edits, then focused GREEN after each behavior is implemented.

### Build and browser checks

After final source changes, run app-level test/lint/typecheck/build and root `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.

Use a production build/server—not a stale dev server—to inspect:

- Desktop: header landmarks, Projects toggle, open panel links, close behavior, each external destination, semantic headings, and visible focus.
- 375px mobile through DevTools device-metric emulation: read back `window.innerWidth === 375`, body/document scroll width === 375, menu controls visible/tappable, no clipped navigation.
- Reduced-motion emulation: no video assets/sources are present and nonessential transitions are disabled.
- Screenshot review at desktop and 375px after the final build confirms the result reads as a calm developer-brand homepage rather than a product sales page.

## 9. Non-goals

- Redesigning TypeMCP, TypeChain, or OpenVideo sites.
- Duplicating product documentation or installation instructions under `theorvane.tech`.
- Adding a global search implementation, account/login, payments, product downloads, API, CMS, analytics, or backend.
- Changing repository governance, domains, product canonical hosts, or deployment routing.
- Creating new paid/generated media.
