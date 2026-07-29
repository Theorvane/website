import { render, screen } from "@testing-library/react";
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
});
