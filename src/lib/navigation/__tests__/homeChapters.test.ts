import {
  homeChapters,
  selectActiveChapter,
} from "../homeChapters";

describe("homepage chapter model", () => {
  it("contains the nine exact labels and IDs", () => {
    expect(homeChapters).toEqual([
      { id: "home", label: "Home" },
      { id: "story", label: "Story" },
      { id: "audiences", label: "Audiences" },
      { id: "gallery", label: "Gallery" },
      { id: "impact", label: "Impact" },
      { id: "programs", label: "Programs" },
      { id: "plan", label: "Plan" },
      { id: "inquire", label: "Inquire" },
      { id: "book", label: "Book" },
    ]);
  });

  it("selects the largest visible ratio", () => {
    expect(
      selectActiveChapter(
        [
          { id: "story", intersectionRatio: 0.35, top: 80, bottom: 780 },
          {
            id: "audiences",
            intersectionRatio: 0.62,
            top: 500,
            bottom: 1200,
          },
        ],
        800,
      ),
    ).toBe("audiences");
  });

  it("resolves equal ratios by proximity to viewport center", () => {
    expect(
      selectActiveChapter(
        [
          { id: "story", intersectionRatio: 0.5, top: -200, bottom: 400 },
          {
            id: "audiences",
            intersectionRatio: 0.5,
            top: 100,
            bottom: 700,
          },
        ],
        800,
      ),
    ).toBe("audiences");
  });
});
