import { describe, expect, it } from "vitest";

import { generateStaticParams, generateMetadata } from "./page";

describe("TypeMCP article routes", () => {
  it("generates every approved static article and route metadata", async () => {
    expect(generateStaticParams()).toHaveLength(20);
    expect(generateStaticParams()).toContainEqual({ slug: ["core-concepts"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["build", "petstore-project-setup"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["build", "petstore-typemcp-foundation"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["petstore-walkthrough"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["api", "decorator-api"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["guides", "langchain-langgraph"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["guides", "runtime-selection"] });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: ["getting-started"] }) });
    expect(metadata.title).toBe("Getting started with @theorvane/type-mcp@0.2.2 | TypeMCP");
    expect(metadata.alternates?.canonical).toBe("/docs/getting-started");
  });
});
