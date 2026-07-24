import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleToc, DocsSidebar, MarkdownArticle } from "../../../components/docs/docs-components";
import { publicDocuments } from "../../../lib/docs/manifest";
import { getAllDocuments, getDocument } from "../../../lib/docs/repository";

const canonicalBase = "https://typemcp.theorvane.tech";

export function generateStaticParams() {
  return publicDocuments.map((document) => ({ slug: document.route.replace("/docs/", "").split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const route = `/docs/${(await params).slug.join("/")}`;
  const document = await getDocument(route);
  if (!document) return {};
  return { title: `${document.title} | TypeMCP`, description: document.document.summary, alternates: { canonical: route }, openGraph: { title: `${document.title} | TypeMCP`, description: document.document.summary, url: `${canonicalBase}${route}` } };
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const route = `/docs/${(await params).slug.join("/")}`;
  const [documents, document] = await Promise.all([getAllDocuments(), getDocument(route)]);
  if (!document) notFound();
  return <><a className="skip-link" href="#docs-content">Skip to documentation</a><header className="docs-header"><a className="logo" href="/">TYPE<span>MCP</span></a><nav aria-label="Primary"><a href="/">Product</a><a href="/docs">Documentation</a><a href="https://github.com/Theorvane/type-mcp" target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">(opens in a new tab)</span></a><a href="https://www.npmjs.com/package/@theorvane/type-mcp" target="_blank" rel="noopener noreferrer">npm <span className="sr-only">(opens in a new tab)</span></a></nav></header><main className="docs-layout"><DocsSidebar documents={documents} activeRoute={route} /><MarkdownArticle document={document} /><ArticleToc document={document} /></main></>;
}
