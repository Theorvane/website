import { ExternalLink, SkipLink } from "@theorvane/ui";

const siteUrl = "https://typechain.theorvane.tech/";
const github = "https://github.com/Theorvane/type-chain";
const npm = "https://www.npmjs.com/package/@theorvane/type-chain";

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{ "@type": "SoftwareSourceCode", "@id": `${siteUrl}#package`, name: "TypeChain", url: siteUrl, description: "Decorator-first, type-safe authoring for LangChain JS tools and agents, with model choice, credentials, policy, and deployment left to the application.", codeRepository: github, programmingLanguage: "TypeScript", runtimePlatform: "Node.js", license: "https://opensource.org/licenses/MIT", isAccessibleForFree: true, sameAs: npm, author: { "@id": "https://theorvane.tech/#organization" } },
		{ "@type": "WebSite", "@id": `${siteUrl}#website`, name: "TypeChain", url: siteUrl, inLanguage: "en", publisher: { "@id": "https://theorvane.tech/#organization" } },
	],
};
const stages = [["01", "Declare", "Use Stage 3 decorators to place names, descriptions, and schemas beside real methods."], ["02", "Define", "Read immutable, receiver-bound definitions without hiding the contract."], ["03", "Adapt", "Create LangChain tools or use the in-process TypeMCP bridge through focused adapters."], ["04", "Own", "Keep models, credentials, authorization, policy, state, hosting, and deployment in the application."]] as const;

export default function HomePage() {
	return <><SkipLink />
		<script data-testid="typechain-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="shell"><a className="logo" href="#top"><img className="logo__mark" src="/logo.svg" alt="" width="22" height="22" />TYPE<span>CHAIN</span></a><nav aria-label="Primary"><a href="#tools">Flow</a><a href="#boundaries">Boundaries</a><a href="/docs">Documentation</a><ExternalLink className="nav-cta" href={github}>GitHub ↗</ExternalLink></nav></header>
		<main className="product-surface product-surface--typechain" data-testid="typechain-ownership-surface" id="main-content"><section className="hero shell" id="top"><div><p className="eyebrow">TypeScript · LangChain · Stage 3 decorators</p><h1>Typed tools.<br /><em>Explicit boundaries.</em></h1><p>Published <code>@theorvane/type-chain@0.1.1</code> makes LangChain JS tools and agents easier to author without hiding schemas, policy, or application ownership.</p><div className="actions"><a className="button primary" href="/docs">Read documentation</a><a className="button" href="/docs/getting-started">Getting started</a><ExternalLink className="button" href={npm}>npm package ↗</ExternalLink></div></div><pre><code>{`@Tool({ name: "find_product",
  description: "Find a product.",
  schema: z.object({ id: z.string() })
})
findProduct({ id }: { id: string }) {
  return catalog.get(id);
}`}</code></pre></section>
			<section className="evidence-panel shell" aria-label="Ownership map"><div><p className="eyebrow">Ownership map</p><h2>Tools that fit.<br />Ownership stays.</h2><p>Integration is explicit without transferring runtime authority from your application.</p></div><aside><img src="/logo.svg" alt="TypeChain" width="64" height="64" /><dl><div><dt>TypeChain</dt><dd>Tool metadata</dd></div><div><dt>Adapter</dt><dd>Framework bridge</dd></div><div><dt>Your app</dt><dd>Runtime authority</dd></div></dl></aside></section>
			<section className="capabilities shell" id="tools" aria-label="TypeChain ownership flow">{stages.map(([number, title, description]) => <article key={title}><b>{number}</b><h2>{title}</h2><p>{description}</p></article>)}</section>
			<section className="architecture shell" id="boundaries"><p className="eyebrow">Runtime boundary</p><h2>Metadata in.<br />Ownership stays out.</h2><ol>{stages.map(([number, title, description]) => <li key={title}><span>{number}</span><strong>{title}</strong> — {description}</li>)}</ol></section>
			<section className="start shell"><p className="eyebrow">Get started</p><h2>Start with a tool.<br />Keep the system yours.</h2><div className="actions"><a className="button primary" href="/docs/getting-started">Getting started</a><ExternalLink className="button" href={github}>View source ↗</ExternalLink></div></section></main>
		<footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><a className="logo" href="#top"><img className="logo__mark" src="/logo.svg" alt="" width="22" height="22" />TYPE<span>CHAIN</span></a><p>Decorator-first, type-safe authoring for LangChain tools and agents.</p></div><nav aria-label="TypeChain footer" className="footer-nav"><div><strong>Explore</strong><a href="/docs">Documentation</a><a href="/docs/getting-started">Getting started</a></div><div><strong>Project</strong><ExternalLink href={github}>GitHub ↗</ExternalLink><ExternalLink href={npm}>npm ↗</ExternalLink></div><div><strong>Company</strong><ExternalLink href="https://theorvane.tech/">Theorvane ↗</ExternalLink></div></nav></div><div className="shell footer-legal"><span>© 2026 Theorvane. TypeChain is open source.</span><span>Typed tools. Explicit boundaries.</span></div></footer>
	</>;
}
