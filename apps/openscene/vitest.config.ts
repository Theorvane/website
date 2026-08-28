import { defineConfig } from "vitest/config";

// Full homepage renders can momentarily exceed Vitest's 5s default under
// CI load; give the suite generous headroom to avoid flaky verify runs.
export default defineConfig({ test: { environment: "jsdom", globals: true, testTimeout: 20000, hookTimeout: 20000 } });
