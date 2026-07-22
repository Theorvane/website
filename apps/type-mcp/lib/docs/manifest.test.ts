import { describe, expect, it } from "vitest";

import {
  publicDocuments,
  sourceCommit,
  validateManifest,
} from "./manifest";

describe("TypeMCP public documentation manifest", () => {
  it("pins exactly the approved public documents to a full commit SHA", () => {
    expect(sourceCommit).toBe("6480a45887a262f354f5691d3d3d19ca04304e96");
    expect(publicDocuments).toHaveLength(13);
    expect(publicDocuments.map((document) => document.route)).toEqual([
      "/docs/getting-started",
      "/docs/guides/configuration",
      "/docs/guides/agent-integration",
      "/docs/guides/http-and-nextjs",
      "/docs/guides/agile-delivery",
      "/docs/guides/npm-release",
      "/docs/guides/open-source-launch",
      "/docs/api/decorator-api",
      "/docs/architecture/overview",
      "/docs/architecture/framework-neutral-core",
      "/docs/architecture/fetch-streamable-http",
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
  });
});
