import { describe, expect, it } from "vitest";

import { parseInline, toAnchorId, toPlainText } from "./inline";

describe("documentation inline vocabulary", () => {
	it("splits code, strong, and link spans out of surrounding prose", () => {
		expect(parseInline("Set `FFMPEG` in **Settings** — see [docs](/docs/install).")).toEqual([
			{ kind: "text", text: "Set " },
			{ kind: "code", text: "FFMPEG" },
			{ kind: "text", text: " in " },
			{ kind: "strong", text: "Settings" },
			{ kind: "text", text: " — see " },
			{ kind: "link", text: "docs", href: "/docs/install" },
			{ kind: "text", text: "." },
		]);
	});

	it("never re-reads a backticked span as emphasis or a link", () => {
		expect(parseInline("`**not strong**`")).toEqual([{ kind: "code", text: "**not strong**" }]);
	});

	it("refuses a scheme that could execute, matching the synced portals", () => {
		for (const href of ["javascript:alert1", "JavaScript:alert1", "data:text/html,<script>", "vbscript:msgbox"]) {
			expect(parseInline(`[click](${href})`)).toEqual([{ kind: "link", text: "click", href: "#" }]);
		}
		expect(parseInline("[docs](/docs/install)")).toEqual([{ kind: "link", text: "docs", href: "/docs/install" }]);
		expect(parseInline("[site](https://open-video.app/)")).toEqual([{ kind: "link", text: "site", href: "https://open-video.app/" }]);
	});

	it("emits unmatched markup verbatim rather than dropping prose", () => {
		expect(parseInline("100% local, no * emphasis")).toEqual([{ kind: "text", text: "100% local, no * emphasis" }]);
	});

	it("derives anchors from the visible text of a heading", () => {
		expect(toPlainText("Pointing at your `ffmpeg`")).toBe("Pointing at your ffmpeg");
		expect(toAnchorId("Pointing at your `ffmpeg`")).toBe("pointing-at-your-ffmpeg");
	});

	it("keeps non-latin headings addressable", () => {
		expect(toAnchorId("설치와 실행")).toBe("설치와-실행");
	});
});
