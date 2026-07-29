import { ExternalLink, ScrollWorld, SkipLink } from "@theorvane/ui";

import { BoundaryAtlasStage } from "../components/boundary-atlas-stage";
import { VideoHero } from "../components/video-hero";
import { theorvaneScrollWorld } from "../lib/scroll-world-manifest";

const siteUrl = "https://theorvane.tech/";
const github = "https://github.com/Theorvane";
const typeMcp = "https://typemcp.theorvane.tech/";
const typeChain = "https://typechain.theorvane.tech/";
const openVideo = "https://openvideo.theorvane.tech/";

const products = [
	["01", "TypeMCP", "A decorator-first TypeScript toolkit for MCP metadata declarations and immutable reads.", "MCP contracts", typeMcp],
	["02", "TypeChain", "A decorator-first, type-safe authoring layer for LangChain JS tools and agents. It keeps schemas and integration boundaries explicit while applications retain ownership of models, credentials, policy enforcement, and deployment.", "Typed tools", typeChain],
	["03", "OpenVideo", "A local-first, open-source video editor for recording, editing, and exporting footage on your device. No cloud uploads, accounts, or analytics.", "Local workflow", openVideo],
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
			<VideoHero poster="/scroll-world/desktop/studio-beacon-poster.webp" src="/scroll-world/desktop/studio-beacon.mp4" />
			<section className="hero shell" id="top">
				<p className="eyebrow">Independent software studio · Seoul / internet</p>
				<h1>Precise tools for<br /><em>the AI-native web.</em></h1>
				<p className="lede">We make small, durable developer products for teams that care about explicit contracts, inspectable systems, and work that lasts.</p>
				<div className="actions"><a className="button primary" href="#products">Explore products</a><ExternalLink className="button" href={github}>GitHub organization ↗</ExternalLink></div>
			</section>
			<section className="signals shell" aria-label="What Theorvane values"><p>TypeScript-first</p><p>Protocol-aware</p><p>Open-source</p></section>
			<ScrollWorld manifest={theorvaneScrollWorld}>
				<section className="world-intro shell">
					<p className="eyebrow">A five-scene product passage</p>
					<h2>One studio. Clearer boundaries.</h2>
					<p>Move through the work without giving up the written map: every scene has a destination, and every product keeps its own surface explicit.</p>
				</section>
				<ol className="world-story shell">
					<li id="studio-beacon"><p className="eyebrow">Scene 01 / Boundary Atlas</p><h3>Three surfaces. Explicit junctions.</h3><p>TypeMCP, TypeChain, and OpenVideo stay independent. Connect only at the point your system requires—without turning a focused tool into an opaque platform.</p><BoundaryAtlasStage /><a href="#products">Explore the product index ↓</a></li>
					<li id="typemcp-contract-island"><p className="eyebrow">Scene 02 / TypeMCP</p><h3>Declare the contract.</h3><p>TypeMCP makes MCP declarations and immutable read shapes inspectable, while your application owns runtime policy and deployment.</p><ExternalLink href={typeMcp}>Visit TypeMCP site ↗</ExternalLink></li>
					<li id="typechain-composition-island"><p className="eyebrow">Scene 03 / TypeChain</p><h3>Compose at the edge.</h3><p>TypeChain offers typed tool and agent authoring boundaries. Models, credentials, policy decisions, state, and hosting remain yours.</p><ExternalLink href={typeChain}>Visit TypeChain site ↗</ExternalLink></li>
					<li id="openvideo-local-studio"><p className="eyebrow">Scene 04 / OpenVideo</p><h3>Keep the edit local.</h3><p>OpenVideo records, edits, and exports on your device—without cloud uploads, accounts, or analytics.</p><ExternalLink href={openVideo}>Visit OpenVideo site ↗</ExternalLink></li>
					<li id="product-constellation"><p className="eyebrow">Scene 05</p><h3>Return with the system still yours.</h3><p>Browse the focused products, inspect their public boundaries, and integrate only what your team needs.</p><a className="button primary" href="#products">Explore products</a></li>
				</ol>
			</ScrollWorld>
			<section className="products shell" id="products">
				<p className="eyebrow">01 / Product index</p><h2>Choose a focused tool.</h2>
				<div className="product-grid">{products.map(([number, name, description, signal, href]) => <article key={name} className="product-card"><p className="eyebrow">{number} / {signal}</p><h3>{name}</h3><p>{description}</p><ExternalLink href={href}>Explore {name} ↗</ExternalLink></article>)}</div>
			</section>
			<section className="feature shell">
				<p className="eyebrow">02 / Proof in the interface</p><div className="feature-grid"><div><h2>Make the boundary visible.</h2><p>Each product exposes a narrow, inspectable surface instead of asking teams to trust an opaque platform.</p><a href="#principles">Read our principles ↓</a></div><pre aria-label="Theorvane product boundary preview"><code>{`DECLARE  →  VERIFY  →  INTEGRATE

Keep critical ownership in your application.`}</code></pre></div>
			</section>
			<section className="principles shell" id="principles"><p className="eyebrow">03 / How we work</p><div className="principle-grid"><article><h2>Framework-neutral</h2><p>Runtime cores should stay portable. Integrations belong at the edges.</p></article><article><h2>Explicit by default</h2><p>Good developer tools make contracts visible, typed, and easy to verify.</p></article><article><h2>Small, proven releases</h2><p>We prefer a narrow surface area backed by real checks over an ambitious promise.</p></article></div></section>
			<section className="start shell"><p className="eyebrow">04 / Start with the right boundary</p><h2>Explore the products.<br />Keep the system yours.</h2><a className="button primary" href="#products">Explore products</a></section>
		</main>
		<footer className="shell"><p>© {new Date().getFullYear()} Theorvane. Built with intent.</p><ExternalLink href={github}>GitHub organization ↗</ExternalLink></footer>
	</>;
}
