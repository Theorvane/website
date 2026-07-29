import { ExternalLink, SkipLink } from "@theorvane/ui";

const github = "https://github.com/Theorvane/type-mcp";
const npm = "https://www.npmjs.com/package/@theorvane/type-mcp";
const stages = [["01", "Declare", "Place MCP intent and structured schemas beside the TypeScript methods they describe."], ["02", "Validate", "Check definitions before runtime compilation so contracts are inspectable."], ["03", "Compile", "Build the official MCP SDK surface through explicit instance resolution."], ["04", "Host", "Connect stdio or Streamable HTTP at the application edge, where hosting and authorization remain yours."]] as const;

export default function HomePage() {
	return <>
		<SkipLink />
		<header className="shell"><a className="logo" href="#top">type<span>mcp</span></a><nav aria-label="Primary"><a href="#flow">Flow</a><a href="#architecture">Architecture</a><a href="/docs">Documentation</a><a href="#integrations">Integrations</a><ExternalLink className="nav-cta" href={github}>View on GitHub ↗</ExternalLink></nav></header>
		<main id="main-content">
			<section className="hero shell" id="top"><div><p className="eyebrow">TypeScript · MCP · Explicit contracts</p><h1>Decorator-first MCP.<br /><em>Built for boundaries.</em></h1><p>Published <code>@theorvane/type-mcp@0.2.0</code> turns strict TypeScript declarations into a validated runtime, while applications retain ownership of hosting and policy.</p><div className="actions"><a className="button primary" href="/docs">Read documentation</a><ExternalLink className="button" href={github}>View on GitHub ↗</ExternalLink><ExternalLink className="button" href={npm}>npm package ↗</ExternalLink></div></div><pre><code>{`import { z } from "zod";
import { McpServer, McpTool } from "@theorvane/type-mcp";

@McpServer({ name: "catalog", version: "0.2.0" })
class CatalogTools {
  @McpTool({ input: z.object({ id: z.string() }) })
  findProduct({ id }: { id: string }) { return { id, available: true }; }
}`}</code></pre></section>
			<section className="capabilities shell" id="flow" aria-label="TypeMCP compilation flow">{stages.map(([number, title, description]) => <article key={title}><b>{number}</b><h2>{title}</h2><p>{description}</p></article>)}</section>
			<section className="architecture shell" id="architecture"><p className="eyebrow">Architecture</p><h2>Declarations in.<br />MCP surfaces out.</h2><ol>{stages.map(([number, title, description]) => <li key={title}><span>{number}</span><strong>{title}</strong> — {description}</li>)}</ol></section>
			<section className="integration" id="integrations"><div className="shell integration-content"><p className="eyebrow">Integration boundary</p><div className="integration-grid"><div><h2>Tools in. Graphs stay yours.</h2><p><code>@theorvane/type-mcp/langchain</code> is a tools-only adapter that converts decorated MCP tools to LangChain tools backed by structured schemas.</p><p>Use those tools with a consumer-owned LangGraph <code>ToolNode</code>. Your application owns graph topology, model choice, authorization, state, persistence, and deployment.</p></div><aside><strong>Release boundary</strong><p>Published <code>@theorvane/type-mcp@0.2.0</code> provides the validated runtime, stdio, Streamable HTTP, and the tools-only LangChain adapter. TypeMCP does not own LangGraph topology, models, authorization, state, persistence, or deployment.</p><a href="/docs/guides/langchain-langgraph">Read the LangChain &amp; LangGraph guide →</a></aside></div></div></section>
			<section className="start shell"><p className="eyebrow">Get started</p><h2>Read the contract.<br />Start with a tool.</h2><div className="actions"><a className="button primary" href="/docs">Read documentation</a><ExternalLink className="button" href={npm}>npm package ↗</ExternalLink></div></section>
		</main>
		<footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><a className="logo" href="#top">type<span>mcp</span></a><p>Strict TypeScript MCP runtime for explicit server contracts.</p></div><nav aria-label="TypeMCP footer" className="footer-nav"><div><strong>Explore</strong><a href="/docs">Documentation</a><a href="#architecture">Architecture</a></div><div><strong>Project</strong><ExternalLink href={github}>GitHub ↗</ExternalLink><ExternalLink href={npm}>npm ↗</ExternalLink></div><div><strong>Company</strong><ExternalLink href="https://theorvane.tech/">Theorvane ↗</ExternalLink></div></nav></div><div className="shell footer-legal"><span>© 2026 Theorvane. TypeMCP is open source.</span><span>Built with explicit boundaries.</span></div></footer>
	</>;
}
