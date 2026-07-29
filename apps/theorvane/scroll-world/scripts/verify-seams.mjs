import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { validateMediaManifestFile } from "./validate-media-manifest.mjs";

const sha256 = async (path) => createHash("sha256").update(await readFile(path)).digest("hex");
const probe = (path) => {
	const result = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=width,height", "-of", "json", path], { encoding: "utf8" });
	if (result.status !== 0) throw new Error(`ffprobe failed for ${path}: ${result.stderr.trim()}`);
	return JSON.parse(result.stdout);
};
const absolute = (root, publicPath) => `${root}${publicPath}`;

export async function verifySeams(manifestPath, publicRoot = "apps/theorvane/public") {
	const manifest = await validateMediaManifestFile(manifestPath);
	for (const variant of [manifest.desktop, manifest.mobile]) {
		for (const clip of variant.clips) {
			const file = absolute(publicRoot, clip.path);
			await stat(file);
			if ((await sha256(file)) !== clip.checksum) throw new Error(`Checksum mismatch: ${clip.path}`);
			const facts = probe(file);
			const stream = facts.streams.find((candidate) => candidate.width && candidate.height);
			if (!stream || stream.width !== clip.dimensions[0] || stream.height !== clip.dimensions[1]) throw new Error(`Dimension mismatch: ${clip.path}`);
		}
	}
	console.log("All seam inputs, checksums, and dimensions are valid.");
}

if (process.argv[1]?.endsWith("verify-seams.mjs")) {
	if (!process.argv[2]) { console.error("Usage: node verify-seams.mjs <manifest.json> [public-root]"); process.exitCode = 1; }
	else verifySeams(process.argv[2], process.argv[3]).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
