import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://typemcp.theorvane.tech"),
	title: "TypeMCP — decorator metadata for TypeScript",
	description: "Declare MCP declaration metadata with TypeScript decorators and inspect it explicitly.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
