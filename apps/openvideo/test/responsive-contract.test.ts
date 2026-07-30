import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("OpenVideo narrow layout", () => {
	it("stacks the header and CTA actions below the compact breakpoint", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/@media\(max-width:760px\)\{header\{[^}]*flex-direction:column[^}]*align-items:flex-start/);
		expect(css).toMatch(/@media\(max-width:760px\)\{[\s\S]*?nav\{[^}]*flex-wrap:wrap[^}]*width:100%/);
		expect(css).toMatch(/@media\(max-width:760px\)\{[\s\S]*?\.actions\{[^}]*flex-direction:column/);
	});

	it("collapses the documentation sidebar into a single column on narrow screens", async () => {
		const css = await readFile("app/docs/docs.css", "utf8");

		expect(css).toMatch(/@media\(max-width:900px\)\{[\s\S]*?\.doc-layout\{[^}]*grid-template-columns:1fr/);
		expect(css).toMatch(/@media\(max-width:900px\)\{[\s\S]*?\.doc-main\{[^}]*order:1/);
		expect(css).toMatch(/@media\(max-width:900px\)\{[\s\S]*?\.doc-sidebar\{[^}]*order:2[^}]*position:static/);
		expect(css).toMatch(/@media\(max-width:900px\)\{[\s\S]*?\.doc-index dl\{[^}]*grid-template-columns:1fr/);
	});

	it("keeps wide documentation blocks scrolling inside their own container", async () => {
		const css = await readFile("app/docs/docs.css", "utf8");

		expect(css).toMatch(/\.doc-table\{[^}]*overflow-x:auto/);
		expect(css).toMatch(/\.doc-code\{[^}]*overflow-x:auto/);
		expect(css).toMatch(/\.doc-figure img\{[^}]*width:100%[^}]*height:auto/);
	});
});
