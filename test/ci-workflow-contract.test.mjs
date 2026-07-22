import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("pull-request CI installs locked dependencies and verifies the monorepo", async () => {
	const workflow = await readFile(".github/workflows/verify.yml", "utf8");

	assert.match(workflow, /pull_request:/);
	assert.match(workflow, /permissions:\s*\n\s*contents: read/);
	assert.match(workflow, /actions\/checkout@11bd71901bbe5b1630ceea73d27597364c9af683/);
	assert.match(workflow, /actions\/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020/);
	assert.match(workflow, /npm ci/);
	assert.match(workflow, /npm test/);
	assert.match(workflow, /npm run lint/);
	assert.match(workflow, /npm run typecheck/);
	assert.match(workflow, /npm run build/);
});
