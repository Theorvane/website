import { ExternalLink, SkipLink } from "@theorvane/ui";

const siteUrl = "https://openvideo.theorvane.tech/";
const repositoryUrl = "https://github.com/Theorvane/openvideo";
const releasesUrl = "https://github.com/Theorvane/openvideo/releases";
const theorvaneUrl = "https://theorvane.tech/";

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "SoftwareApplication",
			"@id": `${siteUrl}#application`,
			name: "OpenVideo",
			url: siteUrl,
			applicationCategory: "VideoApplication",
			description: "A local-first Electron studio for recording, editing, and exporting video on your device.",
			isAccessibleForFree: true,
			codeRepository: repositoryUrl,
		},
		{
			"@type": "WebSite",
			"@id": `${siteUrl}#website`,
			name: "OpenVideo",
			url: siteUrl,
			publisher: { "@id": "https://theorvane.tech/#organization" },
		},
	],
};

const features = [
	["01", "Capture with intent", "Choose a window, preview it, and make a local WebM recording without routing footage through a service."],
	["02", "Shape the timeline", "Organize clips and assets in a local editing workspace with a best-effort Program Monitor preview."],
	["03", "Export on your device", "Compile saved timelines into MP4 through local FFmpeg export jobs and keep control of the resulting file."],
	["04", "Keep narration local", "Use optional, user-configured local narration tooling without model downloads or provider calls from the app."],
] as const;

export default function HomePage() {
	return <>
		<SkipLink />
		<script data-testid="openvideo-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="shell">
			<a className="wordmark" href="#top">OPEN<span>VIDEO</span></a>
			<nav aria-label="Primary">
				<a href="#features">Features</a>
				<a href="#local-first">Local-first</a>
				<ExternalLink href={repositoryUrl}>GitHub ↗</ExternalLink>
			</nav>
		</header>
		<main id="main-content">
			<section className="hero shell" id="top">
				<div>
					<p className="eyebrow">Open-source desktop video studio</p>
					<h1>Record. Edit.<br /><em>Keep it local.</em></h1>
					<p className="lede">OpenVideo is a local-first Electron studio for selected-window recording, timeline editing, and export. Projects and media stay on your device.</p>
					<div className="actions">
						<ExternalLink className="button primary" href={repositoryUrl}>View source on GitHub ↗</ExternalLink>
						<ExternalLink className="button" href={releasesUrl}>Browse releases ↗</ExternalLink>
					</div>
				</div>
				<div className="preview" aria-label="OpenVideo local workflow">
					<p>LOCAL WORKFLOW</p>
					<ol><li>Capture a window</li><li>Arrange the timeline</li><li>Export an MP4</li></ol>
					<span>On your device · under your control</span>
				</div>
			</section>
			<section className="features shell" id="features" aria-label="OpenVideo features">
				{features.map(([number, title, description]) => <article key={number}><b>{number}</b><h2>{title}</h2><p>{description}</p></article>)}
			</section>
			<section className="local shell" id="local-first">
				<p className="eyebrow">A privacy boundary you can inspect</p>
				<h2>Your footage is not our product.</h2>
				<p>OpenVideo stores recordings, projects, imported assets, voice profiles, and exports locally. No cloud upload, analytics, or accounts are built into the application.</p>
				<ExternalLink href={repositoryUrl}>Inspect the source ↗</ExternalLink>
			</section>
		</main>
		<footer className="shell">
			<p>OpenVideo is an open-source project by Theorvane.</p>
			<div><ExternalLink href={repositoryUrl}>Repository ↗</ExternalLink><ExternalLink href={releasesUrl}>Releases ↗</ExternalLink><ExternalLink href={theorvaneUrl}>Theorvane ↗</ExternalLink></div>
		</footer>
	</>;
}
