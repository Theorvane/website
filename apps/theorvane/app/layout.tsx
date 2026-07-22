import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = { title: "Theorvane — precise tools for the AI-native web", description: "Theorvane builds focused, verifiable developer tools." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html lang="en"><body>{children}</body></html>;
}
