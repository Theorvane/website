import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReleaseBoundaryCallout } from "./docs-components";

describe("TypeMCP documentation release callout", () => {
  it("identifies the public scoped 0.2.0 runtime for non-published document classifications", () => {
    render(<ReleaseBoundaryCallout classification="repository-development" />);

    expect(screen.getByText("@theorvane/type-mcp@0.2.0")).toBeTruthy();
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
