import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BoundaryAtlasStage } from "./boundary-atlas-stage";

const reducedMotion = (matches: boolean) => vi.stubGlobal("matchMedia", vi.fn().mockImplementation(() => ({
	matches,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
})));

afterEach(() => vi.unstubAllGlobals());

describe("BoundaryAtlasStage", () => {
	it("does not attach the calibration video in server-rendered markup", () => {
		expect(renderToStaticMarkup(<BoundaryAtlasStage />)).not.toContain("/scroll-world/desktop/studio-beacon.mp4");
	});

	it("uses the approved local poster and silent desktop calibration video", () => {
		reducedMotion(false);
		render(<BoundaryAtlasStage />);

		expect(screen.getByRole("img", { name: /boundary atlas/i }).getAttribute("src")).toBe("/scroll-world/desktop/studio-beacon-poster.webp");
		expect(screen.getByTestId("boundary-atlas-video").getAttribute("src")).toBe("/scroll-world/desktop/studio-beacon.mp4");
		expect((screen.getByTestId("boundary-atlas-video") as HTMLVideoElement).muted).toBe(true);
	});

	it("keeps the poster and semantic description without attaching video for reduced motion", () => {
		reducedMotion(true);
		render(<BoundaryAtlasStage />);

		expect(screen.getByRole("img", { name: /boundary atlas/i })).toBeTruthy();
		expect(screen.getByTestId("boundary-atlas-video").getAttribute("src")).toBeNull();
		expect(screen.getByText(/three independent tool surfaces/i)).toBeTruthy();
	});
});
