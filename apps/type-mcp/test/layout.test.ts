import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
describe("TypeMCP metadata", () => {

	it("describes the published validated runtime", () => {
		expect(metadata.title).toContain("strict TypeScript MCP runtime");
		expect(metadata.description).toContain("validate, and compile");
		expect(metadata.description).toMatch(/MCP server surfaces/i);
	});
});
