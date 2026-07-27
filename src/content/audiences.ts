import type { AudiencePathway } from "./contentTypes";

export const audiences: AudiencePathway[] = [
  {
    id: "schools-colleges",
    index: "01",
    title: "Schools & Colleges",
    copy:
      "Helping students recognize possibility, build confidence, and act on their ideas.",
    action: "Bring Damon to your school",
    to: "/schools-colleges",
    mediaId: "MD-004",
  },
  {
    id: "athletes-teams",
    index: "02",
    title: "Athletes & Teams",
    copy:
      "Connecting preparation, discipline, identity, pressure, and performance beyond the game.",
    action: "Book Damon for your team",
    to: "/athletes-teams",
    mediaId: "MD-005",
  },
  {
    id: "creatives-entrepreneurs",
    index: "03",
    title: "Creatives & Entrepreneurs",
    copy:
      "Helping creators move from talent and ideas into disciplined execution.",
    action: "Plan a creative workshop",
    to: "/creatives-entrepreneurs",
    mediaId: "MD-010",
  },
  {
    id: "organizations-brands",
    index: "04",
    title: "Organizations & Brands",
    copy:
      "Encouraging teams to approach change, opportunity, ownership, and innovation with intention.",
    action: "Invite Damon to your organization",
    to: "/organizations",
    mediaId: "MD-009",
  },
];
