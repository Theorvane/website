import { describe, expect, it } from "vitest";

import { createScrollWorldController } from "../src/scroll-world-controller";

type FrameCallback = FrameRequestCallback;

function createScheduler() {
	let callback: FrameCallback | undefined;
	let nextId = 1;
	const cancelled: number[] = [];
	return {
		requestAnimationFrame: (next: FrameCallback) => {
			callback = next;
			return nextId++;
		},
		cancelAnimationFrame: (id: number) => { cancelled.push(id); },
		flush: () => callback?.(0),
		get cancelled() { return cancelled; },
	};
}

describe("Scroll World controller", () => {
	it("coalesces updates into one seek at the latest bounded time", () => {
		const scheduler = createScheduler();
		const video = { currentTime: 0, readyState: 1 };
		const controller = createScrollWorldController(video, 40, scheduler);

		controller.update(-1);
		controller.update(0.25);
		controller.update(2);
		expect(video.currentTime).toBe(0);
		scheduler.flush();
		expect(video.currentTime).toBe(40);
	});

	it("does not seek when reduced motion is enabled", () => {
		const scheduler = createScheduler();
		const video = { currentTime: 4, readyState: 1 };
		const controller = createScrollWorldController(video, 40, scheduler);

		controller.setReducedMotion(true);
		controller.update(0.5);
		scheduler.flush();
		expect(video.currentTime).toBe(4);
	});

	it("does not seek before metadata is available", () => {
		const scheduler = createScheduler();
		const video = { currentTime: 0, readyState: 0 };
		const controller = createScrollWorldController(video, 40, scheduler);

		controller.update(0.5);
		scheduler.flush();
		expect(video.currentTime).toBe(0);
	});

	it("cancels scheduled work and releases it on destroy", () => {
		const scheduler = createScheduler();
		const video = { currentTime: 0, readyState: 1 };
		const controller = createScrollWorldController(video, 40, scheduler);

		controller.update(0.5);
		controller.destroy();
		expect(scheduler.cancelled).toEqual([1]);
		scheduler.flush();
		expect(video.currentTime).toBe(0);
	});
});
