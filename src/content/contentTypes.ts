export type SiteRoute = {
  path: string;
  canonicalPath: string;
  title: string;
  description: string;
  h1: string;
};

export type NavigationItem = {
  label: string;
  to: string;
  children?: Array<{ label: string; to: string }>;
};

export type AudiencePathway = {
  id: string;
  index: string;
  title: string;
  copy: string;
  action: string;
  to: string;
  mediaId: string;
};

export type SpeakingTheme = {
  id: string;
  index: string;
  title: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type BookingStep = {
  index: string;
  title: string;
  copy: string;
};
