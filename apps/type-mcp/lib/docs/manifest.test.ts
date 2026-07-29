import { describe, expect, it } from "vitest";

import {
  publicDocuments,
  sourceCommit,
  validateManifest,
} from "./manifest";

interface CurriculumDocument {
  readonly sourcePath: string;
  readonly route: string;
  readonly group: string;
  readonly curriculumStep?: number;
  readonly curriculumTotal?: number;
  readonly prerequisites?: readonly string[];
  readonly nextRoute?: string | null;
  readonly outcome?: string;
  readonly applicationBoundary?: string;
}

function buildCurriculum(): readonly CurriculumDocument[] {
  return (publicDocuments as unknown as readonly CurriculumDocument[])
    .filter((document) => document.group === "Build")
    .sort((left, right) => (left.curriculumStep ?? 0) - (right.curriculumStep ?? 0));
}

describe("TypeMCP public documentation manifest", () => {
  it("pins exactly the approved public documents to a full commit SHA", () => {
    expect(sourceCommit).toBe("c58f8f495d7c4eb05e2081a5fdd2a61995c1dece");
    expect(publicDocuments).toHaveLength(20);
    expect(publicDocuments.map((document) => document.route)).toEqual([
      "/docs/getting-started",
      "/docs/core-concepts",
      "/docs/build/petstore-project-setup",
      "/docs/build/petstore-typemcp-foundation",
      "/docs/petstore-walkthrough",
      "/docs/guides/configuration",
      "/docs/guides/agent-integration",
      "/docs/guides/http-and-nextjs",
      "/docs/guides/langchain-langgraph",
      "/docs/guides/runtime-selection",
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
      "docs/guides/core-concepts.md",
      "docs/guides/petstore-project-setup.md",
      "docs/guides/petstore-typemcp-foundation.md",
      "docs/guides/petstore-walkthrough.md",
      "docs/guides/configuration.md",
      "docs/guides/agent-integration.md",
      "docs/guides/http-and-nextjs.md",
      "docs/guides/langchain-langgraph.md",
      "docs/guides/runtime-selection.md",
      "docs/guides/npm-release.md",
      "docs/api/decorator-api.md",
      "docs/architecture/overview.md",
      "docs/product/mvp-scope.md",
    ]);
  });

  it("defines the three-step Build curriculum and its required navigation metadata", () => {
    const curriculum = buildCurriculum();

    expect(curriculum).toHaveLength(3);
    expect(curriculum.map((document) => ({ sourcePath: document.sourcePath, route: document.route }))).toEqual([
      { sourcePath: "docs/guides/petstore-project-setup.md", route: "/docs/build/petstore-project-setup" },
      { sourcePath: "docs/guides/petstore-typemcp-foundation.md", route: "/docs/build/petstore-typemcp-foundation" },
      { sourcePath: "docs/guides/petstore-walkthrough.md", route: "/docs/petstore-walkthrough" },
    ]);
    expect(curriculum.map((document) => document.curriculumStep)).toEqual([1, 2, 3]);
    expect(curriculum.map((document) => document.curriculumTotal)).toEqual([3, 3, 3]);
    expect(curriculum.map((document) => document.nextRoute)).toEqual([
      "/docs/build/petstore-typemcp-foundation",
      "/docs/petstore-walkthrough",
      null,
    ]);

    for (const document of curriculum) {
      expect(document).toHaveProperty("prerequisites");
      expect(document.prerequisites).toEqual(expect.any(Array));
      expect(document).toHaveProperty("outcome");
      expect(document.outcome).toEqual(expect.any(String));
      expect(document.outcome).not.toHaveLength(0);
      expect(document).toHaveProperty("applicationBoundary");
      expect(document.applicationBoundary).toEqual(expect.any(String));
      expect(document.applicationBoundary).not.toHaveLength(0);
      if (document.nextRoute !== null) expect(publicDocuments.map((candidate) => candidate.route)).toContain(document.nextRoute);
    }
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
