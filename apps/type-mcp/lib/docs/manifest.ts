import { defaultDocumentLocale, type DocumentEdition, documentGroups, documentLocales, type DocumentLocale, type PublicDocument } from "./types";

export const sourceCommit = "9124c25519f325b46a49156c0e5c212e4ee43df2";

const documents: readonly PublicDocument[] = [
  { sourcePath: "docs/guides/getting-started.md", route: "/docs/getting-started", title: "Getting started", summary: "Install TypeMCP and inspect a declaration with the published package.", group: "Start", order: 1, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2", translations: { ko: { sourcePath: "docs/ko/guides/getting-started.md", title: "시작하기", summary: "배포된 패키지로 MCP 선언을 만들고 확인합니다.", sourceStatus: "@theorvane/type-mcp@0.2.2" } } },
  { sourcePath: "docs/guides/core-concepts.md", route: "/docs/core-concepts", title: "Core concepts", summary: "Learn declarations, immutable definitions, compiler boundaries, and application-owned responsibilities.", group: "Start", order: 2, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2", translations: { ko: { sourcePath: "docs/ko/guides/core-concepts.md", title: "핵심 개념", summary: "선언, 불변 정의, 컴파일러 경계, 애플리케이션이 소유하는 책임을 익힙니다.", sourceStatus: "@theorvane/type-mcp@0.2.2" } } },
  { sourcePath: "docs/guides/petstore-project-setup.md", route: "/docs/build/petstore-project-setup", title: "Petstore project setup", summary: "Create the strict TypeScript workspace and application-owned client seam.", group: "Build", order: 1, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2", curriculumStep: 1, curriculumTotal: 3, prerequisites: [], nextRoute: "/docs/build/petstore-typemcp-foundation", outcome: "A strict Petstore workspace with an application-owned client seam.", applicationBoundary: "Your application owns the Petstore client, secrets, and persistence.", translations: { ko: { sourcePath: "docs/ko/guides/petstore-project-setup.md", title: "Petstore 프로젝트 설정", summary: "엄격한 TypeScript 워크스페이스와 애플리케이션이 소유하는 클라이언트 이음새를 만듭니다.", sourceStatus: "@theorvane/type-mcp@0.2.2", outcome: "엄격한 Petstore 워크스페이스와 애플리케이션이 소유하는 클라이언트 이음새.", applicationBoundary: "Petstore 클라이언트, 시크릿, 영속화는 애플리케이션이 소유합니다." } } },
  { sourcePath: "docs/guides/petstore-typemcp-foundation.md", route: "/docs/build/petstore-typemcp-foundation", title: "Petstore TypeMCP foundation", summary: "Declare, inspect, compile, and run a TypeMCP server over local stdio.", group: "Build", order: 2, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2", curriculumStep: 2, curriculumTotal: 3, prerequisites: ["/docs/build/petstore-project-setup"], nextRoute: "/docs/petstore-walkthrough", outcome: "An inspected declaration compiled through an explicit resolver.", applicationBoundary: "Your application owns dependency resolution, process lifecycle, and access control.", translations: { ko: { sourcePath: "docs/ko/guides/petstore-typemcp-foundation.md", title: "Petstore TypeMCP 기반", summary: "선언, 확인, 컴파일 후 로컬 stdio로 서버를 실행합니다.", sourceStatus: "@theorvane/type-mcp@0.2.2", outcome: "명시적 리졸버를 통해 컴파일된, 확인을 마친 선언.", applicationBoundary: "의존성 해석, 프로세스 수명주기, 접근 제어는 애플리케이션이 소유합니다." } } },
  { sourcePath: "docs/guides/petstore-walkthrough.md", route: "/docs/petstore-walkthrough", title: "Petstore walkthrough", summary: "Build one catalog tool and select a published TypeMCP runtime boundary.", group: "Build", order: 3, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2", curriculumStep: 3, curriculumTotal: 3, prerequisites: ["/docs/build/petstore-typemcp-foundation"], nextRoute: null, outcome: "A selected stdio, HTTP, or tools-only LangChain boundary compiled from the same declaration.", applicationBoundary: "Your application owns hosting, authorization, models, state, and deployment.", translations: { ko: { sourcePath: "docs/ko/guides/petstore-walkthrough.md", title: "Petstore 워크스루", summary: "카탈로그 도구 하나를 만들고 배포된 TypeMCP 런타임 경계를 고릅니다.", sourceStatus: "@theorvane/type-mcp@0.2.2", outcome: "같은 선언에서 컴파일한 stdio·HTTP·도구 전용 LangChain 경계 중 선택된 하나.", applicationBoundary: "호스팅, 인가, 모델, 상태, 배포는 애플리케이션이 소유합니다." } } },
  { sourcePath: "docs/guides/configuration.md", route: "/docs/guides/configuration", title: "Configuration and compatibility", summary: "Configure standard decorators, Node, and module loading.", group: "Guides", order: 1, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2" },
  { sourcePath: "docs/guides/agent-integration.md", route: "/docs/guides/agent-integration", title: "Agent integration guide", summary: "A deterministic workflow for coding agents using the published package.", group: "Guides", order: 2, classification: "published", sourceStatus: "published runtime validates and compiles" },
  { sourcePath: "docs/guides/http-and-nextjs.md", route: "/docs/guides/http-and-nextjs", title: "HTTP framework integration", summary: "Published Streamable HTTP and Next.js integration shape.", group: "Guides", order: 3, classification: "published", sourceStatus: "Streamable HTTP" },
  { sourcePath: "docs/guides/langchain-langgraph.md", route: "/docs/guides/langchain-langgraph", title: "LangChain and LangGraph", summary: "Published tools-only LangChain adapter and consumer-owned LangGraph ToolNode composition.", group: "Guides", order: 4, classification: "published", sourceStatus: "LangGraph remains a consumer-owned" },
  { sourcePath: "docs/guides/runtime-selection.md", route: "/docs/guides/runtime-selection", title: "Choose a runtime boundary", summary: "Choose the published root, stdio, HTTP, or tools-only LangChain surface.", group: "Guides", order: 5, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2" },
  { sourcePath: "docs/guides/agile-delivery.md", route: "/docs/guides/agile-delivery", title: "Agile delivery", summary: "Repository-development delivery practices and milestones.", group: "Guides", order: 6, classification: "repository-development", sourceStatus: "GitHub Issues, milestones, labels, pull requests" },
  { sourcePath: "docs/guides/npm-release.md", route: "/docs/guides/npm-release", title: "npm release", summary: "npm release process and package supply-chain boundary.", group: "Guides", order: 7, classification: "published", sourceStatus: "TypeMCP publishes one public npm organization package" },
  { sourcePath: "docs/guides/open-source-launch.md", route: "/docs/guides/open-source-launch", title: "Open-source launch", summary: "Repository-development launch and governance guidance.", group: "Guides", order: 8, classification: "repository-development", sourceStatus: "operational safeguards" },
  { sourcePath: "docs/api/decorator-api.md", route: "/docs/api/decorator-api", title: "Decorator API contract", summary: "Published decorator declarations, runtime compilation, and transport boundaries.", group: "API", order: 1, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2" },
  { sourcePath: "docs/architecture/overview.md", route: "/docs/architecture/overview", title: "Architecture overview", summary: "Published metadata, compiler, resolver, and transport architecture.", group: "Architecture", order: 1, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2" },
  { sourcePath: "docs/architecture/adr/0001-framework-neutral-core.md", route: "/docs/architecture/framework-neutral-core", title: "Framework-neutral core", summary: "Superseded ADR for the framework-neutral TypeMCP core.", group: "Architecture", order: 2, classification: "repository-development", sourceStatus: "**Status:** Superseded" },
  { sourcePath: "docs/architecture/adr/0002-fetch-streamable-http.md", route: "/docs/architecture/fetch-streamable-http", title: "Fetch Streamable HTTP", summary: "ADR for the Fetch-standard Streamable HTTP adapter.", group: "Architecture", order: 3, classification: "repository-development", sourceStatus: "**Status:** Accepted" },
  { sourcePath: "docs/architecture/adr/0002-langchain-langgraph-integration.md", route: "/docs/architecture/langchain-langgraph-integration", title: "LangChain and LangGraph integration", summary: "ADR for tools-only LangChain and consumer-owned LangGraph composition.", group: "Architecture", order: 4, classification: "repository-development", sourceStatus: "**Status:** Accepted" },
  { sourcePath: "docs/product/vision.md", route: "/docs/product/vision", title: "Product vision", summary: "The TypeMCP product target and design principles.", group: "Product", order: 1, classification: "product-target", sourceStatus: "**Status:** Product target." },
  { sourcePath: "docs/product/mvp-scope.md", route: "/docs/product/mvp-scope", title: "MVP scope", summary: "Published, deferred, and excluded product capabilities.", group: "Product", order: 2, classification: "published", sourceStatus: "@theorvane/type-mcp@0.2.2" },
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
        ...(translation.outcome ? { outcome: translation.outcome } : {}),
        ...(translation.applicationBoundary ? { applicationBoundary: translation.applicationBoundary } : {}),
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

export function isSafeSourcePath(sourcePath: string): boolean {
  return /^docs\/(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(sourcePath)
    && !sourcePath.includes("..")
    && !sourcePath.includes("\\");
}

export function validateManifest(manifest: readonly PublicDocument[]): void {
  if (!/^[0-9a-f]{40}$/.test(sourceCommit)) throw new Error("source commit must be a full SHA");
  const routes = new Set<string>();
  const paths = new Set<string>();
  const groupOrders = new Set<string>();
  for (const document of manifest) {
    if (!isSafeSourcePath(document.sourcePath) || /(?:^|\/)(?:planning|superpowers)(?:\/|$)/.test(document.sourcePath)) throw new Error(`approved docs source path required: ${document.sourcePath}`);
    if (!document.route.startsWith("/docs/") || document.route.includes("..")) throw new Error(`approved docs route required: ${document.route}`);
    if (!document.sourceStatus.trim()) throw new Error(`source status evidence required: ${document.sourcePath}`);
    if (routes.has(document.route)) throw new Error(`duplicate route: ${document.route}`);
    if (paths.has(document.sourcePath)) throw new Error(`duplicate source path: ${document.sourcePath}`);
    const groupOrder = `${document.group}:${document.order}`;
    if (!documentGroups.includes(document.group)) throw new Error(`unknown document group: ${document.group}`);
    if (groupOrders.has(groupOrder)) throw new Error(`duplicate group order: ${groupOrder}`);
    routes.add(document.route); paths.add(document.sourcePath); groupOrders.add(groupOrder);
    for (const [locale, translation] of Object.entries(document.translations ?? {})) {
      if (!documentLocales.includes(locale as DocumentLocale) || locale === defaultDocumentLocale) throw new Error(`unknown translation locale: ${locale}`);
      if (!isSafeSourcePath(translation.sourcePath) || !translation.sourcePath.startsWith(`docs/${locale}/`)) throw new Error(`approved translation source path required: ${translation.sourcePath}`);
      if (!translation.title.trim() || !translation.summary.trim()) throw new Error(`translation title and summary required: ${translation.sourcePath}`);
      if (!translation.sourceStatus.trim()) throw new Error(`translation source status evidence required: ${translation.sourcePath}`);
      const localizedRouteValue = localizedRoute(document.route, locale as DocumentLocale);
      if (routes.has(localizedRouteValue)) throw new Error(`duplicate route: ${localizedRouteValue}`);
      if (paths.has(translation.sourcePath)) throw new Error(`duplicate source path: ${translation.sourcePath}`);
      routes.add(localizedRouteValue); paths.add(translation.sourcePath);
    }
  }
}

validateManifest(publicDocuments);
