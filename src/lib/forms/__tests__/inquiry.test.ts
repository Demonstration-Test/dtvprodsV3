import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadInquiryModule() {
  const moduleUrl = pathToFileURL(
    resolve("src/lib/forms/inquiry.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    validateHomeInquiry: () => ({
      success: false,
      errors: { module: "missing" },
    }),
    prepareInquiryDelivery: () => ({
      mode: "missing",
      summary: "",
      mailto: "",
    }),
  }));
}

const validHomeInquiry = {
  firstName: "Taylor",
  lastName: "Morgan",
  workEmail: "taylor@example.org",
  organization: "North Star Academy",
  eventType: "School or college program",
  preferredDate: "2026-10-10",
  shortMessage:
    "We are planning a student leadership program focused on purposeful action.",
  consent: true,
};

const localCurrentDate = new Date(2026, 6, 27, 12);

describe("inquiry validation and delivery", () => {
  it("accepts the approved short inquiry shape", async () => {
    const { validateHomeInquiry } = await loadInquiryModule();
    expect(
      validateHomeInquiry(validHomeInquiry, localCurrentDate),
    ).toMatchObject({ success: true });
  });

  it("rejects a past date, short message, and missing consent", async () => {
    const { validateHomeInquiry } = await loadInquiryModule();
    const result = validateHomeInquiry(
      {
        ...validHomeInquiry,
        preferredDate: "2026-07-26",
        shortMessage: "Too short",
        consent: false,
      },
      localCurrentDate,
    );

    expect(result.success).toBe(false);
    expect(result.errors).toMatchObject({
      preferredDate: expect.any(String),
      shortMessage: expect.any(String),
      consent: expect.any(String),
    });
  });

  it("creates a mail draft only when the encoded URI is reliable", async () => {
    const { prepareInquiryDelivery } = await loadInquiryModule();
    const delivery = prepareInquiryDelivery(validHomeInquiry);

    expect(delivery.mode).toBe("mailto");
    expect(delivery.mailto.length).toBeLessThanOrEqual(1800);
    expect(delivery.mailto).toContain("mailto:Bookings@dtvprods.com");
    expect(delivery.summary).toContain("North Star Academy");
  });

  it("uses the copy fallback for a long encoded inquiry", async () => {
    const { prepareInquiryDelivery } = await loadInquiryModule();
    const delivery = prepareInquiryDelivery({
      ...validHomeInquiry,
      shortMessage: "A".repeat(1700),
    });

    expect(delivery.mode).toBe("copy");
    expect(delivery.mailto).toBe("");
    expect(delivery.summary.length).toBeGreaterThan(1700);
  });
});
