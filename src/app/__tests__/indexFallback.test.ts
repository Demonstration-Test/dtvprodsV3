import { readFileSync } from "node:fs";

describe("index no-JavaScript fallback", () => {
  function executeThemeInitializer(
    html: string,
    getItem: () => string | null,
  ) {
    const script = html.match(
      /<script data-theme-initializer>([\s\S]*?)<\/script>/,
    )?.[1];
    const themeColor = { content: "" };
    const root = {
      dataset: {} as Record<string, string>,
      style: { colorScheme: "" },
    };
    const targetDocument = {
      documentElement: root,
      querySelector: () => themeColor,
    };

    expect(script).toBeDefined();
    const runInitializer = new Function(
      "document",
      "localStorage",
      script!,
    );
    runInitializer(targetDocument, { getItem });

    return { root, themeColor };
  }

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

  it("initializes the saved theme before the application module", () => {
    const html = readFileSync("index.html", "utf8");
    const initializerIndex = html.indexOf("data-theme-initializer");
    const applicationIndex = html.indexOf(
      '<script type="module" src="/src/main.tsx">',
    );

    expect(initializerIndex).toBeGreaterThan(-1);
    expect(applicationIndex).toBeGreaterThan(initializerIndex);
    expect(html).toContain(
      '<meta name="theme-color" content="#080808" />',
    );
    expect(html).toContain("dtv-theme");
    expect(html).toContain("#f4f0e8");
  });

  it("applies only an exact saved light value before React renders", () => {
    const html = readFileSync("index.html", "utf8");
    const { root, themeColor } = executeThemeInitializer(
      html,
      () => "light",
    );

    expect(root.dataset.theme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
    expect(themeColor.content).toBe("#f4f0e8");
  });

  it.each([
    ["missing storage", () => null],
    ["invalid storage", () => "system"],
    [
      "blocked storage",
      () => {
        throw new DOMException("Blocked", "SecurityError");
      },
    ],
  ])("defaults safely to dark with %s", (_label, getItem) => {
    const html = readFileSync("index.html", "utf8");
    const { root, themeColor } = executeThemeInitializer(html, getItem);

    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
    expect(themeColor.content).toBe("#080808");
  });
});
