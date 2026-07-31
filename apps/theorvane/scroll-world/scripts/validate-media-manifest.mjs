import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const APPROVED_SCENE_IDS = ["studio-beacon", "typemcp-contract-island", "typechain-composition-island", "openscene-local-studio", "product-constellation"];
const APPROVED_MODELS = new Set(["seedance_2_0"]);
const checksum = /^[a-f0-9]{64}$/i;
const rootPath = (value) => typeof value === "string" && value.startsWith("/") && !value.includes("?") && !value.includes("..") && !value.includes("//");

function assert(condition, message) { if (!condition) throw new Error(message); }
function validateVariant(variant, expectedAspectRatio, otherVariant) {
	assert(variant?.aspectRatio === expectedAspectRatio, `Expected native ${expectedAspectRatio} variant`);
	assert(rootPath(variant.timeline) && rootPath(variant.poster), "Media paths must be safe root-relative paths");
	assert(variant.timeline !== otherVariant.timeline && variant.poster !== otherVariant.poster, "Native variants must differ");
	assert(Array.isArray(variant.clips) && variant.clips.length === 9, "Each variant must contain exactly nine clips");
	for (const [index, clip] of variant.clips.entries()) {
		assert(rootPath(clip.path), "Clip path must be safe root-relative");
		assert(typeof clip.duration === "number" && clip.duration > 0, "Each clip requires a positive duration");
		assert(Array.isArray(clip.dimensions) && clip.dimensions.length === 2 && clip.dimensions.every((value) => Number.isInteger(value) && value > 0), "Each clip requires dimensions");
		assert(checksum.test(clip.checksum ?? ""), "Each clip requires a SHA-256 checksum");
		assert(APPROVED_MODELS.has(clip.model), "Clip uses an unapproved model");
		assert(clip.muted === true, "Clips must be muted");
		if (index >= 5) {
			assert(clip.kind === "connector", "The final four clips must be connectors");
			assert(rootPath(clip.fromFrame) && rootPath(clip.toFrame) && /\/frames\/dive-\d+-(last|first)\.png$/.test(clip.fromFrame) && /\/frames\/dive-\d+-(last|first)\.png$/.test(clip.toFrame), "Connectors must use extracted frames");
		} else assert(clip.kind === "dive", "The first five clips must be dives");
	}
}

export function validateMediaManifest(manifest) {
	assert(manifest?.version === 1, "Manifest version must be 1");
	assert(JSON.stringify(manifest.scenes) === JSON.stringify(APPROVED_SCENE_IDS), "Manifest must contain exactly five approved scene IDs");
	assert(manifest.reviewerVerdict === "approved", "Manifest requires an approved reviewer verdict");
	validateVariant(manifest.desktop, "16:9", manifest.mobile);
	validateVariant(manifest.mobile, "9:16", manifest.desktop);
	return manifest;
}

export async function validateMediaManifestFile(path) { return validateMediaManifest(JSON.parse(await readFile(path, "utf8"))); }

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	if (process.argv.includes("--help")) console.log("Usage: node validate-media-manifest.mjs <manifest.json>");
	else if (!process.argv[2]) { console.error("A manifest path is required"); process.exitCode = 1; }
	else validateMediaManifestFile(process.argv[2]).then(() => console.log("Media manifest is valid.")).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
