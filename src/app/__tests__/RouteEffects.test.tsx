import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { RouteEffects } from "../RouteEffects";

describe("route effects", () => {
  it("normalizes trailing slashes and announces the active page", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    render(
      <MemoryRouter initialEntries={["/about/"]}>
        <RouteEffects />
      </MemoryRouter>,
    );

    expect(document.title).toBe(
      "About Damon J. Young Jr. | DTV Productions",
    );
    expect(
      screen.getByRole("status", { name: "Current page" }),
    ).toHaveTextContent("The work behind the vision.");
  });
});
