import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeStoryChapter } from "../HomeStoryChapter";

const selectors = [
  "Behind the Lens",
  "Building the Craft",
  "DTV Begins",
  "The Name Evolves",
  "Destined to Venture",
];

describe("HomeStoryChapter", () => {
  it("starts on Behind the Lens and renders all five named controls", () => {
    render(
      <MemoryRouter>
        <HomeStoryChapter />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "The work behind the vision." }),
    ).toBeInTheDocument();
    selectors.forEach((name) => {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: selectors[0] })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("updates the editorial frame through named controls", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomeStoryChapter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "DTV Begins" }));

    expect(
      screen.getByRole("heading", { name: "DTV Productions begins." }),
    ).toBeInTheDocument();
    expect(screen.getByText("ORIGIN / 2020")).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Dramatic studio portrait lit against a deep red stage.",
      ),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("portrait-red-stage-1400.webp"),
    );
    expect(
      screen.getByText(/in 2020, the creative work became DTV Productions/i),
    ).toBeVisible();
  });

  it("supports ArrowLeft, ArrowRight, Home, and End navigation", () => {
    render(
      <MemoryRouter>
        <HomeStoryChapter />
      </MemoryRouter>,
    );
    const first = screen.getByRole("button", { name: selectors[0] });
    first.focus();

    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(
      screen.getByRole("button", { name: selectors[1] }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "End" });
    expect(
      screen.getByRole("button", { name: selectors[4] }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowLeft" });
    expect(
      screen.getByRole("button", { name: selectors[3] }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Home" });
    expect(
      screen.getByRole("button", { name: selectors[0] }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps both story actions and the speaking-proof disclosure visible", () => {
    render(
      <MemoryRouter>
        <HomeStoryChapter />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: /read the DTV story/i }),
    ).toHaveAttribute("href", "/dtv-story");
    expect(screen.getByRole("link", { name: /meet Damon/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(
      screen.getByText(/does not present any frame as documentation/i),
    ).toBeVisible();
  });
});
