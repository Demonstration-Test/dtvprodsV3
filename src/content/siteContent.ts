import { audiences } from "./audiences";
import { contact, externalLinks } from "./externalLinks";
import { faqs } from "./faqs";
import { formOptions, inquiryCopy } from "./forms";
import { navigation } from "./navigation";
import { routes } from "./routes";
import {
  speakingThemeDisclaimer,
  speakingThemes,
} from "./speakingThemes";
import type { BookingStep } from "./contentTypes";

export const bookingSteps: BookingStep[] = [
  {
    index: "01",
    title: "Share your vision",
    copy:
      "Tell Damon about the event, audience, date, location, and desired outcome.",
  },
  {
    index: "02",
    title: "Build the experience",
    copy:
      "Damon or his team reviews the request and identifies the right message, format, and level of customization.",
  },
  {
    index: "03",
    title: "Venture together",
    copy:
      "If the engagement is a fit, the details are confirmed and Damon prepares the keynote, workshop, panel, or creative experience for the room.",
  },
];

export const takeaways = [
  "Greater confidence in taking a meaningful next step",
  "A clearer understanding of purposeful risk",
  "Practical movement from an idea toward a plan",
  "A stronger connection between discipline and opportunity",
  "A healthier perspective on failure and uncertainty",
  "Motivation grounded in real entrepreneurial and creative experience",
] as const;

export const homepageCopy = {
  hero: {
    label:
      "Motivational Speaker • Entrepreneur • Visual Storyteller",
    headline: "Destined to Venture.",
    support:
      "Damon J. Young Jr. helps students, athletes, creatives, and organizations turn vision into disciplined action.",
    primaryAction: "Book Damon to speak",
    secondaryAction: "Watch his story",
    tertiaryAction: "Explore DTV Productions",
  },
  manifesto: {
    statement:
      "You do not have to see the entire road to take the next step.",
    definition:
      "Destined to Venture is the decision to move before every answer is available—to take intentional risks, develop discipline behind a vision, turn creative ability into opportunity, and grow beyond the identity or environment that once defined you.",
  },
  takeaways: {
    heading: "What is the experience designed to spark?",
    intro:
      "Every engagement begins with the organizer's goals. Depending on the audience and format, the experience can be designed to encourage:",
    disclaimer:
      "These are intended takeaways, not guaranteed individual or organizational outcomes.",
  },
  finalCta: {
    headline: "You were not built to stay where you started.",
    support:
      "Bring Damon J. Young Jr. to your school, team, conference, workshop, or organization for a message designed to challenge hesitation, strengthen vision, and inspire meaningful movement.",
    primaryAction: "Book Damon to speak",
    secondaryAction: "Contact DTV",
  },
} as const;

export const siteContent = {
  routes,
  navigation,
  audiences,
  speakingThemes,
  speakingThemeDisclaimer,
  takeaways,
  bookingSteps,
  faqs,
  formOptions,
  inquiryCopy,
  contact,
  externalLinks,
  homepageCopy,
};
