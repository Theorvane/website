import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EditorialCinematic } from "./editorial-cinematic";

describe("EditorialCinematic", () => {
	it("keeps a decorative poster available before client motion attaches a local video source", () => {
		window.matchMedia = () => ({ matches: true }) as MediaQueryList;
		render(<EditorialCinematic />);

		const cinematic = screen.getByTestId("editorial-cinematic");
		expect(cinematic.getAttribute("aria-hidden")).toBe("true");
		const video = screen.getByTestId("editorial-cinematic-video") as HTMLVideoElement;
		expect(video.getAttribute("poster")).toBe("/editorial-signal/hero/theorvane-editorial-signal.webp");
		expect(video.getAttribute("src")).toBe("/editorial-signal/cinematic/editorial-signal-scroll.mp4");
		expect(video.muted).toBe(true);
		expect(video.playsInline).toBe(true);
	});
});
