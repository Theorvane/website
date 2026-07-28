import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("TypeChain sitemap", () => {
  it("includes the canonical landing page, docs index, and every static document", () => {
    const routes = sitemap().map((entry) => entry.url);
    expect(routes).toContain("https://typechain.theorvane.tech");
    expect(routes).toContain("https://typechain.theorvane.tech/docs");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/guides/typemcp-bridge");
  });
});
