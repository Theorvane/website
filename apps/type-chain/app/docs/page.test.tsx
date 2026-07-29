import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex from "./page";

describe("TypeChain docs index", () => {
  it("organizes a continued Petstore workspace into the reference-first learning taxonomy", async () => {
    render(await DocsIndex());

    expect(screen.getByRole("heading", { name: "Build your first Petstore workflow" })).toBeTruthy();
    for (const heading of ["Get started", "Learn", "Build", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.getByRole("link", { name: /Continue the Petstore workspace/i }).getAttribute("href")).toBe("/docs/build/petstore-typechain-foundation");
    expect(screen.getByText(/TypeChain.*models, credentials, policy enforcement, and transport/i)).toBeTruthy();
  });

  it("continues the shared Petstore journey from TypeChain's local stages", async () => {
    render(await DocsIndex());

    expect(screen.getByRole("heading", { level: 1, name: /Continue the typed Petstore workflow/i })).toBeTruthy();
    expect(screen.getByText("Your learning path")).toBeTruthy();
    expect(screen.getByText("Step 4 of 6")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Continue the Petstore workspace/i }).getAttribute("href")).toBe("/docs/build/petstore-typechain-foundation");

    const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
    expect(within(workflow).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(expect.arrayContaining([
      "/docs/build/petstore-typechain-foundation",
      "/docs/build/petstore-policy-and-composition",
      "/docs/petstore-walkthrough",
    ]));

    for (const heading of ["Get started", "Learn", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.queryAllByRole("heading").some((heading) => heading.textContent === "Build")).toBe(false);
    expect(screen.getByText(/application owns models, credentials, policy enforcement, state, hosting, and deployment/i)).toBeTruthy();
  });
});
