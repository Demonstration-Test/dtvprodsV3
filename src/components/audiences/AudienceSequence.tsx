import { useState } from "react";
import { audiences } from "../../content/audiences";
import { assetUrl } from "../../lib/assets";
import { ActionLink } from "../ui/ActionLink";

const imageNames: Record<string, string> = {
  "schools-colleges": "audience-schools",
  "athletes-teams": "audience-athletes",
  "creatives-entrepreneurs": "audience-creatives",
  "organizations-brands": "audience-organizations",
};

export function AudienceSequence() {
  const [activeId, setActiveId] = useState(audiences[0].id);
  const active =
    audiences.find((audience) => audience.id === activeId) ??
    audiences[0];

  return (
    <section
      id="audiences"
      data-home-chapter
      className="audiences home-chapter section section--dark"
      aria-labelledby="audience-title"
    >
      <div className="audiences__intro">
        <p className="section-label">Audience pathways</p>
        <h2 id="audience-title" className="display display--section">
          Who is in the frame?
        </h2>
        <p className="body-large">
          Four pathways. One shared decision: move with intention.
        </p>
      </div>
      <div className="audiences__focus frame">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={assetUrl(
              `media/portfolio/${imageNames[active.id]}-mobile-720x900.avif`,
            )}
            type="image/avif"
          />
          <source
            srcSet={assetUrl(
              `media/portfolio/${imageNames[active.id]}-1200x800.avif`,
            )}
            type="image/avif"
          />
          <img
            src={assetUrl(
              `media/portfolio/${imageNames[active.id]}-1200x800.webp`,
            )}
            alt=""
            className="audiences__focus-image"
          />
        </picture>
        <div className="audiences__focus-copy" aria-live="polite">
          <span className="audiences__index">{active.index}</span>
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
          <ActionLink to={active.to}>{active.action}</ActionLink>
        </div>
      </div>
      <div className="audiences__tabs">
        {audiences.map((audience) => (
          <button
            type="button"
            className={
              audience.id === active.id
                ? "audience-tab audience-tab--active"
                : "audience-tab"
            }
            key={audience.id}
            onClick={() => setActiveId(audience.id)}
            aria-pressed={audience.id === active.id}
          >
            <span>{audience.index}</span>
            <strong>{audience.title}</strong>
          </button>
        ))}
      </div>
      <p className="audiences__disclosure">
        Audience imagery represents DTV visual work and pathway themes,
        not documented speaking engagements.
      </p>
    </section>
  );
}
