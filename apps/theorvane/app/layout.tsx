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
	alternates: { canonical: "/" },
	robots: { index: true, follow: true },
	openGraph: {
		type: "website",
		url: siteUrl,
		title,
		description,
		siteName: "Theorvane",
		locale: "en_US",
	},
	twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html lang="en"><body>{children}</body></html>;
}
