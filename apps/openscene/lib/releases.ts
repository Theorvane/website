/**
 * The published OpenScene release the site offers for download.
 *
 * Asset filenames carry the version, so `releases/latest/download/<asset>` cannot
 * resolve them. Every link is pinned to this tag instead, and `test/releases.test.ts`
 * fails if the version and the filenames drift apart — bumping a release is a
 * single edit to `version` plus the filenames below.
 */
export const releaseVersion = "0.3.0";

export const releaseTag = `v${releaseVersion}` as const;

const downloadBase = `https://github.com/Theorvane/openscene/releases/download/${releaseTag}`;

export type Platform = "macos" | "windows" | "linux";

export interface ReleaseAsset {
	readonly platform: Platform;
	/** Names the hardware or package format a visitor has to choose between. */
	readonly variant: string;
	readonly file: string;
}

export const releaseAssets: readonly ReleaseAsset[] = [
	{ platform: "macos", variant: "Apple Silicon", file: `OpenScene-${releaseVersion}-arm64.dmg` },
	{ platform: "macos", variant: "Intel", file: `OpenScene-${releaseVersion}.dmg` },
	{ platform: "windows", variant: "Installer", file: `OpenScene.Setup.${releaseVersion}.exe` },
	{ platform: "linux", variant: "AppImage", file: `openscene-${releaseVersion}-x86_64.AppImage` },
	{ platform: "linux", variant: "deb", file: `openscene-${releaseVersion}-amd64.deb` },
];

export function downloadUrl(asset: ReleaseAsset): string {
	return `${downloadBase}/${asset.file}`;
}

export const releasesUrl = "https://github.com/Theorvane/openscene/releases";

export const releaseNotesUrl = `${releasesUrl}/tag/${releaseTag}`;

export function assetsFor(platform: Platform): readonly ReleaseAsset[] {
	return releaseAssets.filter((asset) => asset.platform === platform);
}
