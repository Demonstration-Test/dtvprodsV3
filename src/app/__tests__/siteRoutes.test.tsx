import type { ComponentType } from "react";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routes } from "../../content/routes";

async function loadSiteRoutes() {
  const moduleUrl = pathToFileURL(resolve("src/app/router.tsx")).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    SiteRoutes: (() => null) as ComponentType,
  }));
}

describe("complete site routing", () => {
  it("keeps the supporting routes used by the redesigned homepage", () => {
    expect(routes.map((route) => route.path)).toEqual(
      expect.arrayContaining([
        "/speaking",
        "/speaking-topics",
        "/media",
        "/faq",
        "/book-damon",
      ]),
    );
  });

  it.each(
    routes.filter((route) => route.path !== "/").map((route) => [
      route.path,
      route.h1,
    ]),
  )("renders %s with its approved page heading", async (path, heading) => {
    const { SiteRoutes } = await loadSiteRoutes();
    render(
      <MemoryRouter initialEntries={[String(path)]}>
        <SiteRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: String(heading),
      }),
    ).toBeInTheDocument();
  });

  it("keeps workshop pricing contextual without publishing a fee", async () => {
    const { SiteRoutes } = await loadSiteRoutes();
    const { container } = render(
      <MemoryRouter initialEntries={["/workshops"]}>
        <SiteRoutes />
      </MemoryRouter>,
    );

    expect(container).toHaveTextContent(
      /current format, capacity, duration, and pricing are confirmed after review/i,
    );
    expect(container).not.toHaveTextContent(/\$\d/);
  });

  it("points coaching to Damon's current external booking path", async () => {
    const { SiteRoutes } = await loadSiteRoutes();
    render(
      <MemoryRouter initialEntries={["/coaching"]}>
        <SiteRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /view current coaching details/i }),
    ).toHaveAttribute(
      "href",
      "https://www.dtvprods.com/service-page/1on1-coaching",
    );
  });

  it("keeps the thank-you page honest about email delivery", async () => {
    const { SiteRoutes } = await loadSiteRoutes();
    render(
      <MemoryRouter initialEntries={["/thank-you"]}>
        <SiteRoutes />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/cannot verify that your email was sent or delivered/i),
    ).toBeVisible();
  });
});
