import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://openvideo.theorvane.tech");
const title = "OpenVideo — the local-first video editor that edits with you";
const description = "An open-source desktop video editor with an AI agent that operates the timeline — cut, generate voice and video, and export with your own FFmpeg. Your media stays on your machine.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "OpenVideo",
	keywords: ["OpenVideo", "AI video editor", "AI agent", "local-first", "video editor", "video generation", "text to speech", "Electron", "open source"],
	alternates: { canonical: "/" },
	robots: { index: true, follow: true },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "OpenVideo", locale: "en_US" },
	twitter: { card: "summary", title, description },
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
				<script src="https://rybbit.handgarden.kr/api/script.js" data-site-id="765035acbe87" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
