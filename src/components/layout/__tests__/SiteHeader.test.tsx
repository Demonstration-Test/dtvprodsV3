import type { ComponentType } from "react";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const requiredMobileDestinations = [
  ["Home", "/"],
  ["About", "/about"],
  ["Speaking", "/speaking"],
  ["Speaking Topics", "/speaking-topics"],
  ["Schools & Colleges", "/schools-colleges"],
  ["Athletes & Teams", "/athletes-teams"],
  ["Creatives & Entrepreneurs", "/creatives-entrepreneurs"],
  ["Organizations & Brands", "/organizations"],
  ["Workshops", "/workshops"],
  ["Coaching", "/coaching"],
  ["Media", "/media"],
  ["DTV Story", "/dtv-story"],
  ["FAQ", "/faq"],
  ["Book Damon", "/book-damon"],
] as const;

async function loadHeader() {
  const moduleUrl = pathToFileURL(
    resolve("src/components/layout/SiteHeader.tsx"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    SiteHeader: (() => null) as ComponentType,
  }));
}

describe("site header", () => {
  function renderHeader(SiteHeader: ComponentType) {
    return render(
      <MemoryRouter>
        <SiteHeader />
        <main id="main-content">Main content</main>
        <footer className="site-footer">Footer content</footer>
        <a className="sticky-book" href="/book-damon">
          Sticky booking
        </a>
      </MemoryRouter>,
    );
  }

  it("opens a complete labeled mobile navigation and focuses its first destination", async () => {
    const { SiteHeader } = await loadHeader();
    const user = userEvent.setup();
    renderHeader(SiteHeader);

    const trigger = screen.getByRole("button", {
      name: /open navigation/i,
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile/i,
    });
    expect(mobileNavigation).toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    for (const [label, route] of requiredMobileDestinations) {
      expect(
        within(mobileNavigation).getByRole("link", {
          name: new RegExp(`^${label.replace(/[&]/g, "\\&")}$`, "i"),
        }),
      ).toHaveAttribute("href", route);
    }

    await waitFor(() =>
      expect(
        within(mobileNavigation).getByRole("link", { name: /^home$/i }),
      ).toHaveFocus(),
    );
  });

  it("isolates the page while open and restores it after Escape", async () => {
    const { SiteHeader } = await loadHeader();
    const user = userEvent.setup();
    renderHeader(SiteHeader);

    const trigger = screen.getByRole("button", {
      name: /open navigation/i,
    });
    const main = screen.getByRole("main");
    const footer = screen.getByText("Footer content").closest("footer");
    const stickyBook = screen.getByRole("link", {
      name: "Sticky booking",
    });
    const previousOverflow = document.body.style.overflow;

    await user.click(trigger);

    expect(document.body.style.overflow).toBe("hidden");
    expect(main).toHaveProperty("inert", true);
    expect(footer).toHaveProperty("inert", true);
    expect(stickyBook).toHaveProperty("inert", true);

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: /mobile/i }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(main).toHaveProperty("inert", false);
    expect(footer).toHaveProperty("inert", false);
    expect(stickyBook).toHaveProperty("inert", false);
  });

  it("wraps keyboard focus within the open navigation boundary", async () => {
    const { SiteHeader } = await loadHeader();
    const user = userEvent.setup();
    renderHeader(SiteHeader);

    const trigger = screen.getByRole("button", {
      name: /open navigation/i,
    });
    await user.click(trigger);

    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile/i,
    });
    const lastDestination = within(mobileNavigation).getByRole("link", {
      name: /^book damon$/i,
    });

    lastDestination.focus();
    await user.tab();
    expect(trigger).toHaveFocus();

    await user.tab({ shift: true });
    expect(lastDestination).toHaveFocus();
  });

  it("closes on a same-route destination without forcing focus back to the trigger", async () => {
    const { SiteHeader } = await loadHeader();
    const user = userEvent.setup();
    renderHeader(SiteHeader);

    const trigger = screen.getByRole("button", {
      name: /open navigation/i,
    });
    await user.click(trigger);
    const homeLink = within(
      screen.getByRole("navigation", { name: /mobile/i }),
    ).getByRole("link", { name: /^home$/i });

    await user.click(homeLink);

    expect(
      screen.queryByRole("navigation", { name: /mobile/i }),
    ).not.toBeInTheDocument();
    expect(trigger).not.toHaveFocus();
  });

  it("keeps the booking action available in the primary header", async () => {
    const { SiteHeader } = await loadHeader();
    renderHeader(SiteHeader);

    expect(
      screen.getAllByRole("link", { name: /book damon/i })[0],
    ).toHaveAttribute("href", "/book-damon");
  });
});
