import type { MetadataRoute } from "next";

import { publicDocuments } from "../lib/docs/manifest";

const baseUrl = "https://typemcp.theorvane.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl },
    { url: `${baseUrl}/docs` },
    ...publicDocuments.map((document) => ({ url: `${baseUrl}${document.route}` })),
  ];
}
