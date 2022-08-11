import { setStoredConfig, setStoredFilters } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
  setStoredConfig({ excludedParameters: [] })
})
