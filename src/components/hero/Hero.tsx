import { lazy, Suspense, useState } from "react";
import { homepageCopy } from "../../content/siteContent";
import { useMotionProfile } from "../../lib/motion/MotionSystem";
import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";
import { ViewfinderFrame } from "./ViewfinderFrame";

const HeroLens = lazy(() => import("./HeroLens"));

export function Hero() {
  const copy = homepageCopy.hero;
  const motion = useMotionProfile();
  const [lensPaused, setLensPaused] = useState(false);
  return (
    <section
      id="home"
      data-home-chapter
      className="hero home-chapter"
      aria-labelledby="hero-title"
    >
      <ViewfinderFrame />
      {motion.allowWebgl ? (
        <Suspense fallback={null}>
          <HeroLens paused={lensPaused} />
        </Suspense>
      ) : null}
      {motion.allowWebgl ? (
        <button
          type="button"
          className="hero__motion-toggle"
          aria-label={lensPaused ? "Play lens motion" : "Pause lens motion"}
          aria-pressed={lensPaused}
          onClick={() => setLensPaused((paused) => !paused)}
        >
          <span aria-hidden="true">{lensPaused ? "▶" : "Ⅱ"}</span>
        </button>
      ) : null}
      <div className="hero__content">
        <p className="hero__label">{copy.label}</p>
        <h1
          id="hero-title"
          className="display display--hero"
          aria-label="Destined to Venture."
        >
          <span className="hero-title__desktop" aria-hidden="true">
            Destined
          </span>
          <span className="hero-title__desktop" aria-hidden="true">
            To Venture.
          </span>
          <span className="hero-title__mobile" aria-hidden="true">
            Destined to
          </span>
          <span className="hero-title__mobile" aria-hidden="true">
            Venture.
          </span>
        </h1>
        <p className="hero__support">{copy.support}</p>
        <div className="hero__actions">
          <ActionLink to="/book-damon" variant="primary">
            {copy.primaryAction}
          </ActionLink>
          <ActionLink to="/#story">{copy.secondaryAction}</ActionLink>
          <ActionLink
            to="https://www.dtvprods.com/"
            external
            variant="text"
          >
            {copy.tertiaryAction}
          </ActionLink>
        </div>
        <p className="camera-meta hero__meta">
          FRAME 001 / DTV &nbsp;&nbsp; 50MM &nbsp; F/2.8
        </p>
      </div>
      <div className="hero__portrait" aria-hidden="true">
        <ResponsiveImage
          basePath="media/damon/damon-hero-cutout"
          widths={[480, 768, 1100]}
          alt=""
          className="hero__portrait-image"
          sizes="(max-width: 767px) 80vw, 54vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
