import { externalLinks } from "../../content/externalLinks";
import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export function WorkshopFeature() {
  return (
    <section className="programs section section--light">
      <div className="programs__copy">
        <p className="section-label">Workshops and coaching</p>
        <h2 className="display display--section">
          More than a message.
        </h2>
        <div className="programs__paths">
          <article>
            <span className="programs__number">01</span>
            <h3>Workshops</h3>
            <p>
              Creative, photography, entrepreneurship, and
              content-creation workshops can be shaped around the
              organizer&apos;s goals.
            </p>
            <ActionLink to="/workshops">Explore workshops</ActionLink>
          </article>
          <article>
            <span className="programs__number">02</span>
            <h3>Coaching</h3>
            <p>
              Explore Damon&apos;s current one-on-one photography and
              business coaching path through DTV Productions.
            </p>
            <ActionLink to={externalLinks.coaching} external>
              View coaching
            </ActionLink>
          </article>
        </div>
        <p className="programs__note">
          Format, capacity, duration, availability, and pricing are
          confirmed after review.
        </p>
      </div>
      <div className="programs__media frame">
        <ResponsiveImage
          basePath="media/damon/damon-photographing-athlete"
          widths={[640, 1000, 1500]}
          alt="Damon photographing an athlete during an outdoor creative session."
          className="programs__image"
          sizes="(max-width: 767px) 100vw, 52vw"
        />
      </div>
    </section>
  );
}
