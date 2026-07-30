import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open, type FileHandle } from "node:fs/promises";
import { join, resolve } from "node:path";

import { documentEditions, editionsForLocale, findEdition, sourceCommit } from "./manifest";
import { parseDocument, type ParsedDocument } from "./parse";
import { defaultDocumentLocale, type DocumentLocale, type PublicDocument } from "./types";

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

/**
 * Linux publishes an open directory descriptor as a traversable path under
 * /proc/self/fd, which pins each parent against a rename between the check and
 * the open. macOS has no equivalent — /dev/fd/<fd> is not traversable — so the
 * walk falls back to joined paths there. Every component is still opened
 * O_NOFOLLOW, so a symlinked component is refused rather than followed; only
 * the extra rename-race protection is unavailable.
 */
let descriptorTraversal: Promise<boolean> | undefined;

function supportsDescriptorTraversal(): Promise<boolean> {
  descriptorTraversal ??= (async () => {
    let handle: FileHandle | undefined;
    try {
      handle = await open(".", constants.O_RDONLY | constants.O_DIRECTORY);
      const probe = await open(`/proc/self/fd/${handle.fd}`, constants.O_RDONLY | constants.O_DIRECTORY);
      await probe.close();
      return true;
    } catch {
      return false;
    } finally {
      await handle?.close();
    }
  })();
  return descriptorTraversal;
}

async function readTrustedTextOnce(root: string, sourcePath: string): Promise<string> {
  const pinned = await supportsDescriptorTraversal();
  const rootHandle = await open(root, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
  const parentHandles: FileHandle[] = [];
  let fileHandle: FileHandle | undefined;

  try {
    if (!(await rootHandle.stat()).isDirectory()) throw new Error("Unsafe documentation cache root");
    const segments = safeSegments(sourcePath);
    let parent = rootHandle;
    let parentPath = root;

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]!;
      const joinedPath = join(parentPath, segment);
      const descriptorPath = pinned ? `/proc/self/fd/${parent.fd}/${segment}` : joinedPath;
      if (index === segments.length - 1) {
        fileHandle = await open(descriptorPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
        if (!(await fileHandle.stat()).isFile()) throw new Error(`Unsafe documentation cache file: ${sourcePath}`);
        return fileHandle.readFile({ encoding: "utf8" });
      }

      const child = await open(descriptorPath, constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW);
      if (!(await child.stat()).isDirectory()) throw new Error(`Unsafe documentation cache directory: ${sourcePath}`);
      parentHandles.push(child);
      parent = child;
      parentPath = joinedPath;
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
  const editions = documentEditions();
  if (metadata.sourceCommit !== sourceCommit || metadata.documents.length !== editions.length) throw new Error("Documentation cache metadata does not match the public manifest");
  for (const { document, sourcePath } of editions) {
    const entry = metadata.documents.find((candidate) => candidate.sourcePath === sourcePath && candidate.route === document.route);
    if (!entry) throw new Error(`Documentation cache metadata is missing ${sourcePath}`);
    const content = await readTrustedText(cacheRoot, sourcePath);
    if (hash(content) !== entry.sha256) throw new Error(`Documentation cache hash mismatch for ${sourcePath}`);
  }
  return metadata;
}

export interface RepositoryDocument extends ParsedDocument {
  readonly document: PublicDocument;
  readonly locale: DocumentLocale;
  readonly markdown: string;
  readonly sourceUrl: string;
}

export async function getDocument(route: string): Promise<RepositoryDocument | undefined> {
  await validatedCache();
  const edition = findEdition(route);
  if (!edition) return undefined;
  const markdown = await readTrustedText(cacheRoot, edition.sourcePath);
  return { document: edition.document, locale: edition.locale, markdown, sourceUrl: `https://github.com/Theorvane/type-mcp/blob/${sourceCommit}/${edition.sourcePath}`, ...parseDocument(markdown, edition.document, edition.sourcePath) };
}

/** Every document published in one locale, in manifest order. */
export async function getAllDocuments(locale: DocumentLocale = defaultDocumentLocale): Promise<readonly RepositoryDocument[]> {
  const results: RepositoryDocument[] = [];
  for (const edition of editionsForLocale(locale)) {
    const result = await getDocument(edition.document.route);
    if (!result) throw new Error(`Document disappeared from approved manifest: ${edition.document.route}`);
    results.push(result);
  }
  return results;
}
