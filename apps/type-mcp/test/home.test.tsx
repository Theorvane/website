import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("TypeMCP homepage", () => {
	it("states the product boundary and directs visitors to source and npm", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /decorator-first mcp/i })).toBeTruthy();
		expect(
			screen.getAllByText((_, element) =>
				element?.tagName === "P" && element.textContent?.includes("Published @theorvane/type-mcp@0.2.0") === true,
			),
		).toHaveLength(2);
		expect(screen.getAllByText(/validated runtime/i)).toHaveLength(2);
		expect(screen.getAllByText(/Streamable HTTP/i)).toHaveLength(3);
		expect(screen.getByText(/LangChain tools/i)).toBeTruthy();
		expect(screen.getAllByText(/LangGraph/i).length).toBeGreaterThan(0);
		expect(screen.getByText("ToolNode")).toBeTruthy();
		expect(screen.getByText(/consumer-owned/i)).toBeTruthy();
		expect(screen.queryByText(/metadata only/i)).toBeNull();
		expect(screen.queryByText(/does not validate, compile, invoke, or transport/i)).toBeNull();
		expect(screen.getAllByRole("link", { name: /npm package/i })[0]?.getAttribute("href")).toBe(
			"https://www.npmjs.com/package/@theorvane/type-mcp",
		);
	});
});
