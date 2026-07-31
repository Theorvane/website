import { ExternalLink } from "@theorvane/ui";

import { parseInline, toAnchorId } from "../../lib/docs/inline";
import { type DocBlock, docImages } from "../../lib/docs/types";

function Inline({ text }: { readonly text: string }) {
	return (
		<>
			{parseInline(text).map((token, index) => {
				const key = `${token.kind}-${index}`;
				if (token.kind === "code") return <code key={key}>{token.text}</code>;
				if (token.kind === "strong") return <strong key={key}>{token.text}</strong>;
				if (token.kind === "link") {
					return token.href.startsWith("/")
						? <a key={key} href={token.href}>{token.text}</a>
						: <ExternalLink key={key} href={token.href}>{token.text}</ExternalLink>;
				}
				return <span key={key}>{token.text}</span>;
			})}
		</>
	);
}

function Block({ block }: { readonly block: DocBlock }) {
	switch (block.kind) {
		case "heading":
			return <h2 id={toAnchorId(block.text)}><Inline text={block.text} /></h2>;
		case "paragraph":
			return <p><Inline text={block.text} /></p>;
		case "list": {
			const items = block.items.map((item) => <li key={item}><Inline text={item} /></li>);
			return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
		}
		case "code":
			return (
				<pre className="doc-code" data-language={block.language}>
					<code>{block.lines.join("\n")}</code>
				</pre>
			);
		case "table":
			return (
				<div className="doc-table">
					<table>
						<thead><tr>{block.head.map((cell) => <th key={cell} scope="col"><Inline text={cell} /></th>)}</tr></thead>
						<tbody>
							{block.rows.map((row) => (
								<tr key={row.join("|")}>{row.map((cell, index) => <td key={`${index}-${cell}`}><Inline text={cell} /></td>)}</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		case "note":
			return <aside className="doc-note" data-tone={block.tone}><p><Inline text={block.text} /></p></aside>;
		case "figure": {
			const image = docImages[block.image];
			return (
				<figure className="doc-figure">
					<img src={image.src} alt={block.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
					<figcaption><Inline text={block.caption} /></figcaption>
				</figure>
			);
		}
	}
}

export function DocBlocks({ blocks }: { readonly blocks: readonly DocBlock[] }) {
	return <>{blocks.map((block, index) => <Block key={`${block.kind}-${index}`} block={block} />)}</>;
}

export { Inline };
