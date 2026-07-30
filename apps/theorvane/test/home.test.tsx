import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("Theorvane homepage", () => {
	it("renders the brand promise, project link, and accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /precise tools for/i })).toBeTruthy();
		const hero = screen.getByRole("heading", { name: /precise tools for/i }).closest("section");
		expect(hero?.id).toBe("top");
		expect(hero?.getAttribute("data-testid")).toBe("theorvane-studio-hero");
		expect(hero?.querySelector(".studio-orbit")).toBeTruthy();
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
		expect(screen.getByRole("link", { name: /explore typemcp/i }).getAttribute("href")).toBe(
			"https://typemcp.theorvane.tech/",
		);
		expect(screen.getByText(/metadata declarations and immutable reads/i)).toBeTruthy();
		expect(screen.queryByText(/building mcp servers with framework-neutral runtime contracts/i)).toBeNull();
		expect(screen.getAllByRole("link", { name: /github organization/i })[0]?.getAttribute("href")).toBe(
			"https://github.com/Theorvane",
		);
	});

	it("publishes an organization footer that links every product", () => {
		render(createElement(HomePage));

		const footer = screen.getByRole("contentinfo");
		expect(screen.getByRole("navigation", { name: /Theorvane footer/i })).toBeTruthy();
		expect(footer.querySelector('a[href="https://typemcp.theorvane.tech/"]')).toBeTruthy();
		expect(footer.querySelector('a[href="https://typechain.theorvane.tech/"]')).toBeTruthy();
		expect(footer.querySelector('a[href="https://open-video.app/"]')).toBeTruthy();
	});

	it("offers a product index with all canonical destinations", () => {
		render(createElement(HomePage));

		expect(screen.getAllByRole("link", { name: /explore products/i })[0]?.getAttribute("href")).toBe("#products");
		expect(screen.getByRole("heading", { name: /choose a focused tool/i })).toBeTruthy();
		expect(screen.getAllByRole("link", { name: /typemcp/i }).some((link) => link.getAttribute("href") === "https://typemcp.theorvane.tech/")).toBe(true);
		expect(screen.getAllByRole("link", { name: /typechain/i }).some((link) => link.getAttribute("href") === "https://typechain.theorvane.tech/")).toBe(true);
		expect(screen.getAllByRole("link", { name: /openvideo/i }).some((link) => link.getAttribute("href") === "https://open-video.app/")).toBe(true);
	});

	it("renders the studio surface instead of the former editorial passage", () => {
		render(createElement(HomePage));

		const studio = screen.getByRole("region", { name: /theorvane studio system/i });
		expect(studio).toBeTruthy();
		expect(screen.getByRole("heading", { name: /tools with clear.*boundaries/i })).toBeTruthy();
		expect(screen.queryByRole("region", { name: "Editorial Signal passage" })).toBeNull();
		expect(screen.getByRole("link", { name: "Explore TypeMCP ↗" }).getAttribute("href")).toBe("https://typemcp.theorvane.tech/");
		expect(screen.getByRole("link", { name: "Explore TypeChain ↗" }).getAttribute("href")).toBe("https://typechain.theorvane.tech/");
		expect(screen.getByRole("link", { name: "Explore OpenVideo ↗" }).getAttribute("href")).toBe("https://open-video.app/");
	});

	it("features TypeChain with its official typed-tool product destination", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: "TypeChain" })).toBeTruthy();
		expect(screen.getByRole("link", { name: /explore typechain/i }).getAttribute("href")).toBe(
			"https://typechain.theorvane.tech/",
		);
		expect(screen.getByText(/decorator-first, type-safe authoring layer for LangChain JS tools and agents/i)).toBeTruthy();
		expect(screen.getByText(/models, credentials, policy enforcement, and deployment/i)).toBeTruthy();
	});

	it("features OpenVideo with its official local-first product destination", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: "OpenVideo" })).toBeTruthy();
		expect(screen.getByRole("link", { name: /explore openvideo/i }).getAttribute("href")).toBe(
			"https://open-video.app/",
		);
		expect(screen.getByText(/local-first, open-source video editor/i)).toBeTruthy();
		expect(screen.getByText(/no cloud uploads, accounts, or analytics/i)).toBeTruthy();
	});
});
