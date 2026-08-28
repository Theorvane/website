import { ExternalLink, SkipLink } from "@theorvane/ui";

const github = "https://github.com/Theorvane/proxmox-mcp";
const studio = "https://theorvane.tech/";
const typemcp = "https://typemcp.theorvane.tech/";
const siteUrl = "https://proxmox.theorvane.tech/";

const features = [
	{
		number: "01",
		title: "Mutations stay behind a gate",
		body: "Start, stop, snapshot, delete — every write is gated behind an explicit confirmation and a dry-run that shows what would change, so an agent can never mutate a host on a hunch.",
	},
	{
		number: "02",
		title: "A typed MCP contract",
		body: "Built on TypeMCP's decorator-first typed contracts, every tool has a declared shape and a declared boundary. No hand-rolled JSON, no raw API surface leaking through.",
	},
	{
		number: "03",
		title: "Read and write, cleanly separated",
		body: "Reads — nodes, VMs, containers, status — stay open and fast. Writes are a separate, named class of operation, and every one of them lands in an auditable log.",
	},
	{
		number: "04",
		title: "Works with any MCP client",
		body: "Point any MCP-compatible client at it — an autonomous agent, an assistant, your own tooling. The same gated contract governs all of them the same way.",
	},
] as const;

const boundaries = [
	{ title: "Read operations", body: "List nodes, VMs, and containers and read status — open, no confirmation needed." },
	{ title: "Gated mutations", body: "Start, stop, and snapshot require an explicit confirmation before they run." },
	{ title: "Dry-run first", body: "Preview the exact changes a write would make before committing to it." },
	{ title: "Audit log", body: "Every mutating call is recorded — who asked, what ran, what changed." },
] as const;

const schema = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "Proxmox MCP",
	url: siteUrl,
	applicationCategory: "DeveloperApplication",
	operatingSystem: "Linux, macOS, Windows",
	description: "A safety-gated Model Context Protocol server for the Proxmox VE API, exposing reads openly while keeping every mutating operation behind explicit, auditable boundaries.",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	publisher: { "@type": "Organization", name: "Theorvane", url: studio },
};

export default function HomePage() {
	return <>
		<SkipLink />
		<script data-testid="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="site-header shell">
			<a className="wordmark" href="#top">PROXMOX<span>·MCP</span></a>
			<nav aria-label="Primary"><a href="#features">Features</a><a href="#boundaries">Boundaries</a><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink className="button ghost" href={github}>GitHub ↗</ExternalLink></nav>
		</header>
		<main id="main-content">
			<section className="hero" data-testid="proxmox-hero" id="top">
				<div className="shell hero__grid">
					<div className="hero__copy">
						<p className="eyebrow">Safety-gated MCP server · Proxmox VE</p>
						<h1>Proxmox, <em>behind a safety gate.</em></h1>
						<p className="lede">Proxmox MCP lets an AI agent operate a Proxmox VE host — list nodes, read status, snapshot, start and stop — but every mutating call stays behind an explicit, auditable boundary instead of raw API access.</p>
						<div className="actions"><ExternalLink className="button primary" href={github}>Get Proxmox MCP ↗</ExternalLink><a className="button" href="#features">See how it gates</a></div>
						<p className="hero__meta">Reads open · writes gated · built on TypeMCP</p>
					</div>
					<div aria-hidden="true" className="hero__panel">
						<div className="hero__panel-bar"><span /><span /><span /></div>
						<div className="hero__call"><p className="hero__call-label">MCP tool call · vm.stop</p><h2>Requires confirmation</h2><div className="hero__call-meta"><span className="pill pill--gate">Gated</span><span className="pill pill--read">dry-run available</span><span>node1 / 108</span></div></div>
						<div className="hero__log"><span><span className="dot dot--gate" />vm.stop node1/108 — confirm to proceed</span><span><span className="dot dot--run" />vm.snapshot — dry-run: 1 change planned</span><span><span className="dot dot--ok" />node.status node1 — online · 42% mem</span></div>
					</div>
				</div>
			</section>

			<section className="features shell" id="features">
				<div className="section-intro"><p className="eyebrow">What it does / 01</p><h2>Full control,<br /><em>never raw access.</em></h2><p>Proxmox MCP is a boundary, not a passthrough. Reads flow freely; every mutation is named, previewable, confirmed, and logged.</p></div>
				<div className="feature-grid">
					{features.map((feature) => (
						<article className="feature" key={feature.number}>
							<span className="feature__num">{feature.number}</span>
							<h3>{feature.title}</h3>
							<p>{feature.body}</p>
						</article>
					))}
				</div>
			</section>

			<section className="boundaries shell" id="boundaries">
				<div className="section-intro"><p className="eyebrow">Where the line is / 02</p><h2>Reads open.<br /><em>Writes gated.</em></h2><p>The whole design is one boundary drawn on purpose: what an agent can see, and what it must ask before it does.</p></div>
				<ul className="boundary-rail" aria-label="Safety boundaries">{boundaries.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.body}</span></li>)}</ul>
			</section>

			<section className="close"><div className="shell close__grid"><p className="eyebrow">Open source · MIT</p><h2>Give an agent Proxmox, not the keys.</h2><div><ExternalLink className="button primary" href={github}>Get Proxmox MCP ↗</ExternalLink><p>A Theorvane product · built on TypeMCP</p></div></div></section>
		</main>
		<footer className="site-footer"><div className="shell site-footer__grid"><div><a className="wordmark" href="#top">PROXMOX<span>·MCP</span></a><p>A safety-gated MCP server for the Proxmox VE API, from Theorvane.</p></div><nav aria-label="Footer"><div><strong>Proxmox MCP</strong><a href="#features">Features</a><a href="#boundaries">Boundaries</a><ExternalLink href={github}>Source ↗</ExternalLink></div><div><strong>Studio</strong><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink href={typemcp}>TypeMCP ↗</ExternalLink></div></nav></div><div className="shell site-footer__legal"><span>© {new Date().getFullYear()} Theorvane.</span><span>Built with intent.</span></div></footer>
	</>;
}
