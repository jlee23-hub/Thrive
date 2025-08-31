import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import AppProvider, { useSetColorMode } from "@atlaskit/app-provider";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

type Theme = "light" | "dark" | "system";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppWithTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const setColorMode = useSetColorMode();

  // Initialize theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ui-theme") as Theme;
      if (stored && ["light", "dark", "system"].includes(stored)) {
        setTheme(stored);
      }
    }
  }, []);

  // Update actual theme based on current theme setting
  useEffect(() => {
    const updateActualTheme = () => {
      let actualTheme: "light" | "dark" = "light";

      if (theme === "system") {
        actualTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        actualTheme = theme;
      }

      setColorMode(actualTheme);

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(actualTheme);
      }
    };

    updateActualTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateActualTheme);
      return () => mediaQuery.removeEventListener("change", updateActualTheme);
    }
  }, [theme, setColorMode]);

  return <Router />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider
        defaultTheme={{
          typography: "typography-refreshed",
          shape: "shape",
        }}
      >
        <AppWithTheme />
      </AppProvider>
    </QueryClientProvider>
  );
}