import { setStoredFilters, upsertFilter } from 'src/utils/storage'
import { getCurrentTab, groupParamsByKey } from './utils'

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    const currentTab = await getCurrentTab()
    if (currentTab.url) {
      const { hostname, pathname, search } = new URL(currentTab.url)
      const params = new URLSearchParams(search)
      const groupedParams = groupParamsByKey(params)
      if (!!params.toString()) {
        upsertFilter(hostname + pathname, groupedParams)
      } else {
        console.log('no params provided')
      }
    }
  }
})

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
})
