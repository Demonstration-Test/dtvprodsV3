import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";

const repositoryBase = "/dtvprodsV3/";
const urlAttributePattern = /\b(?:href|src)=["']([^"']+)["']/g;

export function collectStaticHrefIssues(html: string) {
  const issues: string[] = [];

  for (const match of html.matchAll(urlAttributePattern)) {
    const value = match[1];
    if (
      value.startsWith("/") &&
      !value.startsWith(repositoryBase)
    ) {
      issues.push(value);
    }
  }

  return issues;
}

async function collectHtmlFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(path);
      }
      return extname(entry.name) === ".html" ? [path] : [];
    }),
  );

  return nested.flat();
}

export async function verifyStaticLinks(distDirectory = "dist") {
  const files = await collectHtmlFiles(distDirectory);
  const issues: Array<{ file: string; value: string }> = [];

  await Promise.all(
    files.map(async (file) => {
      const html = await readFile(file, "utf8");
      for (const value of collectStaticHrefIssues(html)) {
        issues.push({ file, value });
      }
    }),
  );

  if (issues.length > 0) {
    const message = issues
      .map(({ file, value }) => `${file}: ${value}`)
      .join("\n");
    throw new Error(`Static link verification failed:\n${message}`);
  }
}

const isDirectExecution =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  await verifyStaticLinks();
}
