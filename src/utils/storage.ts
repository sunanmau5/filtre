import { Entries } from 'src/types/entry-type'

export interface LocalStorage {
  filters?: Record<string, Entries>
}

export type LocalStorageKeys = keyof LocalStorage

const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version

export const setStoredFilters = (
  filters: Record<string, Entries>
): Promise<void> => {
  const vals: LocalStorage = { filters }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => resolve())
  })
}

export const getStoredFilters = (): Promise<Record<string, Entries>> => {
  const keys: LocalStorageKeys[] = ['filters']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.filters ?? {})
    })
  })
}

export const upsertFilter = (url: string, params: Record<string, any>) => {
  getStoredFilters().then((filters) => {
    if (!filters[url]) {
      filters[url] = []
    }

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

    setStoredFilters(filters)
  })
}
