import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AmbientWorld } from "./ambient-world";

describe("AmbientWorld", () => {
	it("is decorative and exposes no focusable or media controls", () => {
		render(<AmbientWorld />);

		const layer = screen.getByTestId("ambient-world");
		expect(layer.getAttribute("aria-hidden")).toBe("true");
		expect(layer.querySelectorAll("a,button,input,video")).toHaveLength(0);
		expect(layer.querySelector(".ambient-world__grid")).toBeTruthy();
	});
});
