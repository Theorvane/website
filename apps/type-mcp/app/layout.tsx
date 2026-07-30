import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://typemcp.theorvane.tech");
const title = "TypeMCP — strict TypeScript MCP runtime";
const description = "Declare, validate, and compile MCP server surfaces with strict TypeScript decorators.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "TypeMCP",
	keywords: ["TypeMCP", "Model Context Protocol", "MCP server", "TypeScript decorators", "MCP SDK", "Streamable HTTP", "LangChain tools", "open source"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "TypeMCP", locale: "en_US" },
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
				<script src="https://rybbit.handgarden.kr/api/script.js" data-site-id="c37c7591084c" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
