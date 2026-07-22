# Theorvane Website — Agent & Contributor Instructions

## Purpose and repository boundaries

This repository delivers three independently deployable public Next.js applications:

- `apps/theorvane/`: the Theorvane brand site, canonical at `https://theorvane.tech`
- `apps/type-mcp/`: the TypeMCP product site, canonical at `https://typemcp.theorvane.tech`
- `apps/openvideo/`: the OpenVideo local-first product site, canonical at `https://openvideo.theorvane.tech`
- `packages/`: neutral shared UI and design tokens only
- `docs/`: approved product and design specifications
- `.agents/`: tracked task briefs and agent operating aids; never imported by application runtime code

Keep runtime code strict TypeScript. Do not add server-side product features, CMS, auth, analytics, or package-runtime claims without an approved scope change.

## Source of truth

1. User-approved product decisions
2. `docs/` specifications and current product boundaries
3. The linked GitHub Issue acceptance criteria
4. This file
5. README and public-site copy

When sources conflict, stop and update the lower-priority source before implementation.

## Branch and release model

- `dev` is the default integration branch.
- `main` is release-only. It accepts reviewed `dev` → `main` promotion PRs only.
- Never commit directly to `dev` or `main`.
- Do not change branch protection, rulesets, reviewer state, approvals, or merge-policy settings. Repository instructions do not authorize bypassing these controls.
- Vercel Preview deployments are disabled. Only a merge or push to `main` may create a production deployment.

## Required issue and PR triage

Before implementation, create or update one focused GitHub Issue and assign it to `sjungwon03`.

### Labels

Apply one primary type label and all applicable scope labels to the Issue and its PR:

- Primary type (exactly one): `type: feature`, `type: documentation`, or `type: ci`
- Scope: `area: website`, `area: seo`, and/or `area: brand`
- Release promotions: `release`
- Urgent or user-visible work: `priority: high`

Keep labels focused; do not add unrelated labels merely for coverage.

### Delivery workflow

1. Inspect existing Issues and PRs; avoid duplicate work.
2. Create or update one focused Issue with scope, acceptance criteria, non-goals, labels, and `sjungwon03` as assignee.
3. Branch from current `origin/dev` using `<type>/<issue-number>-<short-description>`.
4. For multi-behavior work, create `.agents/task-briefs/<issue-number>-<slug>.md` from the task brief convention.
5. Write a focused failing test before production code when behavior changes. Record the observed failure.
6. Implement the smallest safe change; update public docs for user-visible behavior.
7. Run applicable verification: focused tests, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`.
8. Open a PR into `dev` with `Closes #<issue-number>`, mirror the Issue labels, and assign `sjungwon03`.
9. Request formal independent review from `sjungwon03-ai`. The request must be made against the latest head; do not dismiss, alter, or bypass review state.
10. Squash merge only after the latest-head approval and required checks pass.
11. For a release, create a separate labeled `release` PR from `dev` into `main`. It requires `verify`, `release-promotion`, and a latest-head independent approval before squash merge.
12. After a `main` merge, verify the production deployment and relevant public routes. Close the linked release Issue only after that evidence exists.

## Security and quality requirements

- Pin GitHub Actions to immutable full commit SHAs.
- Do not put tokens, credentials, or secrets in repository files, logs, commits, or task briefs.
- Preserve canonical host behavior: `www.theorvane.tech` redirects permanently to `theorvane.tech`.
- Keep website claims aligned with the published TypeMCP capability boundary.
- Generated output such as `.next/`, `dist/`, coverage, logs, and `node_modules/` must not be committed.

## Definition of done

A change is done only when its Issue and PR carry correct labels and owner, the PR has a current-head `sjungwon03-ai` formal review, relevant verification passes, the diff is scoped, and the documented branch/release path is followed.
