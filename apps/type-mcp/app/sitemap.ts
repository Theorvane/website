import type { MetadataRoute } from "next";

import { publicDocuments } from "../lib/docs/manifest";

const baseUrl = "https://typemcp.theorvane.tech";
// Bump when published page content changes. A build timestamp would report freshness that did not happen.
const lastModified = "2026-07-30";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/docs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...publicDocuments.map((document) => ({
      url: `${baseUrl}${document.route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // Published-runtime guides rank above repository-development notes and product targets.
      priority: document.classification === "published" ? 0.7 : 0.5,
    })),
  ];
}
