import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("TypeChain documentation layout", () => {
	it("keeps a desktop navigation copy outside the disclosure", async () => {
		const css = await readFile("app/globals.css", "utf8");

		// A single nav inside a closed <details> is invisible: browsers hide closed details content with
		// ::details-content{content-visibility:hidden}, which no child display rule can reveal. The layout
		// therefore renders a desktop copy outside the disclosure and swaps to the mobile copy by CSS.
		expect(css).not.toMatch(/details:not\(\[open\]\)\s*>\s*nav/);
		expect(css).toMatch(/\.docs-sidebar \.docs-sidebar-mobile\{[^}]*display:none/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.docs-sidebar \.docs-sidebar-desktop\{[^}]*display:none/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.docs-sidebar \.docs-sidebar-mobile\{[^}]*display:block/);
	});

	it("styles the group label the component actually renders", async () => {
		const css = await readFile("app/globals.css", "utf8");

		// The stylesheet used to target .docs-sidebar h2 while the component renders p.docs-sidebar-group.
		expect(css).toMatch(/\.docs-sidebar-group\{[^}]*text-transform:uppercase/);
	});

	it("keeps wide documentation blocks scrolling inside their own container", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/\.code-scroll,\.table-scroll\{[^}]*overflow-x:auto/);
		// The pre must size to its content, or only its ink overflows and the wrapper never scrolls.
		expect(css).toMatch(/\.markdown-article pre\{[^}]*width:max-content[^}]*min-width:100%/);
		expect(css).toMatch(/\.markdown-article img\{[^}]*max-width:100%[^}]*height:auto/);
	});
});
