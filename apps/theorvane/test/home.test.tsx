import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("Theorvane homepage", () => {
	it("renders the brand promise, project link, and accessible landmarks", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /precise tools for/i })).toBeTruthy();
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
		expect(screen.getByRole("link", { name: /explore typemcp/i }).getAttribute("href")).toBe(
			"https://github.com/Theorvane/type-mcp",
		);
		expect(screen.getByText(/metadata declarations and immutable reads/i)).toBeTruthy();
		expect(screen.queryByText(/building mcp servers with framework-neutral runtime contracts/i)).toBeNull();
		expect(screen.getAllByRole("link", { name: /github organization/i })[0]?.getAttribute("href")).toBe(
			"https://github.com/Theorvane",
		);
	});
});
