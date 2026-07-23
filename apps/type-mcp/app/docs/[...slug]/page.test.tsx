import { describe, expect, it } from "vitest";

import { generateStaticParams, generateMetadata } from "./page";

describe("TypeMCP article routes", () => {
  it("generates every approved static article and route metadata", async () => {
    expect(generateStaticParams()).toHaveLength(15);
    expect(generateStaticParams()).toContainEqual({ slug: ["api", "decorator-api"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["guides", "langchain-langgraph"] });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: ["getting-started"] }) });
    expect(metadata.title).toBe("Getting started with type-mcp@0.1.0 | TypeMCP");
    expect(metadata.alternates?.canonical).toBe("/docs/getting-started");
  });
});
