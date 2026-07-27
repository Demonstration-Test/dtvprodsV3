import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

async function loadInquiryModule() {
  const moduleUrl = pathToFileURL(
    resolve("src/lib/forms/inquiry.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    validateFullInquiry: () => ({
      success: false,
      errors: { module: "missing" },
    }),
    prepareFullInquiryDelivery: () => ({
      mode: "missing",
      summary: "",
      mailto: "",
    }),
  }));
}

const validFullInquiry = {
  firstName: "Taylor",
  lastName: "Morgan",
  workEmail: "taylor@example.org",
  phone: "(973) 555-0188",
  organization: "North Star Academy",
  roleTitle: "Director of Student Life",
  eventType: "School or college program",
  audienceType: "Schools and colleges",
  preferredDate: "2027-10-10",
  alternateDate: "2027-10-17",
  eventLocation: "Newark, New Jersey",
  deliveryFormat: "In person",
  audienceSize: "250–499",
  requestedFormat: "Keynote",
  programLength: "60 minutes",
  eventObjectives:
    "Help students connect personal vision with disciplined next steps.",
  audienceChallenges:
    "Students are navigating uncertainty and need practical language for acting with intention.",
  budgetRange: "Not sure or prefer to discuss",
  travelExpectations: "Local travel is expected.",
  referralSource: "Personal referral",
  additionalInformation:
    "The organizer can provide a projection screen and two wireless microphones.",
  consent: true,
};

const localCurrentDate = new Date(2026, 6, 27, 12);

describe("full inquiry validation and delivery", () => {
  it("accepts the approved detailed inquiry shape", async () => {
    const { validateFullInquiry } = await loadInquiryModule();

    expect(
      validateFullInquiry(validFullInquiry, localCurrentDate),
    ).toMatchObject({ success: true });
  });

  it("rejects an invalid phone, duplicate alternate date, and option drift", async () => {
    const { validateFullInquiry } = await loadInquiryModule();
    const result = validateFullInquiry(
      {
        ...validFullInquiry,
        phone: "123",
        alternateDate: validFullInquiry.preferredDate,
        deliveryFormat: "Teleportation",
      },
      localCurrentDate,
    );

    expect(result.success).toBe(false);
    expect(result.errors).toMatchObject({
      phone: expect.any(String),
      alternateDate: expect.any(String),
      deliveryFormat: expect.any(String),
    });
  });

  it("builds a reviewable summary without claiming it was sent", async () => {
    const { prepareFullInquiryDelivery } = await loadInquiryModule();
    const delivery = prepareFullInquiryDelivery(validFullInquiry);

    expect(delivery.summary).toContain("Director of Student Life");
    expect(delivery.summary).toContain("Audience size: 250–499");
    expect(delivery.summary).not.toMatch(/sent successfully/i);
    expect(["mailto", "copy"]).toContain(delivery.mode);
  });
});
