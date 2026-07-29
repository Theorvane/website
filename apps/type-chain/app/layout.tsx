import type { Metadata } from "next";

import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://typechain.theorvane.tech"),
	title: "TypeChain — typed LangChain tools and agents",
	description: "Decorator-first, type-safe authoring for LangChain JS tools and agents with explicit runtime boundaries.",
	icons: {
		icon: [{ url: "/icon.png", sizes: "460x460", type: "image/png" }],
		apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
		shortcut: ["/favicon.ico"],
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<script src="https://rybbit.handgarden.kr/api/script.js" data-site-id="6f862fa29286" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
