# Reference-first TypeMCP and TypeChain learning curricula — design specification

**Issue:** [Theorvane/website#97](https://github.com/Theorvane/website/issues/97)
**Status:** Approved design; awaiting implementation-plan review
**Language:** English for repository artifacts and public documentation

## Purpose

Make both public documentation portals practical starting points for a developer who wants to build a project rather than merely browse a source-file inventory.

The new experience uses a shared **Petstore workspace** to guide a reader from a strict TypeScript setup through TypeMCP declaration and runtime selection, then into TypeChain typed-tool reuse. It remains reference-first: each product keeps its own canonical documentation and its own published-package boundary.

The user experience should borrow only high-level information-architecture lessons from the examined documentation sites:

- Prisma: orient with a concise product boundary, visible release context, and distinct quick-start, concepts, workflows, and reference paths.
- TypeORM: make the first supported outcome and a small concrete example immediately discoverable.
- Drizzle: expose a deep, expandable taxonomy while preserving opt-in choice and responsibility boundaries.
- LangChain Reference: separate conceptual learning material from exact package/API reference, and name optional package surfaces explicitly.

This work must not copy third-party copy, examples, visual assets, logos, screenshots, markup, or component implementation.

## Product truth and source ownership

The website is a rendered portal, not the authority for library behavior.

| Product | Published surface to document | Explicit application-owned boundary |
| --- | --- | --- |
| TypeMCP | `@theorvane/type-mcp@0.2.2`: decorator declarations, definition inspection/validation, compilation with an explicit resolver, stdio helper, Streamable HTTP subpath, tools-only LangChain subpath | project lifecycle, resolver dependencies, authorization, origins, sessions, durable state, models, provider credentials, graph composition, hosting, deployment |
| TypeChain | `@theorvane/type-chain@0.1.1`: Stage 3 tool and policy declarations, immutable definitions, `/langchain`, `/agent`, and in-process `/typemcp` adapters | model selection, model/provider credentials, policy enforcement, state, persistence, hosting, deployment, cross-process MCP client/transport |

The canonical Markdown remains owned by `Theorvane/type-mcp` and `Theorvane/type-chain`. The website may only consume a manifest allowlist from an immutable full canonical-`main` commit SHA after the relevant source-repository release path completes.

The portal must never duplicate executable source examples as independently authored website content, nor imply that an optional adapter owns operational concerns retained by the application.

## Information architecture

### Shared top-level taxonomy

Both docs homes and sidebars use the following reader-oriented hierarchy:

1. **Get started** — the smallest project-starting path and compatibility prerequisites.
2. **Learn** — concepts and boundaries required to make a safe choice.
3. **Build** — a linear Petstore curriculum with named files and checkpoints.
4. **Integrate** — optional package surfaces and the decision criteria for each.
5. **Reference** — exact decorators, runtime functions, optional-subpath contracts, architecture, and support/release context.

The sidebar retains every manifest-approved source document. Featured cards are an entry layer; they must not conceal the complete taxonomy.

Each home starts with:

- a textual published-version/status badge;
- a one-paragraph description of what the package contributes;
- a two-column ownership map, expressed in text and not color alone;
- four task-oriented paths: **Build first Petstore workflow**, **Add to an existing project**, **Choose an integration**, and **Browse API reference**;
- the full grouped document inventory underneath.

### Shared Petstore curriculum

The curriculum is one conceptual workspace, but it is published as product-owned chapters rather than a duplicated cross-repository tutorial.

| Step | Canonical owner | Reader outcome | Required boundary statement |
| --- | --- | --- | --- |
| 0. Prepare the workspace | TypeMCP | Create a strict TypeScript Node project, install the released package, configure decorators, and run a baseline command | The library does not create a project, select a host, or supply credentials. |
| 1. Declare a catalog capability | TypeMCP | Create a `PetstoreServer` declaration and a small application-owned catalog dependency seam | Metadata is not a network service, resolver, or persistence layer. |
| 2. Inspect and compile | TypeMCP | Inspect the immutable definition and compile with the documented explicit resolver shape | Resolver instances and dependency lifecycle remain application-owned. |
| 3. Run one TypeMCP boundary | TypeMCP | Choose stdio as the default runnable path; offer HTTP and LangChain as separately bounded extensions | stdio/HTTP framing does not provide authorization, deployment, durable sessions, or application policy. |
| 4. Define a typed catalog tool | TypeChain | Add a typed tool to the same workspace and inspect its definition | Tool metadata is not a model, agent loop, persistence system, or policy enforcement. |
| 5. Add intent and application enforcement | TypeChain | Show an optional `@Policy()` declaration and a supplied application guard/handoff | Policy metadata records intent; application code decides and enforces access. |
| 6. Choose TypeChain composition | TypeChain | Reuse through `/langchain`, `/agent`, or `/typemcp`, one path at a time | Models, provider keys, state, agent lifecycle, hosting, and cross-process transport remain application-owned. |
| 7. Continue deliberately | Both | Route the reader to the next exact guide or API reference | Do not suggest a production deployment or transport that the published package does not provide. |

The default runnable sequence is **TypeMCP stdio first**, then **TypeChain typed-tool invocation/inspection**. HTTP, LangChain, agent construction, and the TypeMCP bridge are explicit opt-in branches, never hidden prerequisites.

### Tutorial contract

Every curriculum chapter and existing detailed tutorial brought into the new path must use this predictable sequence:

1. **Purpose and decision point** — what outcome the reader obtains, when to choose it, and when not to.
2. **Before you start** — Node/npm/TypeScript prerequisites, exact installed release, optional peer requirements, and owned dependencies.
3. **Workspace checkpoint** — an expected file tree or a concise list of named files.
4. **Install and configuration** — copyable package commands and compiler/decorator configuration where required.
5. **Step-by-step files** — one file at a time, with file/language labels and a short explanation immediately following each code block.
6. **Run and verify** — exact command, expected behavior/output, and the assertion that proves the stage is complete.
7. **Failure guide** — common configuration, decorator, resolver, peer, and boundary mistakes with an actionable correction.
8. **Responsibility boundary** — a callout stating what the package does and what the reader's application still owns.
9. **Next step** — a direct linear continuation and a link to the exact API/integration reference.

A guide may reference application-owned values using declared seams such as `declare const petstoreClient`, but it may not manufacture credentials, models, databases, authorization systems, transport hosts, or deployment behavior.

## Portal presentation

### Docs home

The current goal-card section evolves into a clear entry surface rather than a flat group of links.

- **Hero:** product name, release status, concise boundary statement, and one primary “Build your first Petstore workflow” entry.
- **Path selector:** four compact cards with an outcome, the exact relevant package surface, a destination, and the remaining application responsibility.
- **Progressive path rail:** a numbered shared-curriculum summary that makes TypeMCP → TypeChain handoff visible without claiming that the packages are one runtime.
- **Reference inventory:** complete grouped cards remain available below the entry surface.
- **Source provenance:** retain the immutable source pin with a source-repository link.

TypeMCP's Build entry begins at its canonical project setup chapter. TypeChain's Build entry begins with an explicit prerequisite that the reader has completed the TypeMCP workspace checkpoint or can use an equivalent application-owned tool setup.

### Article page

The desktop page retains the three-column reading shell:

- persistent complete sidebar;
- readable central article column;
- sticky local table of contents and related/curriculum context.

Article enhancements:

- chapter eyebrow such as **Build / Step 2 of 7** when a manifest document belongs to the curriculum;
- explicit prerequisite and expected-output panels rendered from safe Markdown conventions or portal-owned structural metadata;
- preserved code/table overflow containment and accessible copy controls;
- a visible responsibility boundary panel near the initial explanation;
- a troubleshooting/limitations section before next-step navigation;
- prev/next links that favor curriculum order for curriculum documents and manifest order elsewhere.

On narrow screens, the sidebar stays a closed-by-default semantic disclosure, article content starts in the initial viewport, local TOC disappears before collision, and code/table containers scroll independently.

## Source-document additions and manifest model

### TypeMCP canonical documentation

Add or reorganize source-owned curriculum chapters sufficient to support the first three steps:

- `docs/guides/petstore-project-setup.md` — strict TypeScript workspace and decorator/runtime setup.
- `docs/guides/petstore-typemcp-foundation.md` — declaration, resolver seam, inspection, compilation, stdio verification.
- revise `docs/guides/petstore-walkthrough.md` into the runtime-selection continuation or preserve it as a clearly routed runtime chapter.

The TypeMCP manifest adds each new public chapter, places it in **Build**, and labels it with current published release evidence. The source-repository documentation contract validates every chapter's tutorial structure, tested package imports, commands, ownership boundary, failure guidance, and next link.

### TypeChain canonical documentation

Add or reorganize source-owned curriculum chapters sufficient to support steps four through seven:

- `docs/guides/petstore-typechain-foundation.md` — typed tool declaration in the shared workspace, definition inspection, and direct application-owned invocation.
- `docs/guides/petstore-policy-and-composition.md` — policy intent versus enforcement, then a decision path to LangChain, agent builder, or in-process TypeMCP bridge.
- revise `docs/guides/petstore-walkthrough.md` into a clear continuation with no claim that TypeChain starts or hosts an MCP transport.

The TypeChain manifest adds each new public chapter in **Build** and labels it with current published release evidence. Its documentation contract validates install/configuration, named files, commands, expected behavior, policy-enforcement separation, explicit optional subpaths, limitation guidance, and next links.

### Website manifest and structural metadata

After source releases merge to canonical `main`, the website manifests advance independently to each immutable SHA. The portal may add minimal document metadata required for layout and navigation, including:

- `group: "Build"` or an equivalent approved taxonomy extension;
- curriculum step number and total;
- prerequisite route(s);
- next curriculum route;
- reader outcome and application-owned boundary summary.

Metadata must not be an alternate source of executable documentation. It is limited to navigation, status, and concise route selection. The rendered Markdown remains the explanatory authority.

## Interaction, accessibility, and SEO

- Preserve the skip link, named landmarks, keyboard-visible focus, `aria-current`, accessible closed mobile disclosure, and non-color status signaling.
- Add a search affordance only if it is backed by an implemented, accessible search capability; do not add a non-functional control.
- Keep external-source links explicitly marked as new-tab links with `noopener noreferrer`.
- Use semantic headings, concise unique metadata descriptions, canonical URLs, Open Graph metadata, and sitemap coverage for all curriculum routes.
- Respect `prefers-reduced-motion`; avoid decorative animation and horizontal page overflow.

## Verification strategy

### First: canonical library documentation

For each repository, before production documentation changes:

1. add or extend a focused documentation contract test and run it to an expected **red** failure;
2. validate every documented import and exact code snippet against a clean consumer installation of the released package;
3. run repository-specific full verification, package/publish verification, Markdown link checks, audit, and `git diff --check`;
4. request exact-head independent review and merge to `dev`;
5. promote with a separate reviewed `dev` → `main` release PR;
6. record the resulting immutable canonical `main` SHA.

### Second: portal synchronization and UI

Only after both source-main SHAs exist:

1. write focused website tests that initially fail for Build groups, curriculum path-selector copy/destinations, chapter progression, required boundary text, mobile disclosure, route generation, and sitemap entries;
2. advance the TypeMCP and TypeChain manifests to the exact canonical SHA and regenerate approved Markdown;
3. implement the smallest portal UI and metadata changes needed to pass focused tests;
4. run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`, and `git diff --check`;
5. verify desktop and 375px production-layout behavior with local built servers on verified free ports; do not terminate other-worktree listeners;
6. independently review the exact PR head before merge and follow the protected `dev` → `main` release process.

### Production acceptance evidence

After website release promotion, verify HTTP success and expected route titles/content for:

- `https://typemcp.theorvane.tech/docs`;
- TypeMCP project setup, foundation, and runtime continuation pages;
- `https://typechain.theorvane.tech/docs`;
- TypeChain foundation and policy/composition pages;
- both product homes at desktop and narrow viewport sizes.

## Non-goals

- No third-party content, visual asset, trademark, code, or component copying.
- No CMS, authentication, comment system, hosted search backend, or browser-time source fetching.
- No TypeMCP or TypeChain runtime/API expansion.
- No claim that either package supplies a provider model, credentials, database, authorization, persistence, production hosting, deployment, or cross-process transport beyond the released and documented package boundary.
- No unrelated product landing-page redesign.

## Delivery boundaries

This work uses three independently reviewed delivery streams:

1. TypeMCP canonical documentation issue/PR/release;
2. TypeChain canonical documentation issue/PR/release;
3. website immutable-source synchronization and portal presentation issue/PR/release.

The website sync is blocked until both canonical source releases have completed. Each repository retains its protected-branch and independent-review requirements.
