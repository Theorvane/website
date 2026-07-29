# Guided Workspace Documentation Homes

**Issue:** Theorvane/website#120  
**Status:** approved visual direction — ready for implementation planning  
**Products:** TypeMCP and TypeChain documentation homes

## Intent

Adopt the selected **Guided workspace** design direction: an action-first documentation home that helps a reader begin or continue one real Petstore workflow before offering the rest of the documentation by intent.

The home is navigation and learning-progress UI. It does not become a second canonical documentation source. Detailed tutorials and runnable examples remain owned by the immutable upstream TypeMCP and TypeChain source revisions already pinned in the Website manifests.

## Reader model

The two portals represent one conceptual Petstore journey:

| Portal | Shared step | Local first action | Required CTA |
| --- | ---: | --- | --- |
| TypeMCP | 1 of 6 | Create the strict TypeScript workspace and application-owned client seam. | `/docs/build/petstore-project-setup` |
| TypeChain | 4 of 6 | Continue that workspace with typed tools and composition choices. | `/docs/build/petstore-typechain-foundation` |

The progress UI communicates a reader's place in this shared journey. It must not claim persisted user progress, authentication, completion tracking, or application state.

## Information architecture

### Home hierarchy

Each `/docs` route uses the following order inside the existing site header and docs layout:

1. **Product and published context**
   - Product technical-documentation eyebrow.
   - Existing product name and published version.
   - A concise truthful lede about the package boundary.
2. **Guided workspace hero**
   - A concise action-oriented heading that describes the relevant Petstore stage.
   - A workflow-status card labelled as a six-step learning path and showing the correct starting step for the product.
   - Existing package/application ownership boundary copy, visually subordinate to the action.
3. **Primary workflow panel**
   - One strong CTA to the correct first local Build route.
   - A compact ordered sequence of local Build documents using manifest `curriculumStep` values, not manifest file order.
   - The current/first local card is visually primary; later local cards explain the next concepts without becoming misleading stateful completion controls.
4. **Continue by intent**
   - Four cards: Get started, Learn, Integrate, Reference.
   - Each card retains its real existing document destinations and summaries.
   - Build is intentionally not repeated in this grid because the primary workflow panel owns Build navigation.
5. **Source provenance**
   - Retain the immutable `sourceCommit` link and its external-link semantics.

### Preserve taxonomy and canonical ownership

The sidebar keeps the upstream document groups (`Start`, `Guides`, `Build`, and related API/architecture groups). The home continues to name the reader-facing taxonomy **Get started / Learn / Build / Integrate / Reference** in visible content and accessibility contracts.

No upstream Markdown is moved, copied, rewritten, or generated into the Website. The Website may use existing manifest metadata—route, title, summary, curriculum step, next route, and source pin—to form navigation-only cards and status labels.

## Components and boundaries

A small shared portal-local home component may be introduced only if it reduces duplication while accepting explicit product configuration:

- product name and published version;
- hero title/lede;
- package boundary content;
- shared starting step and total (`1/6` or `4/6`, total `6`);
- CTA label and route;
- existing documents, source commit, and product-specific intent filters.

It must remain server-renderable and receive documents from the existing repository reader. It must not fetch at runtime, store client progress, or alter article components.

The existing `DocsSidebar`, `MarkdownArticle`, `DocumentPager`, source-pin sync, sitemap, static params, and curriculum terminal semantics remain unchanged except for styling compatibility when necessary.

## Visual system

Use the selected A structure while preserving each existing product token set:

- fixed/normal product header and existing wordmark;
- wide desktop docs grid with the existing sidebar and a content column;
- compact uppercase eyebrow and a large action-led display heading;
- light neutral surface, product-blue/purple accent, thin borders, modest radius, and restrained shadow only on focus/hover;
- a dark, high-contrast workflow-status panel that does not change site-wide dark-mode behavior;
- three local workflow cards on desktop when space permits; one column on narrow screens;
- intent cards use a quieter equal-weight grid below the workflow.

The result should look like a focused technical workspace rather than a dashboard: no fake controls, charts, completion toggles, or logged-in state.

## Responsive and accessibility behavior

- Maintain the existing skip link and labelled primary/documentation navigation.
- Workflow status uses ordinary text and a decorative progress indicator; it is not exposed as a false interactive progress tracker.
- CTA and all cards are semantic anchors with visible focus treatment and at least 44px practical touch height.
- At 375px the hero collapses to one column, workflow cards and intent cards collapse to one column, and no horizontal overflow occurs.
- The current mobile `<details>` documentation sidebar remains closed by default; article content and the home heading remain above the fold.
- Heading order remains one `h1`, then section `h2`s. Sidebar labels must not introduce duplicate semantic headings.
- External source links retain `target="_blank"`, `rel="noopener noreferrer"`, and screen-reader new-tab text.

## Truthfulness requirements

Existing product boundaries remain explicit:

- TypeMCP supplies declaration metadata, validation, compilation, selected adapters/transports; the application owns resolver lifecycle, hosting, authorization, state, models, composition, and deployment.
- TypeChain supplies typed metadata/declarations and selected adapters; the application owns models, credentials, enforcement, state, hosting, deployment, and cross-process transport.

The design cannot imply that either package persists workflow progress, hosts a service, supplies credentials/models, or enforces policy by itself.

## Test-first delivery

1. Add focused home-route contracts for both products before code changes. They must fail because the current equal-weight home lacks the guided workspace status, ordered workflow cards, and new intent section shape.
2. Assert product-specific CTA destination, shared step label, total of six, ordered local Build titles/routes, and continued accessibility of Get started/Learn/Integrate/Reference.
3. Assert the existing truthful ownership boundary and immutable provenance link remain present.
4. Add a narrow-layout contract that protects the mobile sidebar closed default and enough CSS/semantic structure to support one-column workflow cards.
5. Run the targeted suites RED, then make the smallest shared/local implementation and run targeted GREEN.
6. Run article/sidebar pager suites to ensure the already-fixed terminal curriculum boundary does not regress.
7. Build both applications and inspect production HTML plus true 375px Chrome DevTools Protocol screenshots after the final CSS change.
8. Run root tests, typecheck, lint, build, production dependency audit, and `git diff --check` before review.

## Out of scope

- Changing canonical source SHA pins or synchronized Markdown.
- Editing upstream TypeMCP or TypeChain documentation.
- Adding account-based progress, analytics, search, theme switching, or a site-wide visual rebrand.
- Changing the document article reading layout beyond minimal style compatibility.
