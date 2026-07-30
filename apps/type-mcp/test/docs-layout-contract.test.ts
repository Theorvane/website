import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("TypeMCP documentation layout", () => {
	it("keeps the sidebar visible without relying on a disclosure widget", async () => {
		const css = await readFile("app/globals.css", "utf8");

		// Browsers hide closed <details> content with ::details-content{content-visibility:hidden}, so an
		// override on a child's display no longer reveals it. The sidebar must not depend on that trick.
		expect(css).not.toMatch(/\.docs-sidebar details/);
		expect(css).not.toMatch(/\.docs-sidebar summary/);
		expect(css).toMatch(/\.docs-sidebar\{[^}]*display:block[^}]*position:sticky/);
	});

	it("reads the article before the index on narrow screens", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.docs-layout\{[^}]*grid-template-columns:1fr/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.markdown-article\{[^}]*order:1/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.docs-sidebar\{[^}]*order:3[^}]*position:static/);
	});

	it("keeps wide documentation blocks scrolling inside their own container", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/\.code-scroll,\.table-scroll\{[^}]*overflow-x:auto/);
		// The pre must size to its content, or only its ink overflows and the wrapper never scrolls.
		expect(css).toMatch(/\.markdown-article pre\{[^}]*width:max-content[^}]*min-width:100%/);
		expect(css).toMatch(/\.markdown-article img\{[^}]*max-width:100%[^}]*height:auto/);
	});
});
