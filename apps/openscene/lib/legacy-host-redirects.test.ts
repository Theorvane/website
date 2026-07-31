import { describe, expect, it } from "vitest";

import { canonicalOrigin, legacyHostRedirects, legacyHosts } from "./legacy-host-redirects";

describe("legacy host redirects", () => {
	it("permanently redirects every former product hostname to the canonical apex domain", () => {
		expect(legacyHosts).toEqual(["openvideo.theorvane.tech", "open-video.app", "www.open-video.app"]);
		expect(canonicalOrigin).toBe("https://openscene.app");
		expect(legacyHostRedirects()).toEqual(
			["openvideo.theorvane.tech", "open-video.app", "www.open-video.app"].map((host) => ({
				source: "/:path*",
				has: [{ type: "host", value: host }],
				destination: "https://openscene.app/:path*",
				permanent: true,
			})),
		);
	});
});
