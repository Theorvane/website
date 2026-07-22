import type { AnchorHTMLAttributes, ReactNode } from "react";

export function SkipLink({ children = "Skip to content" }: { readonly children?: ReactNode }) {
	return <a className="skip-link" href="#main-content">{children}</a>;
}

export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return <a {...props} rel="noreferrer" target="_blank">{children}</a>;
}

export function SectionHeading({ eyebrow, title, children }: { readonly eyebrow: string; readonly title: string; readonly children?: ReactNode }) {
	return <header><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</header>;
}
