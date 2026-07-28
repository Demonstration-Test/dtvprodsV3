import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  applyTheme,
  persistTheme,
} from "./theme";
import type { ThemeName } from "./theme";

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function preRenderedTheme(): ThemeName {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light"
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(preRenderedTheme);
  const themeRef = useRef(theme);

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeName =
      themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = nextTheme;
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    setTheme(nextTheme);
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
