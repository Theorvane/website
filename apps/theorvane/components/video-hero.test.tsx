import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { VideoHero } from "./video-hero";

type IntersectionCallback = (entries: readonly IntersectionObserverEntry[]) => void;

function installMediaEnvironment(reducedMotion: boolean) {
	let callback: IntersectionCallback | undefined;
	vi.stubGlobal("matchMedia", vi.fn().mockImplementation(() => ({
		matches: reducedMotion,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	})));
	vi.stubGlobal("IntersectionObserver", class {
		constructor(next: IntersectionCallback) { callback = next; }
		observe = vi.fn();
		disconnect = vi.fn();
	});
	return () => callback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
}

afterEach(() => vi.unstubAllGlobals());

describe("VideoHero", () => {
	it("attaches its silent calibration video only after the hero enters view", () => {
		const intersect = installMediaEnvironment(false);
		render(<VideoHero poster="/scroll-world/desktop/studio-beacon-poster.webp" src="/scroll-world/desktop/studio-beacon.mp4" />);

		expect(screen.getByTestId("video-hero").getAttribute("aria-hidden")).toBe("true");
		expect(screen.getByTestId("video-hero-poster").getAttribute("src")).toBe("/scroll-world/desktop/studio-beacon-poster.webp");
		const video = screen.getByTestId("video-hero-video") as HTMLVideoElement;
		expect(video.getAttribute("src")).toBeNull();

		act(() => intersect());

		expect(video.getAttribute("src")).toBe("/scroll-world/desktop/studio-beacon.mp4");
		expect(video.muted).toBe(true);
		expect(video.playsInline).toBe(true);
		expect(video.hasAttribute("controls")).toBe(false);
	});

	it("keeps the poster-only background for reduced motion", () => {
		installMediaEnvironment(true);
		render(<VideoHero poster="/scroll-world/desktop/studio-beacon-poster.webp" src="/scroll-world/desktop/studio-beacon.mp4" />);

		expect(screen.getByTestId("video-hero-poster")).toBeTruthy();
		expect(screen.getByTestId("video-hero-video").getAttribute("src")).toBeNull();
	});
});
