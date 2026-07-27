import { assetUrl } from "../../lib/assets";
import { ActionLink } from "../ui/ActionLink";

const portfolioItems = [
  {
    label: "Events",
    base: "event-bride-guests",
    alt: "Bride celebrating with guests during an event.",
  },
  {
    label: "Media day",
    base: "sports-media-day",
    alt: "Montage of colorful sports media-day portraits.",
  },
] as const;

export function EditorialPortfolio() {
  return (
    <section className="portfolio section section--light">
      <div className="portfolio__heading">
        <p className="section-label">Curated visual work</p>
        <h2 className="display display--section">
          The lens taught the lesson.
        </h2>
        <p>
          DTV&apos;s visual work supports the speaker story as evidence
          of craft, preparation, entrepreneurship, and communication.
        </p>
      </div>
      <div className="portfolio__grid">
        {portfolioItems.map((item) => (
          <figure key={item.base} className="frame">
            <figcaption className="camera-meta">{item.label}</figcaption>
            <picture>
              <source
                srcSet={assetUrl(
                  `media/portfolio/${item.base}-1400.avif`,
                )}
                type="image/avif"
              />
              <img
                src={assetUrl(
                  `media/portfolio/${item.base}-1400.webp`,
                )}
                alt={item.alt}
                loading="lazy"
              />
            </picture>
          </figure>
        ))}
      </div>
      <div className="portfolio__footer">
        <ActionLink
          to="https://www.dtvprods.com/"
          external
          variant="outline"
        >
          Explore DTV Productions
        </ActionLink>
        <p>
          Portfolio images are presented as visual storytelling work,
          not as speaking-event documentation.
        </p>
      </div>
    </section>
  );
}
