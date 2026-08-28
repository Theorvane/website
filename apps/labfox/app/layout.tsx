import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://labfox.theorvane.tech");
const title = "LabFox — the GitLab workflow client for every platform";
const description = "LabFox is a cross-platform GitLab client for merge requests, code review, and CI/CD — on Android, iOS, Windows, and macOS, with first-class self-hosted support.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "LabFox",
	keywords: ["LabFox", "GitLab", "GitLab client", "merge requests", "code review", "CI/CD", "self-hosted", "Flutter", "cross-platform"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "LabFox", locale: "en_US" },
	twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<script src="https://rybbit.sanhouse.kr/api/script.js" data-site-id="dd7fd8c3ae1a" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
