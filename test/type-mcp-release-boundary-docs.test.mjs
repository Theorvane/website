import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const specificationPath = "docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md";
const publishedBoundaryHeading = "### Published npm 0.1.0 boundary";
const nextSectionHeading = "### Intent";

function publishedBoundarySection(specification) {
	const start = specification.indexOf(publishedBoundaryHeading);
	assert.notEqual(start, -1, "missing explicit published npm 0.1.0 boundary section");

	const end = specification.indexOf(nextSectionHeading, start);
	assert.notEqual(end, -1, "published npm 0.1.0 boundary must end before the TypeMCP intent section");

	return specification.slice(start, end);
}

test("published TypeMCP 0.1.0 documentation excludes unreleased runtime behavior", async () => {
	const specification = await readFile(specificationPath, "utf8");
	const boundary = publishedBoundarySection(specification);

	assert.match(boundary, /decorator declarations and immutable metadata reads only/i);
	assert.match(boundary, /does not validate, compile, invoke, or transport/i);
	assert.match(boundary, /createMcpServer\(\)/);
	assert.match(boundary, /type-mcp\/http/);
	assert.match(boundary, /createMcpHandler\(\)/);
	assert.match(boundary, /reserved and throw/i);
	assert.doesNotMatch(boundary, /runtime support/i);
	assert.doesNotMatch(boundary, /SDK compiler \+ transports/i);
	assert.doesNotMatch(boundary, /type-mcp\/langchain as tools-only/i);
});
