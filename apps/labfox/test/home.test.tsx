import { createElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

const github = "https://github.com/Theorvane/labfox";

describe("LabFox homepage", () => {
	it("renders the brand promise and accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /your gitlab/i })).toBeTruthy();
		const hero = screen.getByRole("heading", { name: /your gitlab/i }).closest("section");
		expect(hero?.id).toBe("top");
		expect(hero?.getAttribute("data-testid")).toBe("labfox-hero");
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
	});

	it("routes both primary calls to action to the GitHub repository", () => {
		render(createElement(HomePage));

		const getLinks = screen.getAllByRole("link", { name: /get labfox/i });
		expect(getLinks.length).toBeGreaterThanOrEqual(1);
		for (const link of getLinks) {
			expect(link.getAttribute("href")).toBe(github);
			expect(link.getAttribute("target")).toBe("_blank");
			expect(link.getAttribute("rel")).toContain("noreferrer");
		}
	});

	it("documents the review loop and every supported platform", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /merge requests, reviewed in full/i })).toBeTruthy();
		expect(screen.getByRole("heading", { name: /self-hosted is first-class/i })).toBeTruthy();

		const platforms = screen.getByRole("list", { name: /supported platforms/i });
		for (const name of ["Android", "iOS", "Windows", "macOS"]) {
			expect(within(platforms).getByText(name)).toBeTruthy();
		}
	});
});
