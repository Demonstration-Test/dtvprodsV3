import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { faqs } from "../../content/faqs";
import { bookingSteps } from "../../content/siteContent";
import { ActionLink } from "../ui/ActionLink";
import { PlusIcon } from "../ui/Icons";

const tabs = [
  { id: "booking", label: "Booking Process" },
  { id: "faq", label: "Organizer FAQ" },
] as const;

const previewIds = [
  "audiences",
  "topics",
  "workshops",
  "travel",
  "speaker-reel",
];

const previewFaqs = previewIds.flatMap((id) => {
  const faq = faqs.find((item) => item.id === id);
  return faq ? [faq] : [];
});

export function PlanTheRoom() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("booking");
  const [openFaqIds, setOpenFaqIds] = useState(() => new Set(["audiences"]));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectTab(index: number, moveFocus = false) {
    setActiveTab(tabs[index].id);
    if (moveFocus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleTabKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    selectTab(nextIndex, true);
  }

  function toggleFaq(id: string) {
    setOpenFaqIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section
      id="plan"
      data-home-chapter
      className="plan-room home-chapter section section--dark"
      aria-labelledby="plan-room-title"
    >
      <div className="plan-room__intro">
        <p className="section-label">Plan the room</p>
        <h2 id="plan-room-title" className="display display--section">
          How the room comes together.
        </h2>
      </div>

      <div className="plan-room__tabs" role="tablist" aria-label="Planning">
        {tabs.map((tab, index) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`plan-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-label={tab.label}
              aria-selected={selected}
              aria-controls={`plan-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className="camera-meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{tab.label}</strong>
            </button>
          );
        })}
      </div>

      <div
        id="plan-panel-booking"
        className="plan-room__panel"
        role="tabpanel"
        aria-labelledby="plan-tab-booking"
        hidden={activeTab !== "booking"}
      >
        <ol className="plan-room__steps">
          {bookingSteps.map((step) => (
            <li key={step.index}>
              <span className="camera-meta">{step.index}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
        <ActionLink to="/book-damon" variant="primary">
          Start an inquiry
        </ActionLink>
      </div>

      <div
        id="plan-panel-faq"
        className="plan-room__panel plan-room__panel--faq"
        role="tabpanel"
        aria-labelledby="plan-tab-faq"
        hidden={activeTab !== "faq"}
      >
        <div className="plan-room__faq-list">
          {previewFaqs.map((faq) => {
            const expanded = openFaqIds.has(faq.id);
            const panelId = `plan-faq-panel-${faq.id}`;
            return (
              <div className="faq-item" key={faq.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
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
      </div>
    </section>
  );
}
