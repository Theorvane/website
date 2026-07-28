import { describe, expect, it } from "vitest";
import { publicDocuments, sourceCommit, validateManifest } from "./manifest";

describe("TypeChain public documentation manifest", () => {
  it("uses an immutable source commit and approved public routes", () => {
    expect(sourceCommit).toBe("a0889d6406835082a62103bd903bbffb93044e1a");
    expect(publicDocuments).toHaveLength(8);
    expect(publicDocuments.map((document) => document.route)).toContain("/docs/api/decorator-api");
    expect(publicDocuments.every((document) => document.sourceStatus.includes("@theorvane/type-chain@0.1.1") || document.sourcePath === "docs/architecture.md")).toBe(true);
  });
  it("rejects unsafe documentation paths", () => {
    expect(() => validateManifest([{ ...publicDocuments[0]!, sourcePath: "docs/planning/private.md" }])).toThrow(/approved docs/i);
  });
});
