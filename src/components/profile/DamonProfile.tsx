import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export function DamonProfile() {
  return (
    <section className="profile-section section section--dark">
      <div className="profile-section__copy">
        <p className="section-label">Introduction</p>
        <h2 className="display display--section">
          The work behind the vision.
        </h2>
        <p className="body-large">
          Damon built DTV through photography, creative direction, and
          the discipline to keep moving before the full road was
          visible.
        </p>
        <ActionLink to="/about">Meet Damon</ActionLink>
      </div>
      <div className="profile-section__media frame">
        <ResponsiveImage
          basePath="media/damon/damon-camera-outdoors"
          widths={[720, 1200, 1800]}
          alt="Damon J. Young Jr. composing a photograph outdoors with a professional camera."
          className="profile-section__image"
          sizes="(max-width: 767px) 100vw, 62vw"
        />
        <span className="frame__caption camera-meta">
          BEHIND THE LENS / 002
        </span>
      </div>
    </section>
  );
}
