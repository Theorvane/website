import { describe, expect, it } from "vitest";

import { publicDocuments } from "./manifest";
import { parseDocument } from "./parse";

describe("parseDocument", () => {
  it("extracts a title and local table of contents while resolving approved links", () => {
    const parsed = parseDocument(
      "# Overview\n\n## Published release boundary\n\n[Configuration](configuration.md#published-versus-repository-development)\n\n```ts\n# not a heading\n```\n\n### Detail\n",
      publicDocuments[0]!,
    );
    expect(parsed.title).toBe("Overview");
    expect(parsed.toc).toEqual([
      { depth: 2, id: "published-release-boundary", title: "Published release boundary" },
      { depth: 3, id: "detail", title: "Detail" },
    ]);
    expect(parsed.internalLinks.get("configuration.md#published-versus-repository-development")).toBe("/docs/guides/configuration#published-versus-repository-development");
  });

  it("ignores fenced-code headings and rejects unsafe reference links", () => {
    const parsed = parseDocument("# Title\n\n~~~ts\n# not a heading\n~~~\n\n## Detail\n", publicDocuments[0]!);
    expect(parsed.toc).toEqual([{ depth: 2, id: "detail", title: "Detail" }]);
    expect(() => parseDocument("# Title\n\n[unsafe]: javascript:alert(1)\n\n[jump][unsafe]", publicDocuments[0]!)).toThrow(/unsafe link/i);
  });

  it("rejects duplicate headings and unsafe URLs", () => {
    expect(() => parseDocument("# Title\n\n## One\n\n## One", publicDocuments[0]!)).toThrow(/duplicate heading/i);
    expect(() => parseDocument("# Title\n\n[jump](javascript:alert(1))", publicDocuments[0]!)).toThrow(/unsafe link/i);
  });
});
