// /contents/inspector.ts
import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

import { extractElementData } from "./extractor"
import { hideOverlay, removeOverlay, showOverlay } from "./overlay"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false
}

let inspecting = false
let hoveredElement: HTMLElement | null = null

function startInspecting() {
  if (inspecting) return
  inspecting = true
  document.addEventListener("mousemove", onMouseMove, true)
  document.addEventListener("click", onClick, true)
  document.addEventListener("keydown", onKeyDown, true)
  document.body.style.cursor = "crosshair"
}

function stopInspecting() {
  inspecting = false
  hoveredElement = null
  document.removeEventListener("mousemove", onMouseMove, true)
  document.removeEventListener("click", onClick, true)
  document.removeEventListener("keydown", onKeyDown, true)
  document.body.style.cursor = ""
}

function onMouseMove(e: MouseEvent) {
  if (!inspecting) return
  hoveredElement = document.elementFromPoint(
    e.clientX,
    e.clientY
  ) as HTMLElement | null
  hoveredElement ? showOverlay(hoveredElement) : hideOverlay()
}

async function onClick(e: MouseEvent) {
  if (!inspecting) return
  e.preventDefault()
  e.stopPropagation()

  if (!hoveredElement) return
  const data = extractElementData(hoveredElement)

  removeOverlay()
  stopInspecting()

  // CLEAN: Sent to Plasmo's typed background processor
  await sendToBackground({
    name: "inspector-relay",
    body: { action: "show", data }
  })
}

async function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    removeOverlay()
    stopInspecting()
    await sendToBackground({
      name: "inspector-relay",
      body: { action: "hide" }
    })
  }
}

// Keep standard runtime listener ONLY for instructions arriving from the extension POPUP
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.name === "start-inspecting") {
    startInspecting()
    sendResponse({ success: true })
  }
  return true
})
