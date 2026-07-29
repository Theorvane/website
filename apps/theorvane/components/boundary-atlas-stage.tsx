"use client";

import { useEffect, useState } from "react";

const poster = "/scroll-world/desktop/studio-beacon-poster.webp";
const video = "/scroll-world/desktop/studio-beacon.mp4";

export function BoundaryAtlasStage() {
	const [reducedMotion, setReducedMotion] = useState(false);
	const [canAttachVideo, setCanAttachVideo] = useState(false);

	useEffect(() => {
		if (typeof window.matchMedia !== "function") return;
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => {
			setReducedMotion(preference.matches);
			setCanAttachVideo(!preference.matches);
		};
		update();
		preference.addEventListener("change", update);
		return () => preference.removeEventListener("change", update);
	}, []);

	return <figure className="boundary-atlas-stage" data-motion={reducedMotion ? "reduced" : "enabled"}>
		<img alt="Boundary Atlas: three independent tool surfaces joined only at explicit junctions." src={poster} />
		<video aria-hidden="true" autoPlay data-testid="boundary-atlas-video" loop muted playsInline preload="metadata" src={canAttachVideo ? video : undefined} />
		<figcaption>Three independent tool surfaces. Explicit junctions. Your system stays yours.</figcaption>
	</figure>;
}
