import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("release promotion accepts only dev pull requests into main", async () => {
	const workflow = await readFile(".github/workflows/release-promotion.yml", "utf8");
	assert.match(workflow, /pull_request:\s*\n\s*branches: \[main\]/);
	assert.match(workflow, /HEAD_REF: \$\{\{ github\.head_ref \}\}/);
	assert.match(workflow, /test "\$HEAD_REF" = "dev"/);
});
