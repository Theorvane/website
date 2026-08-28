import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

const siteUrl = new URL("https://proxmox.theorvane.tech");
const title = "Proxmox MCP — a safety-gated MCP server for Proxmox VE";
const description = "Proxmox MCP is a safety-gated Model Context Protocol server for the Proxmox VE API. Let an AI agent list nodes, VMs, and containers and read status, while every mutating operation stays behind explicit, auditable boundaries.";

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title,
	description,
	applicationName: "Proxmox MCP",
	keywords: ["Proxmox MCP", "Proxmox VE", "MCP", "Model Context Protocol", "MCP server", "TypeMCP", "AI agent", "virtualization", "safety-gated", "developer tool"],
	authors: [{ name: "Theorvane", url: "https://theorvane.tech" }],
	creator: "Theorvane",
	publisher: "Theorvane",
	category: "technology",
	alternates: { canonical: "/" },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
	openGraph: { type: "website", url: siteUrl, title, description, siteName: "Proxmox MCP", locale: "en_US" },
	twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			{/* Analytics: add the Rybbit script here once a Proxmox MCP site id is provisioned. */}
			<body>{children}</body>
		</html>
	);
}
