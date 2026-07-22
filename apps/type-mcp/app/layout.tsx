import type { Metadata } from "next";
import "@theorvane/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = { title: "TypeMCP — decorator-first MCP for TypeScript", description: "Build explicit, framework-neutral MCP servers with TypeScript decorators." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
