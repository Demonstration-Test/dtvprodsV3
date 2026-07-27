import type { NavigationItem } from "./contentTypes";

export const navigation: NavigationItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Speaking", to: "/speaking" },
  {
    label: "Audiences",
    to: "/speaking#audiences",
    children: [
      { label: "Schools & Colleges", to: "/schools-colleges" },
      { label: "Athletes & Teams", to: "/athletes-teams" },
      {
        label: "Creatives & Entrepreneurs",
        to: "/creatives-entrepreneurs",
      },
      { label: "Organizations & Brands", to: "/organizations" },
    ],
  },
  { label: "Workshops", to: "/workshops" },
  { label: "Media", to: "/media" },
  { label: "DTV Story", to: "/dtv-story" },
];

export const mobileNavigation = [
  {
    label: "Explore",
    items: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Speaking", to: "/speaking" },
      { label: "Speaking Topics", to: "/speaking-topics" },
    ],
  },
  {
    label: "Audiences",
    items: [
      { label: "Schools & Colleges", to: "/schools-colleges" },
      { label: "Athletes & Teams", to: "/athletes-teams" },
      {
        label: "Creatives & Entrepreneurs",
        to: "/creatives-entrepreneurs",
      },
      { label: "Organizations & Brands", to: "/organizations" },
    ],
  },
  {
    label: "Formats",
    items: [
      { label: "Workshops", to: "/workshops" },
      { label: "Coaching", to: "/coaching" },
    ],
  },
  {
    label: "More DTV",
    items: [
      { label: "Media", to: "/media" },
      { label: "DTV Story", to: "/dtv-story" },
      { label: "FAQ", to: "/faq" },
      { label: "Book Damon", to: "/book-damon" },
    ],
  },
] satisfies Array<{
  label: string;
  items: NavigationItem[];
}>;
