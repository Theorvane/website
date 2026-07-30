import { ExternalLink } from "@theorvane/ui";

export interface EditorialProduct {
	readonly description: string;
	readonly href: string;
	readonly icon: string;
	readonly iconAlt: string;
	readonly name: string;
	readonly number: string;
	readonly signal: string;
}

export interface ProductEditorialProps {
	readonly products: readonly EditorialProduct[];
}

export function ProductEditorial({ products }: ProductEditorialProps) {
	return (
		<div className="product-editorial" data-testid="product-editorial">
			{products.map((product) => (
				<article className="product-editorial__feature" key={product.name}>
					<div className="product-editorial__copy">
						<p className="eyebrow">{product.number} / {product.signal}</p>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						<ExternalLink href={product.href}>Explore {product.name} ↗</ExternalLink>
					</div>
					<figure className="product-editorial__art" aria-hidden="true">
						<div className="product-editorial__mark"><img alt={product.iconAlt} decoding="async" src={product.icon} /></div>
						<span>{product.number}</span>
					</figure>
				</article>
			))}
		</div>
	);
}
