import { useState } from "react";
import { faqs } from "../../content/faqs";
import { ActionLink } from "../ui/ActionLink";
import { PlusIcon } from "../ui/Icons";

const previewFaqs = faqs.filter((faq) =>
  [
    "audiences",
    "topics",
    "workshops",
    "travel",
    "speaker-reel",
  ].includes(faq.id),
);

export function FaqPreview() {
  const [openId, setOpenId] = useState(previewFaqs[0].id);

  return (
    <section className="faq-preview section section--light">
      <p className="section-label">Organizer FAQ</p>
      <h2 className="display display--section">Before you book.</h2>
      <div className="faq-list">
        {previewFaqs.map((faq) => {
          const expanded = faq.id === openId;
          const panelId = `faq-panel-${faq.id}`;
          return (
            <div className="faq-item" key={faq.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenId(expanded ? "" : faq.id)}
                >
                  <span>{faq.question}</span>
                  <PlusIcon expanded={expanded} />
                </button>
              </h3>
              <div id={panelId} hidden={!expanded}>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ActionLink to="/faq">View all questions</ActionLink>
    </section>
  );
}
