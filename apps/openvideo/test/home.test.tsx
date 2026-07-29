import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("OpenVideo homepage", () => {
	it("publishes a complete, accessible product footer", () => {
		render(createElement(HomePage));

		const footer = screen.getByRole("contentinfo");
		expect(footer.textContent).toContain("OpenVideo");
		expect(screen.getByRole("navigation", { name: /OpenVideo footer/i })).toBeTruthy();
		expect(screen.getAllByRole("link", { name: /releases/i }).some((link) => link.getAttribute("href") === "https://github.com/Theorvane/openvideo/releases")).toBe(true);
		expect(screen.getByRole("link", { name: /Theorvane/i }).getAttribute("href")).toBe("https://theorvane.tech/");
	});

	it("shows the released local capture-to-export workflow", () => {
		render(createElement(HomePage));

		for (const stage of ["Capture", "Edit", "Export"]) {
			expect(screen.getAllByRole("heading", { name: stage }).length).toBeGreaterThan(0);
		}
		expect(screen.getByText(/recordings, projects, imported assets, voice profiles, and exports stay local/i)).toBeTruthy();
		expect(screen.queryByText(/AI-assisted editing is available/i)).toBeNull();
	});

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
