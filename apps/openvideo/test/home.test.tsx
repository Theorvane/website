import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("OpenVideo homepage", () => {
	it("makes the local-first product boundary and official destinations discoverable", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { name: /record\. edit\.\s*keep it local/i })).toBeTruthy();
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
		expect(screen.getByText(/projects and media stay on your device/i)).toBeTruthy();
		expect(screen.getByText(/no cloud upload, analytics, or accounts/i)).toBeTruthy();
		expect(screen.getByRole("link", { name: /view source on github/i }).getAttribute("href")).toBe(
			"https://github.com/Theorvane/openvideo",
		);
		expect(screen.getByRole("link", { name: /browse releases/i }).getAttribute("href")).toBe(
			"https://github.com/Theorvane/openvideo/releases",
		);
	});
});
