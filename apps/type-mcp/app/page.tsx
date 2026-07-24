import { ExternalLink, SkipLink } from "@theorvane/ui";

const github = "https://github.com/Theorvane/type-mcp";
const npm = "https://www.npmjs.com/package/@theorvane/type-mcp";

export default function HomePage() {
  return <>
    <SkipLink />
    <header className="shell">
      <a className="logo" href="#top">type<span>mcp</span></a>
      <nav aria-label="Primary">
        <a href="#overview">Overview</a>
        <a href="#architecture">Architecture</a>
        <a href="/docs">Documentation</a>
        <a href="#integrations">Integrations</a>
        <ExternalLink className="nav-cta" href={github}>View on GitHub ↗</ExternalLink>
      </nav>
    </header>
    <main id="main-content">
      <section className="hero shell" id="top">
        <div>
          <p className="eyebrow">TypeScript · MCP · Explicit contracts</p>
          <h1>Decorator-first MCP.<br /><em>Built for boundaries.</em></h1>
          <p>Published <code>@theorvane/type-mcp@0.2.0</code> turns strict TypeScript declarations into a validated runtime, while applications retain ownership of hosting and policy.</p>
          <div className="actions">
            <ExternalLink className="button primary" href={github}>View on GitHub ↗</ExternalLink>
            <ExternalLink className="button" href={npm}>npm package ↗</ExternalLink>
          </div>
        </div>
        <pre><code>{`import { z } from "zod";
import { McpServer, McpTool } from "@theorvane/type-mcp";

@McpServer({ name: "catalog", version: "0.2.0" })
class CatalogTools {
  @McpTool({ input: z.object({ id: z.string() }) })
  findProduct({ id }: { id: string }) {
    return { id, available: true };
  }
}`}</code></pre>
      </section>
      <section className="capabilities shell" id="overview">
        <article><b>01</b><h2>Decorators → validation</h2><p>Declare intent close to your code, then validate definitions before compilation.</p></article>
        <article><b>02</b><h2>Explicit runtime</h2><p>Compile MCP server surfaces through an explicit instance resolver.</p></article>
        <article><b>03</b><h2>Transports at the edge</h2><p>Use stdio or Streamable HTTP where your application owns hosting and authorization.</p></article>
      </section>
      <section className="architecture shell" id="architecture">
        <p className="eyebrow">Architecture</p>
        <h2>Declarations in.<br />MCP surfaces out.</h2>
        <ol>
          <li><span>01</span> Decorated TypeScript class</li>
          <li><span>02</span> Validated definition and explicit instance resolution</li>
          <li><span>03</span> Official MCP SDK compilation</li>
          <li><span>04</span> Application-owned stdio or Streamable HTTP hosting</li>
        </ol>
      </section>
      <section className="integration" id="integrations">
        <div className="shell integration-content">
          <p className="eyebrow">Integration boundary</p>
          <div className="integration-grid">
            <div>
              <h2>Tools in. Graphs stay yours.</h2>
              <p><code>@theorvane/type-mcp/langchain</code> is a tools-only adapter that converts decorated MCP tools to LangChain tools backed by structured schemas.</p>
              <p>Use those tools with a consumer-owned LangGraph <code>ToolNode</code>. Your application owns graph topology, model choice, authorization, state, persistence, and deployment.</p>
            </div>
            <aside>
              <strong>Release boundary</strong>
              <p>Published <code>@theorvane/type-mcp@0.2.0</code> provides the validated runtime, stdio, Streamable HTTP, and the tools-only LangChain adapter. TypeMCP does not own LangGraph topology, models, authorization, state, persistence, or deployment.</p>
              <a href="/docs/guides/langchain-langgraph">Read the LangChain &amp; LangGraph guide →</a>
            </aside>
          </div>
        </div>
      </section>
      <section className="start shell">
        <p className="eyebrow">Get started</p>
        <h2>Inspect the source.<br />Start with a tool.</h2>
        <div className="actions">
          <ExternalLink className="button primary" href={github}>View on GitHub ↗</ExternalLink>
          <ExternalLink className="button" href={npm}>npm package ↗</ExternalLink>
        </div>
      </section>
    </main>
    <footer className="shell"><span>TypeMCP is open source by <ExternalLink href="https://github.com/Theorvane">Theorvane ↗</ExternalLink></span><ExternalLink href={github}>GitHub ↗</ExternalLink></footer>
  </>;
}
