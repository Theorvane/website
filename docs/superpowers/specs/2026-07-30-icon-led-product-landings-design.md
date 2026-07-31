# Icon-led Product Landings Design

## Goal
Align TypeMCP, TypeChain, and OpenScene with the approved Theorvane editorial direction while preserving factual product claims, canonical destinations, semantic navigation, and each product’s official mark. Expand Theorvane’s minimal footer into the organization-level product index.

## Visual system
- **Shared composition:** dark editorial field, large display typography, an icon-led evidence panel, a four-step proof grid, and an information-rich footer.
- **TypeMCP:** its official hexagonal node mark; cobalt/blue accent; evidence panel makes the declared input, output, and application-owned hosting boundary readable.
- **TypeChain:** its official linked-chain mark; green accent; evidence panel distinguishes TypeChain metadata, the adapter, and application-owned runtime authority.
- **OpenScene:** its official rounded play/timeline mark; mint and violet accents; evidence panel makes the confirmation-before-write interaction tangible.
- **Theorvane:** preserve existing Editorial Signal hero and product passage. Replace only the sparse footer with an organization footer that exposes the three canonical product routes, principles, and GitHub.

## Accessibility and responsive behavior
- Official SVGs remain real `<img>` elements with descriptive wordmarks; decorative repeated panel marks use empty alt text.
- Retain the skip link, labelled primary/footer navigation, 44px navigation targets, and all canonical links.
- At narrow widths, hero, proof panels, footer groups, and step grids become one/two-column layouts with no horizontal overflow. Source order stays logical.
- Keep existing reduced-motion behavior; this work introduces no required motion.

## Verification
- Component tests assert official mark source, product-specific evidence labels, semantic footer navigation, and canonical product destinations.
- Run focused RED then GREEN tests before implementation.
- Run all workspace tests, lint, typechecks, builds, `git diff --check`, then inspect current production builds at desktop and a true 375px viewport.
