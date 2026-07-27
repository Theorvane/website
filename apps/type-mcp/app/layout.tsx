import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://typemcp.theorvane.tech"),
	title: "TypeMCP — strict TypeScript MCP runtime",
	description: "Declare, validate, and compile MCP server surfaces with strict TypeScript decorators.",
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
