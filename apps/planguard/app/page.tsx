import { ExternalLink, SkipLink } from "@theorvane/ui";

const github = "https://github.com/Theorvane/planguard";
const studio = "https://theorvane.tech/";
const siteUrl = "https://planguard.theorvane.tech/";

const features = [
	{
		number: "01",
		title: "The real risk, surfaced per PR",
		body: "PlanGuard reads the Terraform plan for every pull request and calls out what actually bites — destroys, forced replacements, IAM and network changes — before anyone hits merge.",
	},
	{
		number: "02",
		title: "The plan, explained in plain language",
		body: "No scrolling a thousand-line diff. Each change is summarised in words a reviewer can act on: what resource, what happens to it, and why it counts as risk.",
	},
	{
		number: "03",
		title: "Guardrails you configure",
		body: "Set the policies that matter to your team — block on destroys, flag public ingress, require a second reviewer past a blast-radius threshold — and PlanGuard enforces them on the PR.",
	},
	{
		number: "04",
		title: "You keep the apply",
		body: "PlanGuard reviews the change; it never holds your credentials and never runs terraform apply. The plan stays in your CI, the decision stays with your team.",
	},
] as const;

const checks = ["Destroys", "Forced replacements", "IAM & permission changes", "Blast radius"] as const;

const schema = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "PlanGuard",
	url: siteUrl,
	applicationCategory: "DeveloperApplication",
	operatingSystem: "Web, CI",
	description: "An AI-assisted infrastructure change review platform that reads the Terraform plan for a pull request and surfaces the real risk — destroys, replacements, permission and network changes — before it merges.",
	offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	publisher: { "@type": "Organization", name: "Theorvane", url: studio },
};

export default function HomePage() {
	return <>
		<SkipLink />
		<script data-testid="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="site-header shell">
			<a className="wordmark" href="#top">PLAN<span>GUARD</span></a>
			<nav aria-label="Primary"><a href="#features">Features</a><a href="#checks">What it checks</a><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink className="button ghost" href={github}>GitHub ↗</ExternalLink></nav>
		</header>
		<main id="main-content">
			<section className="hero" data-testid="planguard-hero" id="top">
				<div className="shell hero__grid">
					<div className="hero__copy">
						<p className="eyebrow">Terraform change review · pull requests</p>
						<h1>Know the blast radius <em>before you apply.</em></h1>
						<p className="lede">PlanGuard reads the Terraform plan on every pull request and surfaces the real risk in the change — destroys, replacements, permission and network shifts — before it merges. It reviews the change; you keep the apply.</p>
						<div className="actions"><ExternalLink className="button primary" href={github}>Get PlanGuard ↗</ExternalLink><a className="button" href="#features">See what it does</a></div>
						<p className="hero__meta">Terraform · pull requests · your CI · your credentials</p>
					</div>
					<div aria-hidden="true" className="hero__panel">
						<div className="hero__panel-bar"><span /><span /><span /></div>
						<div className="hero__mr"><p className="hero__mr-label">Terraform plan · #128</p><h2>Review required before merge</h2><div className="hero__mr-meta"><span className="pill pill--risk">High risk</span><span className="pill pill--review">Review required</span><span>prod / networking</span></div></div>
						<div className="hero__plan"><span className="count count--change">~ 4 to change</span><span className="dot dot--run" /><span className="count count--destroy">- 2 to destroy</span><span className="dot dot--ok" /><span className="count">+ 1 to add</span></div>
					</div>
				</div>
			</section>

			<section className="features shell" id="features">
				<div className="section-intro"><p className="eyebrow">What it does / 01</p><h2>The risk in the change,<br /><em>before the merge.</em></h2><p>PlanGuard is a reviewer, not an applier. It tells you what a plan will really do — then hands the decision back to your team.</p></div>
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

			<section className="checks shell" id="checks">
				<div className="section-intro"><p className="eyebrow">What it checks / 02</p><h2>Every plan,<br /><em>read for risk.</em></h2><p>PlanGuard scans the plan for the changes that actually cause outages and blast radius — the ones a diff makes easy to miss.</p></div>
				<ul className="check-rail" aria-label="Risk signals PlanGuard checks">{checks.map((name) => <li key={name}>{name}</li>)}</ul>
			</section>

			<section className="close"><div className="shell close__grid"><p className="eyebrow">Open source · MIT</p><h2>Review the plan. Keep the apply.</h2><div><ExternalLink className="button primary" href={github}>Get PlanGuard ↗</ExternalLink><p>A Theorvane product · your credentials never leave your CI</p></div></div></section>
		</main>
		<footer className="site-footer"><div className="shell site-footer__grid"><div><a className="wordmark" href="#top">PLAN<span>GUARD</span></a><p>An AI-assisted Terraform change review platform from Theorvane.</p></div><nav aria-label="Footer"><div><strong>PlanGuard</strong><a href="#features">Features</a><a href="#checks">What it checks</a><ExternalLink href={github}>Source ↗</ExternalLink></div><div><strong>Studio</strong><ExternalLink href={studio}>Theorvane ↗</ExternalLink><ExternalLink href="https://github.com/Theorvane">GitHub ↗</ExternalLink></div></nav></div><div className="shell site-footer__legal"><span>© {new Date().getFullYear()} Theorvane.</span><span>Built with intent.</span></div></footer>
	</>;
}
