import { documentGroups, type PublicDocument } from "./types";

export const sourceCommit = "6480a45887a262f354f5691d3d3d19ca04304e96";

const documents: readonly PublicDocument[] = [
  { sourcePath: "docs/guides/getting-started.md", route: "/docs/getting-started", title: "Getting started", summary: "Install TypeMCP and inspect a declaration with the published package.", group: "Start", order: 1, classification: "published", sourceStatus: "using the published package" },
  { sourcePath: "docs/guides/configuration.md", route: "/docs/guides/configuration", title: "Configuration and compatibility", summary: "Configure standard decorators, Node, and module loading.", group: "Guides", order: 1, classification: "published-with-boundary", sourceStatus: "no transport is published yet" },
  { sourcePath: "docs/guides/agent-integration.md", route: "/docs/guides/agent-integration", title: "Agent integration guide", summary: "A deterministic declaration-only workflow for coding agents.", group: "Guides", order: 2, classification: "published", sourceStatus: "applies to the published" },
  { sourcePath: "docs/guides/http-and-nextjs.md", route: "/docs/guides/http-and-nextjs", title: "HTTP framework integration", summary: "Repository-development Streamable HTTP and Next.js integration shape.", group: "Guides", order: 3, classification: "repository-development", sourceStatus: "repository-source integration" },
  { sourcePath: "docs/guides/agile-delivery.md", route: "/docs/guides/agile-delivery", title: "Agile delivery", summary: "Repository-development delivery practices and milestones.", group: "Guides", order: 4, classification: "repository-development", sourceStatus: "GitHub Issues, milestones, labels, pull requests" },
  { sourcePath: "docs/guides/npm-release.md", route: "/docs/guides/npm-release", title: "npm release", summary: "Repository-development release process and package boundary.", group: "Guides", order: 5, classification: "repository-development", sourceStatus: "repository is being prepared" },
  { sourcePath: "docs/guides/open-source-launch.md", route: "/docs/guides/open-source-launch", title: "Open-source launch", summary: "Repository-development launch and governance guidance.", group: "Guides", order: 6, classification: "repository-development", sourceStatus: "operational safeguards" },
  { sourcePath: "docs/api/decorator-api.md", route: "/docs/api/decorator-api", title: "Decorator API contract", summary: "Decorator declarations and the repository-development API boundary.", group: "API", order: 1, classification: "repository-development", sourceStatus: "Repository development status:" },
  { sourcePath: "docs/architecture/overview.md", route: "/docs/architecture/overview", title: "Architecture overview", summary: "Metadata, compiler, resolver, and transport architecture.", group: "Architecture", order: 1, classification: "repository-development", sourceStatus: "Repository-development architecture" },
  { sourcePath: "docs/architecture/adr/0001-framework-neutral-core.md", route: "/docs/architecture/framework-neutral-core", title: "Framework-neutral core", summary: "ADR for a framework-neutral TypeMCP core.", group: "Architecture", order: 2, classification: "repository-development", sourceStatus: "**Status:** Accepted" },
  { sourcePath: "docs/architecture/adr/0002-fetch-streamable-http.md", route: "/docs/architecture/fetch-streamable-http", title: "Fetch Streamable HTTP", summary: "ADR for the Fetch-standard Streamable HTTP adapter.", group: "Architecture", order: 3, classification: "repository-development", sourceStatus: "**Status:** Accepted" },
  { sourcePath: "docs/product/vision.md", route: "/docs/product/vision", title: "Product vision", summary: "The TypeMCP product target and design principles.", group: "Product", order: 1, classification: "product-target", sourceStatus: "**Status:** Product target." },
  { sourcePath: "docs/product/mvp-scope.md", route: "/docs/product/mvp-scope", title: "MVP scope", summary: "Included, deferred, and excluded product capabilities.", group: "Product", order: 2, classification: "product-target", sourceStatus: "product and repository-development target" },
];

export const publicDocuments = Object.freeze(documents.map((document) => Object.freeze({ ...document })));

export function validateManifest(manifest: readonly PublicDocument[]): void {
  if (!/^[0-9a-f]{40}$/.test(sourceCommit)) throw new Error("source commit must be a full SHA");
  const routes = new Set<string>();
  const paths = new Set<string>();
  const groupOrders = new Set<string>();
  for (const document of manifest) {
    if (!document.sourcePath.startsWith("docs/") || /(?:^|\/)(?:planning|superpowers)(?:\/|$)/.test(document.sourcePath)) throw new Error(`approved docs source path required: ${document.sourcePath}`);
    if (!document.route.startsWith("/docs/") || document.route.includes("..")) throw new Error(`approved docs route required: ${document.route}`);
    if (!document.sourceStatus.trim()) throw new Error(`source status evidence required: ${document.sourcePath}`);
    if (routes.has(document.route)) throw new Error(`duplicate route: ${document.route}`);
    if (paths.has(document.sourcePath)) throw new Error(`duplicate source path: ${document.sourcePath}`);
    const groupOrder = `${document.group}:${document.order}`;
    if (!documentGroups.includes(document.group)) throw new Error(`unknown document group: ${document.group}`);
    if (groupOrders.has(groupOrder)) throw new Error(`duplicate group order: ${groupOrder}`);
    routes.add(document.route); paths.add(document.sourcePath); groupOrders.add(groupOrder);
  }
}

validateManifest(publicDocuments);
