import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocBlocks } from "../../../components/docs/doc-blocks";
import { DocShell } from "../../../components/docs/doc-shell";
import { docGroups, docHref, docRoutes, docSlugs, findPage, isLocale, strings } from "../../../lib/docs/manifest";
import { defaultLocale, type Locale, locales } from "../../../lib/docs/types";
import "../docs.css";

const siteUrl = "https://openscene.app";

type RouteParams = { readonly slug?: string[] };

/** Resolves a documentation URL into a locale and optional page slug, rejecting anything else. */
function resolveRoute(segments: readonly string[]): { readonly locale: Locale; readonly slug?: string | undefined } | null {
	const [first, second, ...rest] = segments;
	if (rest.length > 0) return null;
	if (first === undefined) return { locale: defaultLocale };
	if (isLocale(first) && first !== defaultLocale) return second === undefined ? { locale: first } : docSlugs.includes(second) ? { locale: first, slug: second } : null;
	if (second !== undefined) return null;
	return docSlugs.includes(first) ? { locale: defaultLocale, slug: first } : null;
}

export function generateStaticParams(): RouteParams[] {
	return docRoutes().map(({ locale, slug }) => ({
		slug: [locale === defaultLocale ? null : locale, slug ?? null].filter((segment): segment is string => segment !== null),
	}));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
	const route = resolveRoute((await params).slug ?? []);
	if (!route) return {};

	const { locale, slug } = route;
	const text = strings(locale);
	const page = slug ? findPage(locale, slug) : undefined;
	const title = page ? `${page.title} — ${text.indexTitle}` : text.indexTitle;
	const description = page?.summary ?? text.indexSummary;
	const path = docHref(locale, slug);

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: { ...Object.fromEntries(locales.map((candidate) => [candidate, docHref(candidate, slug)])), "x-default": docHref(defaultLocale, slug) },
		},
		openGraph: { type: "article", url: `${siteUrl}${path}`, title, description, siteName: "OpenScene", locale: locale === "ko" ? "ko_KR" : "en_US" },
		twitter: { card: "summary_large_image", title, description },
	};
}

function schemaFor(locale: Locale, slug?: string | undefined) {
	const text = strings(locale);
	const page = slug ? findPage(locale, slug) : undefined;
	const url = `${siteUrl}${docHref(locale, slug)}`;
	const crumbs = [
		{ "@type": "ListItem", position: 1, name: "OpenScene", item: `${siteUrl}/` },
		{ "@type": "ListItem", position: 2, name: text.indexTitle, item: `${siteUrl}${docHref(locale)}` },
		...(page ? [{ "@type": "ListItem", position: 3, name: page.title, item: url }] : []),
	];

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "TechArticle",
				"@id": `${url}#article`,
				headline: page?.title ?? text.indexTitle,
				description: page?.summary ?? text.indexSummary,
				url,
				inLanguage: locale,
				isPartOf: { "@id": `${siteUrl}/#website` },
				about: { "@id": `${siteUrl}/#application` },
				publisher: { "@id": "https://theorvane.tech/#organization" },
			},
			{ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: crumbs },
		],
	};
}

function DocIndex({ locale }: { readonly locale: Locale }) {
	const text = strings(locale);
	return (
		<>
			<p className="eyebrow">{text.sidebarLabel}</p>
			<h1>{text.indexTitle}</h1>
			<p className="lede">{text.indexSummary}</p>
			<p className="doc-index__note">{text.indexLede}</p>
			<div className="doc-index">
				{docGroups.map((group) => (
					<section key={group.id} aria-label={text.groups[group.id]}>
						<h2>{text.groups[group.id]}</h2>
						<dl>
							{group.slugs.map((slug) => {
								const page = findPage(locale, slug);
								return page ? (
									<div key={slug}>
										<dt><a href={docHref(locale, slug)}>{page.title}</a></dt>
										<dd>{page.summary}</dd>
									</div>
								) : null;
							})}
						</dl>
					</section>
				))}
			</div>
		</>
	);
}

export default async function DocsPage({ params }: { params: Promise<RouteParams> }) {
	const route = resolveRoute((await params).slug ?? []);
	if (!route) notFound();

	const { locale, slug } = route;
	const page = slug ? findPage(locale, slug) : undefined;
	if (slug && !page) notFound();

	return (
		<DocShell locale={locale} slug={slug}>
			<script data-testid="openscene-docs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(locale, slug)) }} />
			{page ? (
				<article className="doc-article">
					<h1>{page.title}</h1>
					<p className="lede">{page.summary}</p>
					<DocBlocks blocks={page.blocks} />
				</article>
			) : (
				<DocIndex locale={locale} />
			)}
		</DocShell>
	);
}
