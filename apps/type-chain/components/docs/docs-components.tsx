import { dirname, normalize, posix } from "node:path";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugify } from "../../lib/docs/parse";
import type { RepositoryDocument } from "../../lib/docs/repository";
import { availableLocales, localizedRoute, sourceCommit } from "../../lib/docs/manifest";
import { defaultDocumentLocale, type DocumentLocale } from "../../lib/docs/types";

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
  return `https://github.com/Theorvane/type-chain/blob/${sourceCommit}/${target}${fragment ? `#${fragment}` : ""}`;
}

function imageHref(src: string, document: RepositoryDocument): string {
  const safe = safeHref(src);
  if (/^(?:https?:|\/)/i.test(safe)) return safe;
  return sourceHref(safe, document).replace("https://github.com/Theorvane/type-chain/blob/", "https://raw.githubusercontent.com/Theorvane/type-chain/");
}

function routeTitle(route: string): string {
  const titles: Record<string, string> = {
    "/docs/build/petstore-typechain-foundation": "Petstore TypeChain foundation",
    "/docs/build/petstore-policy-and-composition": "Petstore policy and composition",
    "/docs/petstore-walkthrough": "Petstore walkthrough",
  };
  return titles[route] ?? route.split("/").at(-1)!.split("-").map((word) => word[0]!.toUpperCase() + word.slice(1)).join(" ");
}

export function ReleaseBoundaryCallout({ classification }: Pick<RepositoryDocument["document"], "classification">) {
  if (classification === "published") return null;
  return <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-chain@0.1.1</code> provides Stage 3 decorator declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Applications retain ownership of models, credentials, policy enforcement, hosting, and deployment; this page may describe architecture beyond the installed package.</p></aside>;
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
  // The navigation is rendered twice on purpose: a desktop copy outside the disclosure and a mobile copy
  // inside it, because a closed <details> hides its content through ::details-content and no child
  // display rule can reveal it. CSS shows exactly one at a time.
  const navigation = (className?: string) => <nav className={className} aria-label="Documentation">{groups.map((group) => {
    const entries = documents.filter((document) => document.document.group === group);
    // A group with no document would otherwise render as a bare heading.
    if (entries.length === 0) return null;
    return <section key={group}><p className="docs-sidebar-group">{group}</p>{entries.map((document) => <a key={document.document.route} href={document.document.route} aria-current={activeRoute === document.document.route ? "page" : undefined}>{document.document.title}</a>)}</section>;
  })}</nav>;
  return <aside className="docs-sidebar">{navigation("docs-sidebar-desktop")}<details><summary>Documentation navigation</summary>{navigation("docs-sidebar-mobile")}</details></aside>;
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
  const nextLabel = next ? (hasCurriculum ? `Next step: ${next.document.title}` : `Next: ${next.document.title}`) : undefined;
  return <nav className="document-pager" aria-label="Document sequence">
    {previous ? <a href={previous.document.route}>Previous: {previous.document.title}</a> : <span />}
    {next ? <a href={next.document.route}>{nextLabel}</a> : <span />}
  </nav>;
}

export function ArticleToc({ document }: { document: RepositoryDocument }) {
  if (document.toc.length < 2) return null;
  return <aside className="article-toc"><p>On this page</p><nav aria-label="On this page">{document.toc.map((entry) => <a className={`depth-${entry.depth}`} href={`#${entry.id}`} key={entry.id}>{entry.title}</a>)}</nav></aside>;
}

function CurriculumContext({ document }: { document: RepositoryDocument }) {
  const metadata = document.document;
  if (!metadata.curriculumStep || !metadata.curriculumTotal || !metadata.outcome || !metadata.applicationBoundary) return null;
  const hasFailureGuide = /^##\s+Failure guide\s*$/im.test(document.markdown);
  return <aside className="curriculum-context" aria-label="Curriculum context">
    <p className="eyebrow">Build / Step {metadata.curriculumStep} of {metadata.curriculumTotal}</p>
    <p><strong>Outcome:</strong> {metadata.outcome}</p>
    <p><strong>Application boundary:</strong> {metadata.applicationBoundary}</p>
    {metadata.prerequisites?.map((route) => <p key={route} className="docs-context-link"><a href={route}>Prerequisite: {routeTitle(route)}</a></p>)}
    {hasFailureGuide ? <p className="docs-context-link"><a href="#failure-guide">Troubleshooting and limitations</a></p> : null}
  </aside>;
}

export function MarkdownArticle({ document }: { document: RepositoryDocument }) {
  return <article id="docs-content" className="markdown-article"><p className="breadcrumb">Documentation / {document.document.group}</p><DocsLanguageSwitch route={document.document.route} locale={document.locale} locales={availableLocales(document.document)} /><h1>{document.title}</h1><CurriculumContext document={document} /><ReleaseBoundaryCallout classification={document.document.classification} /><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2: ({ children }) => <h2 id={slugify(textContent(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(textContent(children))}>{children}</h3>,
    a: ({ href, children }) => { const safe = safeHref(href); const resolved = document.internalLinks.get(href ?? "") ?? sourceHref(safe, document); const external = /^https?:\/\//.test(resolved); return <a href={resolved} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{external ? <span className="sr-only"> (opens in a new tab)</span> : null}</a>; },
    pre: ({ children }) => <div className="code-scroll"><pre>{children}</pre></div>,
    table: ({ children }) => <div className="table-scroll"><table>{children}</table></div>,
    img: ({ src, alt }) => <img src={imageHref(typeof src === "string" ? src : "", document)} alt={alt ?? ""} loading="lazy" decoding="async" />,
  }}>{document.markdown.replace(/^#\s+.*$/m, "")}</ReactMarkdown><p className="source-link"><a href={document.sourceUrl} target="_blank" rel="noopener noreferrer">View source at {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p></article>;
}
