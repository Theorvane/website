import { ExternalLink, SkipLink } from "@theorvane/ui";

const github = "https://github.com/Theorvane/labfox";
const studio = "https://theorvane.tech/";
const siteUrl = "https://labfox.theorvane.tech/";

const features = [
	{
		number: "01",
		title: "Merge requests, reviewed in full",
		body: "Open, filter, and act on merge requests with threaded discussion, diffs, and approvals — the whole review loop, not a read-only mirror.",
	},
	{
		number: "02",
		title: "Pipelines you can actually watch",
		body: "Follow CI/CD jobs as they run, read logs inline, and retry or cancel a stage without leaving the request you were reviewing.",
	},
	{
		number: "03",
		title: "Self-hosted is first-class",
		body: "Point LabFox at gitlab.com or your own instance. Personal and project tokens stay on the device; nothing is proxied through us.",
	},
	{
		number: "04",
		title: "One client, every platform",
		body: "A single Flutter codebase ships a native-feeling app for Android, iOS, Windows, and macOS — the same workflow wherever you work.",
	},
] as const;

const platforms = ["Android", "iOS", "Windows", "macOS"] as const;

const schema = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "LabFox",
	url: siteUrl,
	applicationCategory: "DeveloperApplication",
	operatingSystem: "Android, iOS, Windows, macOS",
	description: "A cross-platform GitLab workflow client for merge requests, code review, and CI/CD, with first-class self-hosted support.",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	publisher: { "@type": "Organization", name: "Theorvane", url: studio },
};

export default function HomePage() {
	return <>
		<SkipLink />
		<script data-testid="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="site-header shell">
			<a className="wordmark" href="#top">LAB<span>FOX</span></a>
			<nav aria-label="Primary"><a href="#features">Features</a><a href="#platforms">Platforms</a><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink className="button ghost" href={github}>GitHub ↗</ExternalLink></nav>
		</header>
		<main id="main-content">
			<section className="hero" data-testid="labfox-hero" id="top">
				<div className="shell hero__grid">
					<div className="hero__copy">
						<p className="eyebrow">GitLab workflow client · cross-platform</p>
						<h1>Your GitLab, <em>in hand.</em></h1>
						<p className="lede">LabFox brings merge requests, code review, and pipelines to a fast, native app on every platform you carry — with self-hosted instances treated as first-class, not an afterthought.</p>
						<div className="actions"><ExternalLink className="button primary" href={github}>Get LabFox ↗</ExternalLink><a className="button" href="#features">See what it does</a></div>
						<p className="hero__meta">Android · iOS · Windows · macOS · self-hosted</p>
					</div>
					<div aria-hidden="true" className="hero__panel">
						<div className="hero__panel-bar"><span /><span /><span /></div>
						<div className="hero__mr"><p className="hero__mr-label">Merge request · !482</p><h2>Gate risky applies behind review</h2><div className="hero__mr-meta"><span className="pill pill--open">Open</span><span className="pill pill--pipe">Pipeline passed</span><span>3 approvals</span></div></div>
						<div className="hero__pipeline"><span className="dot dot--ok" />build<span className="dot dot--ok" />test<span className="dot dot--run" />deploy</div>
					</div>
				</div>
			</section>

			<section className="features shell" id="features">
				<div className="section-intro"><p className="eyebrow">What it does / 01</p><h2>The whole review loop,<br /><em>on your device.</em></h2><p>LabFox is a client, not a dashboard. Every action you take on the web — approve, comment, retry a job — you take here.</p></div>
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

			<section className="platforms shell" id="platforms">
				<div className="section-intro"><p className="eyebrow">Everywhere / 02</p><h2>One workflow.<br /><em>Every platform.</em></h2><p>Built on a single Flutter codebase so the app you learn on your phone is the app you use at your desk.</p></div>
				<ul className="platform-rail" aria-label="Supported platforms">{platforms.map((name) => <li key={name}>{name}</li>)}</ul>
			</section>

			<section className="close"><div className="shell close__grid"><p className="eyebrow">Open source · MIT</p><h2>Bring GitLab with you.</h2><div><ExternalLink className="button primary" href={github}>Get LabFox ↗</ExternalLink><p>A Theorvane product · your tokens stay yours</p></div></div></section>
		</main>
		<footer className="site-footer"><div className="shell site-footer__grid"><div><a className="wordmark" href="#top">LAB<span>FOX</span></a><p>A cross-platform GitLab workflow client from Theorvane.</p></div><nav aria-label="Footer"><div><strong>LabFox</strong><a href="#features">Features</a><a href="#platforms">Platforms</a><ExternalLink href={github}>Source ↗</ExternalLink></div><div><strong>Studio</strong><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink href="https://github.com/Theorvane">GitHub ↗</ExternalLink></div></nav></div><div className="shell site-footer__legal"><span>© {new Date().getFullYear()} Theorvane.</span><span>Built with intent.</span></div></footer>
	</>;
}
