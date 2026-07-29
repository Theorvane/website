"use client";

import { useEffect, useRef, useState } from "react";

type VideoHeroProps = Readonly<{
	poster: string;
	src: string;
}>;

export function VideoHero({ poster, src }: VideoHeroProps) {
	const root = useRef<HTMLDivElement>(null);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (typeof window.matchMedia !== "function") return;
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(preference.matches);
		update();
		preference.addEventListener("change", update);
		return () => preference.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (reducedMotion || !root.current || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) setShouldLoad(true);
		}, { rootMargin: "200px" });
		observer.observe(root.current);
		return () => observer.disconnect();
	}, [reducedMotion]);

	return <div aria-hidden="true" className="video-hero" data-testid="video-hero" ref={root}>
		<img alt="" className="video-hero__poster" data-testid="video-hero-poster" src={poster} />
		<video autoPlay className="video-hero__video" data-testid="video-hero-video" loop muted playsInline poster={poster} preload="metadata" src={!reducedMotion && shouldLoad ? src : undefined} />
	</div>;
}
