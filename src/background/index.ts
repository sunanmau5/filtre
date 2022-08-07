import { setStoredFilters } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setStoredFilters({})
})
