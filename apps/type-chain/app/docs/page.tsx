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

const goals = [
  { title: "Declare and inspect tools", href: "/docs/guides/tools-and-definitions", description: "Create typed, reusable tool metadata and inspect immutable definitions before selecting an adapter." },
  { title: "Use tools with LangChain", href: "/docs/guides/langchain-integration", description: "Adapt structured tools for an existing LangChain application without transferring model or lifecycle ownership." },
  { title: "Compose an in-process TypeMCP bridge", href: "/docs/guides/typemcp-bridge", description: "Reuse a TypeMCP server inside one Node.js process; this does not start an MCP client or transport." },
] as const;

const integrationRoutes = new Set([
  "/docs/guides/langchain-integration",
  "/docs/guides/agent-builder",
  "/docs/guides/typemcp-bridge",
]);

export default async function DocsIndex() {
  const documents = await getAllDocuments();
  const start = documents.filter(({ document }) => document.group === "Start");
  const integrations = documents.filter(({ document }) => integrationRoutes.has(document.route));
  const reference = documents.filter(({ document }) => document.group === "API" || document.route === "/docs/guides/composition-selection");

  return <>
    <a className="skip-link" href="#docs-content">Skip to documentation</a>
    <header className="docs-header">
      <a className="logo" href="/">TYPE<span>CHAIN</span></a>
      <nav aria-label="Primary"><a href="/">Product</a><a href="/docs" aria-current="page">Documentation</a><a href="https://github.com/Theorvane/type-chain" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-chain" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav>
    </header>
    <main className="docs-layout">
      <DocsSidebar documents={documents} />
      <article id="docs-content" className="docs-index">
        <p className="eyebrow">TypeChain technical documentation</p>
        <div className="docs-title-row"><h1>TypeChain documentation</h1><span className="docs-status">Published · 0.1.1</span></div>
        <p className="docs-lede">Declare typed tools and policy intent, then select the LangChain, agent, or in-process TypeMCP boundary that your application controls.</p>
        <aside className="release-callout"><strong>Published package boundary</strong><p><code>@theorvane/type-chain@0.1.1</code> provides Stage 3 tool and policy declarations, immutable definitions, LangChain adapters, an agent builder, and an in-process TypeMCP bridge. Your application owns models, credentials, policy enforcement, state, hosting, and deployment.</p></aside>

        <section className="docs-surface" aria-labelledby="supported-surface-heading"><div><p className="eyebrow">Ownership map</p><h2 id="supported-surface-heading">Supported surface</h2></div><dl><div><dt>TypeChain provides</dt><dd>Typed declarations, immutable definitions, adapters, agent assembly, and in-process TypeMCP composition.</dd></div><div><dt>Your application provides</dt><dd>Models, provider credentials, policy enforcement, state, persistence, host lifecycle, and deployment.</dd></div></dl></section>
        <section aria-labelledby="goal-heading"><p className="eyebrow">Choose the smallest boundary</p><h2 id="goal-heading">Start with your goal</h2><div className="docs-goal-grid">{goals.map((goal, index) => <a className="docs-goal-card" href={goal.href} key={goal.href}><span>0{index + 1}</span><strong>{goal.title}</strong><p>{goal.description}</p><em>Open guide →</em></a>)}</div></section>
        <section aria-labelledby="core-concepts-heading"><p className="eyebrow">Build a shared vocabulary</p><h2 id="core-concepts-heading">Core concepts</h2><div className="docs-card-grid">{start.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <section aria-labelledby="integrations-heading"><p className="eyebrow">Select an integration boundary</p><h2 id="integrations-heading">Integrations</h2><div className="docs-card-grid">{integrations.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <section aria-labelledby="reference-heading"><p className="eyebrow">Exact contracts and composition choices</p><h2 id="reference-heading">API and reference</h2><div className="docs-card-grid">{reference.map(({ document }) => <a className="docs-card" href={document.route} key={document.route}><strong>{document.title}</strong><span>{document.summary}</span></a>)}</div></section>
        <p className="source-link"><a href={`https://github.com/Theorvane/type-chain/tree/${sourceCommit}/docs`} target="_blank" rel="noopener noreferrer">Documentation source pinned to {sourceCommit.slice(0, 12)} <span className="sr-only">(opens in a new tab)</span></a></p>
      </article>
    </main>
  </>;
}
