import { describe, expect, it } from "vitest";

import {
  publicDocuments,
  sourceCommit,
  validateManifest,
} from "./manifest";

describe("TypeMCP public documentation manifest", () => {
  it("pins exactly the approved public documents to a full commit SHA", () => {
    expect(sourceCommit).toBe("c13c7c99ab893bbcfdee3d5e88461daf1098e8d5");
    expect(publicDocuments).toHaveLength(15);
    expect(publicDocuments.map((document) => document.route)).toEqual([
      "/docs/getting-started",
      "/docs/guides/configuration",
      "/docs/guides/agent-integration",
      "/docs/guides/http-and-nextjs",
      "/docs/guides/langchain-langgraph",
      "/docs/guides/agile-delivery",
      "/docs/guides/npm-release",
      "/docs/guides/open-source-launch",
      "/docs/api/decorator-api",
      "/docs/architecture/overview",
      "/docs/architecture/framework-neutral-core",
      "/docs/architecture/fetch-streamable-http",
      "/docs/architecture/langchain-langgraph-integration",
      "/docs/product/vision",
      "/docs/product/mvp-scope",
    ]);
    expect(publicDocuments.filter((document) => document.classification === "published").map((document) => document.sourcePath)).toEqual([
      "docs/guides/getting-started.md",
      "docs/guides/agent-integration.md",
    ]);
  });

  it("rejects duplicate routes and non-public source paths", () => {
    const first = publicDocuments[0]!;
    const second = publicDocuments[1]!;

    expect(() => validateManifest([
      first,
      { ...second, route: first.route },
    ])).toThrow(/duplicate route/i);

    expect(() => validateManifest([
      { ...first, sourcePath: "docs/planning/internal.md" },
    ])).toThrow(/approved docs/i);

    for (const unsafeSourcePath of ["docs/../../outside.md", "docs\\outside.md", "docs/guide.txt"]) {
      expect(() => validateManifest([{ ...first, sourcePath: unsafeSourcePath }])).toThrow(/approved docs/i);
    }
  });
});
