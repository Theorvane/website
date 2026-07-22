export const documentGroups = ["Start", "Guides", "API", "Architecture", "Product"] as const;

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
}
