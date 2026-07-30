import { resolve } from "node:path";

import { documentEditions, sourceCommit } from "../lib/docs/manifest";
import { fetchPinnedDocument, syncDocuments } from "../lib/docs/sync";

async function main(): Promise<void> {
  await syncDocuments({
    outputDirectory: resolve(process.cwd(), ".generated-docs"),
    fetchDocument: fetchPinnedDocument,
  });
  console.log(`Synced ${documentEditions().length} TypeMCP document editions from ${sourceCommit}.`);
}

void main();
