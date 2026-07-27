import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { productionOrigin, routes } from "../src/content/routes";
import type { SiteRoute } from "../src/content/contentTypes";

const repositoryBase = "/dtvprodsV3";

function escapeAttribute(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeUrl(route: SiteRoute) {
  return `${productionOrigin}${route.canonicalPath}`;
}

export function outputPathForRoute(routePath: string) {
  if (routePath === "/") {
    return "index.html";
  }

  return `${routePath.replace(/^\/|\/$/g, "")}/index.html`;
}

export function createRouteHtml(template: string, route: SiteRoute) {
  const canonical = routeUrl(route);
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Damon J. Young Jr. — Destined to Venture",
      url: `${productionOrigin}/`,
    },
  }).replaceAll("<", "\\u003c");

  const routeMetadata = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapeAttribute(route.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(route.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${productionOrigin}/media/social/damon-v3-og.jpg">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join("\n    ");

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${escapeAttribute(route.description)}">`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
      `<link rel="canonical" href="${canonical}">`,
    )
    .replace("</head>", `    ${routeMetadata}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route-path="${route.path}"></div>`,
    );
}

export function createNotFoundHtml(_template: string) {
  return `<!doctype html>
<html lang="en" data-static-status="404">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <meta name="theme-color" content="#080808">
    <title>Page Not Found | DTV</title>
    <style>
      :root { color-scheme: dark; font-family: Arial, sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #080808; color: #f4f0e8; }
      main { width: min(42rem, calc(100% - 3rem)); }
      p { color: #b7bbc0; font-size: 1.125rem; line-height: 1.6; }
      a { color: #f4f0e8; display: inline-block; margin-top: 1.5rem; padding: 1rem 1.25rem; background: #2d6bff; text-decoration: none; font-weight: 700; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <main>
      <p>FRAME 404 / DTV</p>
      <h1>Page not found</h1>
      <p>The frame you requested is not part of this site.</p>
      <a href="${repositoryBase}/">Return home</a>
    </main>
  </body>
</html>`;
}

export async function generateStaticRoutes(distDirectory = "dist") {
  const templatePath = join(distDirectory, "index.html");
  const template = await readFile(templatePath, "utf8");

  await Promise.all(
    routes.map(async (route) => {
      const outputPath = join(
        distDirectory,
        outputPathForRoute(route.path),
      );
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, createRouteHtml(template, route));
    }),
  );

  await writeFile(
    join(distDirectory, "404.html"),
    createNotFoundHtml(template),
  );
}

const isDirectExecution =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  await generateStaticRoutes(join(currentDirectory, "..", "dist"));
}
