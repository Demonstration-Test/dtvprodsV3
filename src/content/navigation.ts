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
