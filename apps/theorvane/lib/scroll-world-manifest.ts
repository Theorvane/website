import type { ScrollWorldManifest } from "@theorvane/ui";

export const theorvaneScrollWorld: ScrollWorldManifest = {
	id: "theorvane-pilot",
	ariaLabel: "Theorvane product world",
	desktop: {
		src: "/scroll-world/desktop/timeline.mp4",
		poster: "/scroll-world/desktop/poster.webp",
		duration: 45,
		aspectRatio: "16:9",
	},
	mobile: {
		src: "/scroll-world/mobile/timeline.mp4",
		poster: "/scroll-world/mobile/poster.webp",
		duration: 45,
		aspectRatio: "9:16",
	},
	scenes: [
		{ id: "studio-beacon", title: "Boundary Atlas", start: 0, end: 0.2, href: "#products" },
		{ id: "typemcp-contract-island", title: "TypeMCP contract island", start: 0.2, end: 0.4, href: "https://typemcp.theorvane.tech/" },
		{ id: "typechain-composition-island", title: "TypeChain composition island", start: 0.4, end: 0.6, href: "https://typechain.theorvane.tech/" },
		{ id: "openvideo-local-studio", title: "OpenVideo local studio", start: 0.6, end: 0.8, href: "https://open-video.app/" },
		{ id: "product-constellation", title: "Product constellation", start: 0.8, end: 1, href: "#products" },
	],
};
