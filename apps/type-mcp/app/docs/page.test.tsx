import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex from "./page";

describe("TypeMCP docs index", () => {
  it("organizes the Petstore workflow into the reference-first learning taxonomy", async () => {
    render(await DocsIndex());

    expect(screen.getByRole("heading", { name: "Build your first Petstore workflow" })).toBeTruthy();
    for (const heading of ["Get started", "Learn", "Build", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.getByRole("link", { name: /Start the Petstore workspace/i }).getAttribute("href")).toBe("/docs/build/petstore-project-setup");
    expect(screen.getByText(/explicit resolver.*runtime boundary/i)).toBeTruthy();
    expect(screen.getByText(/reader.*application.*lifecycle ownership/i)).toBeTruthy();
  });
});
