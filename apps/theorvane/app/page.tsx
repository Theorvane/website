import { ExternalLink, SkipLink } from "@theorvane/ui";

const siteUrl = "https://theorvane.tech/";
const github = "https://github.com/Theorvane";

const products = [
	{
		description: "Decorator-first TypeScript metadata declarations and immutable reads for application-owned MCP servers.",
		href: "https://typemcp.theorvane.tech/",
		icon: "/project-marks/typemcp.svg",
		name: "TypeMCP",
		number: "01",
		signal: "MCP contracts",
	},
	{
		description: "A type-safe authoring layer for LangChain JS tools and agents that keeps application ownership explicit.",
		href: "https://typechain.theorvane.tech/",
		icon: "/project-marks/typechain.svg",
		name: "TypeChain",
		number: "02",
		signal: "Typed agents",
	},
	{
		description: "A local-first video editor for recording, editing, and exporting without cloud accounts or analytics.",
		href: "https://open-video.app/",
		icon: "/project-marks/openvideo.svg",
		name: "OpenVideo",
		number: "03",
		signal: "Local video",
	},
] as const;

const principles = [
	["Framework-neutral", "Runtime cores should stay portable. Integrations belong at the edges where teams can inspect and own them."],
	["Explicit by default", "Good developer tools make contracts visible, typed, and easy to verify before they enter the rest of your system."],
	["Small, proven releases", "We favor a focused boundary backed by real checks over an ambitious platform-shaped promise."],
] as const;

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@id": `${siteUrl}#organization`,
			"@type": "Organization",
			description: "An open-source organization building focused developer tools.",
			name: "Theorvane",
			sameAs: [github],
			url: siteUrl,
		},
		{ "@id": `${siteUrl}#website`, "@type": "WebSite", name: "Theorvane", publisher: { "@id": `${siteUrl}#organization` }, url: siteUrl },
	],
};

export default function HomePage() {
	return (
		<>
			<SkipLink />
			<script data-testid="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
			<header className="site-header shell">
				<a className="brand" href="#top"><img alt="" aria-hidden="true" src="/project-marks/theorvane-icon.png" />THEORVANE</a>
				<nav aria-label="Primary" className="primary-nav">
					<details className="projects-menu">
						<summary>Projects <span aria-hidden="true">⌄</span></summary>
						<div className="projects-popover">
							{products.map((product) => <a href={product.href} key={product.name}><img alt="" src={product.icon} /><span><strong>{product.name}</strong><small>{product.signal}</small></span></a>)}
						</div>
					</details>
					<a href="#principles">Principles</a>
				</nav>
				<ExternalLink className="github-link" href={github}>GitHub ↗ <span className="wide-label">(opens in new tab)</span></ExternalLink>
			</header>
			<main id="main-content">
				<section className="hero" id="top">
					<div className="hero-grid" aria-hidden="true" />
					<div className="hero-aura" aria-hidden="true" />
					<div className="shell hero-content">
						<p className="eyebrow">Open-source developer tools</p>
						<h1>Make the boundary<br /><span>the advantage.</span></h1>
						<p className="lede">Theorvane builds focused tools for typed integrations and local-first work—designed to fit your application while you retain ownership of the system.</p>
						<div className="actions"><a className="button button-primary" href="#projects">Explore projects ↓</a><ExternalLink className="button" href={github}>View GitHub ↗</ExternalLink></div>
					</div>
					<div className="hero-mark" aria-hidden="true"><img alt="" src="/project-marks/theorvane-icon.png" /></div>
					<p className="scroll-cue" aria-hidden="true"><span />Scroll to explore</p>
				</section>
				<section className="marquee" aria-label="Theorvane focus"><div><span>Local-first workflows</span><b>◆</b><span>Application ownership</span><b>◆</b><span>Type-safe systems</span><b>◆</b><span>Explicit contracts</span><b>◆</b><span>Local-first workflows</span></div></section>
				<section className="project-index shell" id="projects">
					<div className="section-intro"><div><p className="eyebrow">Independent projects</p><h2>Three tools.<br />One clear posture.</h2></div><p>Each project owns its public site, documentation, and source. Theorvane is the starting point for choosing the right boundary—not another platform layer in your stack.</p></div>
					<div className="project-grid">
						{products.map((product) => <article className={`project-card project-card-${product.number}`} key={product.name}>
							<p className="product-label">{product.number} / {product.signal}</p><h3>{product.name}</h3><p className="product-description">{product.description}</p><ExternalLink className="project-link" href={product.href}>Explore {product.name} ↗</ExternalLink><div className="project-mark"><img alt="" src={product.icon} /></div>
						</article>)}
					</div>
				</section>
				<section className="commitments" id="principles"><div className="shell"><div className="commitments-heading"><div><p className="eyebrow">How we work</p><h2>Technical commitments,<br />not platform promises.</h2></div><p>We prefer a narrow surface area with real checks over a broad promise that asks teams to trust an opaque layer.</p></div><div className="principle-list">{principles.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
				<section className="source shell"><div><p className="eyebrow">Source available</p><h2>Inspect the work.<br />Then choose a project.</h2></div><p>The GitHub organization is the shared public record for Theorvane projects and their evolution.</p><ExternalLink className="button button-primary" href={github}>GitHub organization ↗</ExternalLink></section>
			</main>
			<footer className="site-footer shell"><p>© {new Date().getFullYear()} Theorvane</p><p>Open source by default</p></footer>
		</>
	);
}
