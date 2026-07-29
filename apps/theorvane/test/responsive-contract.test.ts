import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Theorvane narrow product index", () => {
	it("uses a bounded desktop grid and collapses product cards below the compact breakpoint", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/\.product-grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.product-grid\{grid-template-columns:1fr/);
	});
});
