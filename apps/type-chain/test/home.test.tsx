import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("TypeChain homepage", () => {
  it("presents the published package and the application-owned runtime boundary", () => {
    render(createElement(HomePage));
    expect(screen.getByRole("heading", { name: /typed tools\.\s*explicit boundaries/i })).toBeTruthy();
    expect(screen.getByText("@theorvane/type-chain@0.1.1")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /documentation/i }).some((link) => link.getAttribute("href") === "/docs")).toBe(true);
  });
});
