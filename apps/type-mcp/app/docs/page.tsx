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

const goals = [
  { title: "Run locally over stdio", href: "/docs/guides/runtime-selection#stdio", description: "Select the published stdio helper while keeping process lifecycle and access control in your application." },
  { title: "Mount MCP over HTTP", href: "/docs/guides/http-and-nextjs", description: "Mount the Fetch or Next.js integration and keep route, auth, origin, and deployment policy explicit." },
  { title: "Reuse tools with LangChain", href: "/docs/guides/langchain-langgraph", description: "Produce tools only; retain model, graph topology, state, and agent ownership in application code." },
] as const;

const integrationRoutes = new Set([
  "/docs/guides/runtime-selection",
  "/docs/guides/http-and-nextjs",
  "/docs/guides/langchain-langgraph",
]);

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const start = documents.filter(({ document }) => document.group === "Start");
  const integrations = documents.filter(({ document }) => integrationRoutes.has(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/guides/configuration");

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
        <div className="docs-title-row"><h1>TypeMCP documentation</h1><span className="docs-status">Published · 0.2.2</span></div>
        <p className="docs-lede">Define an MCP server with decorators, inspect its immutable definition, and compile it at the runtime boundary your application owns.</p>
        <aside className="release-callout">
          <strong>Published package boundary</strong>
          <p><code>@theorvane/type-mcp@0.2.2</code> provides declaration metadata, validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Your application owns hosting, authorization, durable state, models, LangGraph composition, and deployment.</p>
        </aside>

        <section className="docs-surface" aria-labelledby="supported-surface-heading">
          <div><p className="eyebrow">Ownership map</p><h2 id="supported-surface-heading">Supported surface</h2></div>
          <dl>
            <div><dt>TypeMCP provides</dt><dd>Decorators, definitions, validation, compilation, stdio, HTTP framing, and LangChain tools.</dd></div>
            <div><dt>Your application provides</dt><dd>Resolvers, host lifecycle, authorization, persistence, models, graph composition, and deployment.</dd></div>
          </dl>
        </section>

        <section aria-labelledby="goal-heading">
          <p className="eyebrow">Choose the smallest boundary</p><h2 id="goal-heading">Start with your goal</h2>
          <div className="docs-goal-grid">{goals.map((goal, index) => <a className="docs-goal-card" href={goal.href} key={goal.href}><span>0{index + 1}</span><strong>{goal.title}</strong><p>{goal.description}</p><em>Open guide →</em></a>)}</div>
        </section>

        <section aria-labelledby="core-concepts-heading"><p className="eyebrow">Build a shared vocabulary</p><h2 id="core-concepts-heading">Core concepts</h2><div className="docs-card-grid">{start.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <section aria-labelledby="integrations-heading"><p className="eyebrow">Choose a runtime boundary</p><h2 id="integrations-heading">Integrations</h2><div className="docs-card-grid">{integrations.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and compatibility</p><h2 id="reference-heading">API and reference</h2><div className="docs-card-grid">{reference.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <p className="source-link"><a href={`https://github.com/Theorvane/type-mcp/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
      </article>
    </main>
  </>;
}
