import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "../ThemeProvider";

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.head.innerHTML =
      '<meta name="theme-color" content="#080808">';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes from the pre-rendered root theme", () => {
    document.documentElement.dataset.theme = "light";

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Current theme: light" }),
    ).toBeVisible();
  });

  it("fails clearly when its consumer is rendered outside the provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      /useTheme must be used within ThemeProvider/,
    );
  });

  it("applies and persists each theme without replacing the consumer", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const toggle = screen.getByRole("button", {
      name: "Current theme: dark",
    });

    await user.click(toggle);
    expect(toggle).toHaveAccessibleName("Current theme: light");
    expect(document.documentElement).toHaveAttribute(
      "data-theme",
      "light",
    );
    expect(localStorage.getItem("dtv-theme")).toBe("light");

    await user.click(toggle);
    expect(toggle).toHaveAccessibleName("Current theme: dark");
    expect(document.documentElement).toHaveAttribute(
      "data-theme",
      "dark",
    );
    expect(localStorage.getItem("dtv-theme")).toBe("dark");
  });

  it("still changes the current visit when storage writes fail", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(
      screen.getByRole("button", { name: "Current theme: dark" }),
    );

    expect(
      screen.getByRole("button", { name: "Current theme: light" }),
    ).toBeVisible();
    expect(document.documentElement).toHaveAttribute(
      "data-theme",
      "light",
    );
  });
});
