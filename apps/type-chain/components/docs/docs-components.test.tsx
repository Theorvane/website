import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsSidebar, DocumentPager, MarkdownArticle } from "./docs-components";

describe("TypeChain documentation sidebar", () => {
  const documents = [{ document: { route: "/docs/getting-started", title: "Getting started", group: "Start" } }] as never;

  it("renders a navigation copy the desktop reader can see", () => {
    const { container } = render(<DocsSidebar documents={documents} activeRoute="/docs/getting-started" />);

    // The desktop copy must sit outside the disclosure, because a closed <details> hides its content
    // through ::details-content and no child display override can reveal it.
    const desktop = container.querySelector(".docs-sidebar-desktop");
    expect(desktop).not.toBeNull();
    expect(desktop!.closest("details")).toBeNull();
    expect(container.querySelector("details .docs-sidebar-mobile")).not.toBeNull();
  });

  it("marks the active route in both copies", () => {
    render(<DocsSidebar documents={documents} activeRoute="/docs/getting-started" />);

    const links = screen.getAllByRole("link", { name: "Getting started" });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("labels each manifest group", () => {
    render(<DocsSidebar documents={documents} />);

    expect(screen.getAllByText("Start")[0]!.className).toBe("docs-sidebar-group");
  });

  it("omits a group with nothing published in it", () => {
    render(<DocsSidebar documents={documents} />);

    expect(screen.queryByText("Architecture")).toBeNull();
  });
});

describe("TypeChain documentation pager", () => {
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
      { document: { route: "/docs/build/petstore-typechain-foundation", title: "Petstore TypeChain foundation", curriculumStep: 4, curriculumTotal: 6, nextRoute: "/docs/build/petstore-policy-and-composition" } },
      { document: { route: "/docs/build/petstore-policy-and-composition", title: "Petstore policy and composition", curriculumStep: 5, curriculumTotal: 6, nextRoute: "/docs/petstore-walkthrough" } },
      { document: { route: "/docs/guides/composition-selection", title: "Choose a composition boundary" } },
      { document: { route: "/docs/petstore-walkthrough", title: "Petstore walkthrough", curriculumStep: 6, curriculumTotal: 6, nextRoute: null } },
    ] as never;

    render(<DocumentPager documents={curriculumDocuments} route="/docs/build/petstore-policy-and-composition" />);

    expect(screen.getByRole("link", { name: /Next step: Petstore walkthrough/i }).getAttribute("href")).toBe("/docs/petstore-walkthrough");
    expect(screen.queryByRole("link", { name: /Next: Choose a composition boundary/i })).toBeNull();
  });

  it("does not fall through to manifest adjacency after the terminal Build lesson", () => {
    const curriculumDocuments = [
      { document: { route: "/docs/build/petstore-policy-and-composition", title: "Petstore policy and composition", curriculumStep: 5, curriculumTotal: 6, nextRoute: "/docs/petstore-walkthrough" } },
      { document: { route: "/docs/petstore-walkthrough", title: "Petstore walkthrough", curriculumStep: 6, curriculumTotal: 6, nextRoute: null } },
      { document: { route: "/docs/guides/composition-selection", title: "Choose a composition boundary" } },
    ] as never;

    render(<DocumentPager documents={curriculumDocuments} route="/docs/petstore-walkthrough" />);

    expect(screen.queryByRole("link", { name: /Next:/i })).toBeNull();
  });
});

describe("TypeChain Build article curriculum context", () => {
  it("presents a Build step, prerequisite, outcome, application boundary, and failure-guide affordance", () => {
    const buildDocument = {
      document: {
        route: "/docs/build/petstore-policy-and-composition",
        title: "Petstore policy and composition",
        group: "Build",
        classification: "published",
        sourcePath: "docs/guides/petstore-policy-and-composition.md",
        curriculumStep: 5,
        curriculumTotal: 6,
        prerequisites: ["/docs/build/petstore-typechain-foundation"],
        nextRoute: "/docs/petstore-walkthrough",
        outcome: "A selected LangChain, agent, or in-process TypeMCP composition boundary.",
        applicationBoundary: "Your application enforces policy and owns model calls, credentials, lifecycle, and transport.",
      },
      title: "Petstore policy and composition",
      markdown: "# Petstore policy and composition\n\n## Failure guide\n\nDiagnose policy and composition limitations in the canonical guide.",
      toc: [],
      internalLinks: new Map(),
      sourceUrl: "https://github.com/Theorvane/type-chain/blob/90152f97834dacfe7211786bc98227185950e2e0/docs/guides/petstore-policy-and-composition.md",
    } as never;

    render(<MarkdownArticle document={buildDocument} />);

    expect(screen.getByText("Build / Step 5 of 6")).toBeTruthy();
    const prerequisite = screen.getByRole("link", { name: /Prerequisite: Petstore TypeChain foundation/i });
    expect(prerequisite.getAttribute("href")).toBe("/docs/build/petstore-typechain-foundation");
    expect(prerequisite.closest("p")).not.toBeNull();
    expect(screen.getByText(/A selected LangChain, agent, or in-process TypeMCP composition boundary/i)).toBeTruthy();
    expect(screen.getByText(/Your application enforces policy and owns model calls, credentials, lifecycle, and transport/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /Troubleshooting and limitations/i }).getAttribute("href")).toBe("#failure-guide");
  });
});
