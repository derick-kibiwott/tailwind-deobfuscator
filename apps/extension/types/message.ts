// /background/messages/types.ts

export type InspectorMessageBody = {
  tagName?: string
  classList?: string[]
  computedStylesCSS?: string
  theme?: "light" | "dark"
}

export type ToggleSidebarRequest = {
  action: "show" | "hide"
  data?: InspectorMessageBody
}
