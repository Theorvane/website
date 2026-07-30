import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductEditorial } from "./product-editorial";

const products = [
	{
		description: "A decorator-first TypeScript toolkit for MCP metadata declarations and immutable reads.",
		href: "https://typemcp.theorvane.tech/",
		image: "/editorial-signal/products/typemcp.webp",
		imageAlt: "TypeMCP editorial artwork showing a layered interface contract.",
		name: "TypeMCP",
		number: "01",
		signal: "MCP contracts",
	},
	{
		description: "A decorator-first, type-safe authoring layer for LangChain JS tools and agents.",
		href: "https://typechain.theorvane.tech/",
		image: "/editorial-signal/products/typechain.webp",
		imageAlt: "TypeChain editorial artwork showing interconnected typed tools.",
		name: "TypeChain",
		number: "02",
		signal: "Typed tools",
	},
	{
		description: "A local-first, open-source video editor for recording, editing, and exporting footage on your device.",
		href: "https://openvideo.theorvane.tech/",
		image: "/editorial-signal/products/openvideo.webp",
		imageAlt: "OpenVideo editorial artwork showing a local editing timeline.",
		name: "OpenVideo",
		number: "03",
		signal: "Local workflow",
	},
] as const;

describe("ProductEditorial", () => {
	it("renders ordered semantic product articles with their canonical destinations and editorial art", () => {
		const { container } = render(<ProductEditorial products={products} />);

		const articles = Array.from(container.querySelectorAll("article"));
		expect(articles.map((article) => article.querySelector("h3")?.textContent)).toEqual([
			"TypeMCP",
			"TypeChain",
			"OpenVideo",
		]);

		for (const product of products) {
			const article = screen.getByRole("heading", { name: product.name }).closest("article");
			expect(article).toBeTruthy();
			expect(article?.querySelector("img")?.getAttribute("src")).toBe(product.image);
			expect(article?.querySelector("img")?.getAttribute("alt")).toBe(product.imageAlt);
			expect(screen.getByRole("link", { name: `Explore ${product.name} ↗` }).getAttribute("href")).toBe(product.href);
		}
	});
});
