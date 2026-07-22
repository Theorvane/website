# Theorvane and TypeMCP websites implementation plan

**Status:** Completed and merged in PR #2. Issue #3 maintains the documentation boundary.

> **For Hermes:** Execute this plan task-by-task with TDD and independent review checkpoints.

**Goal:** Deliver two responsive, independently buildable Next.js landing pages in one npm-workspace/Turborepo repository.

**Architecture:** The root owns npm workspaces, Turborepo task orchestration, lint/type/test scripts, and shared TypeScript policy. `packages/design-tokens` exposes neutral token CSS, while `packages/ui` exposes accessible React primitives. Each app owns its theme CSS, metadata, copy, and page layout; neither brand imports the other’s theme.

**Tech stack:** Next.js App Router, React, TypeScript strict mode, CSS Modules/plain CSS, Vitest, Testing Library, ESLint, npm workspaces, Turborepo.

---

### Task 1: Establish workspace and quality contracts

**Files:** root `package.json`, `package-lock.json`, `turbo.json`, `.gitignore`, `tsconfig.base.json`, `eslint.config.mjs`, `vitest.workspace.ts`, `README.md`.

1. Write a failing root contract test asserting both app workspace names and root quality scripts.
2. Verify the test fails because the workspace manifest does not exist.
3. Add the smallest npm workspace/Turbo configuration, strict TypeScript baseline, ESLint policy, Vitest workspace config, and generated-artifact ignores.
4. Install dependencies and run the contract test plus root type/lint/build commands.

### Task 2: Create neutral shared packages

**Files:** `packages/design-tokens/*`, `packages/ui/*`, package tests.

1. Write a failing test for token CSS export and semantic UI primitives.
2. Add neutral tokens, skip-link, external-link, and section-heading primitives with typed props.
3. Verify tests and package typecheck pass.

### Task 3: Implement Theorvane site

**Files:** `apps/theorvane/app/*`, `apps/theorvane/components/*`, `apps/theorvane/*.config.*`, page test.

1. Write a failing rendered-page contract for primary heading, landmark structure, TypeMCP and GitHub CTAs, and metadata.
2. Implement server-first App Router layout/page and brand-specific CSS.
3. Verify page contract, lint, typecheck, production build, responsive visual smoke review.

### Task 4: Implement TypeMCP site

**Files:** `apps/type-mcp/app/*`, `apps/type-mcp/components/*`, `apps/type-mcp/*.config.*`, page test.

1. Write a failing rendered-page contract for product heading, GitHub/npm CTAs, published-`0.1.0` boundary, and LangGraph consumer-owned language.
2. Implement server-first App Router layout/page and product-specific CSS/code panels.
3. Verify page contract, lint, typecheck, production build, responsive visual smoke review.

### Task 5: Validate integration and publish PR

1. Run root lint, test, typecheck, and production builds for both applications.
2. Start each app locally and inspect semantic/visual output at desktop and mobile widths.
3. Inspect diff and generated-file status.
4. Request independent spec and code-quality review.
5. Push and open a PR from `sjungwon03`; confirm `sjungwon03-ai` is the requested GitHub reviewer.
