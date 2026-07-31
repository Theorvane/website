import type { MetadataRoute } from "next";

import { docHref, docSlugs } from "../lib/docs/manifest";
import { defaultLocale, locales } from "../lib/docs/types";

const siteUrl = "https://openscene.app";
// Bump when published page content changes. A build timestamp would report freshness that did not happen.
const lastModified = "2026-07-31";

/** Every localized variant of a documentation route, so crawlers see one entry per language. */
function alternates(slug?: string | undefined): { readonly languages: Record<string, string> } {
	return { languages: Object.fromEntries([...locales.map((locale) => [locale, `${siteUrl}${docHref(locale, slug)}`]), ["x-default", `${siteUrl}${docHref(defaultLocale, slug)}`]]) };
}

export default function sitemap(): MetadataRoute.Sitemap {
	const docRoutes = [undefined, ...docSlugs].flatMap((slug) =>
		locales.map((locale) => ({
			url: `${siteUrl}${docHref(locale, slug)}`,
			lastModified,
			changeFrequency: "monthly" as const,
			priority: slug === undefined ? 0.8 : 0.6,
			alternates: alternates(slug),
		})),
	);

	return [{ url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 }, ...docRoutes];
}
