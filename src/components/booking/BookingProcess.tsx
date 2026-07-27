import { bookingSteps } from "../../content/siteContent";
import { ActionLink } from "../ui/ActionLink";

export function BookingProcess() {
  return (
    <section className="booking-process section section--dark">
      <p className="section-label">Booking process</p>
      <h2 className="display display--section">
        How the room comes together.
      </h2>
      <ol className="booking-process__steps">
        {bookingSteps.map((step) => (
          <li key={step.index}>
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
      <ActionLink to="/book-damon" variant="primary">
        Start an inquiry
      </ActionLink>
    </section>
  );
}
