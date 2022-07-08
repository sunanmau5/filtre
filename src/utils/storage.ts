import { Entries } from '../types/entry-type'

export interface LocalStorage {
  filters?: Record<string, Record<string, Entries>>
}

export type LocalStorageKeys = keyof LocalStorage

const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version

export const setStoredFilters = (
  filters: Record<string, Record<string, Entries>>
): Promise<void> => {
  const vals: LocalStorage = { filters }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, resolve)
  })
}

export const getStoredFilters = (): Promise<
  Record<string, Record<string, Entries>>
> => {
  const keys: LocalStorageKeys[] = ['filters']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.filters ?? {})
    })
  })
}

export const upsertFilter = (
  hostname: string,
  pathname: string,
  params: Record<string, any>
) => {
  getStoredFilters().then((filters) => {
    if (!filters[hostname]) {
      filters[hostname] = {}
    }
    if (!filters[hostname][pathname]) {
      filters[hostname][pathname] = []
    }
    Object.entries(params).map(([key, value]) => {
      const idx = (filters[hostname][pathname] || [])?.findIndex(
        (obj) => obj.paramKey === key && obj.paramValue === value
      )

      if (idx > -1) {
        filters[hostname][pathname][idx] = {
          ...filters[hostname][pathname][idx],
          version: STORE_FORMAT_VERSION,
          count: filters[hostname][pathname][idx].count + 1,
          lastUpdatedAt: Date.now()
        }
      } else {
        filters[hostname][pathname].push({
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
