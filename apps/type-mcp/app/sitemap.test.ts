import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("TypeMCP sitemap", () => {
  it("includes the product, docs index, and every approved document route", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(15);
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/api/decorator-api");
  });
});
