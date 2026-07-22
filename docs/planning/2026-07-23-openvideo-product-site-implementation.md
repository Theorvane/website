# OpenVideo Product Site Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Add a locally truthful, independently deployable OpenVideo Next.js site that is ready for Vercel deployment at `openvideo.theorvane.tech`.

**Architecture:** Add a self-contained `apps/openvideo` Next.js App Router workspace using neutral shared packages. The application owns static page content, styles, canonical metadata, crawler routes, and tests. Vercel configuration remains external to repository code and uses the monorepo root plus app Root Directory.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Testing Library, npm workspaces, Turborepo, Vercel.

---

### Task 1: Document the approved OpenVideo site scope

**Objective:** Make the product boundary and deployment intent reviewable before implementation.

**Files:**
- Create: `docs/superpowers/specs/2026-07-23-openvideo-product-site-design.md`
- Create: `docs/planning/2026-07-23-openvideo-product-site-implementation.md`
- Create: `.agents/task-briefs/24-openvideo-product-site.md`

**Step 1:** Record canonical hostname, page composition, truthful local-first claims, non-goals, and verification requirements.

**Step 2:** Commit the documentation before production code.

### Task 2: Write failing OpenVideo content and SEO tests

**Objective:** Define the visitor-visible and crawler-visible contracts before building the site.

**Files:**
- Create: `apps/openvideo/test/home.test.tsx`
- Create: `apps/openvideo/test/seo.test.tsx`

**Step 1: Write failing tests**

Assert the page has accessible landmarks, local-first copy, the GitHub source and releases destinations, canonical metadata, crawler routes, and factual JSON-LD.

**Step 2: Run tests to verify failure**

Run: `npm run test --workspace @theorvane/openvideo-site`

Expected: FAIL because the workspace and modules do not yet exist.

### Task 3: Add the independently deployable OpenVideo workspace

**Objective:** Implement the smallest static Next.js workspace that satisfies the tests.

**Files:**
- Create: `apps/openvideo/package.json`
- Create: `apps/openvideo/tsconfig.json`
- Create: `apps/openvideo/next-env.d.ts`
- Create: `apps/openvideo/next.config.ts`
- Create: `apps/openvideo/vitest.config.ts`
- Create: `apps/openvideo/app/layout.tsx`
- Create: `apps/openvideo/app/page.tsx`
- Create: `apps/openvideo/app/robots.ts`
- Create: `apps/openvideo/app/sitemap.ts`
- Create: `apps/openvideo/app/globals.css`

**Step 1:** Create standard app configuration matching the existing apps.

**Step 2:** Implement the semantic static landing page and metadata/crawler routes with only accurate claims.

**Step 3: Run focused tests to verify pass**

Run: `npm run test --workspace @theorvane/openvideo-site`

Expected: PASS.

### Task 4: Integrate OpenVideo into source documentation and workspace contracts

**Objective:** Ensure contributors and contract tests recognize the third deployable site.

**Files:**
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md`
- Modify: `test/workspace-contract.test.mjs`

**Step 1:** Extend the workspace contract test with the expected OpenVideo app manifest.

**Step 2:** Run the contract test and record the expected pre-change failure before modifying the test target/documentation.

**Step 3:** Update only source-of-truth descriptions and verify the full root test suite.

### Task 5: Verify, review, and deliver

**Objective:** Produce a reviewable integration PR and release-ready Vercel handoff.

**Files:**
- Modify: only files from Tasks 1–4 as required by review.

**Step 1:** Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.

**Step 2:** Push `feat/24-openvideo-product-site`; open a PR to `dev` with `Closes #24`, matching labels, assignee, and `sjungwon03-ai` reviewer request.

**Step 3:** After latest-head review and CI pass, squash merge to `dev`; create a separately reviewed `dev` → `main` release PR. Only after that merge, create/link the Vercel `openvideo` project, attach `openvideo.theorvane.tech`, and verify production HTTPS plus page content.
