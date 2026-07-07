import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const getSystemTheme = (): Theme =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState<Theme>(getSystemTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: Theme) => {
      document.documentElement.classList.toggle("dark", theme === "dark");
    };

    applyTheme(theme);

    const listener = () => {
      const system = getSystemTheme();
      setTheme(system);
      applyTheme(system);
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);

    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return {
    theme,
    toggleTheme,
  };
}
