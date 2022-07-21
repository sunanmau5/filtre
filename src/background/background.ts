import { setStoredFilters, upsertFilter } from '../utils/storage'
import { getCurrentTab } from '../utils/tabs'
import { groupParamsByKey } from './utils'

chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    getCurrentTab().then((currentTab) => {
      if (currentTab.url) {
        const { hostname, pathname, search } = new URL(currentTab.url)
        const params = new URLSearchParams(search)
        const groupedParams = groupParamsByKey(params)
        upsertFilter(hostname, pathname, groupedParams)
      }
    })
  }
})

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
})
