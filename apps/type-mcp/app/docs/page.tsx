import type { Metadata } from "next";

import { DocsSidebar } from "../../components/docs/docs-components";
import { sourceCommit } from "../../lib/docs/manifest";
import { getAllDocuments } from "../../lib/docs/repository";

const canonicalBase = "https://typemcp.theorvane.tech";

export const metadata: Metadata = {
  title: "Documentation | TypeMCP",
  description: "Install TypeMCP, validate and compile decorator declarations, and understand application-owned boundaries.",
  alternates: { canonical: "/docs" },
  openGraph: { type: "website", title: "Documentation | TypeMCP", description: "Technical documentation for TypeMCP's published runtime and application-owned boundaries.", url: `${canonicalBase}/docs`, siteName: "TypeMCP", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Documentation | TypeMCP", description: "Technical documentation for TypeMCP's published runtime and application-owned boundaries." },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${canonicalBase}/docs#page`, name: "Documentation", url: `${canonicalBase}/docs`, inLanguage: "en", isPartOf: { "@id": `${canonicalBase}/#website` }, about: { "@id": `${canonicalBase}/#package` } },
    { "@type": "BreadcrumbList", "@id": `${canonicalBase}/docs#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "TypeMCP", item: `${canonicalBase}/` },
      { "@type": "ListItem", position: 2, name: "Documentation", item: `${canonicalBase}/docs` },
    ] },
  ],
};

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const getStarted = documents.filter(({ document }) => document.route === "/docs/getting-started");
  const learn = documents.filter(({ document }) => document.route === "/docs/core-concepts" || document.route === "/docs/guides/configuration");
  const build = documents.filter(({ document }) => document.group === "Build");
  const workflow = [...build].sort((left, right) => (left.document.curriculumStep ?? Number.MAX_SAFE_INTEGER) - (right.document.curriculumStep ?? Number.MAX_SAFE_INTEGER));
  const integrate = documents.filter(({ document }) => ["/docs/guides/http-and-nextjs", "/docs/guides/langchain-langgraph", "/docs/guides/runtime-selection"].includes(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/architecture/overview");
  const cards = (items: typeof documents) => <div className="docs-card-grid">{items.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div>;

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <script data-testid="typemcp-docs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="docs-header"><a className="logo" href="/">TYPE<span>MCP</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs" aria-current="page">Documentation</a><a href="https://github.com/Theorvane/type-mcp" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-mcp" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header>
    <main className="docs-layout"><DocsSidebar documents={documents} /><article id="docs-content" className="docs-index">
      <p className="eyebrow">TypeMCP technical documentation</p><div className="docs-title-row"><h1>Build a typed Petstore workflow, one boundary at a time.</h1><span className="docs-status">Published · 0.2.2</span></div>
      <p className="docs-lede">Start with a small application-owned workspace. Learn the declaration, compiler, and runtime seams before you compose a real MCP server.</p>
      <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-mcp@0.2.2</code> provides declaration metadata, validation, MCP SDK compilation, stdio, Streamable HTTP, and a tools-only LangChain adapter. Your application owns hosting, authorization, durable state, models, LangGraph composition, and deployment.</p></aside>
      <section className="docs-workspace-flow" aria-labelledby="workflow-heading"><div className="docs-workspace-hero"><div><p className="eyebrow">A canonical, source-owned curriculum</p><h2 id="workflow-heading">Petstore workflow</h2><p>Start with an explicit resolver and runtime boundary; the reader retains application lifecycle ownership while making each runtime choice explicitly.</p></div><div className="docs-workspace-status" role="group" aria-label="Current learning stage"><p>Your learning path</p><strong>Petstore workflow<br />6 focused steps</strong><div className="docs-workspace-progress" aria-hidden="true"><span style={{ width: "17%" }} /></div><span>Step 1 of 6</span><span>Ready to start</span></div></div><div className="docs-workflow-grid">{workflow.map(({ document }, index) => <a className={index === 0 ? "docs-workflow-card docs-workflow-card-primary" : "docs-workflow-card"} href={document.route} key={document.route}><span>Step {document.curriculumStep} of {document.curriculumTotal}</span><strong>{index === 0 ? "Start the Petstore workspace" : document.title}</strong><p>{document.summary}</p>{index === 0 ? <em>Begin Build →</em> : null}</a>)}</div></section>
      <section className="docs-intent-section" aria-labelledby="get-started-heading"><p className="eyebrow">First package contact</p><h2 id="get-started-heading">Get started</h2>{cards(getStarted)}</section>
      <section aria-labelledby="learn-heading"><p className="eyebrow">Vocabulary and compatibility</p><h2 id="learn-heading">Learn</h2>{cards(learn)}</section>
      <section aria-labelledby="integrate-heading"><p className="eyebrow">Choose a runtime boundary</p><h2 id="integrate-heading">Integrate</h2>{cards(integrate)}</section>
      <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and compatibility</p><h2 id="reference-heading">Reference</h2>{cards(reference)}</section>
      <p className="source-link"><a href={`https://github.com/Theorvane/type-mcp/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
    </article></main>
  </>;
}
