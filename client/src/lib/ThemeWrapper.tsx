import React, { createContext, useContext, useEffect, useState } from "react";
import { useSetColorMode } from "@atlaskit/app-provider";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeWrapperProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeWrapper({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
}: ThemeWrapperProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
  const setColorMode = useSetColorMode();

  // Initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored && ["light", "dark", "system"].includes(stored)) {
        setTheme(stored);
      }
    }
  }, [storageKey]);

  // Update actual theme based on current theme setting
  useEffect(() => {
    const updateActualTheme = () => {
      let newActualTheme: "light" | "dark" = "light";

      if (theme === "system") {
        newActualTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        newActualTheme = theme;
      }

      setActualTheme(newActualTheme);

      // Update Atlassian's color mode
      setColorMode(newActualTheme);

      // Update document class for our custom CSS
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newActualTheme);
      }
    };

    updateActualTheme();

    // Listen for system theme changes when in system mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateActualTheme);
      return () => mediaQuery.removeEventListener("change", updateActualTheme);
    }
  }, [theme, setColorMode]);

  // Update theme and persist to localStorage
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  const value: ThemeContextType = {
    theme,
    setTheme: updateTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeWrapper");
  }
  return context;
}

// Theme toggle component for easy integration
export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "system") {
      return "🖥️";
    }
    return actualTheme === "dark" ? "🌙" : "☀️";
  };

  const getThemeLabel = () => {
    if (theme === "system") {
      return `System (${actualTheme})`;
    }
    return theme === "dark" ? "Dark" : "Light";
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
      title={`Current theme: ${getThemeLabel()}. Click to cycle through themes.`}
    >
      <span>{getThemeIcon()}</span>
      <span className="hidden sm:inline">{getThemeLabel()}</span>
    </button>
  );
}

// Theme selector dropdown component
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="px-3 py-2 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
