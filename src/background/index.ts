import {
  setStoredConfig,
  setStoredFilters,
  upsertFilter
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
  setStoredConfig({ excludedParameters: [] })
})

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (tab.url && changeInfo.status === 'complete') {
    upsertFilter(tab.url)
  }
})
