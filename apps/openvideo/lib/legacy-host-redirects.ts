import type { NextConfig } from "next";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

/** Hostnames OpenVideo was published under before `open-video.app` became canonical. */
export const legacyHosts = ["openvideo.theorvane.tech"] as const;

export const canonicalOrigin = "https://open-video.app";

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
