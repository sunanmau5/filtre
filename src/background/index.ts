import { DEFAULT_TOP_FILTERS_COUNT } from '../constants'
import { IEntry, IParameters, IPath } from '../types'
import {
  getStoredFilters,
  setStoredConfig,
  setStoredFilters
} from '../utils/storage'
import { groupParamsByKey } from '../utils/url'

const STORE_FORMAT_VERSION = chrome.runtime.getManifest()?.version ?? '1.0.0'

chrome.runtime.onInstalled.addListener(() => {
  //
  //
  setStoredFilters({})
  setStoredConfig({
    excludedParameters: [],
    topFiltersCount: DEFAULT_TOP_FILTERS_COUNT
  })
})

export const upsertParams = (
  currentParams: IParameters,
  newParams: URLSearchParams
) => {
  //
  //
  const localParams = currentParams || []
  const groupedParams = groupParamsByKey(newParams)

  Object.entries(groupedParams).map(([key, value]) => {
    //
    //
    const paramIndex = localParams?.findIndex(
      (obj) => obj.paramKey === key && obj.paramValue === value
    )

    if (paramIndex > -1) {
      //
      //
      localParams[paramIndex] = {
        ...localParams[paramIndex],
        version: STORE_FORMAT_VERSION,
        count: localParams[paramIndex].count + 1,
        lastUpdatedAt: Date.now()
      }
    } else {
      //
      //
      localParams.push({
        uuid: crypto.randomUUID(),
        createdAt: Date.now(),
        version: STORE_FORMAT_VERSION,
        paramKey: key,
        paramValue: value.toString(),
        count: 1,
        lastUpdatedAt: Date.now()
      })
    }
  })
  return localParams
}

export const recursiveFunc = (
  filters: IPath[],
  paths: string[],
  parameters: URLSearchParams
) => {
  //
  // Get the first element of paths array
  const element = paths.shift()

  // Exit condition
  if (typeof element === 'undefined' || element === null) return

  const pathIndex = filters.findIndex((f) => f.name === element)

  if (pathIndex > -1) {
    //
    // if exists, update existing Path object
    if (paths.length > 0) {
      //
      //
      recursiveFunc(filters[pathIndex].subpaths, paths, parameters)
    } else {
      //
      //
      filters[pathIndex].parameters = upsertParams(
        filters[pathIndex].parameters,
        parameters
      )
    }
  } else {
    //
    // if not exists, add new Path object
    if (paths.length > 0) {
      //
      // if paths length is still greater than zero
      // continue inserting subpaths
      const newLength = filters.push({
        name: element,
        parameters: [],
        subpaths: []
      })
      recursiveFunc(filters[newLength - 1].subpaths, paths, parameters)
    } else {
      //
      //
      const newParameters = upsertParams([], parameters)
      filters.push({
        name: element,
        parameters: newParameters,
        subpaths: []
      })
    }
  }
}

export const getSubdirectories = (pathname: string) => {
  const subdir = pathname.split('/').map((p) => `/${p}`)

  // Ignore first slash
  subdir.shift()

  return subdir
}

export const queryStringToJson = (filters: IEntry, url: string) => {
  const { hostname, pathname, searchParams } = new URL(url)
  const subdir = getSubdirectories(pathname)

  if (!filters[hostname]) {
    filters[hostname] = []
  }

  recursiveFunc(filters[hostname], subdir, searchParams)
  return filters[hostname]
}

const upsertFilter = async (url: string): Promise<number> => {
  const filters = await getStoredFilters()
  const hostnameFilters = queryStringToJson(filters, url)
  setStoredFilters(filters)
  return hostnameFilters.length
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  //
  //
  if (tab.url && changeInfo.status === 'complete') {
    const badgeNumber = await upsertFilter(tab.url)
    chrome.action.setBadgeText({ tabId, text: badgeNumber.toString() })
  }
})
