export const formOptions = {
  eventTypes: [
    "School or college program",
    "Athletic team or sports program",
    "Conference or organizational event",
    "Creative entrepreneurship workshop",
    "Panel discussion",
    "Podcast, interview, or media appearance",
    "Other",
  ],
  audiences: [
    "Schools and colleges",
    "Athletes and teams",
    "Creatives and entrepreneurs",
    "Organizations and brands",
    "Mixed audience",
    "Other",
  ],
  deliveryFormats: ["In person", "Virtual", "Hybrid"],
  audienceSizes: [
    "Under 50",
    "50–99",
    "100–249",
    "250–499",
    "500–999",
    "1,000+",
    "Not sure yet",
  ],
  requestedFormats: [
    "Keynote",
    "Workshop",
    "Assembly",
    "Team session",
    "Panel",
    "Podcast or interview",
    "Creative visual-storytelling experience",
    "Not sure yet",
  ],
  programLengths: [
    "30 minutes",
    "45 minutes",
    "60 minutes",
    "90 minutes",
    "Half day",
    "Full day",
    "Flexible or not sure",
  ],
  budgetRanges: [
    "Under $2,500",
    "$2,500–$4,999",
    "$5,000–$9,999",
    "$10,000+",
    "Not sure or prefer to discuss",
  ],
  referrals: [
    "DTV Productions website",
    "Search engine",
    "Social media",
    "Personal referral",
    "School, team, or organization colleague",
    "Saw Damon or DTV at an event",
    "Other",
  ],
} as const;

export const inquiryCopy = {
  consent:
    "I understand this demo prepares an email on my device and does not submit, send, or store my information on this website.",
  preActionDisclosure:
    "Review your inquiry before continuing. This static website cannot send it for you. “Open email draft” asks your browser to open a mail application; you must send the message from that application.",
  longSummaryFallback:
    "This inquiry is too detailed for a reliable email link. Copy the summary below, email it to Bookings@dtvprods.com, and send it from your email account.",
  thankYouHeading: "Finish your inquiry.",
  thankYouDisclosure:
    "This website cannot verify that your email was sent or delivered. If you sent the prepared message, Damon or his team can review it and follow up. If nothing opened, copy your inquiry and email Bookings@dtvprods.com or call 862-846-8626.",
} as const;
