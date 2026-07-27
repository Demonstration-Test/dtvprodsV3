import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about/",
  "/speaking/",
  "/speaking-topics/",
  "/schools-colleges/",
  "/athletes-teams/",
  "/creatives-entrepreneurs/",
  "/organizations/",
  "/workshops/",
  "/media/",
  "/dtv-story/",
  "/coaching/",
  "/faq/",
  "/book-damon/",
  "/privacy/",
  "/thank-you/",
] as const;

function siteRoute(route: string) {
  return `./${route.replace(/^\/+/, "")}`;
}

test("homepage interactions and accessibility stay healthy", async ({
  page,
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(siteRoute("/"));
  await expect(page).toHaveTitle(
    "Damon J. Young Jr. | Destined to Venture",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Destined to Venture.",
    }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);

  await page
    .getByRole("button", { name: "02 Athletes & Teams" })
    .click();
  await expect(
    page.getByText(
      /connecting preparation, discipline, identity, pressure/i,
    ),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "What topics does Damon cover?" })
    .click();
  await expect(
    page.getByText(/approved themes include Destined to Venture/i),
  ).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  const seriousIssues = accessibility.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
  expect(seriousIssues).toEqual([]);
  expect(pageErrors).toEqual([]);
});

for (const route of routes) {
  test(`direct route ${route} renders`, async ({ page }) => {
    const response = await page.goto(siteRoute(route));
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.locator("img")).not.toHaveCount(0);
    const brokenImages = await page.locator("img").evaluateAll((images) =>
      images
        .filter(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth === 0,
        )
        .map((image) => (image as HTMLImageElement).currentSrc),
    );
    expect(brokenImages).toEqual([]);
  });
}

test("mobile uses native motion and an operable menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteRoute("/"));
  await expect(page.locator("html")).toHaveAttribute(
    "data-motion",
    "static",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-motion-reason",
    "viewport",
  );

  const menu = page.locator(".site-header__menu-trigger");
  await menu.click();
  await expect(menu).toHaveAccessibleName("Close navigation");
  await expect(
    page.getByRole("navigation", { name: "Mobile" }),
  ).toBeVisible();
  await expect(page.locator(".sticky-book")).toBeVisible();
});

test("reduced motion selects the complete static experience", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(siteRoute("/"));
  await expect(page.locator("html")).toHaveAttribute(
    "data-motion-reason",
    "reduced-motion",
  );
  await expect(page.locator(".hero-lens")).toHaveCount(0);
});

test("full inquiry prepares a review without claiming delivery", async ({
  page,
}) => {
  await page.goto(siteRoute("/book-damon/"));
  await page.getByLabel("First name").fill("Taylor");
  await page.getByLabel("Last name").fill("Morgan");
  await page.getByLabel("Work email").fill("taylor@example.org");
  await page.getByLabel("Phone").fill("(973) 555-0188");
  await page.getByLabel("Organization").fill("North Star Academy");
  await page
    .getByLabel("Role or title")
    .fill("Director of Student Life");
  await page
    .getByLabel("Event type")
    .selectOption("School or college program");
  await page
    .getByLabel("Audience type")
    .selectOption("Schools and colleges");
  await page.getByLabel("Preferred date").fill("2027-10-10");
  await page.getByLabel("Alternate date").fill("2027-10-17");
  await page
    .getByLabel("Event location")
    .fill("Newark, New Jersey");
  await page.getByLabel("Delivery format").selectOption("In person");
  await page
    .getByLabel("Estimated audience size")
    .selectOption("250–499");
  await page.getByLabel("Requested format").selectOption("Keynote");
  await page
    .getByLabel("Desired program length")
    .selectOption("60 minutes");
  await page
    .getByLabel("Event objectives")
    .fill(
      "Help students connect personal vision with disciplined next steps.",
    );
  await page
    .getByLabel("Primary audience challenges")
    .fill(
      "Students are navigating uncertainty and need practical language for acting with intention.",
    );
  await page
    .getByLabel("How did you hear about Damon?")
    .selectOption("Personal referral");
  await page
    .getByLabel(/I understand this demo prepares an email/i)
    .check();
  await page
    .getByRole("button", { name: "Review detailed inquiry" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Review your inquiry" }),
  ).toBeVisible();
  await expect(
    page.getByText(/This website has not sent or stored your inquiry/i),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "I sent my email" }),
  ).toHaveAttribute("href", "/dtvprodsV3/thank-you");
});
