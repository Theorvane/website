import type { Metadata } from "next";

import { DocsSidebar } from "../../components/docs/docs-components";
import { sourceCommit } from "../../lib/docs/manifest";
import { getAllDocuments } from "../../lib/docs/repository";

const canonicalBase = "https://typechain.theorvane.tech";

export const metadata: Metadata = {
  title: "Documentation | TypeChain",
  description: "Install TypeChain and compose typed tools, agents, policy guards, and TypeMCP bridges.",
  alternates: { canonical: "/docs" },
  openGraph: { type: "website", title: "Documentation | TypeChain", description: "Technical documentation for TypeChain's published package and explicit runtime boundaries.", url: `${canonicalBase}/docs`, siteName: "TypeChain", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "Documentation | TypeChain", description: "Technical documentation for TypeChain's published package and explicit runtime boundaries." },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${canonicalBase}/docs#page`, name: "Documentation", url: `${canonicalBase}/docs`, inLanguage: "en", isPartOf: { "@id": `${canonicalBase}/#website` }, about: { "@id": `${canonicalBase}/#package` } },
    { "@type": "BreadcrumbList", "@id": `${canonicalBase}/docs#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "TypeChain", item: `${canonicalBase}/` },
      { "@type": "ListItem", position: 2, name: "Documentation", item: `${canonicalBase}/docs` },
    ] },
  ],
};

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const getStarted = documents.filter(({ document }) => document.route === "/docs/getting-started");
  const learn = documents.filter(({ document }) => document.route === "/docs/core-concepts" || document.route === "/docs/guides/tools-and-definitions");
  const build = documents.filter(({ document }) => document.group === "Build");
  const integrate = documents.filter(({ document }) => ["/docs/guides/langchain-integration", "/docs/guides/agent-builder", "/docs/guides/typemcp-bridge"].includes(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/guides/composition-selection");
  const cards = (items: typeof documents) => <div className="docs-card-grid">{items.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div>;

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <script data-testid="typechain-docs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="docs-header"><a className="logo" href="/">TYPE<span>CHAIN</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs" aria-current="page">Documentation</a><a href="https://github.com/Theorvane/type-chain" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-chain" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header>
    <main className="docs-layout"><DocsSidebar documents={documents} /><article id="docs-content" className="docs-index">
      <p className="eyebrow">TypeChain technical documentation</p><div className="docs-title-row"><h1>TypeChain documentation</h1><span className="docs-status">Published · 0.1.1</span></div>
      <p className="docs-lede">Declare typed tools and policy intent, then select the LangChain, agent, or in-process TypeMCP boundary that your application controls.</p>
      <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-chain@0.1.1</code> provides Stage 3 tool and policy declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Your application owns models, credentials, policy enforcement, state, hosting, and deployment.</p></aside>
      <section aria-labelledby="workflow-heading"><p className="eyebrow">Continue the canonical workspace</p><h2 id="workflow-heading">Build your first Petstore workflow</h2><p>Continue the Petstore workspace from TypeMCP with typed tools and explicit composition choices. TypeChain does not provide models, credentials, policy enforcement, and transport.</p><a className="docs-goal-card" href="/docs/build/petstore-typechain-foundation"><strong>Continue the Petstore workspace</strong><span>Define typed tools, record policy intent, and select an application-owned composition boundary.</span><em>Continue Build →</em></a></section>
      <section aria-labelledby="get-started-heading"><p className="eyebrow">First package contact</p><h2 id="get-started-heading">Get started</h2>{cards(getStarted)}</section>
      <section aria-labelledby="learn-heading"><p className="eyebrow">Typed-tool vocabulary</p><h2 id="learn-heading">Learn</h2>{cards(learn)}</section>
      <section aria-labelledby="build-heading"><p className="eyebrow">Continue through the canonical workspace</p><h2 id="build-heading">Build</h2>{cards(build)}</section>
      <section aria-labelledby="integrate-heading"><p className="eyebrow">Choose an application boundary</p><h2 id="integrate-heading">Integrate</h2>{cards(integrate)}</section>
      <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and composition choices</p><h2 id="reference-heading">Reference</h2>{cards(reference)}</section>
      <p className="source-link"><a href={`https://github.com/Theorvane/type-chain/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
    </article></main>
  </>;
}
