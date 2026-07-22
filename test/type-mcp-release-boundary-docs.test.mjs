import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const specificationPath = "docs/superpowers/specs/2026-07-22-theorvane-and-type-mcp-websites-design.md";

test("website specification distinguishes published TypeMCP 0.1.0 from unreleased runtime work", async () => {
	const specification = await readFile(specificationPath, "utf8");

	assert.match(specification, /decorator declarations and immutable metadata reads/i);
	assert.match(specification, /does not validate, compile, invoke, or transport/i);
	assert.match(specification, /reserved and throw/i);
	assert.doesNotMatch(specification, /SDK compiler \+ transports/i);
	assert.doesNotMatch(specification, /type-mcp\/langchain as tools-only/i);
});
