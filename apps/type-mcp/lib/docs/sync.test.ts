import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { publicDocuments } from "./manifest";
import { syncDocuments } from "./sync";

describe("syncDocuments", () => {
  it("writes deterministic metadata for every manifest-approved document", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    try {
      await syncDocuments({
        outputDirectory,
        fetchDocument: async (sourcePath) => `# ${sourcePath}\n\n## Detail\n`,
      });
      const metadata = JSON.parse(await readFile(join(outputDirectory, "metadata.json"), "utf8")) as { sourceCommit: string; documents: { sourcePath: string; route: string; sha256: string }[] };
      expect(metadata.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
      expect(metadata.documents).toHaveLength(publicDocuments.length);
      expect(metadata.documents[0]).toMatchObject({ sourcePath: "docs/guides/getting-started.md", route: "/docs/getting-started" });
      expect(metadata.documents.every((document) => /^[0-9a-f]{64}$/.test(document.sha256))).toBe(true);
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });

  it("names source path and target route when an approved document is invalid", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typemcp-docs-"));
    try {
      await expect(syncDocuments({ outputDirectory, fetchDocument: async () => "no heading" })).rejects.toThrow(/docs\/guides\/getting-started\.md.*\/docs\/getting-started/i);
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
    }
  });
});
