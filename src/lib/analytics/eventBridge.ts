export const analyticsEventNames = [
  "navigation_selected",
  "motion_story_started",
  "motion_story_completed",
  "audience_selected",
  "speaking_theme_viewed",
  "workshop_link_selected",
  "coaching_link_selected",
  "dtv_link_selected",
  "inquiry_start",
  "inquiry_validation_error",
  "inquiry_reviewed",
  "inquiry_mailto_attempted",
  "inquiry_summary_copied",
  "inquiry_user_marked_sent",
] as const;

export type AnalyticsEventName =
  (typeof analyticsEventNames)[number];

const safeMetadataKeys = new Set([
  "route",
  "target",
  "audience",
  "theme",
  "form",
  "mode",
  "source",
]);

export type AnalyticsMetadata = Record<
  string,
  string | number | boolean | undefined
>;

export function createAnalyticsEvent(
  name: AnalyticsEventName,
  metadata: AnalyticsMetadata = {},
) {
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata).filter(
      ([key, value]) =>
        safeMetadataKeys.has(key) && value !== undefined,
    ),
  );

  return { name, metadata: safeMetadata };
}

export function trackAnalytics(
  name: AnalyticsEventName,
  metadata?: AnalyticsMetadata,
) {
  const detail = createAnalyticsEvent(name, metadata);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("dtv:analytics", { detail }),
    );
  }
  return detail;
}
