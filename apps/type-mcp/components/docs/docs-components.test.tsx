import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsSidebar, DocumentPager, MarkdownArticle, ReleaseBoundaryCallout } from "./docs-components";

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

  it("keeps adjacent manifest navigation for documents without curriculum metadata", () => {
    const { rerender } = render(<DocumentPager documents={documents} route="/docs/core-concepts" />);
    expect(screen.getByRole("link", { name: /Previous: Getting started/i }).getAttribute("href")).toBe("/docs/getting-started");
    expect(screen.getByRole("link", { name: /Next: Petstore walkthrough/i }).getAttribute("href")).toBe("/docs/petstore-walkthrough");

    rerender(<DocumentPager documents={documents} route="/docs/getting-started" />);
    expect(screen.queryByRole("link", { name: /Previous:/i })).toBeNull();
    expect(screen.getByRole("link", { name: /Next: Core concepts/i })).toBeTruthy();
  });

  it("uses a Build document's curriculum nextRoute instead of manifest adjacency", () => {
    const curriculumDocuments = [
      { document: { route: "/docs/build/petstore-project-setup", title: "Petstore project setup", curriculumStep: 1, curriculumTotal: 3, nextRoute: "/docs/build/petstore-typemcp-foundation" } },
      { document: { route: "/docs/build/petstore-typemcp-foundation", title: "Petstore TypeMCP foundation", curriculumStep: 2, curriculumTotal: 3, nextRoute: "/docs/petstore-walkthrough" } },
      { document: { route: "/docs/guides/runtime-selection", title: "Choose a runtime boundary" } },
      { document: { route: "/docs/petstore-walkthrough", title: "Petstore walkthrough", curriculumStep: 3, curriculumTotal: 3, nextRoute: null } },
    ] as never;

    render(<DocumentPager documents={curriculumDocuments} route="/docs/build/petstore-typemcp-foundation" />);

    expect(screen.getByRole("link", { name: /Next step: Petstore walkthrough/i }).getAttribute("href")).toBe("/docs/petstore-walkthrough");
    expect(screen.queryByRole("link", { name: /Next: Choose a runtime boundary/i })).toBeNull();
  });
});

describe("TypeMCP Build article curriculum context", () => {
  it("presents a Build step, prerequisite, outcome, application boundary, and failure-guide affordance", () => {
    const buildDocument = {
      document: {
        route: "/docs/build/petstore-typemcp-foundation",
        title: "Petstore TypeMCP foundation",
        group: "Build",
        classification: "published",
        sourcePath: "docs/guides/petstore-typemcp-foundation.md",
        curriculumStep: 2,
        curriculumTotal: 3,
        prerequisites: ["/docs/build/petstore-project-setup"],
        nextRoute: "/docs/petstore-walkthrough",
        outcome: "An inspected declaration compiled through an explicit resolver.",
        applicationBoundary: "Your application owns dependency resolution, process lifecycle, and access control.",
      },
      title: "Petstore TypeMCP foundation",
      markdown: "# Petstore TypeMCP foundation\n\n## Failure guide\n\nDiagnose local setup failures in the canonical guide.",
      toc: [],
      internalLinks: new Map(),
      sourceUrl: "https://github.com/Theorvane/type-mcp/blob/c58f8f495d7c4eb05e2081a5fdd2a61995c1dece/docs/guides/petstore-typemcp-foundation.md",
    } as never;

    render(<MarkdownArticle document={buildDocument} />);

    expect(screen.getByText("Build / Step 2 of 3")).toBeTruthy();
    const prerequisite = screen.getByRole("link", { name: /Prerequisite: Petstore project setup/i });
    expect(prerequisite.getAttribute("href")).toBe("/docs/build/petstore-project-setup");
    expect(prerequisite.closest("p")).not.toBeNull();
    expect(screen.getByText(/An inspected declaration compiled through an explicit resolver/i)).toBeTruthy();
    expect(screen.getByText(/Your application owns dependency resolution, process lifecycle, and access control/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Troubleshooting and limitations/i }).getAttribute("href")).toBe("#failure-guide");
  });
});
