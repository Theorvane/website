import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open, type FileHandle } from "node:fs/promises";
import { resolve } from "node:path";

import { publicDocuments, sourceCommit } from "./manifest";
import { parseDocument, type ParsedDocument } from "./parse";
import type { PublicDocument } from "./types";

const cacheRoot = resolve(process.cwd(), ".generated-docs");
const publicationRetryDelayMs = 5;
const publicationRetryTimeoutMs = 15_000;

interface CacheMetadata {
  readonly sourceCommit: string;
  readonly documents: readonly { readonly sourcePath: string; readonly route: string; readonly sha256: string }[];
}

function hash(content: string): string { return createHash("sha256").update(content).digest("hex"); }

function safeSegments(sourcePath: string): string[] {
  const segments = sourcePath.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) throw new Error(`Unsafe documentation cache path: ${sourcePath}`);
  return segments;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

async function readTrustedTextOnce(root: string, sourcePath: string): Promise<string> {
  const rootHandle = await open(root, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
  const parentHandles: FileHandle[] = [];
  let fileHandle: FileHandle | undefined;

  try {
    if (!(await rootHandle.stat()).isDirectory()) throw new Error("Unsafe documentation cache root");
    const segments = safeSegments(sourcePath);
    let parent = rootHandle;

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]!;
      const descriptorPath = `/proc/self/fd/${parent.fd}/${segment}`;
      if (index === segments.length - 1) {
        fileHandle = await open(descriptorPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
        if (!(await fileHandle.stat()).isFile()) throw new Error(`Unsafe documentation cache file: ${sourcePath}`);
        return fileHandle.readFile({ encoding: "utf8" });
      }

      const child = await open(descriptorPath, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
      if (!(await child.stat()).isDirectory()) throw new Error(`Unsafe documentation cache directory: ${sourcePath}`);
      parentHandles.push(child);
      parent = child;
    }
    throw new Error(`Unsafe documentation cache path: ${sourcePath}`);
  } finally {
    await fileHandle?.close();
    for (const handle of parentHandles.reverse()) await handle.close();
    await rootHandle.close();
  }
}

/**
 * Reads through descriptor-pinned directory handles. If publication briefly
 * rotates the live cache pathname, retry ENOENT until a complete cache appears.
 */
export interface TrustedReadOptions {
  /** Test seam invoked after a read observes a temporarily absent live cache. */
  readonly onPublicationRetry?: () => void;
}

export async function readTrustedText(root: string, sourcePath: string, { onPublicationRetry }: TrustedReadOptions = {}): Promise<string> {
  const deadline = Date.now() + publicationRetryTimeoutMs;
  let reportedRetry = false;
  while (true) {
    try {
      return await readTrustedTextOnce(root, sourcePath);
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT" || Date.now() >= deadline) throw error;
      if (!reportedRetry) {
        onPublicationRetry?.();
        reportedRetry = true;
      }
      await delay(publicationRetryDelayMs);
    }
  }
}

async function validatedCache(): Promise<CacheMetadata> {
  const metadata = JSON.parse(await readTrustedText(cacheRoot, "metadata.json")) as CacheMetadata;
  if (metadata.sourceCommit !== sourceCommit || metadata.documents.length !== publicDocuments.length) throw new Error("Documentation cache metadata does not match the public manifest");
  for (const document of publicDocuments) {
    const entry = metadata.documents.find((candidate) => candidate.sourcePath === document.sourcePath && candidate.route === document.route);
    if (!entry) throw new Error(`Documentation cache metadata is missing ${document.sourcePath}`);
    const content = await readTrustedText(cacheRoot, document.sourcePath);
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
  const markdown = await readTrustedText(cacheRoot, document.sourcePath);
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
