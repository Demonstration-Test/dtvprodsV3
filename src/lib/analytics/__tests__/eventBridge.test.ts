import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadAnalyticsModule() {
  const moduleUrl = pathToFileURL(
    resolve("src/lib/analytics/eventBridge.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    analyticsEventNames: [],
    createAnalyticsEvent: () => ({ name: "", metadata: {} }),
  }));
}

describe("first-party analytics bridge", () => {
  it("keeps inquiry delivery actions distinct", async () => {
    const { analyticsEventNames } = await loadAnalyticsModule();

    expect(analyticsEventNames).toEqual(
      expect.arrayContaining([
        "inquiry_mailto_attempted",
        "inquiry_summary_copied",
        "inquiry_user_marked_sent",
      ]),
    );
  });

  it("removes personal form values from event metadata", async () => {
    const { createAnalyticsEvent } = await loadAnalyticsModule();
    const event = createAnalyticsEvent("inquiry_start", {
      route: "/book-damon",
      form: "full",
      email: "organizer@example.com",
      phone: "555-555-5555",
      firstName: "Taylor",
      message: "Private organizer context",
    });

    expect(event).toEqual({
      name: "inquiry_start",
      metadata: {
        route: "/book-damon",
        form: "full",
      },
    });
  });
});
