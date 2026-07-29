import { clampScrollWorldProgress, scrollWorldTimeAtProgress } from "./scroll-world";

export type ScrollWorldVideo = Pick<HTMLVideoElement, "currentTime" | "readyState">;

export type ScrollWorldScheduler = Readonly<{
	requestAnimationFrame: (callback: FrameRequestCallback) => number;
	cancelAnimationFrame: (handle: number) => void;
}>;

export type ScrollWorldController = Readonly<{
	update: (progress: number) => void;
	setReducedMotion: (reduced: boolean) => void;
	destroy: () => void;
}>;

const minimumSeekDelta = 0.01;

function browserScheduler(): ScrollWorldScheduler {
	return { requestAnimationFrame: window.requestAnimationFrame, cancelAnimationFrame: window.cancelAnimationFrame };
}

export function createScrollWorldController(video: ScrollWorldVideo, duration: number, scheduler: ScrollWorldScheduler = browserScheduler()): ScrollWorldController {
	let frame: number | undefined;
	let latestProgress = 0;
	let reducedMotion = false;
	let destroyed = false;

	function flush(): void {
		frame = undefined;
		if (destroyed || reducedMotion || video.readyState < HTMLMediaElement.HAVE_METADATA) return;
		const target = scrollWorldTimeAtProgress(duration, latestProgress);
		if (Math.abs(video.currentTime - target) >= minimumSeekDelta) video.currentTime = target;
	}

	return {
		update(progress) {
			if (destroyed || reducedMotion) return;
			latestProgress = clampScrollWorldProgress(progress);
			if (frame === undefined) frame = scheduler.requestAnimationFrame(flush);
		},
		setReducedMotion(reduced) {
			reducedMotion = reduced;
			if (reduced && frame !== undefined) {
				scheduler.cancelAnimationFrame(frame);
				frame = undefined;
			}
		},
		destroy() {
			destroyed = true;
			if (frame !== undefined) scheduler.cancelAnimationFrame(frame);
			frame = undefined;
		},
	};
}
