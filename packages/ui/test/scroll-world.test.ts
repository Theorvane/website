import { describe, expect, it } from "vitest";

import {
	MOBILE_SCROLL_WORLD_BREAKPOINT,
	assertScrollWorldManifest,
	chooseScrollWorldVariant,
	clampScrollWorldProgress,
	scrollWorldTimeAtProgress,
	type ScrollWorldManifest,
} from "../src/scroll-world";

const manifest: ScrollWorldManifest = {
	id: "world",
	ariaLabel: "A product-neutral world",
	scenes: [
		{ id: "arrival", title: "Arrival", start: 0, end: 0.5, href: "#arrival" },
		{ id: "departure", title: "Departure", start: 0.5, end: 1, href: "#departure" },
	],
	desktop: { src: "/world/desktop.mp4", poster: "/world/desktop.webp", duration: 40, aspectRatio: "16:9" },
	mobile: { src: "/world/mobile.mp4", poster: "/world/mobile.webp", duration: 40, aspectRatio: "9:16" },
};

describe("Scroll World contracts", () => {
	it("clamps progress and maps bounded progress to time", () => {
		expect(clampScrollWorldProgress(-0.25)).toBe(0);
		expect(clampScrollWorldProgress(0.25)).toBe(0.25);
		expect(clampScrollWorldProgress(1.25)).toBe(1);
		expect(scrollWorldTimeAtProgress(40, -1)).toBe(0);
		expect(scrollWorldTimeAtProgress(40, 0.25)).toBe(10);
		expect(scrollWorldTimeAtProgress(40, 2)).toBe(40);
	});

	it("chooses a native mobile variant through the shared breakpoint", () => {
		expect(MOBILE_SCROLL_WORLD_BREAKPOINT).toBe(700);
		expect(chooseScrollWorldVariant(manifest, 700)).toBe(manifest.mobile);
		expect(chooseScrollWorldVariant(manifest, 701)).toBe(manifest.desktop);
	});

	it.each([
		["duplicate scene ids", { ...manifest, scenes: [{ ...manifest.scenes[0] }, { ...manifest.scenes[0], start: 0.5, end: 1 }] }],
		["invalid media duration", { ...manifest, desktop: { ...manifest.desktop, duration: 0 } }],
		["non-root-relative media source", { ...manifest, desktop: { ...manifest.desktop, src: "https://example.test/world.mp4" } }],
		["non-root-relative poster", { ...manifest, mobile: { ...manifest.mobile, poster: "world.webp" } }],
		["ranges not starting at zero", { ...manifest, scenes: [{ ...manifest.scenes[0], start: 0.1 }, manifest.scenes[1]] }],
		["gapped ranges", { ...manifest, scenes: [{ ...manifest.scenes[0], end: 0.4 }, { ...manifest.scenes[1], start: 0.5 }] }],
		["overlapping ranges", { ...manifest, scenes: [{ ...manifest.scenes[0], end: 0.6 }, manifest.scenes[1]] }],
		["ranges not ending at one", { ...manifest, scenes: [{ ...manifest.scenes[0] }, { ...manifest.scenes[1], end: 0.9 }] }],
	] as const)("rejects manifests with %s", (_, invalidManifest) => {
		expect(() => assertScrollWorldManifest(invalidManifest)).toThrow();
	});

	it("accepts contiguous complete scene ranges", () => {
		expect(assertScrollWorldManifest(manifest)).toBe(manifest);
	});
});
