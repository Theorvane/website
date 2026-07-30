import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

const destinations = [
	["TypeMCP", "https://typemcp.theorvane.tech/", "/project-marks/typemcp.svg"],
	["TypeChain", "https://typechain.theorvane.tech/", "/project-marks/typechain.svg"],
	["OpenVideo", "https://open-video.app/", "/project-marks/openvideo.svg"],
] as const;

describe("Theorvane homepage", () => {
	it("presents the developer-tool organization landing page with accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /make the boundary/i })).toBeTruthy();
		expect(screen.getByText("Open-source developer tools")).toBeTruthy();
		expect(screen.getByText("Independent projects")).toBeTruthy();
		expect(screen.getByText("Technical commitments,", { exact: false })).toBeTruthy();
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
		expect(screen.getByRole("link", { name: /explore projects/i }).getAttribute("href")).toBe("#projects");
	});

	it("offers the three canonical product destinations from the project menu and cards", () => {
		render(createElement(HomePage));

		for (const [name, href] of destinations) {
			expect(screen.getAllByRole("link", { name: new RegExp(name, "i") }).some((link) => link.getAttribute("href") === href)).toBe(true);
			expect(screen.getByRole("link", { name: new RegExp(`Explore ${name}`, "i") }).getAttribute("href")).toBe(href);
		}
	});

	it("uses each official product mark within its project card", () => {
		render(createElement(HomePage));

		for (const [name, , icon] of destinations) {
			const card = screen.getByRole("heading", { name }).closest("article");
			expect(card?.querySelector(`img[src="${icon}"]`)).toBeTruthy();
		}
	});
});
