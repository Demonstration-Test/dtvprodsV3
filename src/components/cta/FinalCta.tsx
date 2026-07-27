import { homepageCopy } from "../../content/siteContent";
import { externalLinks } from "../../content/externalLinks";
import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { ViewfinderFrame } from "../hero/ViewfinderFrame";

export function FinalCta() {
  return (
    <section
      id="book"
      data-home-chapter
      className="final-cta home-chapter section section--dark"
    >
      <ViewfinderFrame />
      <div className="final-cta__copy">
        <h2 className="display display--section">
          You were not built
          <br />
          to stay where you started.
        </h2>
        <p>{homepageCopy.finalCta.support}</p>
        <div className="final-cta__actions">
          <ActionLink to="/book-damon" variant="primary">
            {homepageCopy.finalCta.primaryAction}
          </ActionLink>
          <ActionLink to={externalLinks.email} external>
            {homepageCopy.finalCta.secondaryAction}
          </ActionLink>
        </div>
      </div>
      <div className="final-cta__portrait" aria-hidden="true">
        <ResponsiveImage
          basePath="media/damon/damon-hero-cutout"
          widths={[480, 768, 1100]}
          alt=""
          className="final-cta__portrait-image"
          sizes="(max-width: 767px) 70vw, 45vw"
        />
      </div>
    </section>
  );
}
