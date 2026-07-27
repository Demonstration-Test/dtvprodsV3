import { readFileSync } from "node:fs";

describe("index no-JavaScript fallback", () => {
  it("keeps the essential identity, contact details, and routes available", () => {
    const html = readFileSync("index.html", "utf8");

    expect(html).toContain("<noscript>");
    expect(html).toContain("Damon J. Young Jr.");
    expect(html).toContain("Destined to Venture");
    expect(html).toContain("Bookings@dtvprods.com");
    expect(html).toContain("862-846-8626");

    for (const route of [
      "/dtvprodsV3/",
      "/dtvprodsV3/about/",
      "/dtvprodsV3/speaking-topics/",
      "/dtvprodsV3/media/",
      "/dtvprodsV3/faq/",
      "/dtvprodsV3/book-damon/",
    ]) {
      expect(html).toContain(`href="${route}"`);
    }
  });
});
