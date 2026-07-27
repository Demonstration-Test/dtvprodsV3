import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { homeGalleryCategories } from "../homeGallery";
import { homeStoryFrames } from "../homeStory";

const approvedGalleryMediaIds = new Set([
  "MD-004",
  "MD-005",
  "MD-009",
  "MD-010",
  "MD-011",
  "MD-012",
  "MD-013",
  "MD-014",
  "MD-015",
  "MD-016",
  "MD-017",
  "MD-018",
  "MD-019",
]);

describe("homepage editorial content", () => {
  it("contains the five approved story selectors and media placements", () => {
    expect(homeStoryFrames.map((frame) => frame.selector)).toEqual([
      "Behind the Lens",
      "Building the Craft",
      "DTV Begins",
      "The Name Evolves",
      "Destined to Venture",
    ]);
    expect(homeStoryFrames.map((frame) => frame.mediaId)).toEqual([
      "MD-002",
      "MD-003",
      "MD-015",
      "MD-019",
      "MD-020",
    ]);
  });

  it("contains the five approved gallery categories and placements", () => {
    expect(homeGalleryCategories.map((category) => category.name)).toEqual([
      "Events",
      "Sports / Media Day",
      "Graduation",
      "Creative Editorial",
      "Portrait / Fashion",
    ]);

    const mediaIds = homeGalleryCategories.flatMap((category) =>
      category.images.map((image) => image.mediaId),
    );
    expect(mediaIds.every((mediaId) => approvedGalleryMediaIds.has(mediaId))).toBe(
      true,
    );
    expect(homeGalleryCategories[0]?.images).toHaveLength(1);
  });

  it("references existing responsive AVIF and WebP derivatives", () => {
    const images = [
      ...homeStoryFrames,
      ...homeGalleryCategories.flatMap((category) => category.images),
    ];

    images.forEach((image) => {
      image.widths.forEach((width) => {
        expect(
          existsSync(
            resolve(`public/${image.basePath}-${width}.avif`),
          ),
        ).toBe(true);
        expect(
          existsSync(
            resolve(`public/${image.basePath}-${width}.webp`),
          ),
        ).toBe(true);
      });
    });
  });

  it("does not reintroduce the removed principle copy", () => {
    const serialized = JSON.stringify({
      homeStoryFrames,
      homeGalleryCategories,
    });
    expect(serialized).not.toMatch(
      /you do not have to see the entire road to take the next step/i,
    );
  });
});
