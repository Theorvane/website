import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://openvideo.theorvane.tech");
const title = "OpenVideo — local-first video recording and editing";
const description = "OpenVideo is an open-source, local-first Electron studio for recording, editing, and exporting video on your device.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "OpenVideo",
	keywords: ["OpenVideo", "local-first", "video editor", "screen recording", "Electron", "open source"],
	alternates: { canonical: "/" },
	robots: { index: true, follow: true },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "OpenVideo", locale: "en_US" },
	twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html lang="en"><body>{children}</body></html>;
}
