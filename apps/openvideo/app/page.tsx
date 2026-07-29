import { ExternalLink, SkipLink } from "@theorvane/ui";

const siteUrl = "https://openvideo.theorvane.tech/";
const repositoryUrl = "https://github.com/Theorvane/openvideo";
const releasesUrl = "https://github.com/Theorvane/openvideo/releases";
const readmeUrl = "https://github.com/Theorvane/openvideo#readme";
const theorvaneUrl = "https://theorvane.tech/";
const modelsDevUrl = "https://models.dev";
const ollamaUrl = "https://ollama.com";

const runFromSource = ["git clone https://github.com/Theorvane/openvideo.git", "cd openvideo && npm install", "npm run dev"] as const;

const capabilities = [
	["01", "Edit", "A real timeline", "Video and audio tracks, trim, split, move, duplicate, keyframes, transitions, per-track mix, undo and redo — then an H.264/AAC MP4 through the FFmpeg already on your machine."],
	["02", "Delegate", "An agent at the controls", "The chat panel beside the timeline calls the same operations the interface does. Describe the cut; it reads the project, places the clip, and reports what it changed."],
	["03", "Watch", "It can see the footage", "Ask about a clip and frames are sampled and handed to the model as images with timestamps, so the answer comes from what is on screen rather than from the file name."],
	["04", "Generate", "Voice and video, in place", "Generation studios sit in the same workspace. A finished job imports into the open project as an asset, ready to drop on the timeline."],
	["05", "Connect", "Your models, your keys", "Around 150 providers and several thousand models, or nothing but a local engine. Connect what you want; the rest stays out of the picker."],
	["06", "Keep", "Projects are just folders", "You pick the folder. Media, chat history, and generated results are written inside it, and removing a project from the list never deletes the folder you chose."],
] as const;

const agentTools = [
	["Read the timeline and asset metadata", "getProjectTimeline"],
	["Watch footage as sampled frames", "watchProjectVideo"],
	["Place, trim, and restyle clips", "addClipToTimeline · trimTimelineClip · updateClipEffects"],
	["Generate speech or video and follow the job", "createSpeechJob · createVideoJob · getJobStatus"],
	["Import a finished generation into the project", "importGeneratedResult"],
	["Start a local export", "exportProjectVideo"],
] as const;

const faq = [
	["Does it cost anything?", "OpenVideo is free and MIT licensed. Model providers bill you directly if you connect one; the project never sits between you and them."],
	["Do I need an AI subscription?", "No. The agent runs against a local Ollama model with no account, no key, and no network call. Cloud providers are there if you prefer them."],
	["Which providers can I use?", "Anything in the generated models.dev catalog that speaks the OpenAI or Anthropic wire format, plus Google Gemini natively. For OpenAI you can use an API key or a ChatGPT sign-in."],
	["Where does my footage go?", "Into the project folder you chose, and nowhere else. A provider only ever receives what you ask the agent to send it."],
	["Do I need FFmpeg?", "Yes, for export. OpenVideo drives the FFmpeg on your machine rather than bundling its own, and refuses to start an export it cannot complete."],
	["Is there an installer?", "Not yet. OpenVideo runs from source today; there is no packaged build or auto-update, and this site will say so until there is."],
] as const;

const schema = {
	"@context": "https://schema.org",
	"@graph": [
		{ "@type": "SoftwareApplication", "@id": `${siteUrl}#application`, name: "OpenVideo", url: siteUrl, applicationCategory: "VideoApplication", operatingSystem: "macOS, Windows, Linux", description: "A local-first desktop video editor with an AI agent that operates the timeline, plus voice and video generation and local FFmpeg export.", isAccessibleForFree: true, license: "https://opensource.org/licenses/MIT", codeRepository: repositoryUrl },
		{ "@type": "WebSite", "@id": `${siteUrl}#website`, name: "OpenVideo", url: siteUrl, publisher: { "@id": "https://theorvane.tech/#organization" } },
		{ "@type": "FAQPage", "@id": `${siteUrl}#faq`, mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
	],
};

export default function HomePage() {
	return <><SkipLink /><script data-testid="openvideo-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
		<header className="shell"><a className="wordmark" href="#top">OPEN<span>VIDEO</span></a><nav aria-label="Primary"><a href="#capabilities">Capabilities</a><a href="#agent">Agent</a><a href="#providers">Providers</a><a href="#faq">FAQ</a><ExternalLink href={repositoryUrl}>GitHub ↗</ExternalLink></nav></header>

		<main id="main-content">
			<section className="hero shell" id="top">
				<div>
					<p className="eyebrow">Open source · MIT · Local-first</p>
					<h1>The video editor<br /><em>that edits with you.</em></h1>
					<p className="lede">OpenVideo is a desktop editor with an agent at the controls. It reads your timeline, cuts clips, generates voice and video, and exports through your own FFmpeg. Your media stays on your machine, and you decide which model providers it may talk to — including none.</p>
					<div className="actions"><ExternalLink className="button primary" href={repositoryUrl}>View source on GitHub ↗</ExternalLink><ExternalLink className="button" href={readmeUrl}>Read the docs ↗</ExternalLink></div>
				</div>
				<section className="terminal" aria-label="Run OpenVideo from source">
					<p>RUN FROM SOURCE</p>
					<ol data-testid="run-from-source">{runFromSource.map((line) => <li key={line}><code>{line}</code></li>)}</ol>
					<span>Node 22+ · FFmpeg for export · no installer yet</span>
				</section>
			</section>

			<section className="features shell" id="capabilities" aria-label="OpenVideo capabilities">
				{capabilities.map(([number, verb, title, description]) => <article key={verb}><b>{number}</b><h2><span>{verb}</span> {title}</h2><p>{description}</p></article>)}
			</section>

			<section className="agent shell" id="agent" aria-label="What the agent can do">
				<p className="eyebrow">Not a copilot that writes suggestions</p>
				<h2>It operates the editor.</h2>
				<p className="lede">The agent reaches your project through a typed tool surface in the main process — the same operations the interface uses, with no shell access and no path handling in the browser layer.</p>
				<ul className="tool-list">{agentTools.map(([label, tools]) => <li key={label}><span>{label}</span><code>{tools}</code></li>)}</ul>
				<p className="note">Anything that writes to your project or starts a job <strong>asks for approval</strong> before it runs. Read-only calls go through immediately. Conversations are kept per project as sessions you can switch between or delete.</p>
			</section>

			<section className="providers shell" id="providers" aria-label="Model providers">
				<div>
					<p className="eyebrow">Bring your own everything</p>
					<h2>Around 150 providers. Or none.</h2>
					<p className="lede">The registry is generated from a snapshot of the <ExternalLink href={modelsDevUrl}>models.dev</ExternalLink> catalog, so the picker lists what exists rather than a hand-kept shortlist. Only providers you have connected show their models.</p>
				</div>
				<dl className="provider-grid">
					<div><dt>Local</dt><dd><ExternalLink href={ollamaUrl}>Ollama</ExternalLink> runs on your machine with no account, no key, and no network call.</dd></div>
					<div><dt>API key</dt><dd>Connect a provider in Settings. Keys are written to main-process safe storage and never reach the interface.</dd></div>
					<div><dt>ChatGPT sign-in</dt><dd>OpenAI accepts either an API key or a ChatGPT sign-in, for the model set that backend serves.</dd></div>
					<div><dt>Generation</dt><dd>ElevenLabs and OpenAI for speech, Google Veo and OpenAI Sora for video. Providers without a real adapter stay honestly unavailable.</dd></div>
				</dl>
			</section>

			<section className="local shell" id="local-first">
				<p className="eyebrow">A boundary you can read in the source</p>
				<h2>Your footage is not the product.</h2>
				<p>No account, no telemetry, no analytics, and no crash reporting. The app reaches a provider <strong>only when you ask it to</strong>, using a provider you connected yourself.</p>
				<p>The interface talks to the system through one narrow typed bridge. Filesystem paths, FFmpeg arguments, API keys, and OAuth tokens stay behind it — a reference image you pick for video generation crosses as bytes, never as a path.</p>
				<ExternalLink href={repositoryUrl}>Inspect the source ↗</ExternalLink>
			</section>

			<section className="faq shell" id="faq" aria-label="Common questions">
				<h2>Common questions</h2>
				<div className="faq-grid">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
			</section>
		</main>

		<footer className="site-footer"><div className="shell footer-grid"><div className="footer-brand"><a className="wordmark" href="#top">OPEN<span>VIDEO</span></a><p>A local-first desktop video editor with an agent that can drive it.</p></div><nav aria-label="OpenVideo footer" className="footer-nav"><div><strong>Explore</strong><a href="#capabilities">Capabilities</a><a href="#agent">Agent</a><a href="#providers">Providers</a><a href="#faq">FAQ</a></div><div><strong>Project</strong><ExternalLink href={repositoryUrl}>Repository ↗</ExternalLink><ExternalLink href={readmeUrl}>Documentation ↗</ExternalLink><ExternalLink href={releasesUrl}>Releases ↗</ExternalLink></div><div><strong>Company</strong><ExternalLink href={theorvaneUrl}>Theorvane ↗</ExternalLink></div></nav></div><div className="shell footer-legal"><span>© 2026 Theorvane. OpenVideo is open source under the MIT License.</span><span>Local by design.</span></div></footer>
	</>;
}
