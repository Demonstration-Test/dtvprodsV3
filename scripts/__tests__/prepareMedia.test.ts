import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadLayoutModule() {
  const moduleUrl = pathToFileURL(
    resolve("scripts/mediaLayout.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    containWithin: () => ({
      width: Number.POSITIVE_INFINITY,
      height: Number.POSITIVE_INFINITY,
    }),
  }));
}

describe("social image media layout", () => {
  it("keeps the portrait layer within the remaining canvas bounds", async () => {
    const { containWithin } = await loadLayoutModule();
    const size = containWithin({
      sourceWidth: 1365,
      sourceHeight: 2048,
      maxWidth: 515,
      maxHeight: 615,
    });

    expect(size.width).toBeLessThanOrEqual(515);
    expect(size.height).toBeLessThanOrEqual(615);
    expect(size.width / size.height).toBeCloseTo(1365 / 2048, 2);
  });
});
