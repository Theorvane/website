export const documentGroups = ["Start", "Guides", "Build", "API", "Architecture", "Product"] as const;

export type DocumentGroup = (typeof documentGroups)[number];

export const releaseClassifications = [
  "published",
  "published-with-boundary",
  "repository-development",
  "product-target",
] as const;

export type ReleaseClassification = (typeof releaseClassifications)[number];

export const documentLocales = ["en", "ko"] as const;

export type DocumentLocale = (typeof documentLocales)[number];

export const defaultDocumentLocale = "en" satisfies DocumentLocale;

export type TranslatedLocale = Exclude<DocumentLocale, typeof defaultDocumentLocale>;

/**
 * A translated edition of an approved document, mirrored from the same pinned source commit as its
 * English original. Translations are optional per document: a document without one simply has no
 * localized route, so the portal never links a reader to a page that does not exist.
 */
export interface DocumentTranslation {
  readonly sourcePath: string;
  readonly title: string;
  readonly summary: string;
  /** Exact upstream wording in the translation that proves the assigned release classification. */
  readonly sourceStatus: string;
  /** Portal-local curriculum copy in this locale; falls back to the English wording when omitted. */
  readonly outcome?: string;
  readonly applicationBoundary?: string;
}

export interface PublicDocument {
  readonly sourcePath: string;
  readonly route: string;
  readonly title: string;
  readonly summary: string;
  readonly group: DocumentGroup;
  readonly order: number;
  readonly classification: ReleaseClassification;
  /** Exact upstream wording that proves the assigned release classification. */
  readonly sourceStatus: string;
  /** Portal-local navigation metadata; canonical tutorial prose remains upstream. */
  readonly curriculumStep?: number;
  readonly curriculumTotal?: number;
  readonly prerequisites?: readonly string[];
  readonly nextRoute?: string | null;
  readonly outcome?: string;
  readonly applicationBoundary?: string;
  readonly translations?: Readonly<Partial<Record<TranslatedLocale, DocumentTranslation>>>;
}

/**
 * One document in one locale, with every locale-dependent field already resolved. Sync, the cache
 * validator, and the routes all iterate editions so a locale can never be handled in only some of them.
 */
export interface DocumentEdition {
  readonly locale: DocumentLocale;
  readonly document: PublicDocument;
  readonly sourcePath: string;
  readonly sourceStatus: string;
}
