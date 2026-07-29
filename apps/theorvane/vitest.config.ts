import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		exclude: ["scroll-world/test/**/*.mjs"],
		globals: true,
	},
});
