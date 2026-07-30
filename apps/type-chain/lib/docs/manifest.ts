import { defaultDocumentLocale, type DocumentEdition, documentGroups, documentLocales, type DocumentLocale, type PublicDocument } from "./types";

// Canonical TypeChain documentation released on immutable main.
export const sourceCommit = "90152f97834dacfe7211786bc98227185950e2e0";

const documents: readonly PublicDocument[] = [
  { sourcePath: "docs/guides/getting-started.md", route: "/docs/getting-started", title: "Getting started", summary: "Install TypeChain, configure Stage 3 decorators, and declare a first tool.", group: "Start", order: 1, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/core-concepts.md", route: "/docs/core-concepts", title: "Core concepts", summary: "Understand tool metadata, immutable definitions, policy intent, and explicit integration boundaries.", group: "Start", order: 2, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/petstore-typechain-foundation.md", route: "/docs/build/petstore-typechain-foundation", title: "Petstore TypeChain foundation", summary: "Define and inspect a typed Petstore tool in the workspace created by the TypeMCP path.", group: "Build", order: 1, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1", curriculumStep: 4, curriculumTotal: 6, prerequisites: [], nextRoute: "/docs/build/petstore-policy-and-composition", outcome: "A typed Petstore tool definition inspected before adapter selection.", applicationBoundary: "Your application owns models, provider credentials, persistence, and execution." },
  { sourcePath: "docs/guides/petstore-policy-and-composition.md", route: "/docs/build/petstore-policy-and-composition", title: "Petstore policy and composition", summary: "Record policy intent and choose one application-owned composition boundary.", group: "Build", order: 2, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1", curriculumStep: 5, curriculumTotal: 6, prerequisites: ["/docs/build/petstore-typechain-foundation"], nextRoute: "/docs/petstore-walkthrough", outcome: "A selected LangChain, agent, or in-process TypeMCP composition boundary.", applicationBoundary: "Your application enforces policy and owns model calls, credentials, lifecycle, and transport." },
  { sourcePath: "docs/guides/petstore-walkthrough.md", route: "/docs/petstore-walkthrough", title: "Petstore walkthrough", summary: "Build one typed catalog tool, then choose a LangChain, agent, or in-process TypeMCP boundary.", group: "Build", order: 3, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1", curriculumStep: 6, curriculumTotal: 6, prerequisites: ["/docs/build/petstore-policy-and-composition"], nextRoute: null, outcome: "A verified typed-tool continuation at a boundary the application owns.", applicationBoundary: "TypeChain does not provide model providers, credentials, policy enforcement, hosted transport, or deployment." },
  { sourcePath: "docs/guides/tools-and-definitions.md", route: "/docs/guides/tools-and-definitions", title: "Tools and definitions", summary: "The @Tool() contract, immutable definitions, and inheritance.", group: "Guides", order: 1, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/policy.md", route: "/docs/guides/policy", title: "Policy and guards", summary: "Declarative policy intent with application-owned enforcement.", group: "Guides", order: 2, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/langchain-integration.md", route: "/docs/guides/langchain-integration", title: "LangChain integration", summary: "Adapt decorated methods into standard LangChain tools.", group: "Guides", order: 3, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/agent-builder.md", route: "/docs/guides/agent-builder", title: "Agent builder", summary: "Build LangChain agents while retaining application control.", group: "Guides", order: 4, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/typemcp-bridge.md", route: "/docs/guides/typemcp-bridge", title: "TypeMCP bridge", summary: "Compose a TypeMCP server into LangChain tools in process.", group: "Guides", order: 5, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/guides/composition-selection.md", route: "/docs/guides/composition-selection", title: "Choose a composition boundary", summary: "Choose metadata, LangChain, agent, or in-process TypeMCP composition.", group: "Guides", order: 6, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/api/decorator-api.md", route: "/docs/api/decorator-api", title: "Decorator API contract", summary: "Published exports and integration boundaries.", group: "API", order: 1, classification: "published", sourceStatus: "@theorvane/type-chain@0.1.1" },
  { sourcePath: "docs/architecture.md", route: "/docs/architecture", title: "Architecture", summary: "Decorator-first LangChain authoring architecture.", group: "Architecture", order: 1, classification: "published-with-boundary", sourceStatus: "TypeChain does not enforce runtime policy." },
];
export const publicDocuments = Object.freeze(documents.map((document) => Object.freeze({ ...document })));
/** The site path for a document in one locale. English keeps the unprefixed route. */
export function localizedRoute(route: string, locale: DocumentLocale): string {
  return locale === defaultDocumentLocale ? route : route.replace(/^\/docs/, `/docs/${locale}`);
}

export function documentLocale(route: string): DocumentLocale {
  const prefixed = documentLocales.find((locale) => locale !== defaultDocumentLocale && (route === `/docs/${locale}` || route.startsWith(`/docs/${locale}/`)));
  return prefixed ?? defaultDocumentLocale;
}

/** Locales this document is actually published in, so a switcher never offers a missing translation. */
export function availableLocales(document: PublicDocument): readonly DocumentLocale[] {
  return documentLocales.filter((locale) => locale === defaultDocumentLocale || document.translations?.[locale as Exclude<DocumentLocale, "en">]);
}

/**
 * Every (document, locale) pair, with locale-dependent fields resolved. A translated edition carries
 * its own route, title, summary, and classification evidence; curriculum links stay inside its locale.
 */
export function documentEditions(): readonly DocumentEdition[] {
  return publicDocuments.flatMap((document) =>
    availableLocales(document).map((locale) => {
      if (locale === defaultDocumentLocale) return { locale, document, sourcePath: document.sourcePath, sourceStatus: document.sourceStatus };
      const translation = document.translations![locale as Exclude<DocumentLocale, "en">]!;
      const localized: PublicDocument = {
        ...document,
        route: localizedRoute(document.route, locale),
        title: translation.title,
        summary: translation.summary,
        sourceStatus: translation.sourceStatus,
        ...(document.prerequisites ? { prerequisites: document.prerequisites.map((route) => localizedRoute(route, locale)) } : {}),
        ...(document.nextRoute ? { nextRoute: localizedRoute(document.nextRoute, locale) } : {}),
      };
      return { locale, document: localized, sourcePath: translation.sourcePath, sourceStatus: translation.sourceStatus };
    }),
  );
}

export function editionsForLocale(locale: DocumentLocale): readonly DocumentEdition[] {
  return documentEditions().filter((edition) => edition.locale === locale);
}

export function findEdition(route: string): DocumentEdition | undefined {
  return documentEditions().find((edition) => edition.document.route === route);
}

export function isSafeSourcePath(sourcePath: string): boolean { return /^docs\/(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(sourcePath) && !sourcePath.includes("..") && !sourcePath.includes("\\"); }
export function validateManifest(manifest: readonly PublicDocument[]): void { if (!/^[0-9a-f]{40}$/.test(sourceCommit)) throw new Error("source commit must be a full SHA"); const routes = new Set<string>(); const paths = new Set<string>(); const orders = new Set<string>(); for (const document of manifest) { if (!isSafeSourcePath(document.sourcePath) || /(?:^|\/)(?:planning|superpowers)(?:\/|$)/.test(document.sourcePath)) throw new Error(`approved docs source path required: ${document.sourcePath}`); if (!document.route.startsWith("/docs/") || document.route.includes("..")) throw new Error(`approved docs route required: ${document.route}`); if (!document.sourceStatus.trim()) throw new Error(`source status evidence required: ${document.sourcePath}`); if (routes.has(document.route) || paths.has(document.sourcePath) || orders.has(`${document.group}:${document.order}`)) throw new Error(`duplicate manifest entry: ${document.route}`); if (!documentGroups.includes(document.group)) throw new Error(`unknown document group: ${document.group}`); routes.add(document.route); paths.add(document.sourcePath); orders.add(`${document.group}:${document.order}`); for (const [locale, translation] of Object.entries(document.translations ?? {})) { if (!documentLocales.includes(locale as DocumentLocale) || locale === defaultDocumentLocale) throw new Error(`unknown translation locale: ${locale}`); if (!isSafeSourcePath(translation.sourcePath) || !translation.sourcePath.startsWith(`docs/${locale}/`)) throw new Error(`approved translation source path required: ${translation.sourcePath}`); if (!translation.title.trim() || !translation.summary.trim()) throw new Error(`translation title and summary required: ${translation.sourcePath}`); if (!translation.sourceStatus.trim()) throw new Error(`translation source status evidence required: ${translation.sourcePath}`); const localized = localizedRoute(document.route, locale as DocumentLocale); if (routes.has(localized) || paths.has(translation.sourcePath)) throw new Error(`duplicate manifest entry: ${localized}`); routes.add(localized); paths.add(translation.sourcePath); } } }
validateManifest(publicDocuments);
