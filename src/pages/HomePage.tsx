import { AudienceSequence } from "../components/audiences/AudienceSequence";
import { BookingProcess } from "../components/booking/BookingProcess";
import { HomeInquiryForm } from "../components/booking/HomeInquiryForm";
import { FinalCta } from "../components/cta/FinalCta";
import { FaqPreview } from "../components/faq/FaqPreview";
import { Hero } from "../components/hero/Hero";
import { ManifestoSection } from "../components/manifesto/ManifestoSection";
import { IntendedTakeaways } from "../components/outcomes/IntendedTakeaways";
import { EditorialPortfolio } from "../components/portfolio/EditorialPortfolio";
import { DamonProfile } from "../components/profile/DamonProfile";
import { SpeakingThemeRail } from "../components/speaking/SpeakingThemeRail";
import { DtvTimeline } from "../components/story/DtvTimeline";
import { MotionStory } from "../components/story/MotionStory";
import { WorkshopFeature } from "../components/workshops/WorkshopFeature";

export function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoSection />
      <DamonProfile />
      <MotionStory />
      <AudienceSequence />
      <SpeakingThemeRail />
      <DtvTimeline />
      <EditorialPortfolio />
      <IntendedTakeaways />
      <WorkshopFeature />
      <BookingProcess />
      <FaqPreview />
      <HomeInquiryForm />
      <FinalCta />
    </>
  );
}
