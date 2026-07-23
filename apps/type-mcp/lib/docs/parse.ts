import { dirname, normalize, posix } from "node:path";
import { toString } from "mdast-util-to-string";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import type { Heading, Link, LinkReference, Root } from "mdast";

import { publicDocuments } from "./manifest";
import type { PublicDocument } from "./types";

export interface TocEntry {
  readonly depth: 2 | 3;
  readonly id: string;
  readonly title: string;
}

export interface ParsedDocument {
  readonly title: string;
  readonly toc: readonly TocEntry[];
  readonly internalLinks: ReadonlyMap<string, string>;
}

export function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[`*_~]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

function resolveSourceLink(href: string, document: PublicDocument): { targetPath: string; route: string | undefined } | undefined {
  if (!href.endsWith(".md") && !href.includes(".md#")) return undefined;
  const [path, fragment] = href.split("#", 2);
  const targetPath = normalize(posix.join(dirname(document.sourcePath), path!)).replace(/\\/g, "/");
  const route = publicDocuments.find((candidate) => candidate.sourcePath === targetPath)?.route;
  return { targetPath, route: route ? `${route}${fragment ? `#${fragment}` : ""}` : undefined };
}

function assertSafeLink(href: string, document: PublicDocument, internalLinks: Map<string, string>): void {
  if (/^(?:javascript|data|vbscript):/i.test(href)) throw new Error(`Unsafe link in ${document.sourcePath}: ${href}`);
  const target = resolveSourceLink(href, document);
  if (target?.route) internalLinks.set(href, target.route);
  else if (target?.targetPath.startsWith("docs/")) throw new Error(`Unknown documentation link in ${document.sourcePath}: ${href}`);
}

export function parseDocument(markdown: string, document: PublicDocument): ParsedDocument {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const headings: Heading[] = [];
  const definitions = new Map<string, string>();
  const links: (Link | LinkReference)[] = [];

  visit(tree, (node) => {
    if (node.type === "heading") headings.push(node);
    else if (node.type === "definition") definitions.set(node.identifier, node.url);
    else if (node.type === "link" || node.type === "linkReference") links.push(node);
  });

  const h1 = headings.find((heading) => heading.depth === 1);
  if (!h1) throw new Error(`Missing title for ${document.sourcePath}`);
  const ids = new Set<string>();
  const toc: TocEntry[] = [];
  for (const heading of headings) {
    const title = toString(heading).trim();
    const id = slugify(title);
    if (!id || ids.has(id)) throw new Error(`Duplicate heading identifier ${id} in ${document.sourcePath}`);
    ids.add(id);
    if (heading.depth === 2 || heading.depth === 3) toc.push({ depth: heading.depth, id, title });
  }

  const internalLinks = new Map<string, string>();
  for (const link of links) {
    const href = link.type === "link" ? link.url : definitions.get(link.identifier);
    if (href) assertSafeLink(href, document, internalLinks);
  }
  return { title: toString(h1).trim(), toc, internalLinks };
}
