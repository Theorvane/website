# Icon-led Product Landings Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Ship product-specific icon-led landing treatments for TypeMCP, TypeChain, OpenScene, and a connected Theorvane organization footer.

**Architecture:** Keep each Next app’s page and stylesheet local. Reuse the existing official `/logo.svg` public asset, semantic header/footer patterns, and current SEO/claims. No shared package is required.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Testing Library, CSS.

---

### Task 1: Lock the public landing contracts with RED tests

**Files:** Modify `apps/type-mcp/test/home.test.tsx`, `apps/type-chain/test/home.test.tsx`, `apps/openscene/test/home.test.tsx`, `apps/theorvane/test/home.test.tsx`.

1. Add expectations for official `/logo.svg` product marks in a labelled evidence panel, each product’s approved evidence heading, and the expanded Theorvane footer links.
2. Run each focused test and confirm it fails because the new contract is absent.

### Task 2: Implement TypeMCP contract-surface landing

**Files:** Modify `apps/type-mcp/app/page.tsx`, `apps/type-mcp/app/globals.css`.

1. Add the blue icon-led contract inspection panel while retaining the factual 0.2.2, runtime, documentation, npm, and integration copy.
2. Update the dark/blue visual tokens and responsive panel/grid layout.
3. Run `npm test -- --run test/home.test.tsx` from `apps/type-mcp` and confirm GREEN.

### Task 3: Implement TypeChain ownership-surface landing

**Files:** Modify `apps/type-chain/app/page.tsx`, `apps/type-chain/app/globals.css`.

1. Add the green icon-led ownership map that lists TypeChain, adapter, and application authority.
2. Preserve published package, docs, getting-started, and canonical footer links.
3. Run focused TypeChain tests and confirm GREEN.

### Task 4: Implement OpenScene approval-surface landing

**Files:** Modify `apps/openscene/app/page.tsx`, `apps/openscene/app/globals.css`.

1. Add the official dark play/timeline mark to an approval-request evidence panel, preserving actual approval and local-first claims.
2. Use mint/violet accents and responsive panel/grid layout; retain capabilities, agent, provider, FAQ, and footer content.
3. Run focused OpenScene tests and confirm GREEN.

### Task 5: Implement Theorvane organization footer

**Files:** Modify `apps/theorvane/app/page.tsx`, `apps/theorvane/app/globals.css`.

1. Replace the sparse footer with brand, Products, Studio, and legal groups.
2. Ensure links target TypeMCP, TypeChain, OpenScene, principles, and GitHub.
3. Run focused Theorvane tests and confirm GREEN.

### Task 6: Verify production behavior

1. Run workspace test, lint, typecheck, build, and `git diff --check`.
2. Start production instances after final build and inspect desktop plus true 375px browser dimensions for all four routes.
3. Commit and push the verified implementation branch.
