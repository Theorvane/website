"use client";

import { useEffect, useRef } from "react";

const source = "/editorial-signal/cinematic/editorial-signal-scroll.mp4";

export function EditorialCinematic() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
		if (!mediaQuery || mediaQuery.matches) return;

		const video = videoRef.current;
		if (!video) return;

		let frame = 0;
		const sync = () => {
			frame = 0;
			const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
			const progress = Math.min(Math.max(window.scrollY / maximum, 0), 1);
			document.documentElement.style.setProperty("--cinematic-progress", progress.toFixed(4));
			if (Number.isFinite(video.duration) && video.duration > 0) {
				video.currentTime = progress * Math.max(video.duration - 0.1, 0);
			}
		};
		const requestSync = () => {
			if (!frame) frame = window.requestAnimationFrame(sync);
		};

		window.addEventListener("scroll", requestSync, { passive: true });
		window.addEventListener("resize", requestSync);
		video.addEventListener("loadedmetadata", requestSync);
		requestSync();

		return () => {
			window.removeEventListener("scroll", requestSync);
			window.removeEventListener("resize", requestSync);
			video.removeEventListener("loadedmetadata", requestSync);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<div aria-hidden="true" className="editorial-cinematic" data-testid="editorial-cinematic">
			<video
				className="editorial-cinematic__video"
				data-testid="editorial-cinematic-video"
				loop
				muted
				playsInline
				poster="/editorial-signal/hero/theorvane-editorial-signal.webp"
				preload="metadata"
				src={source}
				ref={videoRef}
			/>
			<div className="editorial-cinematic__scrim" />
		</div>
	);
}
