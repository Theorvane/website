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

describe("OpenVideo technical SEO", () => {
	it("configures the approved RybbIt site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.handgarden.kr/api/script.js",
			"data-site-id": "765035acbe87",
			defer: true,
		});
	});

	it("publishes canonical and social metadata for its own apex domain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://open-video.app/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://open-video.app/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
	});

	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("OpenVideo");
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://open-video.app/sitemap.xml");
		expect(robots().host).toBe("https://open-video.app");
	});

	it("lists the home page and every localized documentation route in the sitemap", () => {
		const entries = sitemap();
		expect(entries[0]).toEqual({ url: "https://open-video.app/", lastModified: "2026-07-30", changeFrequency: "monthly", priority: 1 });
		expect(entries).toHaveLength(1 + 2 * (docSlugs.length + 1));
		for (const entry of entries) expect(entry.url.startsWith("https://open-video.app/")).toBe(true);

		const koInstall = entries.find((entry) => entry.url === "https://open-video.app/docs/ko/install");
		expect(koInstall?.alternates?.languages).toMatchObject({
			en: "https://open-video.app/docs/install",
			ko: "https://open-video.app/docs/ko/install",
			"x-default": "https://open-video.app/docs/install",
		});
	});

	it("renders factual software application and website JSON-LD", () => {
		render(createElement(HomePage));
		const schema = screen.getByTestId("openvideo-schema");
		const graph = JSON.parse(schema.textContent ?? "{}") as { "@graph"?: Array<Record<string, string>> };
		expect(graph["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					"@type": "SoftwareApplication",
					name: "OpenVideo",
					applicationCategory: "VideoApplication",
					url: "https://open-video.app/",
				}),
				expect.objectContaining({ "@type": "WebSite", name: "OpenVideo", url: "https://open-video.app/" }),
			]),
		);
	});
});
