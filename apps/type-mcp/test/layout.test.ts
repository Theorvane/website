import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import RootLayout from "../app/layout";

describe("TypeMCP metadata", () => {
	it("configures the approved RybbIt site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.handgarden.kr/api/script.js",
			"data-site-id": "c37c7591084c",
			defer: true,
		});
	});

	it("describes the published validated runtime", () => {
		expect(metadata.title).toContain("strict TypeScript MCP runtime");
		expect(metadata.description).toContain("validate, and compile");
		expect(metadata.description).toMatch(/MCP server surfaces/i);
	});
});
