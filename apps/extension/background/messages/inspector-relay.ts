// /background/messages/inspector-relay.ts

import type { ToggleSidebarRequest } from "@/types/message"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler<ToggleSidebarRequest> = async (
  req,
  res
) => {
  const { sender, body } = req

  // Ensure we have a valid tab ID from the calling content script
  if (!sender?.tab?.id) {
    res.send({ success: false, error: "No active tab context found" })
    return
  }

  try {
    //  Forward the message context down the same tab's CSUI layer using Tabs
    await chrome.tabs.sendMessage(sender.tab.id, {
      name: "inspector-ui-update",
      body
    })

    res.send({ success: true })
  } catch (error) {
    res.send({ success: false, error: (error as Error).message })
  }
}

export default handler
