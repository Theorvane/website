import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Theorvane Scroll World responsive contract", () => {
	it("uses a sticky stage, visible large scene targets, and resilient compact/reduced-motion rules", async () => {
		const css = await readFile("app/globals.css", "utf8");

		expect(css).toMatch(/\.scroll-world\{[^}]*position:relative/);
		expect(css).toMatch(/\.scroll-world__stage\{[^}]*position:sticky[^}]*top:0/);
		expect(css).toMatch(/\.scroll-world__scene-nav a\{[^}]*min-height:44px/);
		expect(css).toMatch(/@media\(max-width:700px\)\{[\s\S]*?\.scroll-world__stage/);
		expect(css).toMatch(/@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?\.scroll-world/);
		expect(css).toMatch(/\.ambient-world\{[^}]*pointer-events:none/);
		expect(css).toMatch(/\.ambient-world\{[^}]*position:fixed/);
		expect(css).toMatch(/\.ambient-world__grid\{/);
		expect(css).toMatch(/\.video-hero\{[^}]*position:absolute/);
	});
});
