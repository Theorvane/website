import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("OpenVideo narrow layout", () => {
	it("stacks the header and CTA actions below the compact breakpoint", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/@media\(max-width:760px\)\{header\{[^}]*flex-direction:column[^}]*align-items:flex-start/);
		expect(css).toMatch(/@media\(max-width:760px\)\{[\s\S]*?nav\{[^}]*flex-wrap:wrap[^}]*width:100%/);
		expect(css).toMatch(/@media\(max-width:760px\)\{[\s\S]*?\.actions\{[^}]*flex-direction:column/);
	});
});
