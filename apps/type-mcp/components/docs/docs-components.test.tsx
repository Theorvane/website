import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsSidebar, DocumentPager, ReleaseBoundaryCallout } from "./docs-components";

describe("TypeMCP documentation release callout", () => {
  it("identifies the public scoped 0.2.2 runtime for non-published document classifications", () => {
    render(<ReleaseBoundaryCallout classification="repository-development" />);

    expect(screen.getByText("@theorvane/type-mcp@0.2.2")).toBeTruthy();
    expect(screen.getByText(/definition validation, MCP SDK compilation, stdio, Streamable HTTP/i)).toBeTruthy();
    expect(screen.getByText(/tools-only LangChain adapter/i)).toBeTruthy();
    expect(screen.getByText(/Applications retain ownership of hosting, authorization, and LangGraph composition/i)).toBeTruthy();
    expect(screen.queryByText(/type-mcp@0.1.0/)).toBeNull();
  });

  it("omits the callout for documents classified as published", () => {
    const { container } = render(<ReleaseBoundaryCallout classification="published" />);

    expect(container.innerHTML).toBe("");
  });
});

describe("TypeMCP documentation sidebar", () => {
  it("starts as a closed disclosure for a compact mobile reading path", () => {
    const { container } = render(<DocsSidebar documents={[{ document: { route: "/docs/getting-started", title: "Getting started", group: "Start" } }] as never} activeRoute="/docs/getting-started" />);
    expect(container.querySelector("details")?.hasAttribute("open")).toBe(false);
  });
});

describe("TypeMCP documentation pager", () => {
  const documents = [
    { document: { route: "/docs/getting-started", title: "Getting started" } },
    { document: { route: "/docs/core-concepts", title: "Core concepts" } },
    { document: { route: "/docs/petstore-walkthrough", title: "Petstore walkthrough" } },
  ] as never;

  it("links to adjacent manifest documents without hiding terminal boundaries", () => {
    const { rerender } = render(<DocumentPager documents={documents} route="/docs/core-concepts" />);
    expect(screen.getByRole("link", { name: /Previous: Getting started/i }).getAttribute("href")).toBe("/docs/getting-started");
    expect(screen.getByRole("link", { name: /Next: Petstore walkthrough/i }).getAttribute("href")).toBe("/docs/petstore-walkthrough");

    rerender(<DocumentPager documents={documents} route="/docs/getting-started" />);
    expect(screen.queryByRole("link", { name: /Previous:/i })).toBeNull();
    expect(screen.getByRole("link", { name: /Next: Core concepts/i })).toBeTruthy();
  });
});
