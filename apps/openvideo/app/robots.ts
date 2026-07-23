import type { MetadataRoute } from "next";

const siteUrl = "https://openvideo.theorvane.tech";

export default function robots(): MetadataRoute.Robots {
	return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
