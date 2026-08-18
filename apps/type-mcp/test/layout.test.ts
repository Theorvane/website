import { describe, expect, it } from "vitest";

import { metadata } from "../app/layout";
import RootLayout from "../app/layout";
import { alt as ogAlt, contentType as ogContentType, size as ogSize } from "../app/opengraph-image";

describe("TypeMCP metadata", () => {
	it("configures the approved RybbIt site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.sanhouse.kr/api/script.js",
			"data-site-id": "c37c7591084c",
			defer: true,
		});
	});

	it("describes the published validated runtime", () => {
		expect(metadata.title).toContain("strict TypeScript MCP runtime");
		expect(metadata.description).toContain("validate, and compile");
		expect(metadata.description).toMatch(/MCP server surfaces/i);
	});

	it("publishes canonical, indexing, and social metadata for its product subdomain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://typemcp.theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://typemcp.theorvane.tech/");
		expect((metadata.openGraph as { siteName?: string } | undefined)?.siteName).toBe("TypeMCP");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
		expect(metadata.applicationName).toBe("TypeMCP");
	});

	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("TypeMCP");
	});
});
