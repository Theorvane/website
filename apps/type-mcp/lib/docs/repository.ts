import { createHash } from "node:crypto";
import { lstat, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

import { parseDocument, type ParsedDocument } from "./parse";
import { publicDocuments, sourceCommit } from "./manifest";
import type { PublicDocument } from "./types";

const cacheRoot = resolve(process.cwd(), ".generated-docs");

interface CacheMetadata {
  readonly sourceCommit: string;
  readonly documents: readonly { readonly sourcePath: string; readonly route: string; readonly sha256: string }[];
}

function hash(content: string): string { return createHash("sha256").update(content).digest("hex"); }

function cachePath(sourcePath: string): string {
  const candidate = resolve(cacheRoot, sourcePath);
  const relativePath = relative(cacheRoot, candidate);
  if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${sep}`)) throw new Error(`Documentation path escapes cache root: ${sourcePath}`);
  return candidate;
}

async function safeRead(path: string): Promise<string> {
  const stats = await lstat(path);
  if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`Unsafe documentation cache file: ${path}`);
  return readFile(path, "utf8");
}

async function validatedCache(): Promise<CacheMetadata> {
  const rootStats = await lstat(cacheRoot);
  if (!rootStats.isDirectory() || rootStats.isSymbolicLink()) throw new Error("Unsafe documentation cache root");
  const metadata = JSON.parse(await safeRead(join(cacheRoot, "metadata.json"))) as CacheMetadata;
  if (metadata.sourceCommit !== sourceCommit || metadata.documents.length !== publicDocuments.length) throw new Error("Documentation cache metadata does not match the public manifest");
  for (const document of publicDocuments) {
    const entry = metadata.documents.find((candidate) => candidate.sourcePath === document.sourcePath && candidate.route === document.route);
    if (!entry) throw new Error(`Documentation cache metadata is missing ${document.sourcePath}`);
    const content = await safeRead(cachePath(document.sourcePath));
    if (hash(content) !== entry.sha256) throw new Error(`Documentation cache hash mismatch for ${document.sourcePath}`);
  }
  return metadata;
}

export interface RepositoryDocument extends ParsedDocument {
  readonly document: PublicDocument;
  readonly markdown: string;
  readonly sourceUrl: string;
}

export async function getDocument(route: string): Promise<RepositoryDocument | undefined> {
  await validatedCache();
  const document = publicDocuments.find((candidate) => candidate.route === route);
  if (!document) return undefined;
  const markdown = await safeRead(cachePath(document.sourcePath));
  return { document, markdown, sourceUrl: `https://github.com/Theorvane/type-mcp/blob/${sourceCommit}/${document.sourcePath}`, ...parseDocument(markdown, document) };
}

export async function getAllDocuments(): Promise<readonly RepositoryDocument[]> {
  const results: RepositoryDocument[] = [];
  for (const document of publicDocuments) {
    const result = await getDocument(document.route);
    if (!result) throw new Error(`Document disappeared from approved manifest: ${document.route}`);
    results.push(result);
  }
  return results;
}
