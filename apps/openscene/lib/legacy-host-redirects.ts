import type { NextConfig } from "next";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

/** Hostnames OpenScene was published under before `openscene.app` became canonical. */
export const legacyHosts = ["openvideo.theorvane.tech", "open-video.app", "www.open-video.app"] as const;

export const canonicalOrigin = "https://openscene.app";

/**
 * Permanently redirects every legacy hostname to the canonical origin, preserving the path,
 * so existing links and accumulated search signals transfer instead of splitting across hosts.
 * Each legacy host must stay attached to this deployment for these rules to be reached.
 */
export function legacyHostRedirects(): Redirects {
	return legacyHosts.map((host) => ({
		source: "/:path*",
		has: [{ type: "host" as const, value: host }],
		destination: `${canonicalOrigin}/:path*`,
		permanent: true,
	}));
}
