import { describe, expect, it } from "vitest";

import robots from "./robots";

describe("TypeMCP robots", () => {
  it("allows every crawler and points at the canonical sitemap and host", () => {
    expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(robots().sitemap).toBe("https://typemcp.theorvane.tech/sitemap.xml");
    expect(robots().host).toBe("https://typemcp.theorvane.tech");
  });
});
