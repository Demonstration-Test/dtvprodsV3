import {
  THEME_META_COLORS,
  THEME_STORAGE_KEY,
  applyTheme,
  persistTheme,
  readSavedTheme,
} from "../theme";

describe("theme utility", () => {
  const themeColorMeta = () =>
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.removeProperty("color-scheme");
    document.head.innerHTML =
      '<meta name="theme-color" content="#080808">';
  });

  it.each([
    ["missing", null],
    ["invalid", "system"],
    ["empty", ""],
  ])("defaults %s stored values to dark", (_label, storedValue) => {
    const storage = {
      getItem: vi.fn(() => storedValue),
    };

    expect(readSavedTheme(storage)).toBe("dark");
    expect(storage.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY);
  });

  it.each(["dark", "light"] as const)(
    "restores an exact saved %s theme",
    (theme) => {
      expect(
        readSavedTheme({
          getItem: vi.fn(() => theme),
        }),
      ).toBe(theme);
    },
  );

  it("defaults safely when storage reads are blocked", () => {
    const blockedStorage = {
      getItem() {
        throw new DOMException("Blocked", "SecurityError");
      },
    };

    expect(() => readSavedTheme(blockedStorage)).not.toThrow();
    expect(readSavedTheme(blockedStorage)).toBe("dark");
  });

  it.each([
    ["dark", "dark", THEME_META_COLORS.dark],
    ["light", "light", THEME_META_COLORS.light],
  ] as const)(
    "applies the %s theme to the root and browser metadata",
    (theme, colorScheme, metaColor) => {
      applyTheme(theme, document);

      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        theme,
      );
      expect(document.documentElement.style.colorScheme).toBe(colorScheme);
      expect(themeColorMeta()).toHaveAttribute("content", metaColor);
    },
  );

  it.each(["dark", "light"] as const)(
    "persists the valid %s theme",
    (theme) => {
      const storage = {
        setItem: vi.fn(),
      };

      expect(persistTheme(theme, storage)).toBe(true);
      expect(storage.setItem).toHaveBeenCalledWith(
        THEME_STORAGE_KEY,
        theme,
      );
    },
  );

  it("does not throw when storage writes are blocked", () => {
    const blockedStorage = {
      setItem() {
        throw new DOMException("Blocked", "SecurityError");
      },
    };

    expect(() => persistTheme("light", blockedStorage)).not.toThrow();
    expect(persistTheme("light", blockedStorage)).toBe(false);
  });
});
