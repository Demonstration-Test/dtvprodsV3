export type HomeStoryFrame = {
  selector: string;
  heading: string;
  copy: string;
  metadata: string;
  mediaId: string;
  basePath: string;
  widths: number[];
  alt: string;
};

export const homeStoryFrames: HomeStoryFrame[] = [
  {
    selector: "Behind the Lens",
    heading: "The work behind the vision.",
    copy: "Damon built DTV through photography, creative direction, and the discipline to keep moving before the full road was visible.",
    metadata: "BEHIND THE LENS / 002",
    mediaId: "MD-002",
    basePath: "media/damon/damon-camera-outdoors",
    widths: [720, 1200, 1800],
    alt: "Damon J. Young Jr. composing a photograph outdoors with a professional camera.",
  },
  {
    selector: "Building the Craft",
    heading: "Preparation becomes the practice.",
    copy: "Working behind the camera turned ideas into a repeatable craft built through planning, direction, and attention to the person in front of the lens.",
    metadata: "CRAFT IN MOTION / 003",
    mediaId: "MD-003",
    basePath: "media/damon/damon-photographing-athlete",
    widths: [640, 1000, 1500],
    alt: "Damon photographing an athlete during an outdoor creative session.",
  },
  {
    selector: "DTV Begins",
    heading: "DTV Productions begins.",
    copy: "In 2020, the creative work became DTV Productions: a place to build photography, direction, and entrepreneurial discipline into a focused practice.",
    metadata: "ORIGIN / 2020",
    mediaId: "MD-015",
    basePath: "media/portfolio/portrait-red-stage",
    widths: [720, 1400],
    alt: "Dramatic studio portrait lit against a deep red stage.",
  },
  {
    selector: "The Name Evolves",
    heading: "DamonTV becomes a wider idea.",
    copy: "The name evolved as the work expanded beyond individual projects toward a larger story about movement, possibility, and intentional growth.",
    metadata: "EVOLUTION / DAMONTV",
    mediaId: "MD-019",
    basePath: "media/portfolio/sports-media-day",
    widths: [720, 1400],
    alt: "Montage of colorful sports media-day portraits.",
  },
  {
    selector: "Destined to Venture",
    heading: "The idea becomes the mission.",
    copy: "What began behind the lens became a wider commitment to movement, discipline, entrepreneurship, and possibility.",
    metadata: "MISSION / DTV",
    mediaId: "MD-020",
    basePath: "media/damon/damon-hero-cutout",
    widths: [480, 768, 1100],
    alt: "Damon J. Young Jr. wearing a purple DTV shirt and black DTV cap.",
  },
];
