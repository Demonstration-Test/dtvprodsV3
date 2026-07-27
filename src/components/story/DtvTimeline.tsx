import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export function DtvTimeline() {
  return (
    <section className="dtv-story section section--dark">
      <div className="dtv-story__copy">
        <p className="section-label">Origin story</p>
        <h2 className="display display--section">
          From DamonTV to Destined to Venture.
        </h2>
        <ol className="dtv-story__timeline">
          <li>
            <span>2020</span>
            <strong>DTV Productions begins</strong>
          </li>
          <li>
            <span>DamonTV</span>
            <strong>The name evolves</strong>
          </li>
          <li>
            <span>Destined to Venture</span>
            <strong>The idea becomes the mission</strong>
          </li>
        </ol>
        <p>
          What began behind the lens became a wider commitment to
          movement, discipline, entrepreneurship, and possibility.
        </p>
        <ActionLink to="/dtv-story">Read the DTV story</ActionLink>
      </div>
      <div className="dtv-story__media">
        <div className="frame">
          <ResponsiveImage
            basePath="media/damon/damon-camera-outdoors"
            widths={[720, 1200, 1800]}
            alt="Damon J. Young Jr. composing a photograph outdoors with a professional camera."
            className="dtv-story__image"
            sizes="(max-width: 767px) 100vw, 46vw"
          />
        </div>
        <div className="frame dtv-story__media-secondary">
          <ResponsiveImage
            basePath="media/damon/damon-photographing-athlete"
            widths={[640, 1000, 1500]}
            alt="Damon photographing an athlete during an outdoor creative session."
            className="dtv-story__image"
            sizes="(max-width: 767px) 80vw, 34vw"
          />
        </div>
      </div>
    </section>
  );
}
