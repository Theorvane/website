export type InlineToken =
	| { readonly kind: "text"; readonly text: string }
	| { readonly kind: "code"; readonly text: string }
	| { readonly kind: "strong"; readonly text: string }
	| { readonly kind: "link"; readonly text: string; readonly href: string };

// `code` first so a backticked span is never re-read as emphasis or a link.
const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Content is authored in this repository, so a hostile href cannot arrive today. The guard matches the
 * posture the synced portals already take, so it stays correct if a page ever renders untrusted text.
 */
function safeHref(href: string): string {
	return /^(?:javascript|data|vbscript):/i.test(href) ? "#" : href;
}

/**
 * Parses the documentation inline vocabulary: `code`, **strong**, and [label](href).
 * Anything else is emitted verbatim, so prose never depends on escaping rules.
 */
export function parseInline(text: string): readonly InlineToken[] {
	const tokens: InlineToken[] = [];
	let cursor = 0;

	for (const match of text.matchAll(pattern)) {
		const start = match.index;
		if (start > cursor) tokens.push({ kind: "text", text: text.slice(cursor, start) });

		const [raw, code, strong, label, href] = match;
		if (code !== undefined) tokens.push({ kind: "code", text: code });
		else if (strong !== undefined) tokens.push({ kind: "strong", text: strong });
		else if (label !== undefined && href !== undefined) tokens.push({ kind: "link", text: label, href: safeHref(href) });

		cursor = start + raw.length;
	}

	if (cursor < text.length) tokens.push({ kind: "text", text: text.slice(cursor) });
	return tokens;
}

/** Plain-text projection used for headings that also need a stable anchor id. */
export function toPlainText(text: string): string {
	return parseInline(text)
		.map((token) => token.text)
		.join("");
}

export function toAnchorId(text: string): string {
	return toPlainText(text)
		.toLowerCase()
		.normalize("NFC")
		.replace(/[^\p{Letter}\p{Number}]+/gu, "-")
		.replace(/^-+|-+$/g, "");
}
