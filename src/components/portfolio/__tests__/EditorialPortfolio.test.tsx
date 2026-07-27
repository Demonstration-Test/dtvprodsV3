import { MemoryRouter } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditorialPortfolio } from "../EditorialPortfolio";

const categories = [
  "Events",
  "Sports / Media Day",
  "Graduation",
  "Creative Editorial",
  "Portrait / Fashion",
];

describe("EditorialPortfolio", () => {
  it("renders the five approved category controls and media route", () => {
    render(
      <MemoryRouter>
        <EditorialPortfolio />
      </MemoryRouter>,
    );

    categories.forEach((name) => {
      expect(
        screen.getByRole("button", { name: `Show ${name}` }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("link", { name: /explore the full media gallery/i }),
    ).toHaveAttribute("href", "/media");
  });

  it("does not duplicate the single Events image as a preview", () => {
    render(
      <MemoryRouter>
        <EditorialPortfolio />
      </MemoryRouter>,
    );

    expect(
      screen.getByAltText("Bride celebrating with guests during an event."),
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText("Gallery previews")).queryAllByRole("button"),
    ).toHaveLength(0);
  });

  it("changes category, feature image, and selected preview", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <EditorialPortfolio />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "Show Graduation" }),
    );
    expect(
      screen.getByAltText(
        "Graduate posing with a book between library shelves.",
      ),
    ).toBeInTheDocument();

    const preview = screen.getByRole("button", {
      name: "View Graduate smiling in cap and gown.",
    });
    await user.click(preview);

    expect(preview).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByAltText("Graduate smiling in cap and gown."),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("graduate-cap-1400.webp"),
    );
  });

  it("keeps the external DTV action and honest portfolio disclosure", () => {
    render(
      <MemoryRouter>
        <EditorialPortfolio />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /visit DTV Productions/i }),
    ).toHaveAttribute("href", "https://www.dtvprods.com/");
    expect(
      screen.getByText(/not as speaking-event documentation/i),
    ).toBeVisible();
  });
});
