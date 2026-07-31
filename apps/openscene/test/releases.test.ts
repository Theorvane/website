import { describe, expect, it } from "vitest";

import { assetsFor, downloadUrl, releaseAssets, releaseNotesUrl, releaseTag, releaseVersion } from "../lib/releases";

describe("published release assets", () => {
	it("covers every desktop platform the project builds for", () => {
		expect(assetsFor("macos").map((asset) => asset.variant)).toEqual(["Apple Silicon", "Intel"]);
		expect(assetsFor("windows").map((asset) => asset.variant)).toEqual(["Installer"]);
		expect(assetsFor("linux").map((asset) => asset.variant)).toEqual(["AppImage", "deb"]);
	});

	it("keeps every asset filename on the tag its link points at", () => {
		// A version bump that misses a filename would produce links that 404 on
		// GitHub, so the two are checked against each other rather than trusted.
		for (const asset of releaseAssets) {
			expect(asset.file).toContain(releaseVersion);
			expect(downloadUrl(asset)).toBe(`https://github.com/Theorvane/openscene/releases/download/${releaseTag}/${asset.file}`);
		}
	});

	it("derives the tag and release notes link from the version", () => {
		expect(releaseTag).toBe(`v${releaseVersion}`);
		expect(releaseNotesUrl).toBe(`https://github.com/Theorvane/openscene/releases/tag/v${releaseVersion}`);
	});
});
