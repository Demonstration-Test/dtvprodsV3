import { Route, Routes } from "react-router-dom";
import { routes } from "../content/routes";
import { HomePage } from "../pages/HomePage";
import {
  AboutPage,
  AudiencePage,
  BookDamonPage,
  CoachingPage,
  DtvStoryPage,
  FaqPage,
  MediaPage,
  NotFoundPage,
  PrivacyPage,
  SpeakingPage,
  SpeakingTopicsPage,
  ThankYouPage,
  WorkshopsPage,
} from "../pages/SupportingPages";

export const routerBasename = "/dtvprodsV3";

export const routeDefinitions = routes.map((route) => ({
  path: route.path,
  route,
}));

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/speaking" element={<SpeakingPage />} />
      <Route path="/speaking-topics" element={<SpeakingTopicsPage />} />
      <Route
        path="/schools-colleges"
        element={<AudiencePage id="schools-colleges" />}
      />
      <Route
        path="/athletes-teams"
        element={<AudiencePage id="athletes-teams" />}
      />
      <Route
        path="/creatives-entrepreneurs"
        element={<AudiencePage id="creatives-entrepreneurs" />}
      />
      <Route
        path="/organizations"
        element={<AudiencePage id="organizations-brands" />}
      />
      <Route path="/workshops" element={<WorkshopsPage />} />
      <Route path="/media" element={<MediaPage />} />
      <Route path="/dtv-story" element={<DtvStoryPage />} />
      <Route path="/coaching" element={<CoachingPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/book-damon" element={<BookDamonPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
