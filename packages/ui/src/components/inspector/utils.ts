export function prettyPrintCSS(cssText: string): string {
  // Basic pretty-print: add newlines after ; and {
  return cssText
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*\}\s*/g, "\n}")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}
