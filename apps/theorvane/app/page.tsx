import { ExternalLink, SkipLink } from "@theorvane/ui";

import { AmbientWorld } from "../components/ambient-world";
import { EditorialCinematic } from "../components/editorial-cinematic";
import { EditorialHero } from "../components/editorial-hero";
import { ProductEditorial } from "../components/product-editorial";
import { SignalPassage } from "../components/signal-passage";

const siteUrl = "https://theorvane.tech/";
const github = "https://github.com/Theorvane";
const typeMcp = "https://typemcp.theorvane.tech/";
const typeChain = "https://typechain.theorvane.tech/";
const openVideo = "https://open-video.app/";

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
		href: openVideo,
		icon: "/products/openvideo.svg",
		iconAlt: "OpenVideo official product mark",
		name: "OpenVideo",
		number: "03",
		signal: "Local workflow",
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
		<header className="shell">
			<a className="wordmark" href="#top">THEORVANE<span>®</span></a>
			<nav aria-label="Primary"><a href="#products">Projects</a><a href="#principles">Principles</a><ExternalLink href={github}>GitHub organization ↗</ExternalLink></nav>
		</header>
		<main id="main-content">
			<AmbientWorld />
			<EditorialCinematic />
			<EditorialHero>
				<p className="eyebrow">Independent software studio · Seoul / internet</p>
				<h1>Precise tools for<br /><em>the AI-native web.</em></h1>
				<p className="lede">We make small, durable developer products for teams that care about explicit contracts, inspectable systems, and work that lasts.</p>
				<div className="actions"><a className="button primary" href="#products">Explore products</a><ExternalLink className="button" href={github}>GitHub organization ↗</ExternalLink></div>
			</EditorialHero>
			<section className="signals shell" aria-label="What Theorvane values"><p>TypeScript-first</p><p>Protocol-aware</p><p>Open-source</p></section>
			<SignalPassage />
			<section className="products shell" id="products">
				<p className="eyebrow">01 / Product index</p><h2>Choose a focused tool.</h2>
				<ProductEditorial products={products} />
			</section>
			<section className="feature shell">
				<p className="eyebrow">02 / Proof in the interface</p><div className="feature-grid"><div><h2>Make the boundary visible.</h2><p>Each product exposes a narrow, inspectable surface instead of asking teams to trust an opaque platform.</p><a href="#principles">Read our principles ↓</a></div><pre aria-label="Theorvane product boundary preview"><code>{`DECLARE  →  VERIFY  →  INTEGRATE

Keep critical ownership in your application.`}</code></pre></div>
			</section>
			<section className="principles shell" id="principles"><p className="eyebrow">03 / How we work</p><div className="principle-grid"><article><h2>Framework-neutral</h2><p>Runtime cores should stay portable. Integrations belong at the edges.</p></article><article><h2>Explicit by default</h2><p>Good developer tools make contracts visible, typed, and easy to verify.</p></article><article><h2>Small, proven releases</h2><p>We prefer a narrow surface area backed by real checks over an ambitious promise.</p></article></div></section>
			<section className="start shell"><p className="eyebrow">04 / Start with the right boundary</p><h2>Explore the products.<br />Keep the system yours.</h2><a className="button primary" href="#products">Explore products</a></section>
		</main>
		<footer className="studio-footer"><div className="shell studio-footer__grid"><div><a className="wordmark" href="#top">THEORVANE<span>®</span></a><p>Independent software studio building small, durable developer products.</p></div><nav aria-label="Theorvane footer"><div><strong>Products</strong><ExternalLink href={typeMcp}>TypeMCP ↗</ExternalLink><ExternalLink href={typeChain}>TypeChain ↗</ExternalLink><ExternalLink href={openVideo}>OpenVideo ↗</ExternalLink></div><div><strong>Studio</strong><a href="#principles">Principles</a><ExternalLink href={github}>GitHub ↗</ExternalLink></div></nav></div><div className="shell studio-footer__legal"><span>© {new Date().getFullYear()} Theorvane.</span><span>Built with intent.</span></div></footer>
	</>;
}
