import { mkdtemp, readFile, rename, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { publicDocuments } from "./manifest";
import { syncDocuments } from "./sync";

function fetchWithMarker(marker: string) {
  return async (sourcePath: string) => {
    const document = publicDocuments.find((candidate) => candidate.sourcePath === sourcePath)!;
    return `# ${sourcePath}\n\n${document.sourceStatus}\n\n${marker}\n`;
  };
}

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((resolvePromise) => { resolve = resolvePromise; });
  return { promise, resolve };
}

describe("syncDocuments", () => {
  it("writes deterministic metadata for every manifest-approved document", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    try {
      await syncDocuments({ outputDirectory, fetchDocument: fetchWithMarker("detail") });
      const metadata = JSON.parse(await readFile(join(outputDirectory, "metadata.json"), "utf8")) as { sourceCommit: string; documents: { sourcePath: string; route: string; sha256: string }[] };
      expect(metadata.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
      expect(metadata.documents).toHaveLength(publicDocuments.length);
      expect(metadata.documents[0]).toMatchObject({ sourcePath: "docs/guides/getting-started.md", route: "/docs/getting-started" });
      expect(metadata.documents.every((document) => /^[0-9a-f]{64}$/.test(document.sha256))).toBe(true);
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });

  it("restores the prior cache when publication fails after the first rename", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    try {
      await syncDocuments({ outputDirectory, fetchDocument: fetchWithMarker("old cache") });
      await expect(syncDocuments({
        outputDirectory,
        fetchDocument: fetchWithMarker("new cache"),
        renameDirectory: async (from, to) => {
          if (from.startsWith(`${outputDirectory}.staging-`) && to === outputDirectory) throw new Error("injected publish failure");
          await rename(from, to);
        },
      })).rejects.toThrow(/injected publish failure/i);
      await expect(readFile(join(outputDirectory, "docs/guides/getting-started.md"), "utf8")).resolves.toContain("old cache");
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
      await rm(`${outputDirectory}.previous`, { recursive: true, force: true });
    }
  });

  it("serializes overlapping publications while retaining complete cache output", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    const firstEntered = deferred();
    const releaseFirst = deferred();
    let secondEntered = false;
    try {
      const first = syncDocuments({
        outputDirectory,
        fetchDocument: fetchWithMarker("first cache"),
        beforePublish: async () => { firstEntered.resolve(); await releaseFirst.promise; },
      });
      await firstEntered.promise;
      const second = syncDocuments({
        outputDirectory,
        fetchDocument: fetchWithMarker("second cache"),
        beforePublish: async () => { secondEntered = true; },
      });
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 30));
      expect(secondEntered).toBe(false);
      releaseFirst.resolve();
      await Promise.all([first, second]);
      const metadata = JSON.parse(await readFile(join(outputDirectory, "metadata.json"), "utf8")) as { documents: { sourcePath: string }[] };
      expect(metadata.documents).toHaveLength(publicDocuments.length);
      for (const document of publicDocuments) {
        await expect(readFile(join(outputDirectory, document.sourcePath), "utf8")).resolves.toContain("second cache");
      }
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
      await rm(`${outputDirectory}.previous`, { recursive: true, force: true });
      await rm(`${outputDirectory}.lock`, { recursive: true, force: true });
    }
  });

  it("rejects a source whose release-status evidence no longer matches its classification", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    try {
      await expect(syncDocuments({
        outputDirectory,
        fetchDocument: async (sourcePath) => `# ${sourcePath}\n\n## Detail\n`,
      })).rejects.toThrow(/release classification mismatch.*docs\/guides\/getting-started\.md.*\/docs\/getting-started/i);
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
});
