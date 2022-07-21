export const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  const queryOptions = { active: true, lastFocusedWindow: true }
  return new Promise((resolve) => {
    chrome.tabs.query(queryOptions, (tab) => {
      resolve(tab[0])
    })
  })
}

export const navigateToUrl = (url: string) => {
  chrome.tabs.create({ url })
}
