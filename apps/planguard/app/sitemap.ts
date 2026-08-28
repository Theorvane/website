import type { MetadataRoute } from "next";

const siteUrl = "https://planguard.theorvane.tech";
// Bump when published page content changes. A build timestamp would report freshness that did not happen.
const lastModified = "2026-08-28";

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 }];
}
