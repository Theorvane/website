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

	it("delivers the approved dark Workspace Surface instead of an appended generic panel", () => {
		render(createElement(HomePage));

		expect(screen.getByTestId("openvideo-workspace-surface")).toBeTruthy();
		expect(screen.getByRole("region", { name: /agent approval request/i })).toBeTruthy();
		expect(screen.getAllByAltText("OpenVideo").some((image) => image.getAttribute("src") === "/logo.svg")).toBe(true);
	});

	it("leads with the agent-driven editor rather than the capture-only workflow", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/edits with you/i);
		expect(screen.getByRole("main")).toBeTruthy();
		expect(screen.getByRole("navigation", { name: /primary/i })).toBeTruthy();
		expect(screen.getByText(/your media stays on your machine/i)).toBeTruthy();
	});

	it("offers source and run-from-source instead of a download the project does not publish", () => {
		render(createElement(HomePage));

		expect(screen.getByRole("link", { name: /view source on github/i }).getAttribute("href")).toBe(
			"https://github.com/Theorvane/openvideo",
		);
		// The repository publishes no releases or tags, so a download or
		// installer call to action would be a claim the project cannot meet.
		expect(screen.queryByRole("link", { name: /^download/i })).toBeNull();
		expect(screen.getByTestId("run-from-source").textContent).toContain("npm run dev");
	});

	it("names the capabilities the application actually ships", () => {
		render(createElement(HomePage));

		for (const capability of ["Edit", "Delegate", "Watch", "Generate", "Connect", "Keep"]) {
			expect(screen.getAllByRole("heading", { name: new RegExp(capability, "i") }).length).toBeGreaterThan(0);
		}
	});

	it("states the agent's operations and that project changes need approval", () => {
		render(createElement(HomePage));

		const agentSection = screen.getByRole("region", { name: /what the agent can do/i });
		expect(agentSection.textContent).toContain("addClipToTimeline");
		expect(agentSection.textContent).toContain("watchProjectVideo");
		expect(agentSection.textContent).toContain("importGeneratedResult");
		expect(screen.getByText(/asks for approval/i)).toBeTruthy();
	});

	it("describes provider choice, including running with no account at all", () => {
		render(createElement(HomePage));

		const providers = screen.getByRole("region", { name: /providers/i });
		expect(providers.textContent).toMatch(/models\.dev/i);
		expect(providers.textContent).toMatch(/ollama/i);
		expect(providers.textContent).toMatch(/no account/i);
	});

	it("keeps the privacy boundary to what the application enforces", () => {
		render(createElement(HomePage));

		expect(screen.getByText(/no account, no telemetry/i)).toBeTruthy();
		// The app does call connected providers, so the old absolute claim must not return.
		expect(screen.queryByText(/no cloud upload, analytics, or accounts are built into the application/i)).toBeNull();
		expect(screen.getByText(/only when you ask it to/i)).toBeTruthy();
	});

	it("answers the questions a first-time visitor asks", () => {
		render(createElement(HomePage));

		const faq = screen.getByRole("region", { name: /questions/i });
		expect(faq.textContent).toMatch(/free/i);
		expect(faq.textContent).toMatch(/subscription/i);
		expect(faq.textContent).toMatch(/FFmpeg/i);
	});
});
