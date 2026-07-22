import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("contribution governance requires issue triage and independent review", async () => {
	const agents = await readFile("AGENTS.md", "utf8");
	const pullRequestTemplate = await readFile(".github/PULL_REQUEST_TEMPLATE.md", "utf8");

	assert.match(agents, /`dev`.*integration/i);
	assert.match(agents, /`main`.*release/i);
	assert.match(agents, /`sjungwon03`/);
	assert.match(agents, /`sjungwon03-ai`/);
	assert.match(agents, /type: feature/);
	assert.match(agents, /area: website/);
	assert.match(agents, /release/);
	assert.match(pullRequestTemplate, /Closes #<issue-number>/);
	assert.match(pullRequestTemplate, /Labels/);
	assert.match(pullRequestTemplate, /sjungwon03-ai/);
	assert.match(pullRequestTemplate, /Verification/);
});
