import { useState } from "react";
import { homeGalleryCategories } from "../../content/homeGallery";
import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export function EditorialPortfolio() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const category = homeGalleryCategories[categoryIndex];
  const featureImage = category.images[imageIndex];

  function selectCategory(index: number) {
    setCategoryIndex(index);
    setImageIndex(0);
  }

  return (
    <section
      id="gallery"
      data-home-chapter
      className="portfolio home-chapter section section--light"
      aria-labelledby="portfolio-title"
    >
      <div className="portfolio__heading">
        <div>
          <p className="section-label">Curated visual work</p>
          <h2 id="portfolio-title" className="display display--section">
            The lens taught the lesson.
          </h2>
        </div>
        <p>
          DTV&apos;s visual work supports the speaker story as evidence
          of craft, preparation, entrepreneurship, and communication.
        </p>
      </div>

      <div className="portfolio__gallery">
        <figure className="portfolio__feature frame" aria-live="polite">
          <ResponsiveImage
            key={featureImage.mediaId}
            basePath={featureImage.basePath}
            widths={featureImage.widths}
            alt={featureImage.alt}
            className="portfolio__feature-image"
            sizes="(max-width: 767px) 100vw, 66vw"
          />
          <figcaption>
            <span className="camera-meta">{category.name}</span>
            <strong>{featureImage.mediaId}</strong>
          </figcaption>
        </figure>

        <div className="portfolio__category-controls">
          {homeGalleryCategories.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show ${item.name}`}
              aria-pressed={categoryIndex === index}
              className={
                categoryIndex === index
                  ? "portfolio__category portfolio__category--active"
                  : "portfolio__category"
              }
              onClick={() => selectCategory(index)}
            >
              <span className="camera-meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{item.name}</strong>
            </button>
          ))}
        </div>

        <div
          className="portfolio__previews"
          role="group"
          aria-label="Gallery previews"
        >
          {category.images.length > 1
            ? category.images.map((image, index) => (
                <button
                  key={image.mediaId}
                  type="button"
                  aria-label={`View ${image.alt}`}
                  aria-pressed={imageIndex === index}
                  className={
                    imageIndex === index
                      ? "portfolio__preview portfolio__preview--active"
                      : "portfolio__preview"
                  }
                  onClick={() => setImageIndex(index)}
                >
                  <ResponsiveImage
                    basePath={image.basePath}
                    widths={[image.widths[0]]}
                    alt=""
                    className="portfolio__preview-image"
                    sizes="8rem"
                  />
                  <span className="camera-meta">{image.mediaId}</span>
                </button>
              ))
            : null}
        </div>
      </div>

      <div className="portfolio__footer">
        <div className="portfolio__actions">
          <ActionLink to="/media" variant="primary">
            Explore the full media gallery
          </ActionLink>
          <ActionLink
            to="https://www.dtvprods.com/"
            external
            variant="outline"
          >
            Visit DTV Productions
          </ActionLink>
        </div>
        <p>
          Portfolio images are presented as visual storytelling work,
          not as speaking-event documentation.
        </p>
      </div>
    </section>
  );
}
