import { dirname, normalize, posix } from "node:path";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugify } from "../../lib/docs/parse";
import type { RepositoryDocument } from "../../lib/docs/repository";
import { availableLocales, documentEditions, documentLocale, localizedRoute, sourceCommit } from "../../lib/docs/manifest";
import { defaultDocumentLocale, type DocumentLocale } from "../../lib/docs/types";

/** Portal chrome, in the locale the reader is already in. Document prose comes from the pinned source. */
const strings = {
  en: {
    groups: { Start: "Start", Guides: "Guides", Build: "Build", API: "API", Architecture: "Architecture", Product: "Product" },
    breadcrumb: "Documentation",
    navigationSummary: "Documentation navigation",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    nextStep: "Next step",
    step: (step: number, total: number) => `Build / Step ${step} of ${total}`,
    outcome: "Outcome:",
    applicationBoundary: "Application boundary:",
    prerequisite: "Prerequisite:",
    failureGuide: "Troubleshooting and limitations",
    viewSource: (commit: string) => `View source at ${commit}`,
    newTab: "(opens in a new tab)",
  },
  ko: {
    groups: { Start: "시작하기", Guides: "가이드", Build: "만들기", API: "API", Architecture: "아키텍처", Product: "제품" },
    breadcrumb: "문서",
    navigationSummary: "문서 내비게이션",
    onThisPage: "이 페이지 내용",
    previous: "이전",
    next: "다음",
    nextStep: "다음 단계",
    step: (step: number, total: number) => `만들기 / ${total}단계 중 ${step}단계`,
    outcome: "결과물:",
    applicationBoundary: "애플리케이션 경계:",
    prerequisite: "선행 문서:",
    failureGuide: "문제 해결과 한계",
    viewSource: (commit: string) => `${commit}에서 원문 보기`,
    newTab: "(새 탭에서 열림)",
  },
} as const satisfies Record<DocumentLocale, unknown>;

function copy(locale: DocumentLocale | undefined) {
  // Fall back to English rather than crashing if a caller has no locale in hand.
  return strings[locale ?? defaultDocumentLocale] ?? strings[defaultDocumentLocale];
}

function textContent(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(textContent).join("");
  return "";
}

function safeHref(href: string | undefined): string {
  if (!href || /^(?:javascript|data|vbscript):/i.test(href)) return "#";
  return href;
}

function sourceHref(href: string, document: RepositoryDocument): string {
  if (/^(?:https?:|mailto:|#|\/)/i.test(href)) return href;
  const [path, fragment] = href.split("#", 2);
  const target = normalize(posix.join(dirname(document.document.sourcePath), path!)).replace(/\\/g, "/");
  return `https://github.com/Theorvane/type-mcp/blob/${sourceCommit}/${target}${fragment ? `#${fragment}` : ""}`;
}

function imageHref(src: string, document: RepositoryDocument): string {
  const safe = safeHref(src);
  if (/^(?:https?:|\/)/i.test(safe)) return safe;
  return sourceHref(safe, document).replace("https://github.com/Theorvane/type-mcp/blob/", "https://raw.githubusercontent.com/Theorvane/type-mcp/");
}

function routeTitle(route: string): string {
  return documentEditions().find((edition) => edition.document.route === route)?.document.title ?? route;
}

export function ReleaseBoundaryCallout({ classification }: Pick<RepositoryDocument["document"], "classification">) {
  if (classification === "published") return null;
  return <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-mcp@0.2.2</code> provides definition validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Applications retain ownership of hosting, authorization, and LangGraph composition; this page may describe repository-development or product-target decisions beyond the installed package.</p></aside>;
}

const localeNames: Readonly<Record<DocumentLocale, string>> = { en: "English", ko: "한국어" };
const localeLabels: Readonly<Record<DocumentLocale, string>> = { en: "Language", ko: "언어" };

/** Offers only locales the document is actually published in, so no link leads to a missing page. */
export function DocsLanguageSwitch({ route, locale, locales }: { route: string; locale: DocumentLocale; locales: readonly DocumentLocale[] }) {
  if (locales.length < 2) return null;
  const englishRoute = locale === defaultDocumentLocale ? route : route.replace(`/docs/${locale}`, "/docs");
  return <div className="docs-language">
    <span>{localeLabels[locale]}</span>
    {locales.map((candidate) => <a key={candidate} href={localizedRoute(englishRoute, candidate)} hrefLang={candidate} aria-current={candidate === locale ? "true" : undefined}>{localeNames[candidate]}</a>)}
  </div>;
}

export function DocsSidebar({ documents, activeRoute }: { documents: readonly RepositoryDocument[]; activeRoute?: string }) {
  const groups = ["Start", "Guides", "Build", "API", "Architecture", "Product"] as const;
  const locale = activeRoute ? documentLocale(activeRoute) : documents[0]?.locale ?? defaultDocumentLocale;
  const text = copy(locale);
  // The navigation is rendered twice on purpose: a desktop copy outside the disclosure and a mobile copy
  // inside it, because a closed <details> hides its content through ::details-content and no child
  // display rule can reveal it. CSS shows exactly one at a time.
  const navigation = (className?: string) => <nav className={className} aria-label={text.breadcrumb}>{groups.map((group) => {
    const entries = documents.filter((document) => document.document.group === group);
    // A group with no document in this locale would otherwise render as a bare heading.
    if (entries.length === 0) return null;
    return <section key={group}><p className="docs-sidebar-group">{text.groups[group]}</p>{entries.map((document) => <a key={document.document.route} href={document.document.route} aria-current={activeRoute === document.document.route ? "page" : undefined}>{document.document.title}</a>)}</section>;
  })}</nav>;
  return <aside className="docs-sidebar">{navigation("docs-sidebar-desktop")}<details><summary>{text.navigationSummary}</summary>{navigation("docs-sidebar-mobile")}</details></aside>;
}

export function DocumentPager({ documents, route }: { documents: readonly RepositoryDocument[]; route: string }) {
  const index = documents.findIndex(({ document }) => document.route === route);
  if (index < 0) return null;
  const current = documents[index]!.document;
  const hasCurriculum = current.curriculumStep !== undefined;
  const next = hasCurriculum
    ? documents.find(({ document }) => document.route === current.nextRoute)
    : documents[index + 1];
  const previous = documents[index - 1];
  if (!previous && !next) return null;
  const text = copy(documentLocale(route));
  const nextLabel = next ? (hasCurriculum ? `${text.nextStep}: ${next.document.title}` : `${text.next}: ${next.document.title}`) : undefined;
  return <nav className="document-pager" aria-label={`${text.previous} / ${text.next}`}>
    {previous ? <a href={previous.document.route}>{text.previous}: {previous.document.title}</a> : <span />}
    {next ? <a href={next.document.route}>{nextLabel}</a> : <span />}
  </nav>;
}

export function ArticleToc({ document }: { document: RepositoryDocument }) {
  if (document.toc.length < 2) return null;
  const text = copy(document.locale);
  return <aside className="article-toc"><p>{text.onThisPage}</p><nav aria-label={text.onThisPage}>{document.toc.map((entry) => <a className={`depth-${entry.depth}`} href={`#${entry.id}`} key={entry.id}>{entry.title}</a>)}</nav></aside>;
}

function CurriculumContext({ document }: { document: RepositoryDocument }) {
  const metadata = document.document;
  if (!metadata.curriculumStep || !metadata.curriculumTotal || !metadata.outcome || !metadata.applicationBoundary) return null;
  const text = copy(document.locale);
  // The Korean translation heads the same section 실패 가이드, so match either wording.
  const hasFailureGuide = /^##\s+(?:Failure guide|실패 가이드)\s*$/im.test(document.markdown);
  return <aside className="curriculum-context" aria-label="Curriculum context">
    <p className="eyebrow">{text.step(metadata.curriculumStep, metadata.curriculumTotal)}</p>
    <p><strong>{text.outcome}</strong> {metadata.outcome}</p>
    <p><strong>{text.applicationBoundary}</strong> {metadata.applicationBoundary}</p>
    {metadata.prerequisites?.map((route) => <p key={route} className="docs-context-link"><a href={route}>{text.prerequisite} {routeTitle(route)}</a></p>)}
    {hasFailureGuide ? <p className="docs-context-link"><a href={`#${slugify(text.failureGuide === "Troubleshooting and limitations" ? "Failure guide" : "실패 가이드")}`}>{text.failureGuide}</a></p> : null}
  </aside>;
}

export function MarkdownArticle({ document }: { document: RepositoryDocument }) {
  const text = copy(document.locale);
  return <article id="docs-content" className="markdown-article"><p className="breadcrumb">{text.breadcrumb} / {text.groups[document.document.group]}</p><DocsLanguageSwitch route={document.document.route} locale={document.locale} locales={availableLocales(document.document)} /><h1>{document.title}</h1><CurriculumContext document={document} /><ReleaseBoundaryCallout classification={document.document.classification} /><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2: ({ children }) => <h2 id={slugify(textContent(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(textContent(children))}>{children}</h3>,
    a: ({ href, children }) => { const safe = safeHref(href); const resolved = document.internalLinks.get(href ?? "") ?? sourceHref(safe, document); const external = /^https?:\/\//.test(resolved); return <a href={resolved} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{external ? <span className="sr-only"> {text.newTab}</span> : null}</a>; },
    pre: ({ children }) => <div className="code-scroll"><pre>{children}</pre></div>,
    table: ({ children }) => <div className="table-scroll"><table>{children}</table></div>,
    img: ({ src, alt }) => <img src={imageHref(typeof src === "string" ? src : "", document)} alt={alt ?? ""} loading="lazy" decoding="async" />,
  }}>{document.markdown.replace(/^#\s+.*$/m, "")}</ReactMarkdown><p className="source-link"><a href={document.sourceUrl} target="_blank" rel="noopener noreferrer">{text.viewSource(sourceCommit.slice(0, 12))} <span className="sr-only">{text.newTab}</span></a></p></article>;
}
