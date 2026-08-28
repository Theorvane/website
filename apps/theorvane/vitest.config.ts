import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		exclude: ["scroll-world/test/**/*.mjs"],
		globals: true,
		// The full homepage renders (now six products) can momentarily exceed
		// Vitest's 5s default under CI load; give the suite generous headroom.
		testTimeout: 20000,
		hookTimeout: 20000,
	},
});
