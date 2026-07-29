export const documentGroups = ["Start", "Guides", "Build", "API", "Architecture"] as const;

export type DocumentGroup = (typeof documentGroups)[number];

export const releaseClassifications = [
  "published",
  "published-with-boundary",
  "repository-development",
  "product-target",
] as const;

export type ReleaseClassification = (typeof releaseClassifications)[number];

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
}
