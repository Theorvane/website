export const locales = ["en", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Screenshots shipped with the documentation, sized so the browser reserves layout before load. */
export const docImages = {
	editor: { src: "/docs/editor.png", width: 1440, height: 860 },
	projects: { src: "/docs/projects.png", width: 1440, height: 400 },
	voice: { src: "/docs/voice.png", width: 1440, height: 660 },
	video: { src: "/docs/video.png", width: 1440, height: 700 },
} as const;

export type DocImageId = keyof typeof docImages;

/**
 * Text in every block accepts a small inline vocabulary — `code`, **strong**, and
 * [label](https://example.com) — parsed by `lib/docs/inline.ts`.
 */
export type DocBlock =
	| { readonly kind: "heading"; readonly text: string }
	| { readonly kind: "paragraph"; readonly text: string }
	| { readonly kind: "list"; readonly ordered?: boolean; readonly items: readonly string[] }
	| { readonly kind: "code"; readonly language: string; readonly lines: readonly string[] }
	| { readonly kind: "table"; readonly head: readonly string[]; readonly rows: readonly (readonly string[])[] }
	| { readonly kind: "note"; readonly tone: "info" | "caution"; readonly text: string }
	| { readonly kind: "figure"; readonly image: DocImageId; readonly alt: string; readonly caption: string };

export type DocPage = {
	readonly title: string;
	readonly summary: string;
	readonly blocks: readonly DocBlock[];
};

export type DocGroupId = "start" | "editing" | "agent" | "models" | "reference";

export type DocGroup = {
	readonly id: DocGroupId;
	readonly slugs: readonly string[];
};

export type LocaleStrings = {
	readonly indexTitle: string;
	readonly indexSummary: string;
	readonly indexLede: string;
	readonly sidebarLabel: string;
	readonly onThisPage: string;
	readonly previous: string;
	readonly next: string;
	readonly backToSite: string;
	readonly languageLabel: string;
	readonly groups: Readonly<Record<DocGroupId, string>>;
};
