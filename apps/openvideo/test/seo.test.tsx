import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import HomePage from "../app/page";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("OpenVideo technical SEO", () => {
	it("publishes canonical and social metadata for its product subdomain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://openvideo.theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toEqual({ index: true, follow: true });
		expect(metadata.openGraph?.url?.toString()).toBe("https://openvideo.theorvane.tech/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary");
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://openvideo.theorvane.tech/sitemap.xml");
		expect(sitemap()).toEqual([{ url: "https://openvideo.theorvane.tech/" }]);
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
					url: "https://openvideo.theorvane.tech/",
				}),
				expect.objectContaining({ "@type": "WebSite", name: "OpenVideo", url: "https://openvideo.theorvane.tech/" }),
			]),
		);
	});
});
