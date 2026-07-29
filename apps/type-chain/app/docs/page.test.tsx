import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DocsIndex from "./page";

describe("TypeChain docs index", () => {
  it("keeps the reference-first reading intents around the continued workspace", async () => {
    render(await DocsIndex());

    for (const heading of ["Get started", "Learn", "Integrate", "Reference"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeTruthy();
    }
    expect(screen.queryByRole("heading", { name: /^Build$/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Continue the Petstore workspace/i }).getAttribute("href")).toBe("/docs/build/petstore-typechain-foundation");
    expect(screen.getByText(/Your application owns models, credentials, policy enforcement, state, hosting, and deployment/i)).toBeTruthy();
  });

  it("continues the shared Petstore journey from TypeChain's local stages", async () => {
    render(await DocsIndex());

    expect(screen.getByRole("heading", { level: 1, name: /Continue the typed Petstore workflow/i })).toBeTruthy();
    const workflow = screen.getByRole("region", { name: /Petstore workflow/i });
    const workflowContent = within(workflow);
    const currentStage = within(workflow).getByRole("group", { name: "Current learning stage" });
    expect(within(currentStage).getByText("Your learning path")).toBeTruthy();
    expect(within(currentStage).getByText("Step 4 of 6")).toBeTruthy();
    expect(within(workflow).getByRole("link", { name: /Continue the Petstore workspace/i }).getAttribute("href")).toBe("/docs/build/petstore-typechain-foundation");
    expect(workflowContent.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual(expect.arrayContaining([
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
