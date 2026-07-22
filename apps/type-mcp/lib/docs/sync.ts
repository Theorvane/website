import { createHash } from "node:crypto";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { publicDocuments, sourceCommit } from "./manifest";

export interface SyncOptions {
  readonly outputDirectory: string;
  readonly fetchDocument: (sourcePath: string) => Promise<string>;
}

interface CacheMetadata {
  readonly sourceCommit: string;
  readonly documents: readonly { readonly sourcePath: string; readonly route: string; readonly sha256: string }[];
}

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function hasH1(content: string): boolean {
  return /^#\s+\S/m.test(content);
}

export async function syncDocuments({ outputDirectory, fetchDocument }: SyncOptions): Promise<void> {
  const stagingDirectory = `${outputDirectory}.staging`;
  await rm(stagingDirectory, { recursive: true, force: true });
  await mkdir(stagingDirectory, { recursive: true });

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
      const destination = join(stagingDirectory, document.sourcePath);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, content, "utf8");
      documents.push({ sourcePath: document.sourcePath, route: document.route, sha256: sha256(content) });
    }
    const metadata: CacheMetadata = { sourceCommit, documents };
    await writeFile(join(stagingDirectory, "metadata.json"), `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
    await rm(`${outputDirectory}.previous`, { recursive: true, force: true });
    try { await rename(outputDirectory, `${outputDirectory}.previous`); } catch (error: unknown) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
    await rename(stagingDirectory, outputDirectory);
    await rm(`${outputDirectory}.previous`, { recursive: true, force: true });
  } catch (error) {
    await rm(stagingDirectory, { recursive: true, force: true });
    throw error;
  }
}

export async function fetchPinnedDocument(sourcePath: string): Promise<string> {
  const response = await fetch(`https://raw.githubusercontent.com/Theorvane/type-mcp/${sourceCommit}/${sourcePath}`, { signal: AbortSignal.timeout(15_000) });
  if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
  return response.text();
}
