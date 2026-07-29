import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const script = new URL("../scripts/validate-media-manifest.mjs", import.meta.url);

const digest = (value) => createHash("sha256").update(value).digest("hex");
const ids = ["studio-beacon", "typemcp-contract-island", "typechain-composition-island", "openvideo-local-studio", "product-constellation"];

function validManifest() {
	const variant = (aspectRatio, directory) => ({
		aspectRatio,
		timeline: `/scroll-world/${directory}/timeline.mp4`,
		poster: `/scroll-world/${directory}/poster.webp`,
		clips: Array.from({ length: 9 }, (_, index) => ({
			id: index < 5 ? `dive-${ids[index]}` : `connector-${index - 4}`,
			kind: index < 5 ? "dive" : "connector",
			path: `/scroll-world/${directory}/clip-${index + 1}.mp4`,
			duration: 4,
			dimensions: aspectRatio === "16:9" ? [1920, 1080] : [1080, 1920],
			checksum: digest(`${directory}-${index}`),
			model: "seedance_2_0",
			muted: true,
			...(index >= 5 ? {
				fromFrame: `/scroll-world/${directory}/frames/dive-${index - 4}-last.png`,
				toFrame: `/scroll-world/${directory}/frames/dive-${index - 3}-first.png`,
			} : {}),
		})),
	});
	return { version: 1, scenes: [...ids], desktop: variant("16:9", "desktop"), mobile: variant("9:16", "mobile"), reviewerVerdict: "approved" };
}

async function validate(manifest) {
	const directory = await mkdtemp(join(tmpdir(), "scroll-world-manifest-"));
	const path = join(directory, "manifest.json");
	await writeFile(path, JSON.stringify(manifest));
	try {
		const result = await import(script.href);
		return await result.validateMediaManifestFile(path);
	} finally {
		await rm(directory, { force: true, recursive: true });
	}
}

test("accepts the approved five-scene, two-native-variant inventory", async () => {
	const result = await validate(validManifest());
	assert.equal(result.desktop.clips.length, 9);
	assert.equal(result.mobile.clips.length, 9);
});

test("rejects unapproved scene inventories and unsafe media provenance", async () => {
	const missing = validManifest(); missing.scenes.pop();
	await assert.rejects(() => validate(missing), /exactly five approved/i);
	const unsafe = validManifest(); unsafe.desktop.poster = "https://cdn.example.test/poster.webp?token=secret";
	await assert.rejects(() => validate(unsafe), /root-relative|unsafe/i);
});

test("rejects desktop crops, wrong clip counts, and non-extracted connector boundaries", async () => {
	const crop = validManifest(); crop.mobile.timeline = crop.desktop.timeline;
	await assert.rejects(() => validate(crop), /must differ|native/i);
	const wrongCount = validManifest(); wrongCount.desktop.clips.pop();
	await assert.rejects(() => validate(wrongCount), /nine clips/i);
	const nonExtracted = validManifest(); nonExtracted.desktop.clips[5].fromFrame = "/scroll-world/desktop/stills/studio-beacon.png";
	await assert.rejects(() => validate(nonExtracted), /extracted frame/i);
});

test("rejects incomplete quality evidence and unapproved models", async () => {
	const incomplete = validManifest(); delete incomplete.desktop.clips[0].checksum;
	await assert.rejects(() => validate(incomplete), /checksum/i);
	const unapproved = validManifest(); unapproved.desktop.clips[0].model = "unknown-model";
	await assert.rejects(() => validate(unapproved), /approved model/i);
});
