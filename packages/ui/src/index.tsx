import type { AnchorHTMLAttributes, ReactNode } from "react";

import { ScrollWorld } from "./scroll-world";
export { ScrollWorld };
export type { ScrollWorldManifest, ScrollWorldScene, ScrollWorldVariant, ScrollWorldAspectRatio } from "./scroll-world";
export { MOBILE_SCROLL_WORLD_BREAKPOINT, assertScrollWorldManifest, chooseScrollWorldVariant, clampScrollWorldProgress, scrollWorldTimeAtProgress } from "./scroll-world";
export { createScrollWorldController } from "./scroll-world-controller";
export type { ScrollWorldController, ScrollWorldScheduler, ScrollWorldVideo } from "./scroll-world-controller";

export function SkipLink({ children = "Skip to content" }: { readonly children?: ReactNode }) {
	return <a className="skip-link" href="#main-content">{children}</a>;
}

export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return <a {...props} rel="noreferrer" target="_blank">{children}</a>;
}

export function SectionHeading({ eyebrow, title, children }: { readonly eyebrow: string; readonly title: string; readonly children?: ReactNode }) {
	return <header><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</header>;
}
