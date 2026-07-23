import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

import { isSafeSourcePath, publicDocuments, sourceCommit } from "./manifest";

export interface SyncOptions {
  readonly outputDirectory: string;
  readonly fetchDocument: (sourcePath: string) => Promise<string>;
  /** Test seam for injecting a failure during atomic cache publication. */
  readonly renameDirectory?: (from: string, to: string) => Promise<void>;
  /** Test seam invoked while this sync holds the publication lock. */
  readonly beforePublish?: () => Promise<void>;
  /** Test seam invoked after this sync observes a competing publisher lock. */
  readonly onLockContention?: () => void;
}

interface CacheMetadata {
  readonly sourceCommit: string;
  readonly documents: readonly { readonly sourcePath: string; readonly route: string; readonly sha256: string }[];
}

const lockRetryDelayMs = 10;
const lockTimeoutMs = 15_000;

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function hasH1(content: string): boolean {
  return /^#\s+\S/m.test(content);
}

function containedPath(root: string, sourcePath: string): string {
  if (!isSafeSourcePath(sourcePath)) throw new Error(`Unsafe documentation source path: ${sourcePath}`);
  const rootPath = resolve(root);
  const candidate = resolve(rootPath, sourcePath);
  if (relative(rootPath, candidate).startsWith("..")) throw new Error(`Documentation path escapes cache root: ${sourcePath}`);
  return candidate;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

async function acquirePublicationLock(lockDirectory: string, onContention?: () => void): Promise<void> {
  const deadline = Date.now() + lockTimeoutMs;
  let reportedContention = false;
  while (true) {
    try {
      await mkdir(lockDirectory);
      return;
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (!reportedContention) {
        onContention?.();
        reportedContention = true;
      }
      if (Date.now() >= deadline) throw new Error(`Timed out waiting for documentation publication lock: ${lockDirectory}`);
      await delay(lockRetryDelayMs);
    }
  }
}

export async function syncDocuments({ outputDirectory, fetchDocument, renameDirectory = rename, beforePublish, onLockContention }: SyncOptions): Promise<void> {
  const previousDirectory = `${outputDirectory}.previous`;
  const lockDirectory = `${outputDirectory}.lock`;
  const stagingDirectory = await mkdtemp(`${outputDirectory}.staging-`);

  try {
    const documents = [] as { sourcePath: string; route: string; sha256: string }[];
    for (const document of publicDocuments) {
      let content: string;
      try {
        content = await fetchDocument(document.sourcePath);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Unable to retrieve ${document.sourcePath} for ${document.route}: ${message}`);
      }
      if (!hasH1(content)) throw new Error(`Invalid documentation source ${document.sourcePath} for ${document.route}: missing level-one heading`);
      if (!content.includes(document.sourceStatus)) throw new Error(`Release classification mismatch for ${document.sourcePath} at ${document.route}: expected source status evidence for ${document.classification}`);
      const destination = containedPath(stagingDirectory, document.sourcePath);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, content, "utf8");
      documents.push({ sourcePath: document.sourcePath, route: document.route, sha256: sha256(content) });
    }
    const metadata: CacheMetadata = { sourceCommit, documents };
    await writeFile(join(stagingDirectory, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`, "utf8");

    await acquirePublicationLock(lockDirectory, onLockContention);
    try {
      await beforePublish?.();
      await rm(previousDirectory, { recursive: true, force: true });
      let movedPreviousCache = false;
      try {
        await renameDirectory(outputDirectory, previousDirectory);
        movedPreviousCache = true;
      } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      try {
        await renameDirectory(stagingDirectory, outputDirectory);
      } catch (publishError) {
        if (movedPreviousCache) {
          try {
            await renameDirectory(previousDirectory, outputDirectory);
          } catch (restoreError) {
            const detail = restoreError instanceof Error ? restoreError.message : String(restoreError);
            throw new Error(`Unable to publish documentation cache; prior cache remains recoverable at ${previousDirectory}: ${detail}`);
          }
        }
        throw publishError;
      }
      await rm(previousDirectory, { recursive: true, force: true });
    } finally {
      await rm(lockDirectory, { recursive: true, force: true });
    }
  } finally {
    await rm(stagingDirectory, { recursive: true, force: true });
  }
}

export async function fetchPinnedDocument(sourcePath: string): Promise<string> {
  const response = await fetch(`https://raw.githubusercontent.com/Theorvane/type-mcp/${sourceCommit}/${sourcePath}`, { signal: AbortSignal.timeout(15_000) });
  if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
  return response.text();
}
