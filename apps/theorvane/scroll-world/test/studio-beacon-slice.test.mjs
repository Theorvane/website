import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

const publicRoot = new URL("../../public/", import.meta.url);
const manifestUrl = new URL("../media/studio-beacon-desktop.json", import.meta.url);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const rootRelative = (value) => typeof value === "string" && value.startsWith("/") && !value.includes("?") && !value.includes("..") && !value.includes("//");

async function assetFor(path) {
	const local = join(new URL(".", publicRoot).pathname, path.slice(1));
	await access(local);
	return { local, bytes: await readFile(local) };
}

test("Studio Beacon desktop slice contains local, silent, reviewable runtime artifacts", async () => {
	const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
	assert.equal(manifest.version, 1);
	assert.equal(manifest.sceneId, "studio-beacon");
	assert.equal(manifest.variant, "desktop");
	assert.equal(manifest.aspectRatio, "16:9");
	assert.equal(manifest.status, "approved-calibration");
	assert.equal(manifest.model, "seedance-1-5-pro-251215");
	assert.equal(manifest.hasAudio, false);
	assert.equal(manifest.watermarkReview, "none-visible");
	assert.equal(manifest.video.codec, "h264");
	assert.equal(manifest.video.width, 1280);
	assert.equal(manifest.video.height, 720);
	assert.equal(manifest.video.framesPerSecond, 24);
	assert.ok(manifest.video.durationSeconds >= 5 && manifest.video.durationSeconds < 5.2);

	for (const asset of [manifest.poster, manifest.video.path, manifest.lastFrame]) {
		assert.ok(rootRelative(asset), "runtime assets must use safe root-relative paths");
		const { bytes } = await assetFor(asset);
		assert.match(manifest.checksums[asset], /^[a-f0-9]{64}$/);
		assert.equal(sha256(bytes), manifest.checksums[asset]);
	}
});

test("Studio Beacon slice is explicitly not a replacement for native mobile or full timeline media", async () => {
	const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
	assert.equal(manifest.productionScope, "desktop-scene-calibration-only");
	assert.equal(manifest.mobileEquivalent, null);
	assert.equal(manifest.timelineEquivalent, null);
});
