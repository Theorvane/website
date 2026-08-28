import { ExternalLink, SkipLink } from "@theorvane/ui";

import { ProductEditorial } from "../components/product-editorial";

const siteUrl = "https://theorvane.tech/";
const github = "https://github.com/Theorvane";
const typeMcp = "https://typemcp.theorvane.tech/";
const typeChain = "https://typechain.theorvane.tech/";
const openScene = "https://openscene.app/";
const labFox = "https://labfox.theorvane.tech/";
const planGuard = "https://planguard.theorvane.tech/";
const proxmoxMcp = "https://proxmox.theorvane.tech/";

const products = [
	{
		description: "A decorator-first TypeScript toolkit for MCP metadata declarations and immutable reads.",
		href: typeMcp,
		icon: "/products/typemcp.svg",
		iconAlt: "TypeMCP official product mark",
		name: "TypeMCP",
		number: "01",
		signal: "MCP contracts",
	},
	{
		description: "A decorator-first, type-safe authoring layer for LangChain JS tools and agents. It keeps schemas and integration boundaries explicit while applications retain ownership of models, credentials, policy enforcement, and deployment.",
		href: typeChain,
		icon: "/products/typechain.svg",
		iconAlt: "TypeChain official product mark",
		name: "TypeChain",
		number: "02",
		signal: "Typed tools",
	},
	{
		description: "A local-first, open-source video editor for recording, editing, and exporting footage on your device. No cloud uploads, accounts, or analytics.",
		href: openScene,
		icon: "/products/openscene.svg",
		iconAlt: "OpenScene official product mark",
		name: "OpenScene",
		number: "03",
		signal: "Local workflow",
	},
	{
		description: "A cross-platform GitLab workflow client for merge requests, code review, and CI/CD—on Android, iOS, Windows, and macOS, with self-hosted support.",
		href: labFox,
		icon: "/products/labfox.svg",
		iconAlt: "LabFox official product mark",
		name: "LabFox",
		number: "04",
		signal: "GitLab client",
	},
	{
		description: "An AI-assisted review platform for Terraform pull requests. It surfaces the real risk in an infrastructure change before it merges, and leaves the apply in your hands.",
		href: planGuard,
		icon: "/products/planguard.svg",
		iconAlt: "PlanGuard official product mark",
		name: "PlanGuard",
		number: "05",
		signal: "Infra review",
	},
	{
		description: "A safety-gated TypeMCP server for the Proxmox VE API. It exposes virtualization operations behind explicit, auditable boundaries instead of raw access.",
		href: proxmoxMcp,
		icon: "/products/proxmox-mcp.svg",
		iconAlt: "Proxmox MCP official product mark",
		name: "Proxmox MCP",
		number: "06",
		signal: "Safety-gated MCP",
	},
] as const;

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{ "@type": "Organization", "@id": `${siteUrl}#organization`, name: "Theorvane", url: siteUrl, description: "Independent software studio building focused, verifiable developer tools.", sameAs: [github] },
		{ "@type": "WebSite", "@id": `${siteUrl}#website`, name: "Theorvane", url: siteUrl, publisher: { "@id": `${siteUrl}#organization` } },
	],
};

export default function HomePage() {
	return <>
		<SkipLink />
		<script data-testid="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="site-header shell">
			<a className="wordmark" href="#top">THEORVANE<span>®</span></a>
			<nav aria-label="Primary"><a href="#products">Products</a><a href="#system">System</a><a href="#principles">Principles</a><ExternalLink href={github}>GitHub ↗</ExternalLink></nav>
		</header>
		<main id="main-content">
			<section className="studio-hero" data-testid="theorvane-studio-hero" id="top">
				<div className="shell studio-hero__grid">
					<div className="studio-hero__copy">
						<p className="eyebrow">Independent software studio · Seoul / internet</p>
						<h1>Precise tools for<br /><em>the AI-native web.</em></h1>
						<p className="lede">A focused collection of developer products for explicit contracts, inspectable systems, and work that lasts.</p>
						<div className="actions"><a className="button primary" href="#products">Explore products</a><ExternalLink className="button" href={github}>GitHub organization ↗</ExternalLink></div>
					</div>
					<div aria-hidden="true" className="studio-orbit">
						<div className="studio-orbit__axis" />
						<div className="studio-orbit__core"><span>T</span></div>
						<div className="studio-orbit__node studio-orbit__node--mcp"><img alt="" src="/products/typemcp.svg" /></div>
						<div className="studio-orbit__node studio-orbit__node--chain"><img alt="" src="/products/typechain.svg" /></div>
						<div className="studio-orbit__node studio-orbit__node--scene"><img alt="" src="/products/openscene.svg" /></div>
						<div className="studio-orbit__node studio-orbit__node--fox"><img alt="" src="/products/labfox.svg" /></div>
						<div className="studio-orbit__node studio-orbit__node--guard"><img alt="" src="/products/planguard.svg" /></div>
						<div className="studio-orbit__node studio-orbit__node--proxmox"><img alt="" src="/products/proxmox-mcp.svg" /></div>
						<p>THE SYSTEM STAYS YOURS</p>
					</div>
				</div>
			</section>

			<section aria-label="Theorvane studio system" className="studio-system" id="system">
				<div className="shell">
					<div className="section-intro"><p className="eyebrow">Studio system / 01</p><h2>Tools with clear<br /><em>boundaries.</em></h2><p>We build the narrow layer that makes an important boundary legible—then leave the application, policy, credentials, and deployment in your hands.</p></div>
					<div className="system-rail" aria-label="Theorvane development system"><span>Declare</span><i aria-hidden="true" /><span>Verify</span><i aria-hidden="true" /><span>Integrate</span><i aria-hidden="true" /><span>Own</span></div>
				</div>
			</section>

			<section className="products shell" id="products">
				<div className="products__heading"><p className="eyebrow">Product index / 02</p><h2>Choose a focused tool.</h2><p>Six products. Six concrete boundaries. No platform-shaped abstraction around them.</p></div>
				<ProductEditorial products={products} />
			</section>

			<section className="principles shell" id="principles">
				<div className="principles__heading"><p className="eyebrow">Principles / 03</p><h2>Small surfaces.<br />Durable consequences.</h2></div>
				<div className="principle-grid"><article><span>01</span><h3>Framework-neutral</h3><p>Runtime cores should stay portable. Integrations belong at the edges.</p></article><article><span>02</span><h3>Explicit by default</h3><p>Good developer tools make contracts visible, typed, and easy to verify.</p></article><article><span>03</span><h3>Small, proven releases</h3><p>We prefer a narrow surface area backed by real checks over an ambitious promise.</p></article></div>
			</section>

			<section className="studio-close"><div className="shell studio-close__grid"><p className="eyebrow">Theorvane / Open by default</p><h2>Explore the products.<br /><em>Keep the system yours.</em></h2><div><a className="button primary" href="#products">Explore products</a><p>TypeScript-first · Protocol-aware · Open-source</p></div></div></section>
		</main>
		<footer className="studio-footer"><div className="shell studio-footer__grid"><div><a className="wordmark" href="#top">THEORVANE<span>®</span></a><p>Independent software studio building small, durable developer products.</p></div><nav aria-label="Theorvane footer"><div><strong>Products</strong><ExternalLink href={typeMcp}>TypeMCP ↗</ExternalLink><ExternalLink href={typeChain}>TypeChain ↗</ExternalLink><ExternalLink href={openScene}>OpenScene ↗</ExternalLink><ExternalLink href={labFox}>LabFox ↗</ExternalLink><ExternalLink href={planGuard}>PlanGuard ↗</ExternalLink><ExternalLink href={proxmoxMcp}>Proxmox MCP ↗</ExternalLink></div><div><strong>Studio</strong><a href="#principles">Principles</a><ExternalLink href={github}>GitHub ↗</ExternalLink></div></nav></div><div className="shell studio-footer__legal"><span>© {new Date().getFullYear()} Theorvane.</span><span>Built with intent.</span></div></footer>
	</>;
}
