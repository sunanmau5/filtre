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

export const updateCurrentTab = (url: string) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.update(tabs[0].id, { url })
    }
  })
}
