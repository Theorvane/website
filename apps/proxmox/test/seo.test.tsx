import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import HomePage from "../app/page";
import { alt as ogAlt, contentType as ogContentType, size as ogSize } from "../app/opengraph-image";
import robots from "../app/robots";
import sitemap from "../app/sitemap";

describe("Proxmox MCP technical SEO", () => {
	it("publishes canonical and social metadata for the subdomain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://proxmox.theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.applicationName).toBe("Proxmox MCP");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://proxmox.theorvane.tech/");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
	});

	it("publishes crawl directives and a canonical sitemap", () => {
		expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
		expect(robots().sitemap).toBe("https://proxmox.theorvane.tech/sitemap.xml");
		expect(robots().host).toBe("https://proxmox.theorvane.tech");
		expect(sitemap()).toEqual([{ url: "https://proxmox.theorvane.tech/", lastModified: "2026-08-28", changeFrequency: "monthly", priority: 1 }]);
	});

	it("renders SoftwareApplication JSON-LD naming Theorvane as publisher", () => {
		render(createElement(HomePage));
		const schema = screen.getByTestId("product-schema");
		const parsed = JSON.parse(schema.textContent ?? "{}") as { "@type"?: string; name?: string; publisher?: { name?: string } };
		expect(parsed["@type"]).toBe("SoftwareApplication");
		expect(parsed.name).toBe("Proxmox MCP");
		expect(parsed.publisher?.name).toBe("Theorvane");
	});

	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("Proxmox");
	});
});
