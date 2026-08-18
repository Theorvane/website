import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import RootLayout from "../app/layout";
import HomePage from "../app/page";
import { alt as ogAlt, contentType as ogContentType, size as ogSize } from "../app/opengraph-image";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("Theorvane technical SEO", () => {
	it("configures the approved RybbIt site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.sanhouse.kr/api/script.js",
			"data-site-id": "13051a0ca43f",
			defer: true,
		});
	});

	it("publishes canonical and social metadata for the apex domain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://theorvane.tech/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
		expect(metadata.icons).toEqual({
			icon: [{ url: "/icon.png", sizes: "460x460", type: "image/png" }],
			apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
			shortcut: ["/favicon.ico"],
		});
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://theorvane.tech/sitemap.xml");
	});

	it("renders accurate organization and website JSON-LD", () => {
		render(createElement(HomePage));
		const schema = screen.getByTestId("organization-schema");
		const graph = JSON.parse(schema.textContent ?? "{}") as { "@graph"?: Array<Record<string, string>> };
		expect(graph["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ "@type": "Organization", name: "Theorvane", url: "https://theorvane.tech/" }),
				expect.objectContaining({ "@type": "WebSite", name: "Theorvane", url: "https://theorvane.tech/" }),
			]),
		);
	});
	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("Theorvane");
	});

	it("declares the canonical host and a dated sitemap entry", () => {
		expect(robots().host).toBe("https://theorvane.tech");
		expect(sitemap()).toEqual([{ url: "https://theorvane.tech/", lastModified: "2026-07-31", changeFrequency: "monthly", priority: 1 }]);
	});
});
