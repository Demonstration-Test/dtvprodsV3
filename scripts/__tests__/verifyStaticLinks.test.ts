import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadVerifier() {
  const moduleUrl = pathToFileURL(
    resolve("scripts/verifyStaticLinks.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    collectStaticHrefIssues: () => ["verifier missing"],
  }));
}

describe("static link verification", () => {
  it("accepts repository-prefixed assets and canonical routes", async () => {
    const verifier = await loadVerifier();
    const html = `
      <a href="/dtvprodsV3/about/">About</a>
      <script src="/dtvprodsV3/assets/main.js"></script>
      <img src="/dtvprodsV3/media/damon/hero.webp" alt="">
    `;

    expect(verifier.collectStaticHrefIssues(html)).toEqual([]);
  });

  it("rejects root-relative app links that omit the repository base", async () => {
    const verifier = await loadVerifier();
    const html = `
      <a href="/about/">About</a>
      <img src="/media/damon/hero.webp" alt="">
    `;

    expect(verifier.collectStaticHrefIssues(html)).toEqual([
      "/about/",
      "/media/damon/hero.webp",
    ]);
  });
});
