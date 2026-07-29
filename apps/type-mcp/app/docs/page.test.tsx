import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex from "./page";

describe("TypeMCP docs index", () => {
  it("keeps the reference-first reading intents around the guided workspace", async () => {
    render(await DocsIndex());

    for (const heading of ["Get started", "Learn", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.queryByRole("heading", { name: /^Build$/ })).toBeNull();
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
    const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
    const workflowContent = within(workflow);
    expect(workflowContent.getByText("Your learning path")).toBeTruthy();
    expect(workflowContent.getByText("Step 1 of 6")).toBeTruthy();

    const workflowLinks = workflowContent
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(workflowLinks).toEqual(
      expect.arrayContaining([
        "/docs/build/petstore-project-setup",
        "/docs/build/petstore-typemcp-foundation",
        "/docs/petstore-walkthrough",
      ]),
    );

    for (const heading of ["Get started", "Learn", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.queryByRole("heading", { name: /^Build$/ })).toBeNull();
    expect(screen.getByText(/application owns hosting, authorization, durable state, models/i)).toBeTruthy();
  });
});
