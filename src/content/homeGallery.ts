export type HomeGalleryImage = {
  mediaId: string;
  basePath: string;
  widths: number[];
  alt: string;
};

export type HomeGalleryCategory = {
  name: string;
  images: HomeGalleryImage[];
};

export const homeGalleryCategories: HomeGalleryCategory[] = [
  {
    name: "Events",
    images: [
      {
        mediaId: "MD-018",
        basePath: "media/portfolio/event-bride-guests",
        widths: [720, 1400],
        alt: "Bride celebrating with guests during an event.",
      },
    ],
  },
  {
    name: "Sports / Media Day",
    images: [
      {
        mediaId: "MD-005",
        basePath: "media/portfolio/athlete-green-smoke",
        widths: [720, 1400],
        alt: "Athlete posing with basketballs, green smoke, and a controlled flame effect.",
      },
      {
        mediaId: "MD-012",
        basePath: "media/portfolio/athlete-red-smoke",
        widths: [720, 1400],
        alt: "Athlete posing against red smoke while holding a reflective prop.",
      },
      {
        mediaId: "MD-019",
        basePath: "media/portfolio/sports-media-day",
        widths: [720, 1400],
        alt: "Montage of colorful sports media-day portraits.",
      },
    ],
  },
  {
    name: "Graduation",
    images: [
      {
        mediaId: "MD-004",
        basePath: "media/portfolio/graduate-library",
        widths: [720, 1400],
        alt: "Graduate posing with a book between library shelves.",
      },
      {
        mediaId: "MD-013",
        basePath: "media/portfolio/graduate-cap",
        widths: [720, 1400],
        alt: "Graduate smiling in cap and gown.",
      },
      {
        mediaId: "MD-014",
        basePath: "media/portfolio/graduate-red-vehicle",
        widths: [720, 1400],
        alt: "Graduate in a red dress posing beside a white vehicle.",
      },
    ],
  },
  {
    name: "Creative Editorial",
    images: [
      {
        mediaId: "MD-010",
        basePath: "media/portfolio/creative-yellow-pages",
        widths: [720, 1400],
        alt: "Editorial portrait against yellow with paper sheets suspended in motion.",
      },
      {
        mediaId: "MD-011",
        basePath: "media/portfolio/creative-overhead-pages",
        widths: [720, 1400],
        alt: "Overhead editorial portrait surrounded by printed creative work.",
      },
      {
        mediaId: "MD-015",
        basePath: "media/portfolio/portrait-red-stage",
        widths: [720, 1400],
        alt: "Dramatic studio portrait lit against a deep red stage.",
      },
    ],
  },
  {
    name: "Portrait / Fashion",
    images: [
      {
        mediaId: "MD-009",
        basePath: "media/portfolio/group-black-suits",
        widths: [720, 1400],
        alt: "Coordinated group portrait in black suits.",
      },
      {
        mediaId: "MD-016",
        basePath: "media/portfolio/portrait-red-roses",
        widths: [720, 1400],
        alt: "Editorial portrait featuring a bouquet of red roses.",
      },
      {
        mediaId: "MD-017",
        basePath: "media/portfolio/fashion-black-leather",
        widths: [720, 1400],
        alt: "Fashion portrait in a black leather jacket.",
      },
    ],
  },
];
