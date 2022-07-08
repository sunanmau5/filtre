export const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

export const navigateToUrl = (url: string) => {
  chrome.tabs.create({ url })
}
