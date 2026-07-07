import type { PlasmoCSConfig } from "plasmo"

import { extractElementData } from "./extractor"
import { hideOverlay, removeOverlay, showOverlay } from "./overlay"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false
}

console.log(
  "-------------------- The inspector has loaded --------------------"
)

let inspecting = false
let hoveredElement: HTMLElement | null = null

function startInspecting() {
  if (inspecting) return
  inspecting = true

  document.addEventListener("mousemove", onMouseMove, true)
  document.addEventListener("click", onClick, true)
  document.addEventListener("keydown", onKeyDown, true)

  document.body.style.cursor = "crosshair"
  console.log("Inspection started")
}

function stopInspecting() {
  inspecting = false
  hoveredElement = null

  document.removeEventListener("mousemove", onMouseMove, true)
  document.removeEventListener("click", onClick, true)
  document.removeEventListener("keydown", onKeyDown, true)

  document.body.style.cursor = ""

  console.log("Inspection stopped")
}

function onMouseMove(e: MouseEvent) {
  if (!inspecting) return

  hoveredElement = document.elementFromPoint(
    e.clientX,
    e.clientY
  ) as HTMLElement | null

  if (hoveredElement) {
    showOverlay(hoveredElement)
  } else {
    hideOverlay()
  }
}

function onClick(e: MouseEvent) {
  if (!inspecting) return

  e.preventDefault()
  e.stopPropagation()

  if (!hoveredElement) return

  // Extract all data
  const data = extractElementData(hoveredElement)

  console.log("=== Selected Element ===")
  console.log("Tag:", data.tagName)
  console.log("ID:", data.id)
  console.log("Classes:", data.classList)
  console.log("Inline styles:", data.inlineStyles)
  console.log("Matched rules:", data.matchedRules)
  console.log("Computed CSS:\n", data.computedStylesCSS)
  console.log("Full data:", data)

  removeOverlay()
  stopInspecting()
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    removeOverlay()
    stopInspecting()
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.name === "start-inspecting") {
    startInspecting()
    sendResponse({ success: true })
  }
  return true
})
