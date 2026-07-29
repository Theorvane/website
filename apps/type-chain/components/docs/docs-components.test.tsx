import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocumentPager } from "./docs-components";

describe("TypeChain documentation pager", () => {
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
