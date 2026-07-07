const OVERLAY_ID = "td-inspector-overlay"

function getOverlay(): HTMLElement {
  let overlay = document.getElementById(OVERLAY_ID)
  if (overlay) return overlay

  overlay = document.createElement("div")
  overlay.id = OVERLAY_ID
  overlay.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    border: 2px dashed #3b82f6;
    background: rgba(59, 130, 246, 0.08);
    border-radius: 2px;
    transition: top 0.05s, left 0.05s, width 0.05s, height 0.05s;
    display: none;
    box-sizing: border-box;
  `
  document.body.appendChild(overlay)
  return overlay
}

export function showOverlay(element: HTMLElement) {
  const overlay = getOverlay()
  const rect = element.getBoundingClientRect()

  overlay.style.display = "block"
  overlay.style.top = `${rect.top}px`
  overlay.style.left = `${rect.left}px`
  overlay.style.width = `${rect.width}px`
  overlay.style.height = `${rect.height}px`
}

export function hideOverlay() {
  const overlay = document.getElementById(OVERLAY_ID)
  if (overlay) overlay.style.display = "none"
}

export function removeOverlay() {
  const overlay = document.getElementById(OVERLAY_ID)
  if (overlay) overlay.remove()
}
