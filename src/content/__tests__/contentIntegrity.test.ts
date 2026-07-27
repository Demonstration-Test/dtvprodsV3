import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const expectedPaths = [
  "/",
  "/about",
  "/speaking",
  "/speaking-topics",
  "/schools-colleges",
  "/athletes-teams",
  "/creatives-entrepreneurs",
  "/organizations",
  "/workshops",
  "/media",
  "/dtv-story",
  "/coaching",
  "/faq",
  "/book-damon",
  "/privacy",
  "/thank-you",
];

async function loadContent() {
  const moduleUrl = pathToFileURL(
    resolve("src/content/siteContent.ts"),
  ).href;

  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    siteContent: {
      routes: [],
      audiences: [],
      speakingThemes: [],
      faqs: [],
      formOptions: {},
      contact: {},
      externalLinks: {},
    },
  }));
}

describe("approved content model", () => {
  it("contains the complete route set with unique metadata and H1 copy", async () => {
    const { siteContent } = await loadContent();
    const paths = siteContent.routes.map(
      (route: { path: string }) => route.path,
    );

    expect(paths).toEqual(expectedPaths);
    expect(
      new Set(
        siteContent.routes.map((route: { title: string }) => route.title),
      ).size,
    ).toBe(expectedPaths.length);
    expect(
      new Set(
        siteContent.routes.map(
          (route: { description: string }) => route.description,
        ),
      ).size,
    ).toBe(expectedPaths.length);
    expect(
      siteContent.routes.every(
        (route: { h1: string; canonicalPath: string }) =>
          route.h1.length > 0 && route.canonicalPath.endsWith("/"),
      ),
    ).toBe(true);
  });

  it("keeps audience and theme identifiers unique", async () => {
    const { siteContent } = await loadContent();
    const audienceIds = siteContent.audiences.map(
      (audience: { id: string }) => audience.id,
    );
    const themeIds = siteContent.speakingThemes.map(
      (theme: { id: string }) => theme.id,
    );

    expect(new Set(audienceIds).size).toBe(4);
    expect(new Set(themeIds).size).toBe(7);
  });

  it("uses only approved contact details and external destinations", async () => {
    const { siteContent } = await loadContent();

    expect(siteContent.contact).toEqual({
      email: "Bookings@dtvprods.com",
      phoneDisplay: "862-846-8626",
      phoneHref: "tel:+18628468626",
      location: "North Jersey",
    });
    expect(siteContent.externalLinks).toMatchObject({
      dtvProductions: "https://www.dtvprods.com/",
      coaching: "https://www.dtvprods.com/service-page/1on1-coaching",
    });
  });

  it("matches every approved select option exactly", async () => {
    const { siteContent } = await loadContent();

    expect(siteContent.formOptions.eventTypes).toEqual([
      "School or college program",
      "Athletic team or sports program",
      "Conference or organizational event",
      "Creative entrepreneurship workshop",
      "Panel discussion",
      "Podcast, interview, or media appearance",
      "Other",
    ]);
    expect(siteContent.formOptions.audiences).toEqual([
      "Schools and colleges",
      "Athletes and teams",
      "Creatives and entrepreneurs",
      "Organizations and brands",
      "Mixed audience",
      "Other",
    ]);
  });

  it("contains visible FAQ answers without banned proof claims", async () => {
    const { siteContent } = await loadContent();
    const serialized = JSON.stringify(siteContent).toLowerCase();

    expect(siteContent.faqs.length).toBeGreaterThanOrEqual(10);
    expect(
      siteContent.faqs.every(
        (faq: { question: string; answer: string }) =>
          faq.question.length > 0 && faq.answer.length > 0,
      ),
    ).toBe(true);
    expect(serialized).not.toContain("testimonial");
    expect(serialized).not.toContain("guaranteed outcome");
    expect(serialized).not.toContain("client logo");
    expect(serialized).not.toContain("award-winning");
  });
});
