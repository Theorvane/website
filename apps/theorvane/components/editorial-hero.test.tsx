import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EditorialHero } from "./editorial-hero";

describe("EditorialHero", () => {
	it("places its supplied semantic hero copy over a decorative editorial image", () => {
		render(
			<EditorialHero>
				<h1>Precise tools for the AI-native web.</h1>
			</EditorialHero>,
		);

		expect(screen.getByRole("heading", { name: /precise tools for/i })).toBeTruthy();
		const image = screen.getByRole("presentation");
		expect(image.getAttribute("src")).toBe("/editorial-signal/hero/theorvane-editorial-signal.webp");
		expect(image.getAttribute("alt")).toBe("");
	});
});
