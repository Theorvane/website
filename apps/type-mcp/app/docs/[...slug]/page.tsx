import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleToc, DocsSidebar, DocumentPager, MarkdownArticle } from "../../../components/docs/docs-components";
import { availableLocales, documentEditions, documentLocale, localizedRoute } from "../../../lib/docs/manifest";
import { getAllDocuments, getDocument } from "../../../lib/docs/repository";
import { defaultDocumentLocale, type DocumentLocale } from "../../../lib/docs/types";

const canonicalBase = "https://typemcp.theorvane.tech";

export function generateStaticParams() {
  return documentEditions().map((edition) => ({ slug: edition.document.route.replace("/docs/", "").split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const route = `/docs/${(await params).slug.join("/")}`;
  const document = await getDocument(route);
  if (!document) return {};
  const title = `${document.title} | TypeMCP`;
  const description = document.document.summary;
  return {
    title,
    description,
    alternates: { canonical: route, languages: localeAlternates(route, document.locale) },
    openGraph: { type: "article", title, description, url: `${canonicalBase}${route}`, siteName: "TypeMCP", locale: openGraphLocale(document.locale) },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Every locale this document is published in. The English route is unprefixed and also serves as
 * x-default, so a crawler that cannot match a language lands on the canonical original.
 */
function localeAlternates(route: string, locale: DocumentLocale): Record<string, string> {
  const englishRoute = locale === defaultDocumentLocale ? route : route.replace(`/docs/${locale}`, "/docs");
  const document = documentEditions().find((edition) => edition.document.route === route)?.document;
  const locales: readonly DocumentLocale[] = document ? availableLocales(document) : [defaultDocumentLocale];
  return { ...Object.fromEntries(locales.map((candidate) => [candidate, localizedRoute(englishRoute, candidate)])), "x-default": englishRoute };
}

function openGraphLocale(locale: DocumentLocale): string {
  return locale === "ko" ? "ko_KR" : "en_US";
}

/** Marks each document as technical documentation about the published package, with a crawlable trail back to it. */
function documentSchema(route: string, title: string, summary: string, locale: DocumentLocale) {
  const url = `${canonicalBase}${route}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "TechArticle", "@id": `${url}#article`, headline: title, description: summary, url, inLanguage: locale, isPartOf: { "@id": `${canonicalBase}/#website` }, about: { "@id": `${canonicalBase}/#package` }, publisher: { "@id": "https://theorvane.tech/#organization" } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "TypeMCP", item: `${canonicalBase}/` },
        { "@type": "ListItem", position: 2, name: "Documentation", item: `${canonicalBase}/docs` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ] },
    ],
  };
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const route = `/docs/${(await params).slug.join("/")}`;
  const [documents, document] = await Promise.all([getAllDocuments(documentLocale(route)), getDocument(route)]);
  if (!document) notFound();
  return <><a className="skip-link" href="#docs-content">Skip to documentation</a><script data-testid="typemcp-docs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(documentSchema(route, document.title, document.document.summary, document.locale)) }} /><header className="docs-header"><a className="logo" href="/">TYPE<span>MCP</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs">Documentation</a><a href="https://github.com/Theorvane/type-mcp" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-mcp" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header><main className="docs-layout" lang={document.locale}><DocsSidebar documents={documents} activeRoute={route} /><MarkdownArticle document={document} /><DocumentPager documents={documents} route={route} /><ArticleToc document={document} /></main></>;
}
