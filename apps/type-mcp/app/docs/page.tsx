import type { Metadata } from "next";

import { DocsSidebar } from "../../components/docs/docs-components";
import { sourceCommit } from "../../lib/docs/manifest";
import { getAllDocuments } from "../../lib/docs/repository";

const canonicalBase = "https://typemcp.theorvane.tech";

export const metadata: Metadata = {
  title: "Documentation | TypeMCP",
  description: "Install TypeMCP, validate and compile decorator declarations, and understand application-owned boundaries.",
  alternates: { canonical: "/docs" },
  openGraph: { title: "Documentation | TypeMCP", description: "Technical documentation for TypeMCP's published runtime and application-owned boundaries.", url: `${canonicalBase}/docs` },
};

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const getStarted = documents.filter(({ document }) => document.route === "/docs/getting-started");
  const learn = documents.filter(({ document }) => document.route === "/docs/core-concepts" || document.route === "/docs/guides/configuration");
  const build = documents.filter(({ document }) => document.group === "Build");
  const integrate = documents.filter(({ document }) => ["/docs/guides/http-and-nextjs", "/docs/guides/langchain-langgraph", "/docs/guides/runtime-selection"].includes(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/architecture/overview");
  const cards = (items: typeof documents) => <div className="docs-card-grid">{items.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div>;

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <header className="docs-header"><a className="logo" href="/">TYPE<span>MCP</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs" aria-current="page">Documentation</a><a href="https://github.com/Theorvane/type-mcp" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-mcp" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header>
    <main className="docs-layout"><DocsSidebar documents={documents} /><article id="docs-content" className="docs-index">
      <p className="eyebrow">TypeMCP technical documentation</p><div className="docs-title-row"><h1>TypeMCP documentation</h1><span className="docs-status">Published · 0.2.2</span></div>
      <p className="docs-lede">Define an MCP server with decorators, inspect its immutable definition, and compile it at the runtime boundary your application owns.</p>
      <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-mcp@0.2.2</code> provides declaration metadata, validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Your application owns hosting, authorization, durable state, models, LangGraph composition, and deployment.</p></aside>
      <section aria-labelledby="workflow-heading"><p className="eyebrow">A canonical, source-owned curriculum</p><h2 id="workflow-heading">Build your first Petstore workflow</h2><p>Start with an explicit resolver and runtime boundary. The reader retains application lifecycle ownership while TypeMCP compiles the declaration at the selected boundary.</p><a className="docs-goal-card" href="/docs/build/petstore-project-setup"><strong>Start the Petstore workspace</strong><span>Set up strict TypeScript, then continue through declaration, inspection, and runtime selection.</span><em>Begin Build →</em></a></section>
      <section aria-labelledby="get-started-heading"><p className="eyebrow">First package contact</p><h2 id="get-started-heading">Get started</h2>{cards(getStarted)}</section>
      <section aria-labelledby="learn-heading"><p className="eyebrow">Vocabulary and compatibility</p><h2 id="learn-heading">Learn</h2>{cards(learn)}</section>
      <section aria-labelledby="build-heading"><p className="eyebrow">Progress through the canonical workspace</p><h2 id="build-heading">Build</h2>{cards(build)}</section>
      <section aria-labelledby="integrate-heading"><p className="eyebrow">Choose a runtime boundary</p><h2 id="integrate-heading">Integrate</h2>{cards(integrate)}</section>
      <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and compatibility</p><h2 id="reference-heading">Reference</h2>{cards(reference)}</section>
      <p className="source-link"><a href={`https://github.com/Theorvane/type-mcp/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
    </article></main>
  </>;
}
