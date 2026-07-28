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

  it("presents the published package and the application-owned runtime boundary", () => {
    render(createElement(HomePage));
    expect(screen.getByRole("heading", { name: /typed tools\.\s*explicit boundaries/i })).toBeTruthy();
    expect(screen.getByText("@theorvane/type-chain@0.1.1")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
  });
});
