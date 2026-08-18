import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import RootLayout from "../app/layout";
import HomePage from "../app/page";
import { alt as ogAlt, contentType as ogContentType, size as ogSize } from "../app/opengraph-image";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { docSlugs } from "../lib/docs/manifest";

describe("OpenScene technical SEO", () => {
	it("configures the approved RybbIt site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.sanhouse.kr/api/script.js",
			"data-site-id": "c2c0972a916f",
			defer: true,
		});
	});

	it("publishes canonical and social metadata for its own apex domain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://openscene.app/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://openscene.app/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
	});

	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("OpenScene");
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://openscene.app/sitemap.xml");
		expect(robots().host).toBe("https://openscene.app");
	});

	it("lists the home page and every localized documentation route in the sitemap", () => {
		const entries = sitemap();
		expect(entries[0]).toEqual({ url: "https://openscene.app/", lastModified: "2026-07-31", changeFrequency: "monthly", priority: 1 });
		expect(entries).toHaveLength(1 + 2 * (docSlugs.length + 1));
		for (const entry of entries) expect(entry.url.startsWith("https://openscene.app/")).toBe(true);

		const koInstall = entries.find((entry) => entry.url === "https://openscene.app/docs/ko/install");
		expect(koInstall?.alternates?.languages).toMatchObject({
			en: "https://openscene.app/docs/install",
			ko: "https://openscene.app/docs/ko/install",
			"x-default": "https://openscene.app/docs/install",
		});
	});

	it("renders factual software application and website JSON-LD", () => {
		render(createElement(HomePage));
		const schema = screen.getByTestId("openscene-schema");
		const graph = JSON.parse(schema.textContent ?? "{}") as { "@graph"?: Array<Record<string, string>> };
		expect(graph["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					"@type": "SoftwareApplication",
					name: "OpenScene",
					applicationCategory: "VideoApplication",
					url: "https://openscene.app/",
				}),
				expect.objectContaining({ "@type": "WebSite", name: "OpenScene", url: "https://openscene.app/" }),
			]),
		);
	});
});
