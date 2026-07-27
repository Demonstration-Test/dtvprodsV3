import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { homeStoryFrames } from "../../content/homeStory";
import { ActionLink } from "../ui/ActionLink";
import { ResponsiveImage } from "../ui/ResponsiveImage";

export function HomeStoryChapter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controlsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const frame = homeStoryFrames[activeIndex];

  function selectFrame(index: number, moveFocus = false) {
    setActiveIndex(index);
    if (moveFocus) {
      controlsRef.current[index]?.focus();
    }
  }

  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % homeStoryFrames.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + homeStoryFrames.length) % homeStoryFrames.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = homeStoryFrames.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectFrame(nextIndex, true);
  }

  return (
    <section
      id="story"
      data-home-chapter
      className="home-story home-chapter section section--dark"
      aria-labelledby="home-story-title"
    >
      <div className="home-story__copy">
        <p className="section-label">DTV story</p>
        <div className="home-story__editorial" aria-live="polite">
          <p className="camera-meta">{frame.metadata}</p>
          <h2 id="home-story-title" className="display display--section">
            {frame.heading}
          </h2>
          <p className="body-large">{frame.copy}</p>
        </div>
        <div className="home-story__actions">
          <ActionLink to="/dtv-story" variant="primary">
            Read the DTV story
          </ActionLink>
          <ActionLink to="/about">Meet Damon</ActionLink>
        </div>
        <p className="home-story__disclosure">
          This chapter uses authentic DTV photography and does not
          present any frame as documentation of a speaking engagement.
        </p>
      </div>

      <div className="home-story__visual">
        <figure className="home-story__frame frame">
          <ResponsiveImage
            key={frame.mediaId}
            basePath={frame.basePath}
            widths={frame.widths}
            alt={frame.alt}
            className="home-story__image"
            sizes="(max-width: 767px) 100vw, 58vw"
          />
          <figcaption className="camera-meta">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(homeStoryFrames.length).padStart(2, "0")}
          </figcaption>
        </figure>
        <div className="home-story__controls" aria-label="DTV story frames">
          {homeStoryFrames.map((item, index) => (
            <button
              key={item.mediaId}
              ref={(element) => {
                controlsRef.current[index] = element;
              }}
              type="button"
              aria-label={item.selector}
              className={
                index === activeIndex
                  ? "home-story__control home-story__control--active"
                  : "home-story__control"
              }
              aria-pressed={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectFrame(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="camera-meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{item.selector}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
