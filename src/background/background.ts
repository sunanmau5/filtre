import { getCurrentTab, groupParamsByKey } from "./utils"

const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version

const upsert = (url: string, params: Record<string, any>) => {
  chrome.storage.local.get({ filters: {} }, res => {
    const filters = res.filters

    if (!filters[url]) filters[url] = []

    filters[url].push({
      version: STORE_FORMAT_VERSION,
      uuid: crypto.randomUUID(),
      createdAt: Date.now(),
      params
    })

    console.log({ filters })
    chrome.storage.local.set({ filters })
  })
}

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    const currentTab = await getCurrentTab()
    if (currentTab.url) {
      const { hostname, pathname, search } = new URL(currentTab.url)
      const params = new URLSearchParams(search)
      const groupedParams = groupParamsByKey(params)
      if (!!params.toString()) {
        upsert(hostname + pathname, groupedParams)
      } else {
        console.log('no params provided')
      }
    }
  }
})
