import { useMemo, useState } from "react";
import {
  useForm,
  type FieldErrors,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { formOptions, inquiryCopy } from "../../content/forms";
import { trackAnalytics } from "../../lib/analytics/eventBridge";
import {
  prepareFullInquiryDelivery,
  validateFullInquiry,
  type FullInquiryValues,
} from "../../lib/forms/inquiry";
import { ArrowRightIcon, InfoIcon } from "../ui/Icons";

const emptyValues: FullInquiryValues = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phone: "",
  organization: "",
  roleTitle: "",
  eventType: "",
  audienceType: "",
  preferredDate: "",
  alternateDate: "",
  eventLocation: "",
  deliveryFormat: "",
  audienceSize: "",
  requestedFormat: "",
  programLength: "",
  eventObjectives: "",
  audienceChallenges: "",
  budgetRange: "",
  travelExpectations: "",
  referralSource: "",
  additionalInformation: "",
  consent: false,
};

type ReviewState = ReturnType<typeof prepareFullInquiryDelivery> | null;

function todayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function FullInquiryForm() {
  const [review, setReview] = useState<ReviewState>(null);
  const [copied, setCopied] = useState(false);
  const minimumDate = useMemo(todayIso, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FullInquiryValues>({ defaultValues: emptyValues });

  const onSubmit = (values: FullInquiryValues) => {
    const result = validateFullInquiry(values);
    if (!result.success) {
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as Path<FullInquiryValues>, { message });
      });
      trackAnalytics("inquiry_validation_error", {
        route: "/book-damon",
        form: "full",
      });
      return;
    }

    const delivery = prepareFullInquiryDelivery(result.data);
    setReview(delivery);
    setCopied(false);
    trackAnalytics("inquiry_reviewed", {
      route: "/book-damon",
      form: "full",
      mode: delivery.mode,
    });
  };

  const openDraft = () => {
    if (!review || review.mode !== "mailto") return;
    trackAnalytics("inquiry_mailto_attempted", {
      route: "/book-damon",
      form: "full",
    });
    window.location.assign(review.mailto);
  };

  const copySummary = async () => {
    if (!review) return;
    await navigator.clipboard.writeText(review.summary);
    setCopied(true);
    trackAnalytics("inquiry_summary_copied", {
      route: "/book-damon",
      form: "full",
    });
  };

  return (
    <section className="full-inquiry section section--light">
      <div className="full-inquiry__intro">
        <p className="section-label">Detailed inquiry builder</p>
        <h2 className="display display--section">
          Give the room a clear beginning.
        </h2>
        <p className="body-large">
          Share the event, audience, format, and desired outcome. Your
          entries stay on this device until you choose to open or copy
          the prepared email.
        </p>
      </div>

      <form
        className="full-inquiry__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGroup
          index="01"
          title="Contact"
          description="Who should Damon or his team follow up with?"
        >
          <InputField
            name="firstName"
            label="First name"
            register={register}
            errors={errors}
            autoComplete="given-name"
          />
          <InputField
            name="lastName"
            label="Last name"
            register={register}
            errors={errors}
            autoComplete="family-name"
          />
          <InputField
            name="workEmail"
            label="Work email"
            type="email"
            register={register}
            errors={errors}
            autoComplete="email"
          />
          <InputField
            name="phone"
            label="Phone"
            type="tel"
            register={register}
            errors={errors}
            autoComplete="tel"
          />
          <InputField
            name="organization"
            label="Organization"
            register={register}
            errors={errors}
            autoComplete="organization"
          />
          <InputField
            name="roleTitle"
            label="Role or title"
            register={register}
            errors={errors}
            autoComplete="organization-title"
          />
        </FormGroup>

        <FormGroup
          index="02"
          title="Event"
          description="Define the moment, location, and audience."
        >
          <SelectField
            name="eventType"
            label="Event type"
            placeholder="Select event type"
            options={formOptions.eventTypes}
            register={register}
            errors={errors}
          />
          <SelectField
            name="audienceType"
            label="Audience type"
            placeholder="Select audience"
            options={formOptions.audiences}
            register={register}
            errors={errors}
          />
          <InputField
            name="preferredDate"
            label="Preferred date"
            type="date"
            min={minimumDate}
            register={register}
            errors={errors}
          />
          <InputField
            name="alternateDate"
            label="Alternate date"
            type="date"
            min={minimumDate}
            optional
            register={register}
            errors={errors}
          />
          <InputField
            name="eventLocation"
            label="Event location"
            register={register}
            errors={errors}
            placeholder="City, state, venue, or virtual"
            wide
          />
          <SelectField
            name="deliveryFormat"
            label="Delivery format"
            placeholder="Select delivery format"
            options={formOptions.deliveryFormats}
            register={register}
            errors={errors}
          />
          <SelectField
            name="audienceSize"
            label="Estimated audience size"
            placeholder="Select audience size"
            options={formOptions.audienceSizes}
            register={register}
            errors={errors}
          />
        </FormGroup>

        <FormGroup
          index="03"
          title="Experience"
          description="Clarify the format and what the room needs."
        >
          <SelectField
            name="requestedFormat"
            label="Requested format"
            placeholder="Select requested format"
            options={formOptions.requestedFormats}
            register={register}
            errors={errors}
          />
          <SelectField
            name="programLength"
            label="Desired program length"
            placeholder="Select program length"
            options={formOptions.programLengths}
            register={register}
            errors={errors}
          />
          <TextAreaField
            name="eventObjectives"
            label="Event objectives"
            register={register}
            errors={errors}
            placeholder="What should this experience help the audience understand or do?"
          />
          <TextAreaField
            name="audienceChallenges"
            label="Primary audience challenges"
            register={register}
            errors={errors}
            placeholder="What tension, transition, or opportunity is the audience navigating?"
          />
          <SelectField
            name="budgetRange"
            label="Budget range"
            placeholder="Optional budget context"
            options={formOptions.budgetRanges}
            register={register}
            errors={errors}
            optional
          />
          <TextAreaField
            name="travelExpectations"
            label="Travel expectations"
            register={register}
            errors={errors}
            placeholder="Optional travel, lodging, or schedule context"
            optional
          />
          <SelectField
            name="referralSource"
            label="How did you hear about Damon?"
            placeholder="Select referral source"
            options={formOptions.referrals}
            register={register}
            errors={errors}
          />
          <TextAreaField
            name="additionalInformation"
            label="Additional information"
            register={register}
            errors={errors}
            placeholder="Optional production, accessibility, recording, or planning details"
            optional
          />
        </FormGroup>

        <div className="form-consent full-inquiry__consent">
          <label>
            <input type="checkbox" {...register("consent")} />
            <span>{inquiryCopy.consent}</span>
          </label>
          <FieldError message={errors.consent?.message} id="consent-error" />
        </div>

        {!review ? (
          <div className="form-disclosure">
            <InfoIcon />
            <p>{inquiryCopy.preActionDisclosure}</p>
          </div>
        ) : null}

        <button
          type="submit"
          className="action-link action-link--primary full-inquiry__submit"
        >
          <span>Review detailed inquiry</span>
          <ArrowRightIcon className="action-link__icon" />
        </button>
      </form>

      {review ? (
        <div
          className="inquiry-review full-inquiry__review"
          role="region"
          aria-labelledby="full-inquiry-review-title"
        >
          <p className="section-label">Prepared locally</p>
          <h2 id="full-inquiry-review-title">Review your inquiry</h2>
          <pre>{review.summary}</pre>
          <p>
            This website has not sent or stored your inquiry. Continue
            through your own email application, then return here to
            finish.
          </p>
          {review.mode === "copy" ? (
            <p>{inquiryCopy.longSummaryFallback}</p>
          ) : null}
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
            ) : null}
            <button
              type="button"
              className="action-link action-link--outline"
              onClick={copySummary}
            >
              <span>{copied ? "Inquiry copied" : "Copy inquiry summary"}</span>
              <ArrowRightIcon className="action-link__icon" />
            </button>
            <Link
              className="action-link action-link--text"
              to="/thank-you"
            >
              <span>I sent my email</span>
              <ArrowRightIcon className="action-link__icon" />
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}

type FieldProps = {
  name: Path<FullInquiryValues>;
  label: string;
  register: UseFormRegister<FullInquiryValues>;
  errors: FieldErrors<FullInquiryValues>;
  optional?: boolean;
  wide?: boolean;
};

type InputFieldProps = FieldProps & {
  type?: "text" | "email" | "tel" | "date";
  autoComplete?: string;
  placeholder?: string;
  min?: string;
};

function InputField({
  name,
  label,
  register,
  errors,
  optional = false,
  wide = false,
  type = "text",
  ...inputProps
}: InputFieldProps) {
  const id = `full-${name}`;
  const message = errors[name]?.message;
  return (
    <div className={`form-field${wide ? " form-field--wide" : ""}`}>
      <FieldLabel id={id} label={label} optional={optional} />
      <input
        id={id}
        type={type}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${id}-error` : undefined}
        {...inputProps}
        {...register(name)}
      />
      <FieldError message={message} id={`${id}-error`} />
    </div>
  );
}

type SelectFieldProps = FieldProps & {
  placeholder: string;
  options: readonly string[];
};

function SelectField({
  name,
  label,
  placeholder,
  options,
  register,
  errors,
  optional = false,
}: SelectFieldProps) {
  const id = `full-${name}`;
  const message = errors[name]?.message;
  return (
    <div className="form-field">
      <FieldLabel id={id} label={label} optional={optional} />
      <select
        id={id}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${id}-error` : undefined}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={message} id={`${id}-error`} />
    </div>
  );
}

type TextAreaFieldProps = FieldProps & {
  placeholder?: string;
};

function TextAreaField({
  name,
  label,
  register,
  errors,
  optional = false,
  placeholder,
}: TextAreaFieldProps) {
  const id = `full-${name}`;
  const message = errors[name]?.message;
  return (
    <div className="form-field form-field--wide">
      <FieldLabel id={id} label={label} optional={optional} />
      <textarea
        id={id}
        rows={5}
        placeholder={placeholder}
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? `${id}-error` : undefined}
        {...register(name)}
      />
      <FieldError message={message} id={`${id}-error`} />
    </div>
  );
}

function FieldLabel({
  id,
  label,
  optional,
}: {
  id: string;
  label: string;
  optional: boolean;
}) {
  return (
    <label htmlFor={id}>
      {label}{" "}
      {optional ? (
        <span className="field-optional">Optional</span>
      ) : (
        <span aria-hidden="true">*</span>
      )}
    </label>
  );
}

function FieldError({
  message,
  id,
}: {
  message: unknown;
  id: string;
}) {
  return typeof message === "string" ? (
    <p id={id} role="alert" className="field-error">
      {message}
    </p>
  ) : null;
}

function FormGroup({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="form-group">
      <legend>
        <span className="camera-meta">{index}</span>
        <strong>{title}</strong>
      </legend>
      <p>{description}</p>
      <div className="form-group__fields">{children}</div>
    </fieldset>
  );
}
