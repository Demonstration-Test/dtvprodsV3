import {
  cloneElement,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { formOptions, inquiryCopy } from "../../content/forms";
import {
  prepareInquiryDelivery,
  validateHomeInquiry,
  type HomeInquiryValues,
} from "../../lib/forms/inquiry";
import { trackAnalytics } from "../../lib/analytics/eventBridge";
import { ArrowRightIcon, InfoIcon } from "../ui/Icons";

const emptyValues: HomeInquiryValues = {
  firstName: "",
  lastName: "",
  workEmail: "",
  organization: "",
  eventType: "",
  preferredDate: "",
  shortMessage: "",
  consent: false,
};

const contactFields: Array<keyof HomeInquiryValues> = [
  "firstName",
  "lastName",
  "workEmail",
  "organization",
];

const eventFields: Array<keyof HomeInquiryValues> = [
  "eventType",
  "preferredDate",
  "shortMessage",
  "consent",
];

const steps = [
  { id: "contact", label: "Contact" },
  { id: "event", label: "Event" },
  { id: "review", label: "Review" },
] as const;

type InquiryStep = (typeof steps)[number]["id"];
type ReviewState = ReturnType<typeof prepareInquiryDelivery> | null;

export function HomeInquiryForm() {
  const [step, setStep] = useState<InquiryStep>("contact");
  const [review, setReview] = useState<ReviewState>(null);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const previousStepRef = useRef<InquiryStep>(step);
  const contactHeadingRef = useRef<HTMLHeadingElement>(null);
  const eventHeadingRef = useRef<HTMLHeadingElement>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm<HomeInquiryValues>({ defaultValues: emptyValues });

  useEffect(() => {
    if (previousStepRef.current === step) {
      return;
    }
    previousStepRef.current = step;
    const heading = {
      contact: contactHeadingRef.current,
      event: eventHeadingRef.current,
      review: reviewHeadingRef.current,
    }[step];
    heading?.focus();
  }, [step]);

  function validateFields(fields: Array<keyof HomeInquiryValues>) {
    clearErrors(fields);
    const result = validateHomeInquiry(getValues());
    if (result.success) {
      setValidationMessages([]);
      return { success: true as const, data: result.data };
    }

    const fieldErrors = fields.flatMap((field) => {
      const message = result.errors[field];
      if (!message) {
        return [];
      }
      setError(field, { message });
      return [{ field, message }];
    });

    if (fieldErrors.length === 0) {
      setValidationMessages([]);
      return { success: true as const, data: getValues() };
    }

    setValidationMessages(fieldErrors.map(({ message }) => message));
    setFocus(fieldErrors[0].field);
    trackAnalytics("inquiry_validation_error", {
      route: "/",
      form: "short",
      step,
    });
    return { success: false as const };
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === "contact") {
      const result = validateFields(contactFields);
      if (result.success) {
        setStep("event");
      }
      return;
    }

    if (step === "event") {
      const result = validateFields(eventFields);
      if (!result.success) {
        return;
      }
      const delivery = prepareInquiryDelivery(result.data);
      setReview(delivery);
      setStep("review");
      trackAnalytics("inquiry_reviewed", {
        route: "/",
        form: "short",
        mode: delivery.mode,
      });
    }
  }

  function returnTo(target: "contact" | "event") {
    setValidationMessages([]);
    setReview(null);
    setStep(target);
  }

  const openDraft = () => {
    if (!review || review.mode !== "mailto") {
      return;
    }
    trackAnalytics("inquiry_mailto_attempted", {
      route: "/",
      form: "short",
    });
    window.location.assign(review.mailto);
  };

  const copySummary = async () => {
    if (!review) {
      return;
    }
    await navigator.clipboard.writeText(review.summary);
    trackAnalytics("inquiry_summary_copied", {
      route: "/",
      form: "short",
    });
  };

  return (
    <section
      id="inquire"
      data-home-chapter
      className="inquiry home-chapter section section--light"
      aria-labelledby="inquiry-title"
    >
      <div className="inquiry__heading">
        <p className="section-label">Inquire</p>
        <h2 id="inquiry-title" className="display display--section">
          Start with the room.
        </h2>
        <p className="body-large">
          Tell Damon about the audience, date, and outcome you have in
          mind.
        </p>
        <ol className="inquiry__progress" aria-label="Inquiry progress">
          {steps.map((item, index) => (
            <li
              key={item.id}
              aria-current={step === item.id ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </li>
          ))}
        </ol>
      </div>

      <form
        className="inquiry-form"
        onSubmit={handleFormSubmit}
        noValidate
      >
        {validationMessages.length > 0 ? (
          <div
            className="inquiry-form__error-summary"
            role="alert"
            aria-label="Validation summary"
          >
            <strong>Check this step before continuing.</strong>
            <ul>
              {validationMessages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {step === "contact" ? (
          <div className="inquiry-form__step">
            <div className="inquiry-form__step-heading">
              <span className="camera-meta">Step 01 / 03</span>
              <h3 ref={contactHeadingRef} tabIndex={-1}>
                Contact details
              </h3>
            </div>
            <div className="inquiry-form__fields">
              <FormField
                label="First name"
                error={errors.firstName?.message}
              >
                <input
                  type="text"
                  autoComplete="given-name"
                  {...register("firstName")}
                />
              </FormField>
              <FormField
                label="Last name"
                error={errors.lastName?.message}
              >
                <input
                  type="text"
                  autoComplete="family-name"
                  {...register("lastName")}
                />
              </FormField>
              <FormField
                label="Work email"
                error={errors.workEmail?.message}
              >
                <input
                  type="email"
                  autoComplete="email"
                  {...register("workEmail")}
                />
              </FormField>
              <FormField
                label="Organization"
                error={errors.organization?.message}
              >
                <input
                  type="text"
                  autoComplete="organization"
                  {...register("organization")}
                />
              </FormField>
            </div>
            <div className="inquiry-form__actions">
              <button
                className="action-link action-link--primary"
                type="submit"
              >
                <span>Continue to Event</span>
                <ArrowRightIcon className="action-link__icon" />
              </button>
            </div>
          </div>
        ) : null}

        {step === "event" ? (
          <div className="inquiry-form__step">
            <div className="inquiry-form__step-heading">
              <span className="camera-meta">Step 02 / 03</span>
              <h3 ref={eventHeadingRef} tabIndex={-1}>
                Event details
              </h3>
            </div>
            <div className="inquiry-form__fields">
              <FormField
                label="Event type"
                error={errors.eventType?.message}
              >
                <select {...register("eventType")}>
                  <option value="">Select event type</option>
                  {formOptions.eventTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField
                label="Preferred date"
                error={errors.preferredDate?.message}
              >
                <input type="date" {...register("preferredDate")} />
              </FormField>
              <FormField
                label="Short message"
                error={errors.shortMessage?.message}
                wide
              >
                <textarea
                  rows={4}
                  placeholder="Tell Damon about the audience, goals, and desired outcome."
                  {...register("shortMessage")}
                />
              </FormField>
              <div className="form-field form-field--wide form-consent">
                <label>
                  <input type="checkbox" {...register("consent")} />
                  <span>{inquiryCopy.consent}</span>
                </label>
                {errors.consent?.message ? (
                  <p role="alert" className="field-error">
                    {errors.consent.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="form-disclosure">
              <InfoIcon />
              <p>{inquiryCopy.preActionDisclosure}</p>
            </div>
            <div className="inquiry-form__actions">
              <button
                className="action-link action-link--text"
                type="button"
                onClick={() => returnTo("contact")}
              >
                Back to Contact
              </button>
              <button
                className="action-link action-link--primary"
                type="submit"
              >
                <span>Review inquiry</span>
                <ArrowRightIcon className="action-link__icon" />
              </button>
            </div>
          </div>
        ) : null}

        {step === "review" && review ? (
          <div className="inquiry-review" role="region">
            <p className="section-label">Prepared locally</p>
            <h3 ref={reviewHeadingRef} tabIndex={-1}>
              Review your inquiry
            </h3>
            <pre>{review.summary}</pre>
            <p>
              This static website cannot send it for you. You must send
              the prepared message from your email application.
            </p>
            <div className="inquiry-review__actions">
              {review.mode === "mailto" ? (
                <button
                  type="button"
                  className="action-link action-link--primary"
                  onClick={openDraft}
                >
                  <span>Open email draft</span>
                  <ArrowRightIcon className="action-link__icon" />
                </button>
              ) : (
                <button
                  type="button"
                  className="action-link action-link--primary"
                  onClick={copySummary}
                >
                  <span>Copy inquiry summary</span>
                  <ArrowRightIcon className="action-link__icon" />
                </button>
              )}
              <button
                type="button"
                className="action-link action-link--text"
                onClick={() => returnTo("event")}
              >
                Edit event details
              </button>
              <button
                type="button"
                className="action-link action-link--text"
                onClick={() => returnTo("contact")}
              >
                Edit contact details
              </button>
            </div>
            {review.mode === "copy" ? (
              <p>{inquiryCopy.longSummaryFallback}</p>
            ) : null}
          </div>
        ) : null}

        <div className="inquiry-form__full-link">
          <Link className="action-link action-link--text" to="/book-damon">
            <span>Open the full booking form</span>
            <ArrowRightIcon className="action-link__icon" />
          </Link>
        </div>
      </form>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  children: ReactElement;
  error?: string;
  wide?: boolean;
};

function FormField({
  label,
  children,
  error,
  wide = false,
}: FormFieldProps) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  const errorId = `${id}-error`;
  return (
    <div
      className={`form-field${wide ? " form-field--wide" : ""}`}
    >
      <label htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {cloneField(children, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function cloneField(
  element: ReactElement,
  props: Record<string, unknown>,
) {
  return cloneElement(element, props);
}
