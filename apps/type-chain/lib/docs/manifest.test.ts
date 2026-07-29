import { describe, expect, it } from "vitest";
import { publicDocuments, sourceCommit, validateManifest } from "./manifest";

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

describe("TypeChain public documentation manifest", () => {
  it("uses an immutable source commit and approved public routes", () => {
    expect(sourceCommit).toBe("90152f97834dacfe7211786bc98227185950e2e0");
    expect(publicDocuments).toHaveLength(13);
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/core-concepts");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/build/petstore-typechain-foundation");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/build/petstore-policy-and-composition");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/petstore-walkthrough");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/api/decorator-api");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/guides/composition-selection");
    expect(publicDocuments.every((document) => document.sourceStatus.includes("@theorvane/type-chain@0.1.1") || document.sourcePath === "docs/architecture.md")).toBe(true);
  });

  it("defines TypeChain as Build steps four through six with required curriculum metadata", () => {
    const curriculum = buildCurriculum();

    expect(curriculum).toHaveLength(3);
    expect(curriculum.map((document) => ({ sourcePath: document.sourcePath, route: document.route }))).toEqual([
      { sourcePath: "docs/guides/petstore-typechain-foundation.md", route: "/docs/build/petstore-typechain-foundation" },
      { sourcePath: "docs/guides/petstore-policy-and-composition.md", route: "/docs/build/petstore-policy-and-composition" },
      { sourcePath: "docs/guides/petstore-walkthrough.md", route: "/docs/petstore-walkthrough" },
    ]);
    expect(curriculum.map((document) => document.curriculumStep)).toEqual([4, 5, 6]);
    expect(curriculum.map((document) => document.curriculumTotal)).toEqual([6, 6, 6]);
    expect(curriculum.map((document) => document.nextRoute)).toEqual([
      "/docs/build/petstore-policy-and-composition",
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
  it("rejects unsafe documentation paths", () => {
    expect(() => validateManifest([{ ...publicDocuments[0]!, sourcePath: "docs/planning/private.md" }])).toThrow(/approved docs/i);
  });
});
