import { render, screen, within } from "@testing-library/react";
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

  it("presents a guided Petstore workspace while retaining the reference taxonomy", async () => {
    render(await DocsIndex());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Build a typed Petstore workflow/i,
      }),
    ).toBeTruthy();
    expect(screen.getByText("Your learning path")).toBeTruthy();
    expect(screen.getByText("Step 1 of 6")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Start the Petstore workspace/i }).getAttribute("href"),
    ).toBe("/docs/build/petstore-project-setup");

    const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
    const workflowLinks = within(workflow)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    for (const href of [
      "/docs/build/petstore-project-setup",
      "/docs/build/petstore-typemcp-foundation",
      "/docs/petstore-walkthrough",
    ]) {
      expect(workflowLinks).toContain(href);
    }

    for (const heading of ["Get started", "Learn", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.queryByRole("heading", { name: /^Build$/ })).toBeNull();
    expect(screen.getByText(/application owns hosting, authorization, durable state, models/i)).toBeTruthy();
  });
});
