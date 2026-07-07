export interface ExtractedElementData {
  tagName: string
  id: string | null
  classList: string[]
  inlineStyles: string
  computedStyles: Record<string, string>
  computedStylesCSS: string
  matchedRules: Array<{
    selector: string
    cssText: string
    source: string
  }>
  dimensions: {
    width: number
    height: number
    top: number
    left: number
  }
}

/**
 * Extract all relevant data for a given DOM element.
 */
export function extractElementData(element: HTMLElement): ExtractedElementData {
  const computed = window.getComputedStyle(element)
  const computedStyles: Record<string, string> = {}
  const nonDefaultStyles: Record<string, string> = {}

  // Iterate all computed properties
  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i]
    const value = computed.getPropertyValue(prop)
    computedStyles[prop] = value

    // Filter out empty/initial values to reduce noise
    if (
      value &&
      value !== "initial" &&
      value !== "none" &&
      value !== "normal" &&
      value !== "auto"
    ) {
      nonDefaultStyles[prop] = value
    }
  }

  // Get matched CSS rules from stylesheets
  const matchedRules: ExtractedElementData["matchedRules"] = []

  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules || sheet.rules
      if (!rules) continue

      for (const rule of rules) {
        if (rule instanceof CSSStyleRule) {
          const selectors = rule.selectorText.split(",")
          for (const selector of selectors) {
            try {
              if (element.matches(selector.trim())) {
                matchedRules.push({
                  selector: rule.selectorText,
                  cssText: rule.cssText,
                  source: sheet.href || "inline"
                })
                break
              }
            } catch {
              // Invalid selector, skip
            }
          }
        }
      }
    } catch {
      // Cross-origin stylesheet — can't read cssRules
      if (sheet.href) {
        matchedRules.push({
          selector: "N/A",
          cssText: `/* Cross-origin stylesheet: ${sheet.href} */`,
          source: sheet.href
        })
      }
    }
  }

  const rect = element.getBoundingClientRect()

  return {
    tagName: element.tagName.toLowerCase(),
    id: element.id || null,
    classList: Array.from(element.classList),
    inlineStyles: element.style.cssText,
    computedStyles: nonDefaultStyles,
    computedStylesCSS: formatComputedStyles(element, nonDefaultStyles),
    matchedRules,
    dimensions: {
      width: rect.width,
      height: rect.height,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  }
}

/**
 * Format computed styles as a raw CSS block.
 */
function formatComputedStyles(
  element: HTMLElement,
  styles: Record<string, string>
): string {
  const selector = element.id
    ? `#${element.id}`
    : element.classList.length > 0
      ? `.${Array.from(element.classList).join(".")}`
      : element.tagName.toLowerCase()

  const declarations = Object.entries(styles)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n")

  return `${selector} {\n${declarations}\n}`
}
