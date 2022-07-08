import { Entries } from './types'
import { getCurrentTab, groupParamsByKey } from './utils'

const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version

const upsert = (url: string, params: Record<string, any>) => {
  chrome.storage.local.get({ filters: {} }, (res) => {
    const filters: Record<string, Entries> = res.filters

    if (!filters[url]) {
      filters[url] = []
    }

    console.log({ params })

    Object.entries(params).map(([key, value]) => {
      const idx = filters[url].findIndex(
        (obj) => obj.paramKey === key && obj.paramValue === value
      )

      if (idx > -1) {
        filters[url][idx] = {
          ...filters[url][idx],
          version: STORE_FORMAT_VERSION,
          count: filters[url][idx].count + 1,
          lastUpdatedAt: Date.now()
        }
      } else {
        filters[url].push({
          uuid: crypto.randomUUID(),
          createdAt: Date.now(),
          version: STORE_FORMAT_VERSION,
          paramKey: key,
          paramValue: value,
          count: 1,
          lastUpdatedAt: Date.now()
        })
      }
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
