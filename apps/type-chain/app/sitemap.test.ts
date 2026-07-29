import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("TypeChain sitemap", () => {
  it("includes the canonical landing page, docs index, and every static document", () => {
    const routes = sitemap().map((entry) => entry.url);
    expect(routes).toContain("https://typechain.theorvane.tech");
    expect(routes).toContain("https://typechain.theorvane.tech/docs");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/core-concepts");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/build/petstore-typechain-foundation");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/build/petstore-policy-and-composition");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/petstore-walkthrough");
    expect(routes).toContain("https://typechain.theorvane.tech/docs/guides/typemcp-bridge");
  });
});
