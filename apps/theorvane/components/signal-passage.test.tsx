import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SignalPassage } from "./signal-passage";

describe("SignalPassage", () => {
	it("renders three editorial scenes in DOM order with meaningful art and canonical destinations", () => {
		render(<SignalPassage />);

		const passage = screen.getByRole("region", { name: "Editorial Signal passage" });
		const list = passage.querySelector("ol");
		expect(list).toBeTruthy();

		const articles = Array.from(list?.querySelectorAll("article") ?? []);
		expect(articles).toHaveLength(3);
		expect(articles.map((article) => article.querySelector("h2")?.textContent)).toEqual([
			"Declare the contract.",
			"Compose at the edge.",
			"Keep the edit local.",
		]);

		const scenes = [
			{
				alt: "TypeMCP editorial artwork showing a declared contract in porcelain and magenta.",
				href: "https://typemcp.theorvane.tech/",
				image: "/editorial-signal/passage/declare.webp",
				link: "Visit TypeMCP ↗",
				label: "Declare",
			},
			{
				alt: "TypeChain editorial artwork showing typed composition at a deliberate edge.",
				href: "https://typechain.theorvane.tech/",
				image: "/editorial-signal/passage/compose.webp",
				link: "Visit TypeChain ↗",
				label: "Compose",
			},
			{
				alt: "OpenVideo editorial artwork showing a local edit held on-device.",
				href: "https://open-video.app/",
				image: "/editorial-signal/passage/local.webp",
				link: "Visit OpenVideo ↗",
				label: "Keep local",
			},
		] as const;

		for (const [index, scene] of scenes.entries()) {
			const article = articles[index];
			expect(article?.querySelector(".signal-passage__label")?.textContent).toBe(scene.label);
			expect(article?.querySelector("figure img")?.getAttribute("src")).toBe(scene.image);
			expect(article?.querySelector("figure img")?.getAttribute("alt")).toBe(scene.alt);
			expect(screen.getByRole("link", { name: scene.link }).getAttribute("href")).toBe(scene.href);
		}
	});
});
