import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("TypeMCP homepage", () => {
	it("states the product boundary and directs visitors to source and npm", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /decorator-first mcp/i })).toBeTruthy();
		expect(
			screen.getByText((_, element) =>
				element?.tagName === "P" && element.textContent?.includes("Published type-mcp@0.1.0") === true,
			),
		).toBeTruthy();
		expect(screen.getByText(/does not compile, invoke, or transport/i)).toBeTruthy();
		expect(
			screen.getByText((_, element) =>
				element?.tagName === "P" && element.textContent?.includes("are reserved and throw") === true,
			),
		).toBeTruthy();
		expect(screen.queryByText(/repository development line provides/i)).toBeNull();
		expect(screen.getAllByRole("link", { name: /view on github/i })[0]?.getAttribute("href")).toBe(
			"https://github.com/Theorvane/type-mcp",
		);
		expect(screen.getAllByRole("link", { name: /npm package/i })[0]?.getAttribute("href")).toBe(
			"https://www.npmjs.com/package/type-mcp",
		);
	});
});
