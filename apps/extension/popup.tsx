import "react"
import "@tailwind-deobfuscator/ui/styles/globals-built.css"

import { Button } from "@tailwind-deobfuscator/ui/components/ui/button"
import { useTheme } from "@tailwind-deobfuscator/ui/hooks/use-theme"
import {
  BsGithub,
  ExternalLink,
  Moon,
  Rocket,
  Sun
} from "@tailwind-deobfuscator/ui/icons"
import { Logo } from "@tailwind-deobfuscator/ui/logo"

import { sendToContentScript } from "@plasmohq/messaging"

export default function Popup() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="w-90 bg-background text-foreground overflow-hidden shadow-2xl">
      {/* Header with gradient */}
      <div className="bg-primary text-primary-foreground px-5 py-3">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 border border-border/40 dark:border-border rounded-sm bg-primary-foreground/40">
              <Logo className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Tailwind Deobfuscator
              </h1>
              <p className="text-white/50 text-[11px] font-medium">
                Element Inspector
              </p>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Status pill */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-emerald-50 dark:bg-emerald-800 border border-emerald-100 dark:border-emerald-700 rounded-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-emerald-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Ready to inspect elements
          </span>
        </div>
        <Button
          onClick={async () => {
            await sendToContentScript({
              name: "start-inspecting"
            })
            window.close()
          }}>
          <Rocket />
          Start Inspecting
        </Button>
        {/* Footer links */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <a
            href=" https://github.com/derick-kibiwott/tailwind-deobfuscator"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xs text-primary/80 hover:text-primary transition-colors flex items-center gap-1">
            <BsGithub />
            Star us on Github
            <ExternalLink className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer noopener"
            className="group text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            How to use it{" "}
            <ExternalLink className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>
        </div>
      </div>
    </div>
  )
}
