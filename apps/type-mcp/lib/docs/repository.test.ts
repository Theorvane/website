import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { publicDocuments } from "./manifest";
import { readTrustedText } from "./repository";
import { syncDocuments } from "./sync";

describe("readTrustedText", () => {
  it("reads a regular document beneath its descriptor-pinned root", async () => {
    const root = await mkdtemp(join(tmpdir(), "typemcp-cache-"));
    try {
      await mkdir(join(root, "docs", "guides"), { recursive: true });
      await writeFile(join(root, "docs", "guides", "getting-started.md"), "# Safe\n", "utf8");
      await expect(readTrustedText(root, "docs/guides/getting-started.md")).resolves.toBe("# Safe\n");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("retries a reader across the live-cache rotation window", async () => {
    const root = await mkdtemp(join(tmpdir(), "typemcp-cache-"));
    let releasePublication!: () => void;
    const publicationPaused = new Promise<void>((resolvePause) => { releasePublication = resolvePause; });
    let rotationObserved!: () => void;
    const rotationStarted = new Promise<void>((resolveRotation) => { rotationObserved = resolveRotation; });
    let readerRetried!: () => void;
    const readerObservedGap = new Promise<void>((resolveRetry) => { readerRetried = resolveRetry; });
    const fetchDocument = async (sourcePath: string) => {
      const document = publicDocuments.find((candidate) => candidate.sourcePath === sourcePath)!;
      return `# ${sourcePath}\n\n${document.sourceStatus}\n\nSafe cache\n`;
    };
    try {
      await syncDocuments({ outputDirectory: root, fetchDocument });
      const publishing = syncDocuments({
        outputDirectory: root,
        fetchDocument,
        afterLiveCacheMoved: async () => { rotationObserved(); await publicationPaused; },
      });
      await rotationStarted;
      const reader = readTrustedText(root, "metadata.json", { onPublicationRetry: readerRetried });
      await readerObservedGap;
      releasePublication();
      await expect(reader).resolves.toContain("sourceCommit");
      await publishing;
    } finally {
      await rm(root, { recursive: true, force: true });
      await rm(`${root}.previous`, { recursive: true, force: true });
      await rm(`${root}.lock`, { recursive: true, force: true });
    }
  });

  it("rejects a cache document reached through an intermediate symlink", async () => {
    const root = await mkdtemp(join(tmpdir(), "typemcp-cache-"));
    const external = await mkdtemp(join(tmpdir(), "typemcp-external-"));
    try {
      await mkdir(join(external, "guides"), { recursive: true });
      await writeFile(join(external, "guides", "getting-started.md"), "# Escaped\n", "utf8");
      await symlink(external, join(root, "docs"));
      await expect(readTrustedText(root, "docs/guides/getting-started.md")).rejects.toThrow(/unsafe|not a directory|symbolic link/i);
    } finally {
      await rm(root, { recursive: true, force: true });
      await rm(external, { recursive: true, force: true });
    }
  });
});
