import type { ComponentType } from "react";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

async function loadHeader() {
  const moduleUrl = pathToFileURL(
    resolve("src/components/layout/SiteHeader.tsx"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    SiteHeader: (() => null) as ComponentType,
  }));
}

describe("site header", () => {
  it("opens and closes a labeled mobile navigation", async () => {
    const { SiteHeader } = await loadHeader();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );

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

    await user.click(
      within(mobileNavigation).getByRole("link", { name: /^about$/i }),
    );
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the booking action available in the primary header", async () => {
    const { SiteHeader } = await loadHeader();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /book damon/i }),
    ).toHaveAttribute("href", "/book-damon");
  });
});
