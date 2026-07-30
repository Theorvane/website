import { describe, expect, it } from "vitest";

import { docGroups, docHref, docRoutes, docSlugs, findPage, neighbours, strings, validateContent } from "./manifest";
import { locales } from "./types";

describe("documentation manifest", () => {
	it("keeps every outlined page translated in both locales", () => {
		expect(() => validateContent()).not.toThrow();
		expect(docSlugs.length).toBeGreaterThanOrEqual(10);
		for (const locale of locales) for (const slug of docSlugs) expect(findPage(locale, slug), `${locale}/${slug}`).toBeDefined();
	});

	it("names every group in every locale", () => {
		for (const locale of locales) for (const group of docGroups) expect(strings(locale).groups[group.id]).toBeTruthy();
	});

	it("serves English unprefixed and other locales under their own segment", () => {
		expect(docHref("en")).toBe("/docs");
		expect(docHref("en", "install")).toBe("/docs/install");
		expect(docHref("ko")).toBe("/docs/ko");
		expect(docHref("ko", "install")).toBe("/docs/ko/install");
	});

	it("chains reading order without wrapping around the ends", () => {
		expect(docSlugs[0]).toBe("overview");
		expect(docSlugs[docSlugs.length - 1]).toBe("troubleshooting");
		expect(neighbours("overview")).toEqual({ previous: undefined, next: "install" });
		expect(neighbours("install")).toEqual({ previous: "overview", next: "projects" });
		expect(neighbours("troubleshooting")).toEqual({ previous: "data-and-privacy", next: undefined });
		expect(neighbours("not-a-page")).toEqual({});
	});

	it("enumerates an index plus every page for each locale", () => {
		expect(docRoutes()).toHaveLength(locales.length * (docSlugs.length + 1));
	});

	it("rejects an unknown slug instead of rendering an empty page", () => {
		expect(findPage("en", "not-a-page")).toBeUndefined();
	});
});
