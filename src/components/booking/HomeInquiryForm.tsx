import { cloneElement, useState, type ReactElement } from "react";
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

type ReviewState = ReturnType<typeof prepareInquiryDelivery> | null;

export function HomeInquiryForm() {
  const [review, setReview] = useState<ReviewState>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<HomeInquiryValues>({ defaultValues: emptyValues });

  const onSubmit = (values: HomeInquiryValues) => {
    const result = validateHomeInquiry(values);
    if (!result.success) {
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as keyof HomeInquiryValues, { message });
      });
      trackAnalytics("inquiry_validation_error", {
        route: "/",
        form: "short",
      });
      return;
    }

    const delivery = prepareInquiryDelivery(result.data);
    setReview(delivery);
    trackAnalytics("inquiry_reviewed", {
      route: "/",
      form: "short",
      mode: delivery.mode,
    });
  };

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
    <section className="inquiry section section--light">
      <div className="inquiry__heading">
        <p className="section-label">Inquire</p>
        <h2 className="display display--section">
          Start with the room.
        </h2>
        <p className="body-large">
          Tell Damon about the audience, date, and outcome you have in
          mind.
        </p>
      </div>
      <form
        className="inquiry-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
            rows={5}
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
        {!review ? (
          <div className="form-disclosure">
            <InfoIcon />
            <p>{inquiryCopy.preActionDisclosure}</p>
          </div>
        ) : null}
        <div className="inquiry-form__actions">
          <button className="action-link action-link--primary" type="submit">
            <span>Review inquiry</span>
            <ArrowRightIcon className="action-link__icon" />
          </button>
          <Link className="action-link action-link--text" to="/book-damon">
            <span>Open the full booking form</span>
            <ArrowRightIcon className="action-link__icon" />
          </Link>
        </div>
      </form>

      {review ? (
        <div className="inquiry-review" role="region">
          <p className="section-label">Prepared locally</p>
          <h3>Review your inquiry</h3>
          <pre>{review.summary}</pre>
          <p>
            This static website cannot send it for you. You must send
            the prepared message from your email application.
          </p>
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
            <>
              <p>{inquiryCopy.longSummaryFallback}</p>
              <button
                type="button"
                className="action-link action-link--primary"
                onClick={copySummary}
              >
                <span>Copy inquiry summary</span>
                <ArrowRightIcon className="action-link__icon" />
              </button>
            </>
          )}
        </div>
      ) : null}
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
