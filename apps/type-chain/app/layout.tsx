import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL("https://typechain.theorvane.tech"), title: "TypeChain — typed LangChain tools and agents", description: "Decorator-first, type-safe authoring for LangChain JS tools and agents with explicit runtime boundaries." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
