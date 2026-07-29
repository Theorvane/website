"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export type ScrollWorldAspectRatio = "16:9" | "9:16";
export type ScrollWorldVariant = Readonly<{ src: string; poster: string; duration: number; aspectRatio: ScrollWorldAspectRatio }>;
export type ScrollWorldScene = Readonly<{ id: string; title: string; start: number; end: number; href: string }>;
export type ScrollWorldManifest = Readonly<{ id: string; ariaLabel: string; scenes: readonly ScrollWorldScene[]; desktop: ScrollWorldVariant; mobile: ScrollWorldVariant }>;
export const MOBILE_SCROLL_WORLD_BREAKPOINT = 700;

export function clampScrollWorldProgress(progress: number): number {
	if (!Number.isFinite(progress)) return 0;
	return Math.min(1, Math.max(0, progress));
}

export function scrollWorldTimeAtProgress(duration: number, progress: number): number {
	return duration * clampScrollWorldProgress(progress);
}

export function chooseScrollWorldVariant(manifest: ScrollWorldManifest, width: number): ScrollWorldVariant {
	return width <= MOBILE_SCROLL_WORLD_BREAKPOINT ? manifest.mobile : manifest.desktop;
}

function assertVariant(variant: ScrollWorldVariant): void {
	if (!Number.isFinite(variant.duration) || variant.duration <= 0) throw new Error("Scroll World duration must be positive");
	if (!variant.src.startsWith("/") || !variant.poster.startsWith("/")) throw new Error("Scroll World media paths must be root-relative");
}

export function assertScrollWorldManifest(manifest: ScrollWorldManifest): ScrollWorldManifest {
	if (!manifest.id.trim() || !manifest.ariaLabel.trim()) throw new Error("Scroll World needs an id and accessible label");
	if (manifest.scenes.length === 0) throw new Error("Scroll World needs at least one scene");
	assertVariant(manifest.desktop);
	assertVariant(manifest.mobile);
	const ids = new Set<string>();
	let cursor = 0;
	for (const scene of manifest.scenes) {
		if (!scene.id.trim() || !scene.title.trim() || (!scene.href.startsWith("/") && !scene.href.startsWith("#") && !scene.href.startsWith("https://"))) throw new Error("Scroll World scene is invalid");
		if (ids.has(scene.id)) throw new Error(`Duplicate Scroll World scene id: ${scene.id}`);
		ids.add(scene.id);
		if (!Number.isFinite(scene.start) || !Number.isFinite(scene.end) || scene.start < 0 || scene.end > 1 || scene.start >= scene.end) throw new Error(`Invalid Scroll World range: ${scene.id}`);
		if (scene.start !== cursor) throw new Error(`Scroll World scenes must be contiguous: ${scene.id}`);
		cursor = scene.end;
	}
	if (cursor !== 1) throw new Error("Scroll World scenes must end at one");
	return manifest;
}

import { createScrollWorldController, type ScrollWorldController } from "./scroll-world-controller";

export type ScrollWorldProps = Readonly<{
	manifest: ScrollWorldManifest;
	children: ReactNode;
}>;

function getVariant(manifest: ScrollWorldManifest): ScrollWorldVariant {
	return chooseScrollWorldVariant(manifest, window.innerWidth);
}

export function ScrollWorld({ manifest: inputManifest, children }: ScrollWorldProps) {
	const manifest = assertScrollWorldManifest(inputManifest);
	const stage = useRef<HTMLDivElement>(null);
	const video = useRef<HTMLVideoElement>(null);
	const controller = useRef<ScrollWorldController | undefined>(undefined);
	const [variant, setVariant] = useState<ScrollWorldVariant>(() => typeof window === "undefined" ? manifest.desktop : getVariant(manifest));
	const [reducedMotion, setReducedMotion] = useState(false);
	const [mediaReady, setMediaReady] = useState(false);
	const [mediaFailed, setMediaFailed] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		const compact = window.matchMedia(`(max-width: ${MOBILE_SCROLL_WORLD_BREAKPOINT}px)`);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
		const updateVariant = () => setVariant(compact.matches ? manifest.mobile : manifest.desktop);
		const updateMotion = () => setReducedMotion(reduce.matches);
		updateVariant();
		updateMotion();
		compact.addEventListener("change", updateVariant);
		reduce.addEventListener("change", updateMotion);
		return () => {
			compact.removeEventListener("change", updateVariant);
			reduce.removeEventListener("change", updateMotion);
		};
	}, [manifest]);

	useEffect(() => {
		if (reducedMotion || !stage.current) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) setShouldLoad(true);
		}, { rootMargin: "200px" });
		observer.observe(stage.current);
		return () => observer.disconnect();
	}, [reducedMotion]);

	useEffect(() => {
		const element = video.current;
		if (!element || reducedMotion || !shouldLoad) return;
		const next = createScrollWorldController(element, variant.duration);
		controller.current = next;
		const update = () => {
			const target = stage.current;
			if (!target) return;
			const { top, height } = target.getBoundingClientRect();
			const viewport = window.innerHeight || 1;
			next.update((viewport - top) / Math.max(height + viewport, 1));
		};
		window.addEventListener("scroll", update, { passive: true });
		update();
		return () => {
			window.removeEventListener("scroll", update);
			next.destroy();
			if (controller.current === next) controller.current = undefined;
		};
	}, [reducedMotion, shouldLoad, variant.duration]);

	useEffect(() => controller.current?.setReducedMotion(reducedMotion), [reducedMotion]);

	return <section aria-label={manifest.ariaLabel} className="scroll-world" data-motion={reducedMotion ? "reduced" : "enabled"}>
		<div className="scroll-world__stage" data-testid="scroll-world-stage" ref={stage}>
			<img alt="" className="scroll-world__poster" data-testid="scroll-world-poster" src={variant.poster} />
			<video aria-hidden="true" data-testid="scroll-world-video" muted onError={() => { setMediaFailed(true); setMediaReady(false); }} onLoadedData={() => setMediaReady(true)} playsInline poster={variant.poster} preload="metadata" src={!reducedMotion && shouldLoad ? variant.src : undefined} style={{ opacity: mediaReady && !mediaFailed ? 1 : 0 }} />
			{mediaFailed ? <p className="scroll-world__status" role="status">Cinematic preview unavailable. The product journey remains below.</p> : null}
		</div>
		<nav aria-label="World scenes" className="scroll-world__scene-nav">
			{manifest.scenes.map((scene) => <a href={scene.href} key={scene.id}>{scene.title}</a>)}
		</nav>
		<div className="scroll-world__story">{children}</div>
	</section>;
}
