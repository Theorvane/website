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
		expect(screen.getByText(/metadata only/i)).toBeTruthy();
		expect(screen.getByText(/does not validate, compile, invoke, or transport/i)).toBeTruthy();
		expect(screen.getByText(/LangChain tools/i)).toBeTruthy();
		expect(screen.getAllByText(/LangGraph/i).length).toBeGreaterThan(0);
		expect(screen.getByText("ToolNode")).toBeTruthy();
		expect(screen.getByText(/consumer-owned/i)).toBeTruthy();
		expect(screen.queryByText(/validated runtime core/i)).toBeNull();
		expect(screen.queryByText(/resolver-backed execution/i)).toBeNull();
		expect(screen.queryByText(/mcp transport at the edge/i)).toBeNull();
		expect(screen.queryByText(/repository development line provides/i)).toBeNull();
		expect(screen.getAllByRole("link", { name: /view on github/i })[0]?.getAttribute("href")).toBe(
			"https://github.com/Theorvane/type-mcp",
		);
		expect(screen.getAllByRole("link", { name: /npm package/i })[0]?.getAttribute("href")).toBe(
			"https://www.npmjs.com/package/type-mcp",
		);
	});
});
