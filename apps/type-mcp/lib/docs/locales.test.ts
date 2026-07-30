import { describe, expect, it } from "vitest";

import { availableLocales, documentEditions, documentLocale, editionsForLocale, findEdition, localizedRoute, publicDocuments, validateManifest } from "./manifest";
import { slugify } from "./parse";
import type { PublicDocument } from "./types";

const english: PublicDocument = {
  sourcePath: "docs/guides/getting-started.md",
  route: "/docs/getting-started",
  title: "Getting started",
  summary: "Install the package.",
  group: "Start",
  order: 1,
  classification: "published",
  sourceStatus: "@theorvane/type-mcp@0.2.2",
};

const translated: PublicDocument = {
  ...english,
  translations: {
    ko: { sourcePath: "docs/ko/guides/getting-started.md", title: "시작하기", summary: "패키지를 설치합니다.", sourceStatus: "@theorvane/type-mcp@0.2.2" },
  },
};

describe("TypeMCP documentation locales", () => {
  it("serves English unprefixed and a translation under its own segment", () => {
    expect(localizedRoute("/docs/getting-started", "en")).toBe("/docs/getting-started");
    expect(localizedRoute("/docs/getting-started", "ko")).toBe("/docs/ko/getting-started");
    expect(localizedRoute("/docs", "ko")).toBe("/docs/ko");
  });

  it("recognises the locale a route belongs to", () => {
    expect(documentLocale("/docs/getting-started")).toBe("en");
    expect(documentLocale("/docs/ko/getting-started")).toBe("ko");
    expect(documentLocale("/docs/ko")).toBe("ko");
    // A document whose slug merely starts with the letters of a locale is still English.
    expect(documentLocale("/docs/korean-guide")).toBe("en");
  });

  it("offers a locale only where a translation exists", () => {
    expect(availableLocales(english)).toEqual(["en"]);
    expect(availableLocales(translated)).toEqual(["en", "ko"]);
  });

  it("resolves every locale-dependent field of a translated edition", () => {
    const manifest = [translated];
    const editions = manifest.flatMap((document) =>
      availableLocales(document).map((locale) => ({ locale, title: locale === "en" ? document.title : document.translations!.ko!.title })),
    );
    expect(editions).toEqual([
      { locale: "en", title: "Getting started" },
      { locale: "ko", title: "시작하기" },
    ]);
  });

  it("rejects a translation that escapes its locale directory", () => {
    expect(() => validateManifest([{ ...english, translations: { ko: { sourcePath: "docs/guides/getting-started.md", title: "시작하기", summary: "설치", sourceStatus: "x" } } }])).toThrow(/approved translation source path required/);
    expect(() => validateManifest([{ ...english, translations: { ko: { sourcePath: "docs/ko/guides/getting-started.md", title: "시작하기", summary: "설치", sourceStatus: " " } } }])).toThrow(/translation source status evidence required/);
  });

  it("keeps a Korean heading addressable instead of collapsing it to an empty anchor", () => {
    // Stripping to [a-z0-9] emptied every Korean heading, which the parser reported as a duplicate id.
    expect(slugify("설치와 실행")).toBe("설치와-실행");
    expect(slugify("`getMcpServerDefinition()` 사용")).toBe("getmcpserverdefinition-사용");
    expect(slugify("Getting started")).toBe("getting-started");
  });

  it("publishes the shipped manifest in English plus the translations that exist", () => {
    expect(() => validateManifest(publicDocuments)).not.toThrow();
    expect(editionsForLocale("en")).toHaveLength(publicDocuments.length);

    const koreanRoutes = editionsForLocale("ko").map((edition) => edition.document.route);
    expect(koreanRoutes).toEqual([
      "/docs/ko/getting-started",
      "/docs/ko/core-concepts",
      "/docs/ko/build/petstore-project-setup",
      "/docs/ko/build/petstore-typemcp-foundation",
      "/docs/ko/petstore-walkthrough",
    ]);
    expect(documentEditions()).toHaveLength(publicDocuments.length + koreanRoutes.length);
  });

  it("resolves a translated edition to its own file, title, and in-locale curriculum links", () => {
    const edition = findEdition("/docs/ko/build/petstore-typemcp-foundation");
    expect(edition?.locale).toBe("ko");
    expect(edition?.sourcePath).toBe("docs/ko/guides/petstore-typemcp-foundation.md");
    expect(edition?.document.title).toBe("Petstore TypeMCP 기반");
    // A curriculum link must stay inside the locale the reader is already in.
    expect(edition?.document.nextRoute).toBe("/docs/ko/petstore-walkthrough");
    expect(edition?.document.prerequisites).toEqual(["/docs/ko/build/petstore-project-setup"]);
    expect(edition?.document.outcome).toContain("명시적 리졸버");
  });

  it("leaves an untranslated document English-only", () => {
    expect(findEdition("/docs/ko/guides/configuration")).toBeUndefined();
    expect(availableLocales(publicDocuments.find((document) => document.route === "/docs/guides/configuration")!)).toEqual(["en"]);
  });
});
