export interface LocalStorage {
  filters?: Record<string, any>
  config?: Record<string, any>
}

export type LocalStorageKeys = keyof LocalStorage

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

export const clearFilters = () => setStoredFilters({})

export const clearConfig = () => setStoredConfig({})
