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
		expect(hero?.querySelector("img")?.getAttribute("src")).toBe("/editorial-signal/hero/theorvane-editorial-signal.webp");
		expect(hero?.querySelector("img")?.getAttribute("alt")).toBe("");
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

	it("offers a product index with all canonical destinations", () => {
		render(createElement(HomePage));

		expect(screen.getAllByRole("link", { name: /explore products/i })[0]?.getAttribute("href")).toBe("#products");
		expect(screen.getByRole("heading", { name: /choose a focused tool/i })).toBeTruthy();
		expect(screen.getAllByRole("link", { name: /typemcp/i }).some((link) => link.getAttribute("href") === "https://typemcp.theorvane.tech/")).toBe(true);
		expect(screen.getAllByRole("link", { name: /typechain/i }).some((link) => link.getAttribute("href") === "https://typechain.theorvane.tech/")).toBe(true);
		expect(screen.getAllByRole("link", { name: /openvideo/i }).some((link) => link.getAttribute("href") === "https://openvideo.theorvane.tech/")).toBe(true);
	});

	it("renders the three-scene Editorial Signal passage as semantic content with canonical destinations", () => {
		render(createElement(HomePage));

		const passage = screen.getByRole("region", { name: "Editorial Signal passage" });
		const articles = Array.from(passage.querySelectorAll("article"));
		expect(articles).toHaveLength(3);
		expect(articles.map((article) => article.querySelector("h2")?.textContent)).toEqual([
			"Declare the contract.",
			"Compose at the edge.",
			"Keep the edit local.",
		]);
		expect(screen.getByRole("link", { name: "Visit TypeMCP ↗" }).getAttribute("href")).toBe("https://typemcp.theorvane.tech/");
		expect(screen.getByRole("link", { name: "Visit TypeChain ↗" }).getAttribute("href")).toBe("https://typechain.theorvane.tech/");
		expect(screen.getByRole("link", { name: "Visit OpenVideo ↗" }).getAttribute("href")).toBe("https://openvideo.theorvane.tech/");
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
			"https://openvideo.theorvane.tech/",
		);
		expect(screen.getByText(/local-first, open-source video editor/i)).toBeTruthy();
		expect(screen.getByText(/no cloud uploads, accounts, or analytics/i)).toBeTruthy();
	});
});
