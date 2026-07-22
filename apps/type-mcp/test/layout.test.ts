import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";

describe("TypeMCP metadata", () => {
	it("describes the published package as declaration metadata only", () => {
		expect(metadata.description).toContain("declaration metadata");
		expect(metadata.description).not.toMatch(/MCP servers/i);
	});
});
