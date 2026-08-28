import { createElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

const github = "https://github.com/Theorvane/planguard";

describe("PlanGuard homepage", () => {
	it("renders the brand promise and accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /know the blast radius/i })).toBeTruthy();
		const hero = screen.getByRole("heading", { name: /know the blast radius/i }).closest("section");
		expect(hero?.id).toBe("top");
		expect(hero?.getAttribute("data-testid")).toBe("planguard-hero");
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
	});

	it("routes both primary calls to action to the GitHub repository", () => {
		render(createElement(HomePage));

		const getLinks = screen.getAllByRole("link", { name: /get planguard/i });
		expect(getLinks.length).toBeGreaterThanOrEqual(1);
		for (const link of getLinks) {
			expect(link.getAttribute("href")).toBe(github);
			expect(link.getAttribute("target")).toBe("_blank");
			expect(link.getAttribute("rel")).toContain("noreferrer");
		}
	});

	it("documents the review loop and every risk signal it checks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /the real risk, surfaced per PR/i })).toBeTruthy();
		expect(screen.getByRole("heading", { name: /you keep the apply/i })).toBeTruthy();

		const checks = screen.getByRole("list", { name: /risk signals/i });
		for (const name of ["Destroys", "Forced replacements", "IAM & permission changes", "Blast radius"]) {
			expect(within(checks).getByText(name)).toBeTruthy();
		}
	});
});
