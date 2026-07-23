import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("TypeMCP release-boundary content has a centered, padded container", async () => {
	const page = await readFile("apps/type-mcp/app/page.tsx", "utf8");
	const styles = await readFile("apps/type-mcp/app/globals.css", "utf8");

	assert.match(page, /<section className="integration" id="integrations">/);
	assert.match(page, /<div className="shell integration-content">/);
	assert.match(styles, /\.integration\{background:#e9eee7\}/);
	assert.match(styles, /\.integration-content\{padding:7rem clamp\(1rem,3vw,2rem\)\}/);
	assert.match(styles, /\.integration-content\{padding:4\.5rem clamp\(1rem,3vw,2rem\)\}/);
});
