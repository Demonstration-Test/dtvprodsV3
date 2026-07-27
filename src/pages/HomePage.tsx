import { AudienceSequence } from "../components/audiences/AudienceSequence";
import { HomeInquiryForm } from "../components/booking/HomeInquiryForm";
import { FinalCta } from "../components/cta/FinalCta";
import { Hero } from "../components/hero/Hero";
import { HomeChapterNav } from "../components/navigation/HomeChapterNav";
import { IntendedTakeaways } from "../components/outcomes/IntendedTakeaways";
import { PlanTheRoom } from "../components/planning/PlanTheRoom";
import { EditorialPortfolio } from "../components/portfolio/EditorialPortfolio";
import { HomeStoryChapter } from "../components/story/HomeStoryChapter";
import { WorkshopFeature } from "../components/workshops/WorkshopFeature";

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeChapterNav />
      <HomeStoryChapter />
      <AudienceSequence />
      <EditorialPortfolio />
      <IntendedTakeaways />
      <WorkshopFeature />
      <PlanTheRoom />
      <HomeInquiryForm />
      <FinalCta />
    </>
  );
}
