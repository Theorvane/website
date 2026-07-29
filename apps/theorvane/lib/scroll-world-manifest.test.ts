import { describe, expect, it } from "vitest";

import { theorvaneScrollWorld } from "./scroll-world-manifest";

describe("Theorvane Scroll World manifest", () => {
	it("keeps the approved five-scene narrative and separate native media variants", () => {
		expect(theorvaneScrollWorld.scenes.map((scene) => scene.id)).toEqual([
			"studio-beacon",
			"typemcp-contract-island",
			"typechain-composition-island",
			"openvideo-local-studio",
			"product-constellation",
		]);
		expect(theorvaneScrollWorld.scenes[0]).toMatchObject({ id: "studio-beacon", title: "Boundary Atlas", href: "#products" });
		expect(theorvaneScrollWorld.desktop.src).toBe("/scroll-world/desktop/timeline.mp4");
		expect(theorvaneScrollWorld.mobile.aspectRatio).toBe("9:16");
		expect(theorvaneScrollWorld.desktop.src).not.toBe(theorvaneScrollWorld.mobile.src);
		expect(theorvaneScrollWorld.desktop.poster).not.toBe(theorvaneScrollWorld.mobile.poster);
	});

	it("links product scenes only to their canonical public destinations", () => {
		const hrefs = Object.fromEntries(theorvaneScrollWorld.scenes.map((scene) => [scene.id, scene.href]));
		expect(hrefs).toMatchObject({
			"studio-beacon": "#products",
			"typemcp-contract-island": "https://typemcp.theorvane.tech/",
			"typechain-composition-island": "https://typechain.theorvane.tech/",
			"openvideo-local-studio": "https://openvideo.theorvane.tech/",
			"product-constellation": "#products",
		});
	});
});
