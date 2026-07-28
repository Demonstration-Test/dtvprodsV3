import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { routes } from "../../src/content/routes";

async function loadGenerator() {
  const moduleUrl = pathToFileURL(
    resolve("scripts/generateStaticRoutes.ts"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    createRouteHtml: () => "",
    outputPathForRoute: () => "",
    createNotFoundHtml: () => "",
  }));
}

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta name="theme-color" content="#080808">
    <script data-theme-initializer>
      try {
        const theme = localStorage.getItem("dtv-theme") === "light"
          ? "light"
          : "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        document.querySelector('meta[name="theme-color"]').content =
          theme === "light" ? "#f4f0e8" : "#080808";
      } catch {
        document.documentElement.dataset.theme = "dark";
      }
    </script>
    <title>Template</title>
    <meta name="description" content="Template description">
    <link rel="canonical" href="https://example.com/">
  </head>
  <body><script type="module" src="/dtvprodsV3/assets/main.js"></script></body>
</html>`;

describe("static route generation", () => {
  it("maps every canonical route to a route-specific index file", async () => {
    const generator = await loadGenerator();
    const outputPaths = routes.map((route) =>
      generator.outputPathForRoute(route.path),
    );

    expect(outputPaths).toContain("index.html");
    expect(outputPaths).toContain("about/index.html");
    expect(outputPaths).toContain("book-damon/index.html");
    expect(new Set(outputPaths).size).toBe(routes.length);
  });

  it("injects unique route metadata and repository-safe URLs", async () => {
    const generator = await loadGenerator();
    const about = routes.find((route) => route.path === "/about");
    expect(about).toBeDefined();

    const html = generator.createRouteHtml(template, about!);

    expect(html).toContain(`<title>${about!.title}</title>`);
    expect(html).toContain(`content="${about!.description}"`);
    expect(html).toContain(
      `href="https://demonstration-test.github.io/dtvprodsV3/about/"`,
    );
    expect(html).toContain(
      `property="og:url" content="https://demonstration-test.github.io/dtvprodsV3/about/"`,
    );
    expect(html).toContain("/dtvprodsV3/assets/main.js");
    expect(html).toContain('"@type":"WebPage"');
  });

  it.each(["/about", "/media", "/faq", "/book-damon"])(
    "retains flash-free theme initialization for %s",
    async (routePath) => {
      const generator = await loadGenerator();
      const route = routes.find((candidate) => candidate.path === routePath);
      expect(route).toBeDefined();

      const html = generator.createRouteHtml(template, route!);
      const initializerIndex = html.indexOf("data-theme-initializer");
      const applicationIndex = html.indexOf(
        '<script type="module" src="/dtvprodsV3/assets/main.js">',
      );

      expect(initializerIndex).toBeGreaterThan(-1);
      expect(applicationIndex).toBeGreaterThan(initializerIndex);
      expect(html).toContain("dtv-theme");
      expect(html).toContain("#080808");
      expect(html).toContain("#f4f0e8");
    },
  );

  it("creates a true not-found document", async () => {
    const generator = await loadGenerator();
    const html = generator.createNotFoundHtml(template);

    expect(html).toContain("<title>Page Not Found | DTV</title>");
    expect(html).toContain('data-static-status="404"');
    expect(html).toContain("Page not found");
    expect(html).toContain("data-theme-initializer");
    expect(html).toContain("dtv-theme");
    expect(html).toContain("#f4f0e8");
    expect(html).not.toContain("<title>Template</title>");
  });
});
