import { assetUrl } from "../../lib/assets";
import { ViewfinderFrame } from "../hero/ViewfinderFrame";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  index?: string;
  imageWidth?: number;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  index = "DTV / PAGE",
  imageWidth = 1400,
}: PageHeroProps) {
  return (
    <section className="page-hero section section--dark">
      <ViewfinderFrame />
      <div className="page-hero__copy">
        <p className="section-label">{eyebrow}</p>
        <h1 className="display display--page">{title}</h1>
        <p className="body-large">{intro}</p>
        <span className="camera-meta">{index}</span>
      </div>
      <figure className="page-hero__media frame">
        <picture>
          <source
            srcSet={assetUrl(`media/${image}-${imageWidth}.avif`)}
            type="image/avif"
          />
          <img
            src={assetUrl(`media/${image}-${imageWidth}.webp`)}
            alt={imageAlt}
          />
        </picture>
      </figure>
    </section>
  );
}
