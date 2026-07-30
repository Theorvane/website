import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("TypeChain homepage", () => {
  it("publishes a complete, accessible product footer", () => {
    render(createElement(HomePage));

    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent).toContain("TypeChain");
    expect(screen.getByRole("navigation", { name: /TypeChain footer/i })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
    expect(screen.getByRole("link", { name: /Theorvane/i }).getAttribute("href")).toBe("https://theorvane.tech/");
  });

  it("renders the official green chain mark in its ownership evidence surface", () => {
    render(createElement(HomePage));

    expect(screen.getByRole("region", { name: /ownership map/i })).toBeTruthy();
    expect(screen.getAllByAltText("TypeChain").some((image) => image.getAttribute("src") === "/logo.svg")).toBe(true);
  });

  it("leads with documentation and makes the ownership flow explicit", () => {
    render(createElement(HomePage));

    expect(screen.getAllByRole("link", { name: /read documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
    expect(screen.getAllByRole("link", { name: /getting started/i }).some((link) => link.getAttribute("href") === "/docs/getting-started")).toBe(true);
    for (const stage of ["Declare", "Define", "Adapt", "Own"]) {
      expect(screen.getByRole("heading", { name: stage })).toBeTruthy();
    }
  });

  it("presents the published package and the application-owned runtime boundary", () => {
    render(createElement(HomePage));
    expect(screen.getByRole("heading", { name: /typed tools\.\s*explicit boundaries/i })).toBeTruthy();
    expect(screen.getByText("@theorvane/type-chain@0.1.1")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
  });
  it("renders factual source-code and website JSON-LD", () => {
    render(createElement(HomePage));
    const graph = JSON.parse(screen.getByTestId("typechain-schema").textContent ?? "{}") as { "@graph"?: Array<Record<string, unknown>> };
    expect(graph["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "SoftwareSourceCode",
          name: "TypeChain",
          url: "https://typechain.theorvane.tech/",
          codeRepository: "https://github.com/Theorvane/type-chain",
          programmingLanguage: "TypeScript",
          license: "https://opensource.org/licenses/MIT",
        }),
        expect.objectContaining({ "@type": "WebSite", name: "TypeChain", url: "https://typechain.theorvane.tech/" }),
      ]),
    );
  });
});
