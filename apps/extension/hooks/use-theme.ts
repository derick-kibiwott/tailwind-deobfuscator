// hooks/use-theme.ts
import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export type Theme = "light" | "dark"

const STORAGE_KEY = "tailwind-deobfuscator-theme"

function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return "light"
}

// 1. Remove "async" from the hook definition!
export function useTheme(hostSelector?: string) {
  // 2. Pass a fallback function directly into useStorage.
  // Plasmo's hook automatically looks up STORAGE_KEY in the extension storage.
  // If nothing is found, it will lazily run getSystemTheme() as the default fallback.
  const [theme, setThemeState] = useStorage<Theme>(
    STORAGE_KEY,
    (v) => v ?? getSystemTheme()
  )

  useEffect(() => {
    if (!theme) return

    if (hostSelector) {
      const hostElement = document.querySelector(hostSelector)
      if (hostElement) {
        hostElement.setAttribute("data-theme", theme)
        return
      }
    }

    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [theme, hostSelector])

  const setTheme = async (next: Theme) => {
    await setThemeState(next)
  }

  const toggleTheme = () => {
    // If theme isn't resolved yet, fallback to system to avoid flipping blindly
    const currentTheme = theme ?? getSystemTheme()
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return {
    theme, // This will initially be undefined while loading, then update automatically
    setTheme,
    toggleTheme,
    ready: theme !== undefined
  }
}
