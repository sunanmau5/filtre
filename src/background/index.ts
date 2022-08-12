import {
  setStoredConfig,
  setStoredFilters,
  upsertFilterV2
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
  setStoredConfig({ excludedParameters: [] })
})

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (tab.url && changeInfo.status === 'complete') {
    upsertFilterV2(tab.url)
  }
})
