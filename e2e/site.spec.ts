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
  await expect(page.locator("[data-home-chapter]")).toHaveCount(9);
  await expect
    .poll(() =>
      page
        .locator("[data-home-chapter]")
        .evaluateAll((chapters) => chapters.map((chapter) => chapter.id)),
    )
    .toEqual([
      "home",
      "story",
      "audiences",
      "gallery",
      "impact",
      "programs",
      "plan",
      "inquire",
      "book",
    ]);
  await expect(
    page.getByText("You do not have to see the entire road"),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Speaking themes" }),
  ).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);

  await page.getByRole("button", { name: "Building the Craft" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Preparation becomes the practice.",
    }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "02 Athletes & Teams" })
    .click();
  await expect(
    page.getByText(
      /connecting preparation, discipline, identity, pressure/i,
    ),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Show Sports / Media Day" })
    .click();
  await expect(
    page.getByRole("button", {
      name: /View Athlete posing with basketballs/i,
    }),
  ).toBeVisible();

  await page.getByRole("tab", { name: "Organizer FAQ" }).click();
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

test("eligible homepage chapters stay within one balanced viewport", async ({
  page,
}) => {
  await page.goto(siteRoute("/"));
  await page.locator("img").first().waitFor({ state: "visible" });

  const dimensions = await page
    .locator("[data-home-chapter]")
    .evaluateAll((chapters) =>
      chapters.map((chapter) => ({
        id: chapter.id,
        height: chapter.getBoundingClientRect().height,
      })),
    );

  expect(dimensions).toHaveLength(9);
  for (const chapter of dimensions) {
    expect(
      chapter.height,
      `${chapter.id} should not exceed the viewport below the 80px header`,
    ).toBeLessThanOrEqual(922);
  }
});

test("homepage side navigation updates the URL hash", async ({ page }) => {
  await page.goto(siteRoute("/"));
  const navigation = page.getByRole("navigation", {
    name: "Homepage sections",
  });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Gallery" }).click();
  await expect(page).toHaveURL(/#gallery$/);
  await expect(page.locator("#gallery")).toBeInViewport();
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
  await expect(page.locator(".home-chapter-nav__label").first()).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
});

test("short landscape menu fills the viewport and exposes the complete site map", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1073, height: 427 });
  await page.goto(siteRoute("/"));

  const trigger = page.getByRole("button", {
    name: "Open navigation",
  });
  await trigger.click();

  const navigation = page.getByRole("navigation", { name: "Mobile" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link")).toHaveCount(14);
  await expect
    .poll(() =>
      navigation.getByRole("link").allTextContents(),
    )
    .toEqual([
      "Home",
      "About",
      "Speaking",
      "Speaking Topics",
      "Schools & Colleges",
      "Athletes & Teams",
      "Creatives & Entrepreneurs",
      "Organizations & Brands",
      "Workshops",
      "Coaching",
      "Media",
      "DTV Story",
      "FAQ",
      "Book Damon",
    ]);

  const geometry = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const overlay = document.querySelector(".mobile-navigation");
    const groups = Array.from(
      document.querySelectorAll(".mobile-navigation__group"),
    );
    const headerBox = header?.getBoundingClientRect();
    const overlayBox = overlay?.getBoundingClientRect();
    const groupBoxes = groups.map((group) => group.getBoundingClientRect());
    const centerElement = document.elementFromPoint(
      window.innerWidth / 2,
      (headerBox?.bottom ?? 0) + 80,
    );
    return {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      firstColumnLeft: groupBoxes[0]?.left,
      firstColumnTop: groupBoxes[0]?.top,
      headerZIndex: Number.parseInt(
        header ? getComputedStyle(header).zIndex : "0",
        10,
      ),
      mainInert: (
        document.querySelector("main") as
          | (HTMLElement & { inert: boolean })
          | null
      )?.inert,
      overlayBottom: overlayBox?.bottom,
      overlayContainsCenter:
        overlay instanceof HTMLElement &&
        centerElement instanceof Node &&
        overlay.contains(centerElement),
      overlayTop: overlayBox?.top,
      pointerZIndex: Number.parseInt(
        getComputedStyle(
          document.querySelector(".focus-cursor") ??
            document.documentElement,
        ).zIndex || "0",
        10,
      ),
      secondColumnLeft: groupBoxes[1]?.left,
      secondColumnTop: groupBoxes[1]?.top,
      headerBottom: headerBox?.bottom,
    };
  });

  expect(geometry.overlayTop).toBeCloseTo(geometry.headerBottom ?? 0, 0);
  expect(geometry.overlayBottom).toBeCloseTo(427, 0);
  expect(geometry.overlayContainsCenter).toBe(true);
  expect(geometry.headerZIndex).toBeGreaterThan(geometry.pointerZIndex);
  expect(geometry.secondColumnLeft).toBeGreaterThan(
    geometry.firstColumnLeft ?? 0,
  );
  expect(geometry.secondColumnTop).toBeCloseTo(
    geometry.firstColumnTop ?? 0,
    0,
  );
  expect(geometry.bodyOverflow).toBe("hidden");
  expect(geometry.bodyPosition).toBe("fixed");
  expect(geometry.mainInert).toBe(true);

  const finalLink = navigation.getByRole("link", {
    name: "Book Damon",
  });
  await finalLink.scrollIntoViewIfNeeded();
  await expect(finalLink).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(() => ({
        inert: (
          document.querySelector("main") as
            | (HTMLElement & { inert: boolean })
            | null
        )?.inert,
        overflow: document.body.style.overflow,
        position: document.body.style.position,
      })),
    )
    .toEqual({ inert: false, overflow: "", position: "" });
});

test("mobile menu uses one scrollable column without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteRoute("/"));
  await page
    .getByRole("button", { name: "Open navigation" })
    .click();

  const navigation = page.getByRole("navigation", { name: "Mobile" });
  const groupPositions = await navigation
    .locator(".mobile-navigation__group")
    .evaluateAll((groups) =>
      groups.slice(0, 2).map((group) => {
        const bounds = group.getBoundingClientRect();
        return { left: bounds.left, top: bounds.top };
      }),
    );
  expect(groupPositions[1].left).toBeCloseTo(groupPositions[0].left, 0);
  expect(groupPositions[1].top).toBeGreaterThan(groupPositions[0].top);

  const finalLink = navigation.getByRole("link", {
    name: "Book Damon",
  });
  await finalLink.scrollIntoViewIfNeeded();
  await expect(finalLink).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
});

test("desktop compositions share the centered 72rem editorial frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(siteRoute("/"));

  const frame = await page.evaluate(() => {
    const section = document.querySelector(".home-story");
    const children = Array.from(section?.children ?? []);
    const boxes = children.map((child) => child.getBoundingClientRect());
    const left = Math.min(...boxes.map((box) => box.left));
    const right = Math.max(...boxes.map((box) => box.right));
    const headerInner = document.querySelector(".site-header__inner");
    const headerStyles = headerInner
      ? getComputedStyle(headerInner)
      : null;
    return {
      contentWidth: right - left,
      left,
      leftPadding: Number.parseFloat(
        headerStyles?.paddingLeft ?? "0",
      ),
      rightGap: window.innerWidth - right,
      rightPadding: Number.parseFloat(
        headerStyles?.paddingRight ?? "0",
      ),
    };
  });

  expect(frame.contentWidth).toBeLessThanOrEqual(1154);
  expect(Math.abs(frame.left - frame.rightGap)).toBeLessThanOrEqual(2);
  expect(Math.abs(frame.leftPadding - frame.rightPadding)).toBeLessThanOrEqual(
    2,
  );
  expect(frame.leftPadding).toBeGreaterThanOrEqual(142);
});

for (const mediaCase of [
  ["/", ".home-story__image"],
  ["/", ".audiences__focus-image"],
  ["/", ".portfolio__feature-image"],
  ["/", ".programs__image"],
  ["/about/", ".page-hero__media img"],
  ["/dtv-story/", ".page-hero__media img"],
  ["/media/", ".contact-sheet img"],
] as const) {
  test(`primary media ${mediaCase[0]} ${mediaCase[1]} displays in full`, async ({
    page,
  }) => {
    await page.goto(siteRoute(mediaCase[0]));
    const image = page.locator(mediaCase[1]).first();
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const media = element as HTMLImageElement;
          const bounds = media.getBoundingClientRect();
          const parentBounds =
            media.closest(".frame")?.getBoundingClientRect();
          return {
            fit: getComputedStyle(media).objectFit,
            loaded: media.naturalHeight > 0 && media.naturalWidth > 0,
            withinFrame:
              parentBounds !== undefined &&
              bounds.left >= parentBounds.left - 1 &&
              bounds.right <= parentBounds.right + 1 &&
              bounds.top >= parentBounds.top - 1 &&
              bounds.bottom <= parentBounds.bottom + 1,
          };
        }),
      )
      .toEqual({
        fit: "contain",
        loaded: true,
        withinFrame: true,
      });
  });
}

test("eligible mobile homepage chapters fit the usable viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(siteRoute("/"));

  const dimensions = await page
    .locator("[data-home-chapter]")
    .evaluateAll((chapters) =>
      chapters.map((chapter) => ({
        id: chapter.id,
        height: chapter.getBoundingClientRect().height,
      })),
    );

  expect(dimensions).toHaveLength(9);
  for (const chapter of dimensions) {
    expect(
      chapter.height,
      `${chapter.id} should fit below the mobile header and booking bar`,
    ).toBeLessThanOrEqual(710);
  }

  const mobileRailClearance = await page.evaluate(() => {
    const rail = document.querySelector(".home-chapter-nav");
    const storyCopy = document.querySelector(".home-story__copy");
    if (!rail || !storyCopy) return null;
    return {
      railLeft: rail.getBoundingClientRect().left,
      storyCopyRight: storyCopy.getBoundingClientRect().right,
    };
  });
  expect(mobileRailClearance).not.toBeNull();
  expect(mobileRailClearance!.storyCopyRight).toBeLessThanOrEqual(
    mobileRailClearance!.railLeft,
  );
});

test("short mobile landscape grows naturally without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto(siteRoute("/"));

  await expect(page.locator(".home-chapter-nav--compact")).toBeVisible();
  await expect(
    page.locator(".home-chapter-nav--compact a"),
  ).toHaveCount(3);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
});

for (const route of [
  "/about/",
  "/speaking/",
  "/organizations/",
  "/media/",
  "/dtv-story/",
] as const) {
  test(`mobile supporting hero ${route} stays balanced`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(siteRoute(route));

    const hero = page.locator(".page-hero");
    await expect(hero).toBeVisible();
    const dimensions = await hero.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    }));
    expect(dimensions.height).toBeLessThanOrEqual(710);
    expect(dimensions.overflow).toBeLessThanOrEqual(0);
  });
}

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
