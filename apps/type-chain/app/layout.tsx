import type { Metadata } from "next";

import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://typechain.theorvane.tech");
const title = "TypeChain — typed LangChain tools and agents";
const description = "Decorator-first, type-safe authoring for LangChain JS tools and agents with explicit runtime boundaries.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "TypeChain",
	keywords: ["TypeChain", "LangChain JS", "LangChain tools", "TypeScript decorators", "Stage 3 decorators", "LangGraph", "TypeMCP bridge", "open source"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "TypeChain", locale: "en_US" },
	twitter: { card: "summary_large_image", title, description },
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
				<script src="https://rybbit.sanhouse.kr/api/script.js" data-site-id="6f862fa29286" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
