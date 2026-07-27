import type { ComponentType } from "react";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

async function loadHomePage() {
  const moduleUrl = pathToFileURL(
    resolve("src/pages/HomePage.tsx"),
  ).href;
  return import(/* @vite-ignore */ moduleUrl).catch(() => ({
    HomePage: (() => null) as ComponentType,
  }));
}

describe("speaker-first homepage", () => {
  it("renders the approved hero and complete narrative landmarks", async () => {
    const { HomePage } = await loadHomePage();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /destined to venture/i,
      }),
    ).toBeInTheDocument();
    const bookingLinks = screen.getAllByRole("link", {
      name: /book damon to speak/i,
    });
    expect(bookingLinks).not.toHaveLength(0);
    bookingLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/book-damon");
    });
    expect(
      screen.getByRole("heading", {
        name: /who is in the frame/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /ideas built to move with the room/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /start with the room/i,
      }),
    ).toBeInTheDocument();
  });

  it("changes the expanded audience pathway through a real button", async () => {
    const { HomePage } = await loadHomePage();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: /athletes & teams/i }),
    );
    expect(
      screen.getByText(/connecting preparation, discipline, identity/i),
    ).toBeVisible();
  });

  it("exposes a visible FAQ answer through an accessible disclosure", async () => {
    const { HomePage } = await loadHomePage();
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /what topics does damon cover/i,
      }),
    );
    expect(
      screen.getByText(/approved themes include destined to venture/i),
    ).toBeVisible();
  });
});
