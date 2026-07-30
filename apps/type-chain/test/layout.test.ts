import { describe, expect, it } from "vitest";

import RootLayout, { metadata } from "../app/layout";
import { alt as ogAlt, contentType as ogContentType, size as ogSize } from "../app/opengraph-image";

describe("TypeChain metadata", () => {
	it("publishes canonical, indexing, and social metadata for its product subdomain", () => {
		expect(metadata.metadataBase?.toString()).toBe("https://typechain.theorvane.tech/");
		expect(metadata.alternates?.canonical).toBe("/");
		expect(metadata.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } });
		expect(metadata.openGraph?.url?.toString()).toBe("https://typechain.theorvane.tech/");
		expect((metadata.openGraph as { siteName?: string } | undefined)?.siteName).toBe("TypeChain");
		expect((metadata.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
		expect(metadata.applicationName).toBe("TypeChain");
	});

	it("publishes a rendered social preview image at the documented size", () => {
		expect(ogSize).toEqual({ width: 1200, height: 630 });
		expect(ogContentType).toBe("image/png");
		expect(ogAlt).toContain("TypeChain");
	});
});

describe("TypeChain analytics", () => {
	it("configures the approved Rybbit site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.handgarden.kr/api/script.js",
			"data-site-id": "6f862fa29286",
			defer: true,
		});
	});
});
