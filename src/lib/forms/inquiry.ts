import { z } from "zod";
import { formOptions } from "../../content/forms";

export type HomeInquiryValues = {
  firstName: string;
  lastName: string;
  workEmail: string;
  organization: string;
  eventType: string;
  preferredDate: string;
  shortMessage: string;
  consent: boolean;
};

export type FullInquiryValues = {
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  organization: string;
  roleTitle: string;
  eventType: string;
  audienceType: string;
  preferredDate: string;
  alternateDate: string;
  eventLocation: string;
  deliveryFormat: string;
  audienceSize: string;
  requestedFormat: string;
  programLength: string;
  eventObjectives: string;
  audienceChallenges: string;
  budgetRange: string;
  travelExpectations: string;
  referralSource: string;
  additionalInformation: string;
  consent: boolean;
};

export type ValidationResult<T> =
  | { success: true; data: T; errors: Record<string, never> }
  | { success: false; errors: Record<string, string> };

function localIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function homeInquirySchema(currentDate: Date) {
  const minimumDate = localIsoDate(currentDate);
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .max(80, "First name must be 80 characters or fewer."),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required.")
      .max(80, "Last name must be 80 characters or fewer."),
    workEmail: z
      .email("Enter a valid work email.")
      .max(254, "Work email must be 254 characters or fewer."),
    organization: z
      .string()
      .trim()
      .min(1, "Organization is required.")
      .max(120, "Organization must be 120 characters or fewer."),
    eventType: z
      .string()
      .refine(
        (value) =>
          formOptions.eventTypes.includes(
            value as (typeof formOptions.eventTypes)[number],
          ),
        "Select an approved event type.",
      ),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date.")
      .refine(
        (value) => value >= minimumDate,
        "Preferred date cannot be in the past.",
      ),
    shortMessage: z
      .string()
      .trim()
      .min(20, "Short message must be at least 20 characters.")
      .max(800, "Short message must be 800 characters or fewer."),
    consent: z.literal(true, {
      error: "Consent is required before reviewing the inquiry.",
    }),
  });
}

export function validateHomeInquiry(
  values: HomeInquiryValues,
  currentDate = new Date(),
): ValidationResult<HomeInquiryValues> {
  const parsed = homeInquirySchema(currentDate).safeParse(values);
  if (parsed.success) {
    return { success: true, data: parsed.data, errors: {} };
  }

  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { success: false, errors };
}

function approvedOption(
  options: readonly string[],
  message: string,
  optional = false,
) {
  return z
    .string()
    .refine(
      (value) => (optional && value === "") || options.includes(value),
      message,
    );
}

function fullInquirySchema(currentDate: Date) {
  const minimumDate = localIsoDate(currentDate);
  const requiredText = (label: string, maximum: number) =>
    z
      .string()
      .trim()
      .min(1, `${label} is required.`)
      .max(maximum, `${label} must be ${maximum} characters or fewer.`);
  const longText = (label: string) =>
    z
      .string()
      .trim()
      .min(20, `${label} must be at least 20 characters.`)
      .max(1000, `${label} must be 1,000 characters or fewer.`);
  const isoDate = (label: string) =>
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, `Choose ${label.toLowerCase()}.`)
      .refine(
        (value) => value >= minimumDate,
        `${label} cannot be in the past.`,
      );

  return z
    .object({
      firstName: requiredText("First name", 80),
      lastName: requiredText("Last name", 80),
      workEmail: z
        .email("Enter a valid work email.")
        .max(254, "Work email must be 254 characters or fewer."),
      phone: z
        .string()
        .trim()
        .refine(
          (value) => /^\+?[\d\s().-]+$/.test(value),
          "Enter a valid phone number.",
        )
        .refine((value) => {
          const digits = value.replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 20;
        }, "Phone must contain 7 to 20 digits."),
      organization: requiredText("Organization", 120),
      roleTitle: requiredText("Role or title", 120),
      eventType: approvedOption(
        formOptions.eventTypes,
        "Select an approved event type.",
      ),
      audienceType: approvedOption(
        formOptions.audiences,
        "Select an approved audience type.",
      ),
      preferredDate: isoDate("Preferred date"),
      alternateDate: z
        .string()
        .refine(
          (value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value),
          "Choose a valid alternate date.",
        )
        .refine(
          (value) => value === "" || value >= minimumDate,
          "Alternate date cannot be in the past.",
        ),
      eventLocation: z
        .string()
        .trim()
        .min(2, "Event location must be at least 2 characters.")
        .max(160, "Event location must be 160 characters or fewer."),
      deliveryFormat: approvedOption(
        formOptions.deliveryFormats,
        "Select an approved delivery format.",
      ),
      audienceSize: approvedOption(
        formOptions.audienceSizes,
        "Select an approved audience size.",
      ),
      requestedFormat: approvedOption(
        formOptions.requestedFormats,
        "Select an approved requested format.",
      ),
      programLength: approvedOption(
        formOptions.programLengths,
        "Select an approved program length.",
      ),
      eventObjectives: longText("Event objectives"),
      audienceChallenges: longText("Primary audience challenges"),
      budgetRange: approvedOption(
        formOptions.budgetRanges,
        "Select an approved budget range.",
        true,
      ),
      travelExpectations: z
        .string()
        .trim()
        .max(800, "Travel expectations must be 800 characters or fewer."),
      referralSource: approvedOption(
        formOptions.referrals,
        "Select an approved referral source.",
      ),
      additionalInformation: z
        .string()
        .trim()
        .max(
          1200,
          "Additional information must be 1,200 characters or fewer.",
        ),
      consent: z.literal(true, {
        error: "Consent is required before reviewing the inquiry.",
      }),
    })
    .superRefine((values, context) => {
      if (
        values.alternateDate &&
        values.alternateDate === values.preferredDate
      ) {
        context.addIssue({
          code: "custom",
          path: ["alternateDate"],
          message: "Alternate date must differ from the preferred date.",
        });
      }
    });
}

export function validateFullInquiry(
  values: FullInquiryValues,
  currentDate = new Date(),
): ValidationResult<FullInquiryValues> {
  const parsed = fullInquirySchema(currentDate).safeParse(values);
  if (parsed.success) {
    return { success: true, data: parsed.data, errors: {} };
  }

  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { success: false, errors };
}

const summaryLabels: Array<[keyof HomeInquiryValues, string]> = [
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["workEmail", "Work email"],
  ["organization", "Organization"],
  ["eventType", "Event type"],
  ["preferredDate", "Preferred date"],
  ["shortMessage", "Message"],
];

export function createInquirySummary(values: HomeInquiryValues) {
  const lines = [
    "Damon J. Young Jr. speaking inquiry",
    "",
    ...summaryLabels.map(
      ([key, label]) => `${label}: ${String(values[key])}`,
    ),
  ];
  return lines.join("\n");
}

export function prepareInquiryDelivery(values: HomeInquiryValues) {
  const summary = createInquirySummary(values);
  const subject = `Speaking inquiry — ${values.organization}`;
  const mailto =
    `mailto:Bookings@dtvprods.com?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(summary)}`;

  if (mailto.length > 1800) {
    return {
      mode: "copy" as const,
      summary,
      mailto: "",
    };
  }

  return {
    mode: "mailto" as const,
    summary,
    mailto,
  };
}

const fullSummaryLabels: Array<[keyof FullInquiryValues, string]> = [
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["workEmail", "Work email"],
  ["phone", "Phone"],
  ["organization", "Organization"],
  ["roleTitle", "Role or title"],
  ["eventType", "Event type"],
  ["audienceType", "Audience type"],
  ["preferredDate", "Preferred date"],
  ["alternateDate", "Alternate date"],
  ["eventLocation", "Event location"],
  ["deliveryFormat", "Delivery format"],
  ["audienceSize", "Audience size"],
  ["requestedFormat", "Requested format"],
  ["programLength", "Desired program length"],
  ["eventObjectives", "Event objectives"],
  ["audienceChallenges", "Primary audience challenges"],
  ["budgetRange", "Budget context"],
  ["travelExpectations", "Travel expectations"],
  ["referralSource", "How you heard about Damon"],
  ["additionalInformation", "Additional information"],
];

export function createFullInquirySummary(values: FullInquiryValues) {
  const lines = [
    "Damon J. Young Jr. detailed speaking inquiry",
    "",
    ...fullSummaryLabels
      .filter(([key]) => String(values[key]).trim() !== "")
      .map(([key, label]) => `${label}: ${String(values[key])}`),
  ];
  return lines.join("\n");
}

export function prepareFullInquiryDelivery(values: FullInquiryValues) {
  const summary = createFullInquirySummary(values);
  const subject = `Detailed speaking inquiry — ${values.organization}`;
  const mailto =
    `mailto:Bookings@dtvprods.com?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(summary)}`;

  if (mailto.length > 1800) {
    return {
      mode: "copy" as const,
      summary,
      mailto: "",
    };
  }

  return {
    mode: "mailto" as const,
    summary,
    mailto,
  };
}
