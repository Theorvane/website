import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

function channel(value: number): number {
	const srgb = value / 255;
	return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
	const [r, g, b] = [1, 3, 5].map((offset) => channel(Number.parseInt(hex.slice(offset, offset + 2), 16)));
	return 0.2126 * (r as number) + 0.7152 * (g as number) + 0.0722 * (b as number);
}

function contrast(a: string, b: string): number {
	const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return ((light as number) + 0.05) / ((dark as number) + 0.05);
}

async function tokens(): Promise<Record<string, string>> {
	const css = await readFile("app/globals.css", "utf8");
	const root = /:root\{([^}]*)\}/.exec(css)?.[1] ?? "";
	return Object.fromEntries(root.split(";").filter(Boolean).map((entry) => entry.split(":").map((part) => part.trim()) as [string, string]));
}

/**
 * The accent is drawn from the repository hero art, but the hero sits on near-black while this site
 * is light and also reverses white text onto the accent. Both directions must stay readable.
 */
describe("TypeMCP palette contrast", () => {
	it("keeps hero-derived accent text legible on the page background", async () => {
		const { "--bg": bg, "--blue": blue, "--ink": ink, "--muted": muted } = await tokens();
		expect(contrast(blue as string, bg as string)).toBeGreaterThanOrEqual(4.5);
		expect(contrast(ink as string, bg as string)).toBeGreaterThanOrEqual(4.5);
		expect(contrast(muted as string, bg as string)).toBeGreaterThanOrEqual(4.5);
	});

	it("keeps white button and skip-link text legible on the accent", async () => {
		const { "--blue": blue } = await tokens();
		expect(contrast("#ffffff", blue as string)).toBeGreaterThanOrEqual(4.5);
	});

	it("keeps body text legible on the pale accent surface", async () => {
		const { "--accent-tint": tint, "--ink": ink } = await tokens();
		expect(contrast(ink as string, tint as string)).toBeGreaterThanOrEqual(4.5);
	});
});
