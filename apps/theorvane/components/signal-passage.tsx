import { ExternalLink } from "@theorvane/ui";

const scenes = [
	{
		alt: "TypeMCP editorial artwork showing a declared contract in porcelain and magenta.",
		description: "Make MCP declarations and immutable read shapes visible before they enter the rest of your system.",
		href: "https://typemcp.theorvane.tech/",
		image: "/editorial-signal/passage/declare.webp",
		label: "Declare",
		link: "Visit TypeMCP ↗",
		title: "Declare the contract.",
	},
	{
		alt: "TypeChain editorial artwork showing typed composition at a deliberate edge.",
		description: "Author typed tools and agents at the integration edge while models, policy, credentials, and deployment remain yours.",
		href: "https://typechain.theorvane.tech/",
		image: "/editorial-signal/passage/compose.webp",
		label: "Compose",
		link: "Visit TypeChain ↗",
		title: "Compose at the edge.",
	},
	{
		alt: "OpenVideo editorial artwork showing a local edit held on-device.",
		description: "Record, edit, and export on your device without cloud uploads, accounts, or analytics.",
		href: "https://openvideo.theorvane.tech/",
		image: "/editorial-signal/passage/local.webp",
		label: "Keep local",
		link: "Visit OpenVideo ↗",
		title: "Keep the edit local.",
	},
] as const;

export function SignalPassage() {
	return (
		<section aria-label="Editorial Signal passage" className="signal-passage">
			<ol className="signal-passage__list shell">
				{scenes.map((scene) => (
					<li className="signal-passage__item" key={scene.title}>
						<article className="signal-passage__scene">
							<div className="signal-passage__copy">
								<p className="eyebrow signal-passage__label">{scene.label}</p>
								<h2>{scene.title}</h2>
								<p>{scene.description}</p>
								<ExternalLink href={scene.href}>{scene.link}</ExternalLink>
							</div>
							<figure className="signal-passage__art">
								<img alt={scene.alt} decoding="async" src={scene.image} />
							</figure>
						</article>
					</li>
				))}
			</ol>
		</section>
	);
}
