import type { ReactNode } from "react";

export interface EditorialHeroProps {
	readonly children: ReactNode;
}

export function EditorialHero({ children }: EditorialHeroProps) {
	return (
		<section className="editorial-hero shell" id="top">
			<img
				alt=""
				className="editorial-hero__image"
				decoding="async"
				src="/editorial-signal/hero/theorvane-editorial-signal.webp"
			/>
			<div className="editorial-hero__overlay" />
			<div className="editorial-hero__content">{children}</div>
		</section>
	);
}
