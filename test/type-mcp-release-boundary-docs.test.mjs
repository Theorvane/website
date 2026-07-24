import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const specificationPath = "docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md";
const publishedBoundaryHeading = "### Published npm 0.2.0 boundary";
const nextSectionHeading = "### Intent";

function publishedBoundarySection(specification) {
	const start = specification.indexOf(publishedBoundaryHeading);
	assert.notEqual(start, -1, "missing explicit published npm 0.2.0 boundary section");

	const end = specification.indexOf(nextSectionHeading, start);
	assert.notEqual(end, -1, "published npm 0.2.0 boundary must end before the TypeMCP intent section");

	return specification.slice(start, end);
}

test("published TypeMCP 0.2.0 documentation distinguishes runtime features from application-owned policy", async () => {
	const specification = await readFile(specificationPath, "utf8");
	const boundary = publishedBoundarySection(specification);

	assert.match(boundary, /@theorvane\/type-mcp@0\.2\.0/);
	assert.match(boundary, /definition validation, MCP SDK compilation, stdio, and Streamable HTTP/i);
	assert.match(boundary, /@theorvane\/type-mcp\/langchain/);
	assert.match(boundary, /Applications own hosting, authorization, persistence, models, and LangGraph graph composition/i);
	assert.doesNotMatch(boundary, /type-mcp@0\.1\.0/);
	assert.doesNotMatch(boundary, /reserved and throw/i);
});
