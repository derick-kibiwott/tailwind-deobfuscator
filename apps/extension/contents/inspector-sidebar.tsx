import type { ToggleSidebarRequest } from "@/types/message"
import { DomTree } from "@tailwind-deobfuscator/ui/components/inspector/dom-tree"
import { RawStyles } from "@tailwind-deobfuscator/ui/components/inspector/raw-styles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@tailwind-deobfuscator/ui/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@tailwind-deobfuscator/ui/components/ui/sheet"
import type { ExtractedData } from "@tailwind-deobfuscator/ui/types/inspector"
import sidebarOverlayCssText from "data-text:./inspector-sidebar.css"
import cssText from "data-text:@tailwind-deobfuscator/ui/styles/globals-built.css"
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

  let transformed = cssText
    .replaceAll(":root", ":host(plasmo-csui)")
    .replaceAll(".dark", ':host(plasmo-csui[data-theme="dark"])')
    .replace(
      /([\d.]+)rem/g,
      (_match, remValue) => `${parseFloat(remValue) * baseFontSize}px`
    )

  const style = document.createElement("style")
  style.textContent = `${transformed}\n${sidebarOverlayCssText}`
  return style
}

export default function InspectorSidebar() {
  const [open, setOpen] = useState(false)
  const [elementData, setElementData] = useState<ExtractedData | null>(null)

  const hostRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    hostRef.current = document.querySelector("plasmo-csui")
  }, [])

  useEffect(() => {
    if (open && containerRef.current) {
      const rootNode = containerRef.current.getRootNode()
      if (rootNode instanceof ShadowRoot) {
        const internalTarget = rootNode.getElementById(
          "plasmo-shadow-container"
        )
        setPortalTarget((internalTarget as HTMLElement) || containerRef.current)
      }
    }
  }, [open])

  useMessage<ToggleSidebarRequest, any>((req, _res) => {
    if (req.name !== "inspector-ui-update") return

    const { action, data } = req.body

    if (action === "show") {
      setElementData(data as ExtractedData)
      setOpen(true)
      hostRef.current?.setAttribute(
        "data-theme",
        data?.theme === "dark" ? "dark" : "light"
      )
    } else if (action === "hide") {
      setOpen(false)
    }
  })

  const styles = elementData?.rawStyles ?? []
  return (
    <div
      ref={containerRef}
      className="contents text-foreground bg-background font-sans">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          container={portalTarget}
          className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-2/5 gap-0 flex flex-col">
          <SheetHeader className="sticky top-0 border-b border-border bg-background z-10">
            <SheetTitle>Element Inspector</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Accordion>
              <AccordionItem value="dom-tree">
                <AccordionTrigger>DOM Tree</AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-md border border-border p-3 font-mono text-xs overflow-x-auto">
                    <DomTree tree={elementData?.tree ?? null} />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="raw-styles">
                <AccordionTrigger>
                  Raw Styles ({styles.length})
                </AccordionTrigger>
                <AccordionContent>
                  <RawStyles styles={styles} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
