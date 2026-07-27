import type { SiteRoute } from "./contentTypes";

export const productionOrigin =
  "https://demonstration-test.github.io/dtvprodsV3";

export const routes: SiteRoute[] = [
  {
    path: "/",
    canonicalPath: "/",
    title: "Damon J. Young Jr. | Destined to Venture",
    description:
      "Invite motivational speaker, entrepreneur, and visual storyteller Damon J. Young Jr. to help your audience move from hesitation toward disciplined action.",
    h1: "Destined to Venture.",
  },
  {
    path: "/about",
    canonicalPath: "/about/",
    title: "About Damon J. Young Jr. | DTV Productions",
    description:
      "Meet Damon J. Young Jr., the founder of DTV Productions and the creative entrepreneur behind Destined to Venture.",
    h1: "The work behind the vision.",
  },
  {
    path: "/speaking",
    canonicalPath: "/speaking/",
    title: "Speaking Engagements | Damon J. Young Jr.",
    description:
      "Explore customizable speaking, workshop, panel, and creative-experience inquiries for schools, teams, creators, and organizations.",
    h1: "Messages built for meaningful movement.",
  },
  {
    path: "/speaking-topics",
    canonicalPath: "/speaking-topics/",
    title: "Speaking Themes | Damon J. Young Jr.",
    description:
      "Review Damon's customizable themes on purposeful action, discipline, entrepreneurship, identity, and leadership through visual storytelling.",
    h1: "Ideas built to move with the room.",
  },
  {
    path: "/schools-colleges",
    canonicalPath: "/schools-colleges/",
    title: "Schools and Colleges | Damon J. Young Jr.",
    description:
      "Plan a school or college inquiry designed around possibility, confidence, disciplined action, and the organizer's goals.",
    h1: "Help students see the next step.",
  },
  {
    path: "/athletes-teams",
    canonicalPath: "/athletes-teams/",
    title: "Athletes and Teams | Damon J. Young Jr.",
    description:
      "Explore an athletic-team pathway connecting preparation, discipline, identity, pressure, and performance beyond the game.",
    h1: "Preparation shapes the moment.",
  },
  {
    path: "/creatives-entrepreneurs",
    canonicalPath: "/creatives-entrepreneurs/",
    title: "Creatives and Entrepreneurs | Damon J. Young Jr.",
    description:
      "Plan a creative or entrepreneurship experience focused on moving from talent and ideas into disciplined execution.",
    h1: "Turn the idea into movement.",
  },
  {
    path: "/organizations",
    canonicalPath: "/organizations/",
    title: "Organizations and Brands | Damon J. Young Jr.",
    description:
      "Invite Damon to help an organization approach change, opportunity, ownership, and innovation with intention.",
    h1: "Move opportunity with intention.",
  },
  {
    path: "/workshops",
    canonicalPath: "/workshops/",
    title: "Creative Workshops | Damon J. Young Jr.",
    description:
      "Inquire about customizable creative, photography, entrepreneurship, and content-creation workshops.",
    h1: "More than a message.",
  },
  {
    path: "/media",
    canonicalPath: "/media/",
    title: "Visual Story and Media | DTV Productions",
    description:
      "View an honest photography-led visual story and curated DTV work without fabricated speaking footage.",
    h1: "The lens taught the lesson.",
  },
  {
    path: "/dtv-story",
    canonicalPath: "/dtv-story/",
    title: "The DTV Story | Destined to Venture",
    description:
      "Follow the evolution from DamonTV to DTV Productions and the wider Destined to Venture mission.",
    h1: "From DamonTV to Destined to Venture.",
  },
  {
    path: "/coaching",
    canonicalPath: "/coaching/",
    title: "Photography and Business Coaching | DTV",
    description:
      "Explore Damon's current one-on-one photography and business coaching path through DTV Productions.",
    h1: "Build with sharper intention.",
  },
  {
    path: "/faq",
    canonicalPath: "/faq/",
    title: "Organizer FAQ | Damon J. Young Jr.",
    description:
      "Read practical answers about audiences, topics, workshops, formats, travel, proposals, speaker materials, and booking.",
    h1: "Before you book.",
  },
  {
    path: "/book-damon",
    canonicalPath: "/book-damon/",
    title: "Book Damon to Speak | Inquiry Builder",
    description:
      "Prepare a detailed speaking, workshop, panel, media, or coaching inquiry for Damon J. Young Jr.",
    h1: "Start with the room.",
  },
  {
    path: "/privacy",
    canonicalPath: "/privacy/",
    title: "Privacy and Static Inquiry Disclosure | DTV",
    description:
      "Learn how this static demo prepares an email locally without submitting, sending, or storing inquiry information.",
    h1: "Your inquiry stays on your device.",
  },
  {
    path: "/thank-you",
    canonicalPath: "/thank-you/",
    title: "Finish Your Inquiry | Damon J. Young Jr.",
    description:
      "Confirm that you sent the prepared inquiry or copy the summary and contact DTV Productions directly.",
    h1: "Finish your inquiry.",
  },
];

export const routeByPath = new Map(
  routes.map((route) => [route.path, route]),
);
