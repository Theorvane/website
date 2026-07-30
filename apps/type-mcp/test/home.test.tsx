import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("TypeMCP homepage", () => {
	it("publishes a complete, accessible product footer", () => {
		render(createElement(HomePage));

		const footer = screen.getByRole("contentinfo");
		expect(footer.textContent).toContain("TypeMCP");
		expect(screen.getByRole("navigation", { name: /TypeMCP footer/i })).toBeTruthy();
		expect(screen.getAllByRole("link", { name: /documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
		expect(screen.getByRole("link", { name: /Theorvane/i }).getAttribute("href")).toBe("https://theorvane.tech/");
	});

	it("renders the official blue contract mark in its landing evidence surface", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("region", { name: /contract inspection/i })).toBeTruthy();
		expect(screen.getAllByAltText("TypeMCP").some((image) => image.getAttribute("src") === "/logo.svg")).toBe(true);
	});

	it("leads developers through the documentation-first MCP flow", () => {
		render(createElement(HomePage));

		expect(screen.getAllByRole("link", { name: /read documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
		for (const stage of ["Declare", "Validate", "Compile", "Host"]) {
			expect(screen.getByRole("heading", { name: stage })).toBeTruthy();
		}
	});

	it("states the product boundary and directs visitors to source and npm", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /decorator-first mcp/i })).toBeTruthy();
		expect(
			screen.getAllByText((_, element) =>
				element?.tagName === "P" && element.textContent?.includes("Published @theorvane/type-mcp@0.2.2") === true,
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
	it("renders factual source-code and website JSON-LD", () => {
		render(createElement(HomePage));
		const graph = JSON.parse(screen.getByTestId("typemcp-schema").textContent ?? "{}") as { "@graph"?: Array<Record<string, unknown>> };
		expect(graph["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					"@type": "SoftwareSourceCode",
					name: "TypeMCP",
					url: "https://typemcp.theorvane.tech/",
					codeRepository: "https://github.com/Theorvane/type-mcp",
					programmingLanguage: "TypeScript",
					license: "https://opensource.org/licenses/MIT",
				}),
				expect.objectContaining({ "@type": "WebSite", name: "TypeMCP", url: "https://typemcp.theorvane.tech/" }),
			]),
		);
	});
});
