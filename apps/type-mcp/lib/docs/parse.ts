import { dirname, normalize, posix } from "node:path";

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

function withoutFences(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, "");
}

function resolveSourceLink(href: string, document: PublicDocument): { targetPath: string; route: string | undefined } | undefined {
  if (!href.endsWith(".md") && !href.includes(".md#")) return undefined;
  const [path, fragment] = href.split("#", 2);
  const targetPath = normalize(posix.join(dirname(document.sourcePath), path!)).replace(/\\/g, "/");
  const route = publicDocuments.find((candidate) => candidate.sourcePath === targetPath)?.route;
  return { targetPath, route: route ? `${route}${fragment ? `#${fragment}` : ""}` : undefined };
}

export function parseDocument(markdown: string, document: PublicDocument): ParsedDocument {
  const source = withoutFences(markdown);
  const headings = Array.from(source.matchAll(/^(#{1,3})\s+(.+?)\s*#*\s*$/gm));
  const h1 = headings.find((heading) => heading[1] === "#");
  if (!h1) throw new Error(`Missing title for ${document.sourcePath}`);
  const ids = new Set<string>();
  const toc: TocEntry[] = [];
  for (const heading of headings) {
    const depth = heading[1]!.length;
    const title = heading[2]!.trim();
    const id = slugify(title);
    if (ids.has(id)) throw new Error(`Duplicate heading identifier ${id} in ${document.sourcePath}`);
    ids.add(id);
    if (depth === 2 || depth === 3) toc.push({ depth, id, title });
  }
  const internalLinks = new Map<string, string>();
  for (const match of Array.from(source.matchAll(/\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g))) {
    const href = match[1]!;
    if (/^(?:javascript|data|vbscript):/i.test(href)) throw new Error(`Unsafe link in ${document.sourcePath}: ${href}`);
    const target = resolveSourceLink(href, document);
    if (target?.route) internalLinks.set(href, target.route);
    else if (target?.targetPath.startsWith("docs/")) throw new Error(`Unknown documentation link in ${document.sourcePath}: ${href}`);
  }
  return { title: h1[2]!.trim(), toc, internalLinks };
}
