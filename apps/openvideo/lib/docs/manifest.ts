import { enPages, enStrings } from "./content.en";
import { koPages, koStrings } from "./content.ko";
import { type DocGroup, type DocPage, defaultLocale, type Locale, type LocaleStrings, locales } from "./types";

export const docGroups: readonly DocGroup[] = [
	{ id: "start", slugs: ["overview", "install", "projects"] },
	{ id: "editing", slugs: ["workspace", "timeline", "export"] },
	{ id: "agent", slugs: ["edit-agent", "agent-tools"] },
	{ id: "models", slugs: ["providers", "voice-generation", "video-generation"] },
	{ id: "reference", slugs: ["settings", "data-and-privacy", "troubleshooting"] },
];

/** Reading order across the whole set, used for previous/next links and sitemap order. */
export const docSlugs: readonly string[] = docGroups.flatMap((group) => group.slugs);

const pagesByLocale: Readonly<Record<Locale, Readonly<Record<string, DocPage>>>> = { en: enPages, ko: koPages };
const stringsByLocale: Readonly<Record<Locale, LocaleStrings>> = { en: enStrings, ko: koStrings };

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function strings(locale: Locale): LocaleStrings {
	return stringsByLocale[locale];
}

export function findPage(locale: Locale, slug: string): DocPage | undefined {
	return docSlugs.includes(slug) ? pagesByLocale[locale][slug] : undefined;
}

/** The site path for a documentation route. English is the unprefixed default. */
export function docHref(locale: Locale, slug?: string | undefined): string {
	const segments = [locale === defaultLocale ? null : locale, slug].filter((segment): segment is string => Boolean(segment));
	return `/docs${segments.map((segment) => `/${segment}`).join("")}`;
}

export function neighbours(slug: string): { readonly previous?: string | undefined; readonly next?: string | undefined } {
	const index = docSlugs.indexOf(slug);
	if (index < 0) return {};
	return { previous: docSlugs[index - 1], next: docSlugs[index + 1] };
}

/** Every documentation route, both locales, index pages first. */
export function docRoutes(): readonly { readonly locale: Locale; readonly slug?: string | undefined }[] {
	return locales.flatMap((locale) => [{ locale }, ...docSlugs.map((slug) => ({ locale, slug }))]);
}

export function validateContent(): void {
	const seen = new Set<string>();
	for (const slug of docSlugs) {
		if (!/^[a-z][a-z0-9-]*$/.test(slug)) throw new Error(`documentation slug must be lower-case kebab-case: ${slug}`);
		if (seen.has(slug)) throw new Error(`duplicate documentation slug: ${slug}`);
		seen.add(slug);
		for (const locale of locales) {
			const page = pagesByLocale[locale][slug];
			if (!page) throw new Error(`missing ${locale} translation: ${slug}`);
			if (!page.title.trim() || !page.summary.trim()) throw new Error(`title and summary required: ${locale}/${slug}`);
			if (page.blocks.length === 0) throw new Error(`page body required: ${locale}/${slug}`);
		}
	}
	for (const locale of locales) {
		const extra = Object.keys(pagesByLocale[locale]).filter((slug) => !seen.has(slug));
		if (extra.length > 0) throw new Error(`page not listed in an outline group: ${locale}/${extra[0]}`);
	}
}

validateContent();
