# Editorial Signal rebrand — design specification

**Status:** approved for implementation
**Site:** `apps/theorvane`
**Goal:** preserve the Theorvane product set, external destinations, and boundary-first message while replacing the current lime/olive cinematic site with an icon-derived editorial identity and a newly produced media system.

## 1. Non-negotiable product and content boundaries

The homepage remains an English, canonical source for the independent Theorvane studio. It retains:

- The three products and canonical destinations: TypeMCP, TypeChain, and OpenVideo.
- The claims that runtime policy, models, credentials, hosting, and deployment remain application-owned.
- Semantic landmarks, skip link, SEO metadata, canonical URLs, keyboard navigation, and reduced-motion behavior.
- The application icon as the visual source of truth, not a decorative afterthought.

The rebrand does **not** add a new application, analytics surface, product, provider, or core dependency.

## 2. Visual direction: Editorial Signal

The design reads as a restrained editorial publication and architectural studio rather than a neon developer dashboard.

### Palette extracted from the icon

| Token | Value | Purpose |
| --- | --- | --- |
| `--ink-950` | `#020817` | Obsidian navy primary field |
| `--ink-900` | `#070F22` | Elevated navy panels |
| `--porcelain` | `#F4F2ED` | Primary type and light editorial sections |
| `--porcelain-muted` | `#C8C8C5` | Secondary type and rules |
| `--signal` | `#E91D6A` | Icon-derived diagonal signal; links, active states, progress |
| `--signal-deep` | `#A80947` | Pressed state / deeper accent field |

Lime, chartreuse, olive, green glows, and green grid imagery are removed. Magenta is used sparingly: one high-salience action, a rule, an active marker, or a single scene detail at a time. It is never used as a broad full-screen glow.

### Typography and layout

- Large compact grotesk headlines paired with a restrained serif italic only for selective emphasis.
- A 12-column editorial grid on desktop, a 4-column mobile grid, and generous white/porcelain content intervals to break up dark media.
- Hairline rules, figure numbers, captions, and chapter labels replace pill-shaped SaaS UI.
- Cards become square or minimally rounded editorial panels. The repeated floating-card zig-zag is removed.

## 3. Homepage information architecture

1. **Masthead** — concise mark, product index link, principles link, GitHub link; transparent above hero and solid after scroll.
2. **Hero: Studio statement** — two-column composition: left headline and two actions, right or full-bleed original loop. The hero media uses dark navy architecture, porcelain forms, and a single magenta diagonal event.
3. **Manifesto strip** — three numbered studio principles in a porcelain interval, replacing the existing dark signal row.
4. **Product index** — one editorial feature per product: number, title, short truthful boundary description, canonical link, and newly created still. Layout alternates media/text alignment but remains linear in DOM and on mobile.
5. **Signal passage** — a short, three-scene visual transition rather than a 500vh story-card stack. The three scenes are: `Declare` (TypeMCP), `Compose` (TypeChain), `Keep local` (OpenVideo). The stage is a visible autoplaying loop; controls are not required because it is decorative, silent media. Adjacent text remains separate from the video plane.
6. **Proof and principles** — editorial proof block followed by the three studio principles, with an explicit boundary statement rather than pseudo-code decoration.
7. **Closing CTA and footer** — porcelain/ink inversion, product index action, official destinations, copyright.

## 4. Media plan

All assets are native, watermark-free, text-free, and contain no external brand marks.

### New stills

- One 16:9 hero poster.
- Three 4:5 or 3:2 product editorial stills, one per product.
- Three 16:9 Signal Passage scene posters.
- Corresponding mobile crops, generated deliberately rather than CSS-cropping a desktop frame.

### New video

- Hero: one 8–12 second silent seamless loop, desktop 16:9 and mobile 9:16.
- Signal Passage: three short silent seamless loops (or one three-beat loop if generation consistency requires it), desktop and mobile variants.
- Encode as H.264 MP4 with WebM fallbacks only if generated/validated. Use `muted`, `playsInline`, `autoPlay`, and `loop`. Each video has a matching poster.

### Runtime behavior

- The above-fold hero loads immediately with its poster present beneath it.
- Passage media starts loading when the stage is within a generous viewport margin.
- `prefers-reduced-motion: reduce` renders static posters; no autoplay or scroll-linked animation occurs.
- Media failures preserve the content and render the poster, never an empty panel.
- Every non-decorative image has useful alternative text; decorative motion stays `aria-hidden`.

## 5. Component boundaries

- `app/page.tsx`: semantic homepage composition and content data only.
- `components/editorial-hero.tsx`: video lifecycle / fallback for the hero.
- `components/product-editorial.tsx`: reusable product feature structure, driven by product data.
- `components/signal-passage.tsx`: a focused three-scene visual treatment with variant selection, media state, and reduced-motion fallback.
- `app/globals.css`: brand tokens and responsive layout rules, with styles grouped by component rather than appended override blocks.
- Existing generic UI packages are only extended when functionality must be shared; site-specific visual work remains inside `apps/theorvane`.

## 6. Accessibility, resilience, and performance acceptance criteria

- All navigation and product links remain keyboard-accessible with a visible magenta focus treatment and contrast that meets WCAG AA.
- Small viewport: media never exceeds its container; product content has a single logical DOM order; navigation can wrap without clipping.
- Desktop: no sticky media hides text or retains a negative stacking context. Text overlays use a guaranteed readable backing layer.
- Video playback does not gate content rendering. A poster and content are visible before media is ready.
- Native image dimensions and `sizes` / `fetchPriority` are applied based on placement. Only above-fold images are eagerly loaded.
- Tests validate semantic content, canonical destinations, palette-token absence of lime values, media fallback behavior, responsive contracts, and reduced-motion behavior.

## 7. Delivery and verification

Implementation is complete only when:

1. New visual assets exist in the site’s public media tree and are decode-validated.
2. Hero and passage videos are verified in a real browser: source resolves, `readyState` is sufficient, `currentTime` advances, and the visible plane is not hidden by CSS.
3. Desktop and mobile browser snapshots confirm the editorial hierarchy and absence of blank media panels.
4. Affected app/unit tests, typecheck, lint, full monorepo test, production build, and asset HTTP checks pass.
5. The resulting work is reviewed as a clean scoped diff before commit/push.
