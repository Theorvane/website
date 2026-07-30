"use client";

import { useEffect, useRef } from "react";

export function AmbientWorld() {
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const update = () => {
			const limit = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
			const progress = Math.min(1, Math.max(0, window.scrollY / limit));
			root.current?.style.setProperty("--ambient-progress", String(progress));
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	return <div aria-hidden="true" className="ambient-world" data-testid="ambient-world" ref={root}>
		<div className="ambient-world__aura" />
		<div className="ambient-world__grid" />
		<div className="ambient-world__vignette" />
	</div>;
}
