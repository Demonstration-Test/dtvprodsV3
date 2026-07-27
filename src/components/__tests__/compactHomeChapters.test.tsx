import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AudienceSequence } from "../audiences/AudienceSequence";
import { FinalCta } from "../cta/FinalCta";
import { IntendedTakeaways } from "../outcomes/IntendedTakeaways";
import { WorkshopFeature } from "../workshops/WorkshopFeature";

function renderChapter(chapter: React.ReactNode) {
  return render(<MemoryRouter>{chapter}</MemoryRouter>);
}

describe("retained compact homepage chapters", () => {
  it("preserves audience behavior and disclosure under the stable ID", () => {
    const { container } = renderChapter(<AudienceSequence />);
    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      "audiences",
    );
    expect(container.querySelector("section")).toHaveAttribute(
      "data-home-chapter",
    );
    expect(
      screen.getByText(/not documented speaking engagements/i),
    ).toBeVisible();
  });

  it("preserves all six intended takeaways and disclaimer", () => {
    const { container } = renderChapter(<IntendedTakeaways />);
    expect(container.querySelector("section")).toHaveAttribute("id", "impact");
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(
      screen.getByText(/not guaranteed individual or organizational outcomes/i),
    ).toBeVisible();
  });

  it("preserves program routes and pricing context", () => {
    const { container } = renderChapter(<WorkshopFeature />);
    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      "programs",
    );
    expect(
      screen.getByRole("link", { name: /explore workshops/i }),
    ).toHaveAttribute("href", "/workshops");
    expect(screen.getByText(/pricing are confirmed after review/i)).toBeVisible();
  });

  it("preserves final booking and contact actions", () => {
    const { container } = renderChapter(<FinalCta />);
    expect(container.querySelector("section")).toHaveAttribute("id", "book");
    expect(
      screen.getByRole("link", { name: /book Damon to speak/i }),
    ).toHaveAttribute("href", "/book-damon");
    expect(screen.getByRole("link", { name: /contact DTV/i })).toHaveAttribute(
      "href",
      "mailto:Bookings@dtvprods.com",
    );
  });
});
