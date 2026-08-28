import { createElement } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

const github = "https://github.com/Theorvane/proxmox-mcp";

describe("Proxmox MCP homepage", () => {
	it("renders the brand promise and accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /proxmox, behind a safety gate/i })).toBeTruthy();
		const hero = screen.getByRole("heading", { name: /proxmox, behind a safety gate/i }).closest("section");
		expect(hero?.id).toBe("top");
		expect(hero?.getAttribute("data-testid")).toBe("proxmox-hero");
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
	});

	it("routes both primary calls to action to the GitHub repository", () => {
		render(createElement(HomePage));

		const getLinks = screen.getAllByRole("link", { name: /get proxmox mcp/i });
		expect(getLinks.length).toBeGreaterThanOrEqual(1);
		for (const link of getLinks) {
			expect(link.getAttribute("href")).toBe(github);
			expect(link.getAttribute("target")).toBe("_blank");
			expect(link.getAttribute("rel")).toContain("noreferrer");
		}
	});

	it("documents the gated design and every safety boundary", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /mutations stay behind a gate/i })).toBeTruthy();
		expect(screen.getByRole("heading", { name: /read and write, cleanly separated/i })).toBeTruthy();

		const boundaries = screen.getByRole("list", { name: /safety boundaries/i });
		for (const name of ["Read operations", "Gated mutations", "Dry-run first", "Audit log"]) {
			expect(within(boundaries).getByText(name)).toBeTruthy();
		}
	});
});
