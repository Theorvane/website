import { describe, expect, it } from "vitest";
import { publicDocuments, sourceCommit, validateManifest } from "./manifest";

describe("TypeChain public documentation manifest", () => {
  it("uses an immutable source commit and approved public routes", () => {
    expect(sourceCommit).toBe("edb33a1a074b2a92c8a294313d046ac8ebbd930b");
    expect(publicDocuments).toHaveLength(11);
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/core-concepts");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/petstore-walkthrough");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/api/decorator-api");
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/guides/composition-selection");
    expect(publicDocuments.every((document) => document.sourceStatus.includes("@theorvane/type-chain@0.1.1") || document.sourcePath === "docs/architecture.md")).toBe(true);
  });
  it("rejects unsafe documentation paths", () => {
    expect(() => validateManifest([{ ...publicDocuments[0]!, sourcePath: "docs/planning/private.md" }])).toThrow(/approved docs/i);
  });
});
