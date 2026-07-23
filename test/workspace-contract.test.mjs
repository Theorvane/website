import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const project = (path) => new URL(`../${path}`, import.meta.url);

test("root workspace defines public website apps and quality gates", async () => {
	const manifest = JSON.parse(await readFile(project("package.json"), "utf8"));

	assert.equal(manifest.private, true);
	assert.ok(manifest.packageManager?.startsWith("npm@"));
	assert.deepEqual(manifest.workspaces, ["apps/*", "packages/*"]);
	assert.deepEqual(manifest.overrides, { postcss: "8.5.21", sharp: "0.35.3" });
	assert.ok(manifest.scripts?.lint);
	assert.ok(manifest.scripts?.typecheck);
	assert.ok(manifest.scripts?.test);
	assert.ok(manifest.scripts?.build);
});

test("source documentation lists the independently deployable OpenVideo site", async () => {
	const [readme, guide] = await Promise.all([
		readFile(project("README.md"), "utf8"),
		readFile(project("AGENTS.md"), "utf8"),
	]);

	for (const content of [readme, guide]) {
		assert.match(content, /apps\/openvideo/);
		assert.match(content, /https:\/\/openvideo\.theorvane\.tech/);
	}
});
