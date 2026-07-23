import { resolve } from "node:path";

import { publicDocuments, sourceCommit } from "../lib/docs/manifest";
import { fetchPinnedDocument, syncDocuments } from "../lib/docs/sync";

async function main(): Promise<void> {
  await syncDocuments({
    outputDirectory: resolve(process.cwd(), ".generated-docs"),
    fetchDocument: fetchPinnedDocument,
  });
  console.log(`Synced ${publicDocuments.length} TypeMCP documents from ${sourceCommit}.`);
}

void main();
