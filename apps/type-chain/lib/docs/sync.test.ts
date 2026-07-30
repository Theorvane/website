import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { documentEditions } from "./manifest";
import { syncDocuments } from "./sync";

describe("syncDocuments", () => {
  it("records every TypeChain Build curriculum document in cache metadata", async () => {
    const outputDirectory = await mkdtemp(join(tmpdir(), "typechain-docs-"));
    try {
      await syncDocuments({
        outputDirectory,
        fetchDocument: async (sourcePath) => {
          const edition = documentEditions().find((candidate) => candidate.sourcePath === sourcePath)!;
          return `# ${sourcePath}\n\n${edition.sourceStatus}\n`;
        },
      });

      const metadata = JSON.parse(await readFile(join(outputDirectory, "metadata.json"), "utf8")) as {
        documents: { sourcePath: string; route: string }[];
      };
      expect(metadata.documents).toEqual(expect.arrayContaining([
        expect.objectContaining({ sourcePath: "docs/guides/petstore-typechain-foundation.md", route: "/docs/build/petstore-typechain-foundation" }),
        expect.objectContaining({ sourcePath: "docs/guides/petstore-policy-and-composition.md", route: "/docs/build/petstore-policy-and-composition" }),
        expect.objectContaining({ sourcePath: "docs/guides/petstore-walkthrough.md", route: "/docs/petstore-walkthrough" }),
      ]));
    } finally {
      await rm(outputDirectory, { recursive: true, force: true });
      await rm(`${outputDirectory}.previous`, { recursive: true, force: true });
      await rm(`${outputDirectory}.lock`, { recursive: true, force: true });
    }
  });
});
