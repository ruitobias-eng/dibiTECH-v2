import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored && ["light", "dark", "system"].includes(stored)) return stored;
    return "system";
  };

  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  const applyTheme = (themeToApply: ThemeMode) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.style.transition = "background-color 0.5s, color 0.5s";

    let finalTheme = themeToApply;
    if (themeToApply === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    root.classList.add(finalTheme);
  };

  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const setCustomTheme = (value: ThemeMode) => {
    if (["light", "dark", "system"].includes(value)) setThemeState(value);
  };

  const contextValue = useMemo(
    () => ({ theme, setTheme: setCustomTheme, toggleTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
