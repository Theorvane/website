import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("TypeMCP sitemap", () => {
  it("includes the product, docs index, and every approved document route", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(22);
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/core-concepts");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/build/petstore-project-setup");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/build/petstore-typemcp-foundation");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/petstore-walkthrough");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/api/decorator-api");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/guides/langchain-langgraph");
    expect(entries.map((entry) => entry.url)).toContain("https://typemcp.theorvane.tech/docs/guides/runtime-selection");
  });
});
