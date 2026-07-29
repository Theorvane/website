import type { Metadata } from "next";

import { DocsSidebar } from "../../components/docs/docs-components";
import { sourceCommit } from "../../lib/docs/manifest";
import { getAllDocuments } from "../../lib/docs/repository";

const canonicalBase = "https://typechain.theorvane.tech";

export const metadata: Metadata = {
  title: "Documentation | TypeChain",
  description: "Install TypeChain and compose typed tools, agents, policy guards, and TypeMCP bridges.",
  alternates: { canonical: "/docs" },
  openGraph: { title: "Documentation | TypeChain", description: "Technical documentation for TypeChain's published package and explicit runtime boundaries.", url: `${canonicalBase}/docs` },
};

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const getStarted = documents.filter(({ document }) => document.route === "/docs/getting-started");
  const learn = documents.filter(({ document }) => document.route === "/docs/core-concepts" || document.route === "/docs/guides/tools-and-definitions");
  const build = documents.filter(({ document }) => document.group === "Build");
  const workflow = [...build].sort((left, right) => (left.document.curriculumStep ?? Number.MAX_SAFE_INTEGER) - (right.document.curriculumStep ?? Number.MAX_SAFE_INTEGER));
  const integrate = documents.filter(({ document }) => ["/docs/guides/langchain-integration", "/docs/guides/agent-builder", "/docs/guides/typemcp-bridge"].includes(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/guides/composition-selection");
  const cards = (items: typeof documents) => <div className="docs-card-grid">{items.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div>;

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <header className="docs-header"><a className="logo" href="/">TYPE<span>CHAIN</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs" aria-current="page">Documentation</a><a href="https://github.com/Theorvane/type-chain" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-chain" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header>
    <main className="docs-layout"><DocsSidebar documents={documents} /><article id="docs-content" className="docs-index">
      <p className="eyebrow">TypeChain technical documentation</p><div className="docs-title-row"><h1>Continue the typed Petstore workflow at the composition boundary.</h1><span className="docs-status">Published · 0.1.1</span></div>
      <p className="docs-lede">Continue the workspace with typed tools, policy intent, and a composition boundary your application controls.</p>
      <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-chain@0.1.1</code> provides Stage 3 tool and policy declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Your application owns models, credentials, policy enforcement, state, hosting, and deployment.</p></aside>
      <section className="docs-workspace-flow" aria-labelledby="workflow-heading"><div className="docs-workspace-hero"><div><p className="eyebrow">Continue the canonical workspace</p><h2 id="workflow-heading">Petstore workflow</h2><p>Continue the TypeMCP workspace with typed tools and explicit composition choices. TypeChain does not provide models, credentials, policy enforcement, or transport.</p></div><div className="docs-workspace-status" role="status" aria-label="Current learning stage"><p>Your learning path</p><strong>Petstore workflow<br />6 focused steps</strong><div className="docs-workspace-progress" aria-hidden="true"><span style={{ width: "67%" }} /></div><span>Step 4 of 6</span><span>Ready to continue</span></div></div><div className="docs-workflow-grid">{workflow.map(({ document }, index) => <a className={index === 0 ? "docs-workflow-card docs-workflow-card-primary" : "docs-workflow-card"} href={document.route} key={document.route}><span>Step {document.curriculumStep} of {document.curriculumTotal}</span><strong>{index === 0 ? "Continue the Petstore workspace" : document.title}</strong><p>{index === 0 ? `${document.title}: ${document.summary}` : document.summary}</p>{index === 0 ? <em>Continue Build →</em> : null}</a>)}</div></section>
      <section className="docs-intent-section" aria-labelledby="get-started-heading"><p className="eyebrow">First package contact</p><h2 id="get-started-heading">Get started</h2>{cards(getStarted)}</section>
      <section aria-labelledby="learn-heading"><p className="eyebrow">Typed-tool vocabulary</p><h2 id="learn-heading">Learn</h2>{cards(learn)}</section>
      <section aria-labelledby="integrate-heading"><p className="eyebrow">Choose an application boundary</p><h2 id="integrate-heading">Integrate</h2>{cards(integrate)}</section>
      <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and composition choices</p><h2 id="reference-heading">Reference</h2>{cards(reference)}</section>
      <p className="source-link"><a href={`https://github.com/Theorvane/type-chain/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
    </article></main>
  </>;
}
