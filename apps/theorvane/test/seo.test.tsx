import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import HomePage from "../app/page";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("Theorvane technical SEO", () => {
	it("publishes canonical and social metadata for the apex domain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toEqual({ index: true, follow: true });
		expect(metadata.openGraph?.url?.toString()).toBe("https://theorvane.tech/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary");
		expect(metadata.icons).toEqual({
			icon: [{ url: "/icon.png", sizes: "460x460", type: "image/png" }],
			apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
			shortcut: ["/favicon.ico"],
		});
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://theorvane.tech/sitemap.xml");
		expect(sitemap()).toEqual([{ url: "https://theorvane.tech/" }]);
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
});
