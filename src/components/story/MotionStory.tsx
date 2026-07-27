import { useState } from "react";
import { ResponsiveImage } from "../ui/ResponsiveImage";

const storyFrames = [
  {
    basePath: "media/damon/damon-camera-outdoors",
    widths: [720, 1200, 1800],
    alt: "Damon composing a photograph outdoors.",
    label: "Start before every answer is visible.",
  },
  {
    basePath: "media/damon/damon-photographing-athlete",
    widths: [640, 1000, 1500],
    alt: "Damon photographing an athlete during an outdoor creative session.",
    label: "Build the craft through preparation.",
  },
] as const;

export function MotionStory() {
  const [activeFrame, setActiveFrame] = useState(0);
  const frame = storyFrames[activeFrame];

  return (
    <section
      id="story"
      className="motion-story section section--dark"
      aria-labelledby="motion-story-title"
    >
      <div className="motion-story__texture" aria-hidden="true" />
      <div className="motion-story__heading">
        <p className="section-label">An authentic visual story</p>
        <h2 id="motion-story-title" className="display display--section">
          From behind the lens to the front of the room.
        </h2>
        <p>
          This sequence uses DTV photography, typography, and camera
          imagery. It does not present any frame as documentation of a
          speaking engagement.
        </p>
      </div>
      <div className="motion-story__stage frame" aria-live="polite">
        <ResponsiveImage
          key={frame.basePath}
          basePath={frame.basePath}
          widths={[...frame.widths]}
          alt={frame.alt}
          className="motion-story__image"
          sizes="(max-width: 767px) 100vw, 70vw"
        />
        <p className="motion-story__statement">{frame.label}</p>
      </div>
      <div className="motion-story__controls">
        {storyFrames.map((item, index) => (
          <button
            type="button"
            key={item.basePath}
            className={
              index === activeFrame
                ? "story-control story-control--active"
                : "story-control"
            }
            onClick={() => setActiveFrame(index)}
            aria-pressed={index === activeFrame}
          >
            Frame {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
