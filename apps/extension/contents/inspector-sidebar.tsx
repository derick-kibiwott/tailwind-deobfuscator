// /contents/inspector-sidebar.tsx
import type { ToggleSidebarRequest } from "@/types/message"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@tailwind-deobfuscator/ui/components/ui/sheet"
import sidebarOverlayCssText from "data-text:./inspector-sidebar.css"
import cssText from "data-text:@tailwind-deobfuscator/ui/styles/globals.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useRef, useState } from "react"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.body

export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16

  // 1. Process your core tailwind globals
  let transformed = cssText
    .replaceAll(":root", ":host(plasmo-csui)")
    .replaceAll(".dark", ':host(plasmo-csui[data-theme="dark"])')
    .replace(
      /([\d.]+)rem/g,
      (_match, remValue) => `${parseFloat(remValue) * baseFontSize}px`
    )

  const style = document.createElement("style")
  // 2. Append both the tailwind variables and your isolated structural CSS string styles together
  style.textContent = `${transformed}\n${sidebarOverlayCssText}`
  return style
}

export default function InspectorSidebar() {
  const [open, setOpen] = useState(false)
  const [elementData, setElementData] = useState<any>(null)
  const hostRef = useRef<HTMLElement | null>(null)

  // Create a React container reference hook to look up the shadow wrapper dynamically
  const containerRef = useRef<HTMLDivElement>(null)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    hostRef.current = document.querySelector("plasmo-csui")
  }, [])

  useEffect(() => {
    // Dynamically query the internal Shadow DOM parent container tree context safely without breaking web mode
    if (open && containerRef.current) {
      const rootNode = containerRef.current.getRootNode()
      if (rootNode instanceof ShadowRoot) {
        // Find Plasmo's built-in target node using the id referenced in your inspector-sidebar.css file
        const internalTarget = rootNode.getElementById(
          "plasmo-shadow-container"
        )
        setPortalTarget((internalTarget as HTMLElement) || containerRef.current)
      }
    }
  }, [open])

  // Listens for message broadcasts arriving from the background page relay script
  useMessage<ToggleSidebarRequest, any>((req, res) => {
    if (req.name === "inspector-ui-update") {
      const payload = req.body

      if (payload.action === "show") {
        setElementData(payload.data)
        setOpen(true)

        if (hostRef.current) {
          hostRef.current.setAttribute(
            "data-theme",
            payload.data?.theme === "dark" ? "dark" : "light"
          )
        }
      } else if (payload.action === "hide") {
        setOpen(false)
      }
    }
  })

  return (
    /* We map contents styling directly so the element wrappers inherit tailwind typography settings */
    <div
      ref={containerRef}
      className="contents text-foreground bg-background font-sans">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Pass your container ref here to anchor Base UI safely into Plasmo's Shadow Root workspace */}
        <SheetContent
          container={portalTarget}
          className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-2/5 gap-0">
          <SheetHeader className="sticky top-0 border-b border-border">
            <SheetTitle>Element Inspector</SheetTitle>
          </SheetHeader>

          <div className="overflow-y-auto">
            <div className="mt-6 space-y-4 px-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Tag
                </h3>
                <code className="block bg-muted px-2 py-1 rounded text-sm">
                  {elementData?.tagName || "div"}
                </code>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Classes
                </h3>
                <div className="flex flex-wrap gap-1">
                  {(
                    elementData?.classList || ["flex", "items-center", "gap-2"]
                  ).map((c: string) => (
                    <span
                      key={c}
                      className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Computed Styles
                </h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                  {elementData?.computedStylesCSS || "display: flex;\n..."}
                </pre>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
