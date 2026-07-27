import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeChapterNav } from "../HomeChapterNav";

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: height,
  });
}

describe("HomeChapterNav", () => {
  beforeEach(() => {
    setViewport(1440, 1000);
    window.history.replaceState(null, "", "/");
    HTMLElement.prototype.scrollIntoView = vi.fn();
    document.body.innerHTML = [
      "home",
      "story",
      "audiences",
      "gallery",
      "impact",
      "programs",
      "plan",
      "inquire",
      "book",
    ]
      .map((id) => `<section id="${id}"></section>`)
      .join("");
  });

  it("renders an accessible nine-destination homepage nav", () => {
    render(<HomeChapterNav />);

    expect(
      screen.getByRole("navigation", { name: "Homepage sections" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(9);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("pushes the hash without moving focus and honors reduced motion", async () => {
    const user = userEvent.setup();
    const matchMedia = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    render(<HomeChapterNav />);
    const link = screen.getByRole("link", { name: "Gallery" });
    link.focus();

    await user.click(link);

    expect(window.location.hash).toBe("#gallery");
    expect(link).toHaveFocus();
    expect(document.getElementById("gallery")?.scrollIntoView).toHaveBeenCalledWith(
      { behavior: "auto", block: "start" },
    );
    matchMedia.mockRestore();
  });

  it("handles an initial hash and popstate destination", () => {
    window.history.replaceState(null, "", "#story");
    render(<HomeChapterNav />);
    expect(screen.getByRole("link", { name: "Story" })).toHaveAttribute(
      "aria-current",
      "location",
    );

    window.history.pushState(null, "", "#inquire");
    fireEvent.popState(window);

    expect(screen.getByRole("link", { name: "Inquire" })).toHaveAttribute(
      "aria-current",
      "location",
    );
  });

  it("collapses to previous, current, and next controls in short viewports", () => {
    setViewport(1280, 650);
    render(<HomeChapterNav />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: /current section: Home/i }),
    ).toBeInTheDocument();
  });
});
