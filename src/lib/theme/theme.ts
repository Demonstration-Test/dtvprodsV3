export type ThemeName = "dark" | "light";

export const THEME_STORAGE_KEY = "dtv-theme";

export const THEME_META_COLORS = {
  dark: "#080808",
  light: "#f4f0e8",
} as const satisfies Record<ThemeName, string>;

type ThemeStorageReader = Pick<Storage, "getItem">;
type ThemeStorageWriter = Pick<Storage, "setItem">;

export function isThemeName(value: unknown): value is ThemeName {
  return value === "dark" || value === "light";
}

function defaultStorage(): Storage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    return undefined;
  }
}

export function readSavedTheme(
  storage: ThemeStorageReader | undefined = defaultStorage(),
): ThemeName {
  try {
    const savedTheme = storage?.getItem(THEME_STORAGE_KEY);
    return isThemeName(savedTheme) ? savedTheme : "dark";
  } catch {
    return "dark";
  }
}

export function persistTheme(
  theme: ThemeName,
  storage: ThemeStorageWriter | undefined = defaultStorage(),
): boolean {
  if (!isThemeName(theme) || !storage) return false;

  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function applyTheme(
  theme: ThemeName,
  targetDocument: Document | undefined = typeof document === "undefined"
    ? undefined
    : document,
): void {
  if (!targetDocument || !isThemeName(theme)) return;

  const root = targetDocument.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  let themeColor = targetDocument.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (!themeColor) {
    themeColor = targetDocument.createElement("meta");
    themeColor.name = "theme-color";
    targetDocument.head.append(themeColor);
  }
  themeColor.content = THEME_META_COLORS[theme];
}
