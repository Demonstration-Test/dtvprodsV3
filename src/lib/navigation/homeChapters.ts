export const homeChapters = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "audiences", label: "Audiences" },
  { id: "gallery", label: "Gallery" },
  { id: "impact", label: "Impact" },
  { id: "programs", label: "Programs" },
  { id: "plan", label: "Plan" },
  { id: "inquire", label: "Inquire" },
  { id: "book", label: "Book" },
] as const;

export type HomeChapterId = (typeof homeChapters)[number]["id"];

export type ChapterVisibility = {
  id: HomeChapterId;
  intersectionRatio: number;
  top: number;
  bottom: number;
};

export function isHomeChapterId(value: string): value is HomeChapterId {
  return homeChapters.some((chapter) => chapter.id === value);
}

export function selectActiveChapter(
  candidates: ChapterVisibility[],
  viewportHeight: number,
): HomeChapterId | undefined {
  const viewportCenter = viewportHeight / 2;

  return candidates
    .filter((candidate) => candidate.intersectionRatio > 0)
    .sort((left, right) => {
      const ratioDifference =
        right.intersectionRatio - left.intersectionRatio;
      if (Math.abs(ratioDifference) > Number.EPSILON) {
        return ratioDifference;
      }

      const leftDistance = Math.abs(
        (left.top + left.bottom) / 2 - viewportCenter,
      );
      const rightDistance = Math.abs(
        (right.top + right.bottom) / 2 - viewportCenter,
      );
      return leftDistance - rightDistance;
    })[0]?.id;
}
