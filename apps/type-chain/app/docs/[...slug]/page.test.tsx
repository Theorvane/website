import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";

describe("TypeChain article routes", () => {
  it("generates a static route and canonical metadata for each approved document", async () => {
    expect(generateStaticParams()).toHaveLength(8);
    expect(generateStaticParams()).toContainEqual({ slug: ["guides", "langchain-integration"] });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: ["getting-started"] }) });
    expect(metadata.title).toBe("Getting started with @theorvane/type-chain@0.1.1 | TypeChain");
    expect(metadata.alternates?.canonical).toBe("/docs/getting-started");
  });
});
