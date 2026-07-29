# Four-site landing refresh — design specification

**Status:** Approved for planning and implementation
**Date:** 2026-07-29
**Issue:** #72

## Purpose

Refresh the public homepages for Theorvane, TypeMCP, TypeChain, and OpenVideo. The pages will adopt a shared conversion sequence inspired by the information hierarchy of the NestJS homepage without copying its visual identity, copy, sponsorship model, or interaction patterns. Each application remains an independently deployable Next.js site with its own visual language and product boundary.

## Shared structure

Each homepage will use a concise hero with a primary and a secondary action, followed by a quick product-understanding section, a proof or workflow section, a truthful trust boundary, and a closing action. The pages will retain one header, named primary navigation, main landmark, and footer. Existing skip links, visible focus styles, and reduced-motion behavior remain in place.

Controls must retain at least 44px target height. At a 375px viewport, headers, navigation, cards, workflows, code panels, and actions must form a single readable column without clipped controls or horizontal scrolling. The implementation will prove the intended destinations, landmarks, truth-boundary copy, and narrow-layout contracts with focused tests before the full repository checks run.

## Theorvane

Theorvane remains a concise, high-trust technical studio rather than an enterprise presentation. The near-black canvas, ivory editorial typography, lime signal color, and compact monospace labels stay intact. The hero retains the core promise but reduces unused vertical space and uses a clear project-exploration action with a GitHub secondary action.

A product index directly below the hero lets visitors compare TypeMCP, TypeChain, and OpenVideo before they reach deeper project proof. Each product receives a short description, a focused signal, and its canonical product-site destination. Subsequent proof panels retain the existing code or workflow language while explaining why each product is distinct. The principles section becomes a concise trust strip about portability, explicit contracts, and small verified releases. The closing action directs visitors back to product exploration rather than making the GitHub organization the only next step.

## TypeMCP

TypeMCP retains its warm bright tool interface, cobalt accent, and source-code hero. The hero makes documentation the primary developer action while preserving GitHub and npm as secondary inspection actions. The first capability section presents a compact sequence: declare intent, validate definitions, compile the MCP surface, then host it at the application edge.

The architecture section will show this sequence as an easily scannable progression instead of a loose list. The integration section will keep the published `@theorvane/type-mcp@0.2.0` boundary explicit: the package offers the validated runtime, stdio, Streamable HTTP, and a tools-only LangChain adapter; applications retain LangGraph topology, models, authorization, state, persistence, and deployment. No broader runtime or policy ownership will be implied.

## TypeChain

TypeChain retains its warm light canvas and violet identity. Its landing page will clarify the distinction between declaration ergonomics and application ownership with three capability panels: declare intent, adapt to standard interfaces, and retain application control. Documentation and getting-started guides become the primary reading path; source and npm remain verification paths.

The boundary section will turn the current linear list into an easily scannable declaration-to-adapter flow. The public copy remains aligned with published `@theorvane/type-chain@0.1.1`: Stage 3 decorator declarations and immutable definitions can adapt to LangChain or the in-process TypeMCP bridge, while models, credentials, authorization, policy, state, hosting, and deployment stay consumer-owned.

## OpenVideo

OpenVideo retains the dark navy studio palette, mint highlight, and local-first positioning. Its hero will make the released workflow legible as a visual sequence: capture a selected window, shape a local timeline, and export an MP4 on the user’s device. The feature section will use the same sequence to foreground existing local capture, editing, export, and optional user-configured local narration tooling.

The local-control section will become a structured privacy boundary. It will state that recordings, projects, imported assets, voice profiles, and exports are stored locally, with no built-in cloud uploads, accounts, or analytics. The scope does not add AI-assisted editing, AI generation, connected services, or provider integrations. Any future-facing AI wording remains explicitly planned and cannot be presented as available.

## Non-goals

This work does not add a CMS, accounts, analytics changes, backend features, provider integration, model downloads, installer hosting, downloads, customer logos, fabricated testimonials, or release claims. It does not create a production deployment or a `dev` to `main` release promotion.

## Verification

The implementation adds focused page contracts and narrow-layout contracts before production code changes. Final delivery requires the repository test suite, linting, type checking, production build, high-severity production-dependency audit, whitespace validation, desktop inspection, and a 375px CSS-viewport inspection of fresh production builds. The implementation PR will target `dev`, link `Closes #72`, carry the issue labels and assignee, and receive independent `sjungwon03-ai` review for its latest head before merge.
