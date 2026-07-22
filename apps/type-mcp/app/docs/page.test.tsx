import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex from "./page";

describe("TypeMCP docs index", () => {
  it("states the package boundary and offers the approved documentation groups", async () => {
    render(await DocsIndex());
    expect(screen.getByRole("heading", { name: /TypeMCP documentation/i })).toBeTruthy();
    expect(screen.getByText(/published npm package.*metadata/i)).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /Getting started/i }).some((link) => link.getAttribute("href") === "/docs/getting-started")).toBe(true);
    for (const group of ["Start", "Guides", "API", "Architecture", "Product"]) {
      expect(screen.getAllByRole("heading", { name: group })).not.toHaveLength(0);
    }
  });
});
