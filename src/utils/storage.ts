import { Entries } from '../types/entry-type'
import { groupParamsByKey } from './url'

export interface LocalStorage {
  filters?: Record<string, any>
  config?: Record<string, any>
}

export type LocalStorageKeys = keyof LocalStorage

const STORE_FORMAT_VERSION = chrome.runtime.getManifest()?.version ?? '1.0.0'

export const setStoredKey = (
  key: LocalStorageKeys,
  data: Record<string, any>
): Promise<void> => {
  const vals: LocalStorage = { [key]: data }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, resolve)
  })
}

export const getStoredKey = (
  key: LocalStorageKeys
): Promise<Record<string, any>> => {
  const keys: LocalStorageKeys[] = [key]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res[key] ?? {})
    })
  })
}

export const setStoredFilters = (
  filters: Record<string, any>
): Promise<void> => {
  return setStoredKey('filters', filters)
}

export const getStoredFilters = (): Promise<Record<string, any>> => {
  return getStoredKey('filters')
}

export const setStoredConfig = (config: Record<string, any>): Promise<void> => {
  return setStoredKey('config', config)
}

export const getStoredConfig = (): Promise<Record<string, any>> => {
  return getStoredKey('config')
}

const upsertParams = (entries: Entries, params: Record<string, any>) => {
  const localEntries = entries || []
  Object.entries(params).map(([key, value]) => {
    const idx = localEntries.findIndex(
      (obj) => obj.paramKey === key && obj.paramValue === value
    )

    if (idx > -1) {
      localEntries[idx] = {
        ...localEntries[idx],
        version: STORE_FORMAT_VERSION,
        count: localEntries[idx].count + 1,
        lastUpdatedAt: Date.now()
      }
    } else {
      localEntries.push({
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
  return localEntries
}

const pathnameToJsonRecursive = (
  json: Record<string, any>,
  subdirectories: string[],
  parameters: Record<string, any>
): Record<string, any> | undefined => {
  // Get the first element of array
  let element = subdirectories.shift()

  // Exit condition
  if (typeof element === 'undefined' || element === null) return

  if (element === '') {
    element = '/'
  }
  // If JSON key exists, use the existing object, otherwise an empty
  // object is created. Or upserting param count if json[element] is
  // an array.
  if (
    !json[element] ||
    (Array.isArray(json[element]) && json[element].length >= 0)
  ) {
    json[element] =
      subdirectories.length === 0 ? upsertParams(json[element], parameters) : {}
  }

  return pathnameToJsonRecursive(json[element], subdirectories, parameters)
}

export const upsertFilter = (url: string) => {
  const { hostname, pathname, search } = new URL(url)
  const params = new URLSearchParams(search)
  const groupedParams = groupParamsByKey(params)

  const subdir = pathname.split('/')
  subdir.shift()
  getStoredFilters().then((filters) => {
    if (!filters[hostname]) {
      filters[hostname] = {}
    }
    pathnameToJsonRecursive(filters[hostname], subdir, groupedParams)
    setStoredFilters(filters)
  })
}

export const upsertFilterV2 = (url: string) => {
  const { hostname, pathname, search } = new URL(url)

  // Early exit if no query parameters is passed
  if (!search) return

  const params = new URLSearchParams(search)
  const groupedParams = groupParamsByKey(params)

  getStoredFilters().then((filters) => {
    if (!filters[hostname]) {
      filters[hostname] = {}
    }
    if (!filters[hostname][pathname]) {
      filters[hostname][pathname] = []
    }
    const entries = upsertParams(filters[hostname][pathname], groupedParams)
    filters[hostname][pathname] = entries
    setStoredFilters(filters)
  })
}

export const clearFilters = () => setStoredFilters({})

export const clearConfig = () => setStoredConfig({})
