import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://theorvane.tech");
const title = "Theorvane — precise tools for the AI-native web";
const description = "Theorvane builds focused, verifiable developer tools for explicit contracts and inspectable systems.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "Theorvane",
	keywords: ["AI-native web", "developer tools", "TypeScript", "MCP", "open source"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: {
		type: "website",
		url: siteUrl,
		title,
		description,
		siteName: "Theorvane",
		locale: "en_US",
	},
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
				<script src="https://rybbit.handgarden.kr/api/script.js" data-site-id="13051a0ca43f" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
