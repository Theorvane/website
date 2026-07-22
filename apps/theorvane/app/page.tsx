import { ExternalLink, SkipLink } from "@theorvane/ui";

const siteUrl = "https://theorvane.tech/";
const github = "https://github.com/Theorvane";
const typeMcp = "https://github.com/Theorvane/type-mcp";

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${siteUrl}#organization`,
			name: "Theorvane",
			url: siteUrl,
			description: "Independent software studio building focused, verifiable developer tools.",
			sameAs: [github],
		},
		{
			"@type": "WebSite",
			"@id": `${siteUrl}#website`,
			name: "Theorvane",
			url: siteUrl,
			publisher: { "@id": `${siteUrl}#organization` },
		},
	],
};

export default function HomePage() {
	return <><SkipLink /><script data-testid="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><header className="shell"><a className="wordmark" href="#top">THEORVANE<span>®</span></a><nav aria-label="Primary"><a href="#projects">Projects</a><a href="#principles">Principles</a><ExternalLink href={github}>GitHub organization ↗</ExternalLink></nav></header><main id="main-content"><section className="hero shell" id="top"><p className="eyebrow">Independent software studio · Seoul / internet</p><h1>Precise tools for<br/><em>the AI-native web.</em></h1><p className="lede">We make small, durable developer products for teams that care about explicit contracts, inspectable systems, and work that lasts.</p><div className="actions"><ExternalLink className="button primary" href={typeMcp}>Explore TypeMCP ↗</ExternalLink><ExternalLink className="button" href={github}>GitHub organization ↗</ExternalLink></div></section><section className="signals shell" aria-label="What Theorvane values"><p>TypeScript-first</p><p>Protocol-aware</p><p>Open-source</p></section><section className="feature shell" id="projects"><p className="eyebrow">01 / Featured project</p><div className="feature-grid"><div><h2>TypeMCP</h2><p>A decorator-first TypeScript toolkit for MCP metadata declarations and immutable reads.</p><ExternalLink href={typeMcp}>View the project ↗</ExternalLink></div><pre aria-label="TypeMCP code preview"><code>{`@McpTool({ name: "status" })
status() {
  return { ready: true };
}`}</code></pre></div></section><section className="principles shell" id="principles"><p className="eyebrow">02 / How we work</p><div className="principle-grid"><article><h2>Framework-neutral</h2><p>Runtime cores should stay portable. Integrations belong at the edges.</p></article><article><h2>Explicit by default</h2><p>Good developer tools make contracts visible, typed, and easy to verify.</p></article><article><h2>Small, proven releases</h2><p>We prefer a narrow surface area backed by real checks over an ambitious promise.</p></article></div></section></main><footer className="shell"><p>© {new Date().getFullYear()} Theorvane. Built with intent.</p><ExternalLink href={github}>GitHub organization ↗</ExternalLink></footer></>;
}
