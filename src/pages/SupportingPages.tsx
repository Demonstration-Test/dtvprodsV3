import { audiences } from "../content/audiences";
import { externalLinks } from "../content/externalLinks";
import { faqs } from "../content/faqs";
import { inquiryCopy } from "../content/forms";
import {
  speakingThemeDisclaimer,
  speakingThemes,
} from "../content/speakingThemes";
import { FullInquiryForm } from "../components/booking/FullInquiryForm";
import { BookingProcess } from "../components/booking/BookingProcess";
import { EditorialPortfolio } from "../components/portfolio/EditorialPortfolio";
import { DtvTimeline } from "../components/story/DtvTimeline";
import { ActionLink } from "../components/ui/ActionLink";
import { PageHero } from "../components/layout/PageHero";
import { assetUrl } from "../lib/assets";

const formatCards = [
  {
    index: "01",
    title: "Keynotes and assemblies",
    copy:
      "A customizable message shaped around the organizer's goals, audience, and available time.",
  },
  {
    index: "02",
    title: "Workshops and team sessions",
    copy:
      "A participatory format that can connect creative practice, entrepreneurship, discipline, and next-step planning.",
  },
  {
    index: "03",
    title: "Panels, podcasts, and media",
    copy:
      "A conversation-led experience for organizers exploring Damon's creative and entrepreneurial perspective.",
  },
] as const;

const audienceMedia: Record<string, string> = {
  "schools-colleges": "portfolio/graduate-library",
  "athletes-teams": "portfolio/athlete-green-smoke",
  "creatives-entrepreneurs": "portfolio/creative-yellow-pages",
  "organizations-brands": "portfolio/group-black-suits",
};

const audienceHeadlines: Record<string, string> = {
  "schools-colleges": "Help students see the next step.",
  "athletes-teams": "Preparation shapes the moment.",
  "creatives-entrepreneurs": "Turn the idea into movement.",
  "organizations-brands": "Move opportunity with intention.",
};

const audienceFocus: Record<string, string[]> = {
  "schools-colleges": [
    "Possibility beyond the current environment",
    "Confidence grounded in preparation",
    "A practical next step toward an idea",
  ],
  "athletes-teams": [
    "Preparation before pressure arrives",
    "Identity and opportunity beyond the uniform",
    "Discipline that travels beyond the game",
  ],
  "creatives-entrepreneurs": [
    "Moving from talent into consistent execution",
    "Turning creative ability into opportunity",
    "Starting before every answer is available",
  ],
  "organizations-brands": [
    "Ownership during change",
    "Intentional innovation",
    "Leadership through perspective and action",
  ],
};

function InquiryBand({
  heading = "Build the right experience for the room.",
}: {
  heading?: string;
}) {
  return (
    <section className="route-cta section section--dark">
      <p className="section-label">Next frame</p>
      <h2 className="display display--section">{heading}</h2>
      <p>
        Share the audience, date, format, and desired outcome. Damon or
        his team reviews every request before confirming fit,
        availability, and details.
      </p>
      <ActionLink to="/book-damon" variant="primary">
        Start an inquiry
      </ActionLink>
    </section>
  );
}

function NumberedCards({
  items,
}: {
  items: readonly {
    index: string;
    title: string;
    copy: string;
  }[];
}) {
  return (
    <div className="numbered-cards">
      {items.map((item) => (
        <article key={item.index} className="numbered-card">
          <span className="camera-meta">{item.index}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Damon"
        title="The work behind the vision."
        intro="Damon J. Young Jr. is a creative entrepreneur, visual storyteller, educator, and founder of DTV Productions."
        image="damon/damon-camera-outdoors"
        imageAlt="Damon J. Young Jr. composing a photograph outdoors."
        index="PORTRAIT / 002"
        imageWidth={1800}
      />
      <section className="editorial-split section section--light">
        <div>
          <p className="section-label">Behind the lens</p>
          <h2 className="display display--section">
            Craft became a way to communicate.
          </h2>
        </div>
        <div className="prose">
          <p>
            Damon built DTV through photography, creative direction,
            entrepreneurship, and the discipline to keep moving before
            the full road was visible.
          </p>
          <p>
            Destined to Venture carries those lived creative lessons
            into rooms where people are deciding what comes next. The
            work is grounded in purposeful action, preparation,
            identity, and possibility.
          </p>
        </div>
      </section>
      <DtvTimeline />
      <InquiryBand heading="Bring the perspective behind the lens into your room." />
    </>
  );
}

export function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking"
        title="Messages built for meaningful movement."
        intro="Damon works with organizers to shape a keynote, assembly, workshop, team session, panel, or creative experience around the room's real objectives."
        image="portfolio/portrait-red-stage"
        imageAlt="Editorial portrait staged against a red background."
        index="SPEAKING / 003"
      />
      <section className="route-section section section--light">
        <p className="section-label">Engagement formats</p>
        <h2 className="display display--section">
          Begin with the outcome, then build the format.
        </h2>
        <NumberedCards items={formatCards} />
        <p className="route-note">
          These are inquiry formats, not fixed packages or confirmed
          engagements. Details are recommended after review.
        </p>
      </section>
      <section
        className="route-section section section--dark"
        id="audiences"
      >
        <p className="section-label">Audience pathways</p>
        <h2 className="display display--section">
          Four ways into the room.
        </h2>
        <div className="audience-link-grid">
          {audiences.map((audience) => (
            <article key={audience.id}>
              <span className="camera-meta">{audience.index}</span>
              <h3>{audience.title}</h3>
              <p>{audience.copy}</p>
              <ActionLink to={audience.to}>{audience.action}</ActionLink>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand />
    </>
  );
}

export function SpeakingTopicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking themes"
        title="Ideas built to move with the room."
        intro="Seven approved themes create a starting point for a message shaped around the audience, objective, and format."
        image="portfolio/creative-overhead-pages"
        imageAlt="Printed creative work arranged across a tabletop."
        index="THEMES / 004"
      />
      <section className="theme-catalog section section--light">
        <ol>
          {speakingThemes.map((theme) => (
            <li key={theme.id}>
              <span className="camera-meta">{theme.index}</span>
              <h2>{theme.title}</h2>
            </li>
          ))}
        </ol>
        <p className="route-note">{speakingThemeDisclaimer}</p>
      </section>
      <InquiryBand heading="Choose the starting idea. Build the message together." />
    </>
  );
}

export function AudiencePage({ id }: { id: string }) {
  const audience =
    audiences.find((item) => item.id === id) ?? audiences[0];
  const focusItems = audienceFocus[audience.id] ?? [];
  return (
    <>
      <PageHero
        eyebrow={audience.title}
        title={audienceHeadlines[audience.id]}
        intro={audience.copy}
        image={audienceMedia[audience.id]}
        imageAlt={`${audience.title} visual pathway from DTV's photography portfolio.`}
        index={`AUDIENCE / ${audience.index}`}
      />
      <section className="editorial-split section section--light">
        <div>
          <p className="section-label">Possible focus</p>
          <h2 className="display display--section">
            Shape the message around what this audience needs now.
          </h2>
        </div>
        <ol className="focus-list">
          {focusItems.map((item, index) => (
            <li key={item}>
              <span className="camera-meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
        <p className="route-note">
          The imagery represents DTV visual work and pathway themes,
          not documented speaking engagements.
        </p>
      </section>
      <InquiryBand heading={`Plan an experience for ${audience.title.toLowerCase()}.`} />
    </>
  );
}

export function WorkshopsPage() {
  const workshopItems = [
    {
      index: "01",
      title: "Creative practice",
      copy:
        "Explore visual storytelling, photography, or content creation through an organizer-defined learning objective.",
    },
    {
      index: "02",
      title: "Entrepreneurial movement",
      copy:
        "Connect an idea or skill to positioning, consistent action, and practical execution.",
    },
    {
      index: "03",
      title: "Custom experience",
      copy:
        "Combine speaking, conversation, and guided work when the audience would benefit from a more participatory format.",
    },
  ] as const;
  return (
    <>
      <PageHero
        eyebrow="Workshops"
        title="More than a message."
        intro="Organizers may inquire about creative, photography, entrepreneurship, and content-creation workshops shaped around the people in the room."
        image="damon/damon-photographing-athlete"
        imageAlt="Damon photographing an athlete during a creative session."
        index="WORKSHOP / 005"
        imageWidth={1500}
      />
      <section className="route-section section section--light">
        <p className="section-label">Workshop directions</p>
        <h2 className="display display--section">
          Learn by seeing, discussing, and doing.
        </h2>
        <NumberedCards items={workshopItems} />
        <p className="route-note">
          Current format, capacity, duration, and pricing are confirmed
          after review. No fee is published or implied by this demo.
        </p>
      </section>
      <InquiryBand heading="Tell Damon what the audience should leave able to do." />
    </>
  );
}

export function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media and visual story"
        title="The lens taught the lesson."
        intro="An honest photography-led story of craft, preparation, entrepreneurship, and communication—without presenting portfolio work as speaking footage."
        image="portfolio/sports-media-day"
        imageAlt="A montage of colorful sports media-day portraits."
        index="ARCHIVE / 006"
      />
      <EditorialPortfolio />
      <section className="contact-sheet section section--dark">
        {[
          ["athlete-red-smoke", "Athletic portrait"],
          ["fashion-black-leather", "Editorial portrait"],
          ["graduate-cap", "Graduation portrait"],
          ["portrait-red-roses", "Creative portrait"],
        ].map(([image, label], index) => (
          <figure key={image} className="frame">
            <img
              src={assetUrl(`media/portfolio/${image}-720.webp`)}
              alt={`${label} from DTV's visual portfolio.`}
              loading="lazy"
            />
            <figcaption className="camera-meta">
              {String(index + 1).padStart(2, "0")} / {label}
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

export function DtvStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Origin story"
        title="From DamonTV to Destined to Venture."
        intro="What began behind the lens became a wider commitment to movement, discipline, entrepreneurship, and possibility."
        image="damon/damon-camera-outdoors"
        imageAlt="Damon working behind a professional camera outdoors."
        index="ORIGIN / 007"
        imageWidth={1800}
      />
      <section className="story-chapters section section--light">
        <article>
          <span className="camera-meta">2020</span>
          <h2>DTV Productions begins.</h2>
          <p>
            Creative work, service, and the discipline of building
            establish the foundation.
          </p>
        </article>
        <article>
          <span className="camera-meta">DAMONTV</span>
          <h2>The name evolves.</h2>
          <p>
            The original identity becomes a broader creative platform
            built around visual storytelling.
          </p>
        </article>
        <article>
          <span className="camera-meta">DESTINED TO VENTURE</span>
          <h2>The idea becomes the mission.</h2>
          <p>
            Lessons from craft and entrepreneurship become language
            for people deciding how to move forward.
          </p>
        </article>
      </section>
      <InquiryBand heading="Bring the story of disciplined movement into the room." />
    </>
  );
}

export function CoachingPage() {
  return (
    <>
      <PageHero
        eyebrow="One-on-one coaching"
        title="Build with sharper intention."
        intro="Explore Damon's current photography and business coaching path through DTV Productions."
        image="portfolio/creative-yellow-pages"
        imageAlt="Bold yellow creative pages photographed for a DTV visual project."
        index="COACHING / 008"
      />
      <section className="editorial-split section section--light">
        <div>
          <p className="section-label">Current path</p>
          <h2 className="display display--section">
            Continue through DTV Productions.
          </h2>
        </div>
        <div className="prose">
          <p>
            Coaching availability, scope, scheduling, and pricing are
            maintained on the current DTV Productions booking page.
          </p>
          <ActionLink
            to={externalLinks.coaching}
            external
            variant="primary"
          >
            View current coaching details
          </ActionLink>
        </div>
      </section>
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Organizer FAQ"
        title="Before you book."
        intro="Clear answers about audiences, formats, customization, travel, materials, and the inquiry process."
        image="portfolio/creative-overhead-pages"
        imageAlt="Editorial overhead arrangement of printed pages."
        index="FAQ / 009"
      />
      <section className="faq-page section section--light">
        {faqs.map((faq, index) => (
          <details key={faq.id} open={index === 0}>
            <summary>
              <span className="camera-meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{faq.question}</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
      <InquiryBand />
    </>
  );
}

export function BookDamonPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Damon"
        title="Start with the room."
        intro="Prepare a complete inquiry for a keynote, workshop, team session, panel, interview, or creative experience."
        image="portfolio/group-black-suits"
        imageAlt="A group portrait in coordinated black suits."
        index="INQUIRY / 010"
      />
      <BookingProcess />
      <FullInquiryForm />
    </>
  );
}

export function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Your inquiry stays on your device."
        intro="This public demo uses a local email-builder workflow. It does not submit, send, or store your form entries on a server."
        image="portfolio/creative-overhead-pages"
        imageAlt="Printed pages arranged across a desk."
        index="PRIVACY / 011"
      />
      <section className="legal-page section section--light">
        <h2>How this demo handles information</h2>
        <p>
          Form validation and the inquiry summary are created in your
          browser. Choosing “Open email draft” asks your device to open
          its configured email application. You remain responsible for
          reviewing and sending the message.
        </p>
        <h2>No delivery claim</h2>
        <p>
          This website cannot confirm whether an email application
          opened, whether a message was sent, or whether it was
          delivered.
        </p>
        <h2>Direct contact</h2>
        <p>
          You can contact DTV directly at{" "}
          <a href={externalLinks.email}>Bookings@dtvprods.com</a> or{" "}
          <a href={externalLinks.phone}>862-846-8626</a>.
        </p>
      </section>
    </>
  );
}

export function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Final check"
        title={inquiryCopy.thankYouHeading}
        intro={inquiryCopy.thankYouDisclosure}
        image="portfolio/graduate-red-vehicle"
        imageAlt="A graduate posed beside a red vehicle."
        index="DELIVERY / 012"
      />
      <section className="route-cta section section--light">
        <h2 className="display display--section">
          Need another way to send it?
        </h2>
        <p>
          Email Bookings@dtvprods.com or call 862-846-8626. You can
          also return to the inquiry builder to revise and copy your
          summary.
        </p>
        <div className="route-cta__actions">
          <ActionLink to="/book-damon" variant="primary">
            Return to inquiry
          </ActionLink>
          <ActionLink to={externalLinks.email} external>
            Email DTV directly
          </ActionLink>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found section section--dark">
      <p className="section-label">Frame not found</p>
      <h1 className="display display--page">This path is out of frame.</h1>
      <ActionLink to="/" variant="primary">
        Return home
      </ActionLink>
    </section>
  );
}
