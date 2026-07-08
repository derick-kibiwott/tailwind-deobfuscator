export type ElementNode = {
  tagName: string
  id: string | null
  classList: string[]
  children: ElementNode[]
}

export type StyleRule = {
  selector: string
  cssText: string
}

export type ExtractedData = {
  tree: ElementNode
  rawStyles: StyleRule[]
}

/**
 * Extract the DOM tree (element + children) and raw CSS rules
 * for every class found in that tree.
 */
export function extractElementData(element: HTMLElement): ExtractedData {
  const tree = buildTree(element)
  const classNames = collectClasses(tree)
  const rawStyles = extractRawStyles(classNames)

  return { tree, rawStyles }
}

/** Recursively build a lightweight tree of the element and its descendants. */
function buildTree(element: HTMLElement): ElementNode {
  const node: ElementNode = {
    tagName: element.tagName.toLowerCase(),
    id: element.id || null,
    classList: Array.from(element.classList),
    children: []
  }

  for (const child of element.children) {
    if (child instanceof HTMLElement) {
      node.children.push(buildTree(child))
    }
  }

  return node
}

/** Collect every unique class name used anywhere in the tree. */
function collectClasses(node: ElementNode): Set<string> {
  const classes = new Set<string>()
  for (const c of node.classList) classes.add(c)
  for (const child of node.children) {
    for (const c of collectClasses(child)) classes.add(c)
  }
  return classes
}

/** Pull raw CSS rules from all stylesheets whose selectors reference any of the collected classes. */
function extractRawStyles(classNames: Set<string>): StyleRule[] {
  const rules: StyleRule[] = []
  const seen = new Set<string>()

  console.log(
    "This are all the styles fetched by the extension -------->",
    document.styleSheets
  )
  for (const sheet of document.styleSheets) {
    try {
      const cssRules = sheet.cssRules || sheet.rules
      if (!cssRules) continue
      extractFromRuleList(cssRules, classNames, rules, seen)
    } catch {
      // Cross-origin stylesheet — can't read cssRules
      if (sheet.href) {
        const cssText = `/* Cross-origin stylesheet: ${sheet.href} */`
        if (!seen.has(cssText)) {
          seen.add(cssText)
          rules.push({ selector: "N/A", cssText })
        }
      }
    }
  }

  return rules
}

/** Recursively walk rule lists (including @media, @supports, etc.) to find matching class selectors. */
function extractFromRuleList(
  ruleList: CSSRuleList,
  classNames: Set<string>,
  out: StyleRule[],
  seen: Set<string>
): void {
  for (const rule of ruleList) {
    if (rule instanceof CSSStyleRule) {
      for (const className of classNames) {
        // Check if any selector in this rule references the class
        if (rule.selectorText.includes(`.${className}`)) {
          if (!seen.has(rule.cssText)) {
            seen.add(rule.cssText)
            out.push({
              selector: rule.selectorText,
              cssText: rule.cssText
            })
          }
          break
        }
      }
    } else if (
      rule instanceof CSSMediaRule ||
      rule instanceof CSSSupportsRule ||
      rule instanceof CSSContainerRule
    ) {
      extractFromRuleList(rule.cssRules, classNames, out, seen)
    }
  }
}
