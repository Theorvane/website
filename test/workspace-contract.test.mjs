import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("root workspace defines both public website apps and quality gates", async () => {
	const manifest = JSON.parse(
		await readFile(new URL("../package.json", import.meta.url), "utf8"),
	);

	assert.equal(manifest.private, true);
	assert.ok(manifest.packageManager?.startsWith("npm@"));
	assert.deepEqual(manifest.workspaces, ["apps/*", "packages/*"]);
	assert.deepEqual(manifest.overrides, { postcss: "8.5.21", sharp: "0.35.3" });
	assert.ok(manifest.scripts?.lint);
	assert.ok(manifest.scripts?.typecheck);
	assert.ok(manifest.scripts?.test);
	assert.ok(manifest.scripts?.build);
});
