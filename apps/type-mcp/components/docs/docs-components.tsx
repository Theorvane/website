import { dirname, normalize, posix } from "node:path";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugify } from "../../lib/docs/parse";
import type { RepositoryDocument } from "../../lib/docs/repository";
import { sourceCommit } from "../../lib/docs/manifest";

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

export function ReleaseBoundaryCallout({ classification }: Pick<RepositoryDocument["document"], "classification">) {
  if (classification === "published") return null;
  return <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-mcp@0.2.0</code> provides definition validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Applications retain ownership of hosting, authorization, and LangGraph composition; this page may describe repository-development or product-target decisions beyond the installed package.</p></aside>;
}

export function DocsSidebar({ documents, activeRoute }: { documents: readonly RepositoryDocument[]; activeRoute?: string }) {
  const groups = ["Start", "Guides", "API", "Architecture", "Product"] as const;
  return <aside className="docs-sidebar"><details open><summary>Documentation navigation</summary><nav aria-label="Documentation">{groups.map((group) => <section key={group}><h2>{group}</h2>{documents.filter((document) => document.document.group === group).map((document) => <a key={document.document.route} href={document.document.route} aria-current={activeRoute === document.document.route ? "page" : undefined}>{document.document.title}</a>)}</section>)}</nav></details></aside>;
}

export function ArticleToc({ document }: { document: RepositoryDocument }) {
  if (document.toc.length < 2) return null;
  return <aside className="article-toc"><p>On this page</p><nav aria-label="On this page">{document.toc.map((entry) => <a className={`depth-${entry.depth}`} href={`#${entry.id}`} key={entry.id}>{entry.title}</a>)}</nav></aside>;
}

export function MarkdownArticle({ document }: { document: RepositoryDocument }) {
  return <article id="docs-content" className="markdown-article"><p className="breadcrumb">Documentation / {document.document.group}</p><h1>{document.title}</h1><ReleaseBoundaryCallout classification={document.document.classification} /><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2: ({ children }) => <h2 id={slugify(textContent(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(textContent(children))}>{children}</h3>,
    a: ({ href, children }) => { const safe = safeHref(href); const resolved = document.internalLinks.get(href ?? "") ?? sourceHref(safe, document); const external = /^https?:\/\//.test(resolved); return <a href={resolved} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}{external ? <span className="sr-only"> (opens in a new tab)</span> : null}</a>; },
    pre: ({ children }) => <div className="code-scroll"><pre>{children}</pre></div>,
    table: ({ children }) => <div className="table-scroll"><table>{children}</table></div>,
  }}>{document.markdown.replace(/^#\s+.*$/m, "")}</ReactMarkdown><p className="source-link"><a href={document.sourceUrl} target="_blank" rel="noopener noreferrer">View source at {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p></article>;
}
