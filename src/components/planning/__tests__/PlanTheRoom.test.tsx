import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlanTheRoom } from "../PlanTheRoom";

function renderPlan() {
  return render(
    <MemoryRouter>
      <PlanTheRoom />
    </MemoryRouter>,
  );
}

describe("PlanTheRoom", () => {
  it("starts on Booking Process with accessible tab semantics", () => {
    renderPlan();

    const bookingTab = screen.getByRole("tab", { name: "Booking Process" });
    expect(bookingTab).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", { name: "Booking Process" }),
    ).toBeVisible();
    expect(screen.getByText("Share your vision")).toBeVisible();
    expect(
      screen.getByRole("link", { name: /start an inquiry/i }),
    ).toHaveAttribute("href", "/book-damon");
  });

  it("auto-activates tabs with ArrowLeft, ArrowRight, Home, and End", () => {
    renderPlan();
    const bookingTab = screen.getByRole("tab", { name: "Booking Process" });
    bookingTab.focus();

    fireEvent.keyDown(bookingTab, { key: "ArrowRight" });
    const faqTab = screen.getByRole("tab", { name: "Organizer FAQ" });
    expect(faqTab).toHaveAttribute("aria-selected", "true");
    expect(faqTab).toHaveFocus();

    fireEvent.keyDown(faqTab, { key: "Home" });
    expect(bookingTab).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(bookingTab, { key: "End" });
    expect(faqTab).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(faqTab, { key: "ArrowLeft" });
    expect(bookingTab).toHaveAttribute("aria-selected", "true");
  });

  it("uses the exact five approved FAQ preview IDs with audiences open", async () => {
    const user = userEvent.setup();
    renderPlan();
    await user.click(screen.getByRole("tab", { name: "Organizer FAQ" }));

    expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(4);
    expect(
      screen.getByRole("button", {
        name: "What audiences does Damon speak to?",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    [
      "What topics does Damon cover?",
      "Does Damon offer workshops?",
      "Is Damon available outside New Jersey?",
      "Is a speaker reel available?",
    ].forEach((question) => {
      expect(screen.getByRole("button", { name: question })).toBeInTheDocument();
    });
  });

  it("preserves expanded FAQ state across tab switches", async () => {
    const user = userEvent.setup();
    renderPlan();
    await user.click(screen.getByRole("tab", { name: "Organizer FAQ" }));
    const topics = screen.getByRole("button", {
      name: "What topics does Damon cover?",
    });
    await user.click(topics);
    expect(topics).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("tab", { name: "Booking Process" }));
    await user.click(screen.getByRole("tab", { name: "Organizer FAQ" }));

    expect(
      screen.getByRole("button", { name: "What topics does Damon cover?" }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
