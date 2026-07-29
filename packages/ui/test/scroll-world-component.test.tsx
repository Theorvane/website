import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ScrollWorld } from "../src/scroll-world";
import type { ScrollWorldManifest } from "../src/scroll-world";

const manifest: ScrollWorldManifest = {
	id: "world",
	ariaLabel: "Product world",
	scenes: [{ id: "arrival", title: "Arrival", start: 0, end: 1, href: "#arrival" }],
	desktop: { src: "/world/desktop.mp4", poster: "/world/desktop.webp", duration: 40, aspectRatio: "16:9" },
	mobile: { src: "/world/mobile.mp4", poster: "/world/mobile.webp", duration: 40, aspectRatio: "9:16" },
};

function configureMedia({ mobile = false, reduced = false } = {}) {
	const listeners = new Map<string, (event: MediaQueryListEvent) => void>();
	vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
		matches: query.includes("max-width") ? mobile : reduced,
		media: query,
		addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.set(query, listener),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})));
	vi.stubGlobal("IntersectionObserver", class {
		constructor(private readonly callback: IntersectionObserverCallback) {}
		observe() { this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
		disconnect() {}
		unobserve() {}
		root = null;
		rootMargin = "0px";
		thresholds = [];
		takeRecords() { return []; }
	});
	return listeners;
}

afterEach(() => vi.unstubAllGlobals());

describe("ScrollWorld", () => {
	it("renders a labelled visual region, scene navigation, and semantic story", () => {
		configureMedia();
		render(<ScrollWorld manifest={manifest}><p>Semantic story</p></ScrollWorld>);
		expect(screen.getByRole("region", { name: "Product world" })).toBeTruthy();
		expect(screen.getByRole("navigation", { name: "World scenes" })).toBeTruthy();
		expect(screen.getByRole("link", { name: "Arrival" }).getAttribute("href")).toBe("#arrival");
		expect(screen.getByText("Semantic story")).toBeTruthy();
		expect(screen.getByTestId("scroll-world-video").getAttribute("poster")).toBe("/world/desktop.webp");
	});

	it("uses a native mobile source when the breakpoint media query matches", () => {
		configureMedia({ mobile: true });
		render(<ScrollWorld manifest={manifest}><p>Story</p></ScrollWorld>);
		expect(screen.getByTestId("scroll-world-video").getAttribute("src")).toBe("/world/mobile.mp4");
	});

	it("keeps video source detached for reduced motion", () => {
		configureMedia({ reduced: true });
		render(<ScrollWorld manifest={manifest}><p>Story</p></ScrollWorld>);
		expect(screen.getByTestId("scroll-world-video").getAttribute("src")).toBeNull();
		expect(screen.getByRole("region", { name: "Product world" }).getAttribute("data-motion")).toBe("reduced");
	});

	it("keeps the poster and reveals a visible fallback after media failure", () => {
		configureMedia();
		render(<ScrollWorld manifest={manifest}><p>Story</p></ScrollWorld>);
		fireEvent.error(screen.getByTestId("scroll-world-video"));
		expect(screen.getByRole("status").textContent).toMatch(/preview unavailable/i);
		expect(screen.getByTestId("scroll-world-poster")).toBeTruthy();
	});
});
