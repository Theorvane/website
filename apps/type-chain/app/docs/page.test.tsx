import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DocsIndex, { metadata } from "./page";

describe("TypeChain docs index", () => {
  it("states the published package boundary and lists every public documentation group", async () => {
    render(await DocsIndex());
    expect(screen.getByRole("heading", { name: "TypeChain documentation" })).toBeTruthy();
    expect(screen.getByText("@theorvane/type-chain@0.1.1")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /Getting started/i }).some((link) => link.getAttribute("href") === "/docs/getting-started")).toBe(true);
    expect(metadata.alternates?.canonical).toBe("/docs");
    expect(metadata.openGraph?.url).toBe("https://typechain.theorvane.tech/docs");
    for (const group of ["Start", "Guides", "API", "Architecture"]) expect(screen.getAllByRole("heading", { name: group })).not.toHaveLength(0);
  });
});
