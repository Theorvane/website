import type { Metadata } from "next";

import { DocsSidebar } from "../../components/docs/docs-components";
import { sourceCommit } from "../../lib/docs/manifest";
import { getAllDocuments } from "../../lib/docs/repository";

const canonicalBase = "https://typemcp.theorvane.tech";

export const metadata: Metadata = {
  title: "Documentation | TypeMCP",
  description: "Install TypeMCP, validate and compile decorator declarations, and understand application-owned boundaries.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentation | TypeMCP",
    description: "Technical documentation for TypeMCP's published runtime and application-owned boundaries.",
    url: `${canonicalBase}/docs`,
  },
};

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const groups = ["Start", "Guides", "API", "Architecture", "Product"] as const;

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <header className="docs-header">
      <a className="logo" href="/">TYPE<span>MCP</span></a>
      <nav aria-label="Primary">
        <a href="/">Product</a>
        <a href="/docs" aria-current="page">Documentation</a>
        <a href="https://github.com/Theorvane/type-mcp" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a>
        <a href="https://www.npmjs.com/package/@theorvane/type-mcp" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a>
      </nav>
    </header>
    <main className="docs-layout">
      <DocsSidebar documents={documents} />
      <article id="docs-content" className="docs-index">
        <p className="eyebrow">TypeMCP technical documentation</p>
        <h1>TypeMCP documentation</h1>
        <p>The published npm package provides decorator declarations, definition validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Applications retain ownership of hosting, authorization, and LangGraph composition.</p>
        <aside className="release-callout">
          <strong>Read the release boundary first</strong>
          <p><code>@theorvane/type-mcp@0.2.0</code> is the current public release.</p>
        </aside>
        <section className="reading-order" aria-labelledby="reading-order-heading">
          <h2 id="reading-order-heading">Recommended reading order</h2>
          <ol>
            <li><a href="/docs/getting-started">Getting started</a> — install the published package and inspect a declaration.</li>
            <li><a href="/docs/guides/configuration">Configuration and compatibility</a> — configure TypeScript and package loading.</li>
            <li><a href="/docs/api/decorator-api">Decorator API contract</a> — compare the published API with repository-development work.</li>
            <li><a href="/docs/architecture/overview">Architecture overview</a> — explore the planned compiler and transport boundaries.</li>
          </ol>
        </section>
        {groups.map((group) => <section key={group}>
          <h2>{group}</h2>
          <div className="docs-card-grid">
            {documents.filter((document) => document.document.group === group).map((document) => <a className="docs-card" href={document.document.route} key={document.document.route}>
              <strong>{document.document.title}</strong><span>{document.document.summary}</span>
            </a>)}
          </div>
        </section>)}
        <p className="source-link"><a href={`https://github.com/Theorvane/type-mcp/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
      </article>
    </main>
  </>;
}
