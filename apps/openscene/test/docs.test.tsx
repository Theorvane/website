import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsPage, { generateMetadata, generateStaticParams } from "../app/docs/[[...slug]]/page";
import { docSlugs } from "../lib/docs/manifest";

async function renderRoute(slug: string[]) {
	render(await DocsPage({ params: Promise.resolve({ slug }) }));
}

describe("OpenScene documentation routes", () => {
	it("prerenders an index and every page for both locales", () => {
		const params = generateStaticParams();
		expect(params).toContainEqual({ slug: [] });
		expect(params).toContainEqual({ slug: ["ko"] });
		expect(params).toContainEqual({ slug: ["install"] });
		expect(params).toContainEqual({ slug: ["ko", "install"] });
		expect(params).toHaveLength(2 * (docSlugs.length + 1));
	});

	it("renders the English index with a group listing", async () => {
		await renderRoute([]);
		const main = within(screen.getByRole("main"));
		expect(main.getByRole("heading", { level: 1, name: "OpenScene documentation" })).toBeDefined();
		expect(main.getByRole("link", { name: "Install and run" }).getAttribute("href")).toBe("/docs/install");
	});

	it("renders the English data and privacy ad disclosure", async () => {
		await renderRoute(["data-and-privacy"]);
		const main = screen.getByRole("main");
		expect(main.textContent).toContain("A banner ad may appear above the tab bar on project screens (the timeline, generation and library tabs), and an interstitial ad may appear only after a video export completes successfully.");
		expect(main.textContent).not.toContain("in Settings");
	});

	it("renders a Korean page from its own path", async () => {
		await renderRoute(["ko", "install"]);
		expect(screen.getByRole("heading", { level: 1, name: "설치와 실행" })).toBeDefined();
		expect(screen.getByRole("link", { name: "한국어" }).getAttribute("aria-current")).toBe("true");
	});

	it("declares the language of a translated subtree the root layout cannot", async () => {
		const { container } = render(await DocsPage({ params: Promise.resolve({ slug: ["ko", "install"] }) }));
		expect(container.querySelector(".doc-layout")?.getAttribute("lang")).toBe("ko");
	});

	it("offers both language variants of the page you are reading", async () => {
		await renderRoute(["install"]);
		expect(screen.getByRole("link", { name: "한국어" }).getAttribute("href")).toBe("/docs/ko/install");
		expect(screen.getByRole("link", { name: "English" }).getAttribute("href")).toBe("/docs/install");
	});

	it("renders screenshots with reserved dimensions and descriptive alternative text", async () => {
		await renderRoute(["workspace"]);
		const shot = screen.getByRole("img", { name: /editing workspace/i });
		expect(shot.getAttribute("src")).toBe("/docs/editor.png");
		expect(shot.getAttribute("width")).toBe("1440");
		expect(shot.getAttribute("height")).toBe("860");
		expect(shot.getAttribute("loading")).toBe("lazy");
	});

	it("publishes per-page canonical and hreflang metadata", async () => {
		const metadata = await generateMetadata({ params: Promise.resolve({ slug: ["ko", "install"] }) });
		expect(metadata.alternates?.canonical).toBe("/docs/ko/install");
		expect(metadata.alternates?.languages).toMatchObject({ en: "/docs/install", ko: "/docs/ko/install", "x-default": "/docs/install" });
		expect(metadata.openGraph?.url).toBe("https://openscene.app/docs/ko/install");
		expect((metadata.openGraph as { locale?: string } | undefined)?.locale).toBe("ko_KR");
	});

	it("renders TechArticle and breadcrumb JSON-LD for a page", async () => {
		await renderRoute(["install"]);
		const graph = JSON.parse(screen.getByTestId("openscene-docs-schema").textContent ?? "{}") as { "@graph"?: Array<Record<string, unknown>> };
		expect(graph["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ "@type": "TechArticle", url: "https://openscene.app/docs/install", inLanguage: "en" }),
				expect.objectContaining({ "@type": "BreadcrumbList" }),
			]),
		);
	});

	it("links to the previous and next page in reading order", async () => {
		await renderRoute(["projects"]);
		const pagination = within(screen.getByRole("navigation", { name: /previous/i }));
		expect(pagination.getByRole("link", { name: /Install and run/ }).getAttribute("href")).toBe("/docs/install");
		expect(pagination.getByRole("link", { name: /The workspace/ }).getAttribute("href")).toBe("/docs/workspace");
	});

	it("refuses an unknown slug and a locale-prefixed default", async () => {
		await expect(renderRoute(["not-a-page"])).rejects.toThrow();
		await expect(renderRoute(["en", "install"])).rejects.toThrow();
		await expect(renderRoute(["ko", "install", "extra"])).rejects.toThrow();
	});
});
