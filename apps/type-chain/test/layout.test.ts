import { describe, expect, it } from "vitest";

import RootLayout from "../app/layout";

describe("TypeChain analytics", () => {
	it("configures the approved Rybbit site script", () => {
		const layout = RootLayout({ children: null });
		const [head] = layout.props.children;
		const script = head.props.children;

		expect(script.props).toMatchObject({
			src: "https://rybbit.handgarden.kr/api/script.js",
			"data-site-id": "6f862fa29286",
			defer: true,
		});
	});
});
