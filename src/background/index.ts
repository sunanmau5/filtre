import { Parameters, PathType } from '../types/entry-type'
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
  setStoredConfig({ excludedParameters: [] })
})

const upsertParams = (
  currentParams: Parameters,
  newParams: Record<string, any>
) => {
  //
  //
  const localParams = currentParams || []
  Object.entries(newParams).map(([key, value]) => {
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
        paramValue: value,
        count: 1,
        lastUpdatedAt: Date.now()
      })
    }
  })
  return localParams
}

const recursiveFunc = (
  filters: PathType[],
  paths: Array<string>,
  parameters: Record<string, string | string[]>
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

const upsertFilter = (url: string) => {
  const { hostname, pathname, search } = new URL(url)
  const params = new URLSearchParams(search)
  const groupedParams = groupParamsByKey(params)

  const subdir = pathname.split('/').map((p) => `/${p}`)

  // Ignore first slash if pathname exists
  if (pathname !== '/') {
    subdir.shift()
  }

  getStoredFilters().then((filters) => {
    //
    //
    if (!filters[hostname]) {
      filters[hostname] = []
    }

    recursiveFunc(filters[hostname], subdir, groupedParams)
    setStoredFilters(filters)
  })
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  //
  //
  if (tab.url && changeInfo.status === 'complete') {
    upsertFilter(tab.url)
  }
})
