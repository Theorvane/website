import { describe, expect, it } from "vitest";

import { generateStaticParams, generateMetadata } from "./page";
import { documentEditions } from "../../../lib/docs/manifest";

describe("TypeMCP article routes", () => {
  it("generates every approved static article and route metadata", async () => {
    expect(generateStaticParams()).toHaveLength(documentEditions().length);
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

  it("prerenders a translated article and links the two languages to each other", async () => {
    expect(generateStaticParams()).toContainEqual({ slug: ["ko", "getting-started"] });
    expect(generateStaticParams()).toContainEqual({ slug: ["ko", "build", "petstore-typemcp-foundation"] });

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: ["ko", "getting-started"] }) });
    expect(metadata.title).toBe("@theorvane/type-mcp@0.2.2 시작하기 | TypeMCP");
    expect(metadata.alternates?.canonical).toBe("/docs/ko/getting-started");
    expect(metadata.alternates?.languages).toMatchObject({ en: "/docs/getting-started", ko: "/docs/ko/getting-started", "x-default": "/docs/getting-started" });
    expect((metadata.openGraph as { locale?: string } | undefined)?.locale).toBe("ko_KR");
  });

  it("offers no Korean route for a document that has no translation", async () => {
    expect(generateStaticParams()).not.toContainEqual({ slug: ["ko", "guides", "configuration"] });
    expect(await generateMetadata({ params: Promise.resolve({ slug: ["ko", "guides", "configuration"] }) })).toEqual({});
  });
});
