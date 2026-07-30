import { describe, expect, it } from "vitest";

import { canonicalOrigin, legacyHostRedirects, legacyHosts } from "./legacy-host-redirects";

describe("legacy host redirects", () => {
	it("permanently redirects the former product subdomain to the canonical apex domain", () => {
		expect(legacyHosts).toContain("openvideo.theorvane.tech");
		expect(canonicalOrigin).toBe("https://open-video.app");
		expect(legacyHostRedirects()).toEqual([
			{
				source: "/:path*",
				has: [{ type: "host", value: "openvideo.theorvane.tech" }],
				destination: "https://open-video.app/:path*",
				permanent: true,
			},
		]);
	});
});
