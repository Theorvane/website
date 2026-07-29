import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex, { metadata } from "./page";

describe("TypeMCP docs index", () => {
  it("states the package boundary and offers the approved documentation groups", async () => {
    render(await DocsIndex());
    expect(screen.getByRole("heading", { name: /TypeMCP documentation/i })).toBeTruthy();
    expect(screen.getByText(/Define an MCP server with decorators, inspect its immutable definition/i)).toBeTruthy();
    expect(screen.getByText("@theorvane/type-mcp@0.2.2")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Start with your goal" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Run locally over stdio/i }).getAttribute("href")).toBe("/docs/guides/runtime-selection#stdio");
    expect(screen.getByRole("link", { name: /Mount MCP over HTTP/i }).getAttribute("href")).toBe("/docs/guides/http-and-nextjs");
    expect(screen.getByRole("link", { name: /Reuse tools with LangChain/i }).getAttribute("href")).toBe("/docs/guides/langchain-langgraph");
    expect(screen.getByRole("heading", { name: "Supported surface" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /npm/i }).some((link) => link.getAttribute("href") === "https://www.npmjs.com/package/@theorvane/type-mcp")).toBe(true);
    expect(screen.getAllByRole("link", { name: /Getting started/i }).some((link) => link.getAttribute("href") === "/docs/getting-started")).toBe(true);
    expect(screen.getByRole("heading", { name: "API and reference" })).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe("/docs");
    expect(metadata.openGraph?.url).toBe("https://typemcp.theorvane.tech/docs");
    for (const group of ["Start", "Guides", "API", "Architecture", "Product"]) {
      expect(screen.getAllByRole("heading", { name: group })).not.toHaveLength(0);
    }
  });
});
