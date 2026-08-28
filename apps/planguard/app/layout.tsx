import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://planguard.theorvane.tech");
const title = "PlanGuard — see the blast radius of a Terraform change before it merges";
const description = "PlanGuard is an AI-assisted infrastructure change review platform for Terraform pull requests. It reads the plan, surfaces the real risk — destroys, replacements, permission and network changes — before merge, and leaves the apply in your team's hands.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "PlanGuard",
	keywords: ["PlanGuard", "Terraform", "Terraform plan", "infrastructure as code", "pull request review", "change review", "blast radius", "IaC", "DevOps", "Theorvane"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "PlanGuard", locale: "en_US" },
	twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<script src="https://rybbit.sanhouse.kr/api/script.js" data-site-id="0b0d4eec0814" defer />
			</head>
			<body>{children}</body>
		</html>
	);
}
