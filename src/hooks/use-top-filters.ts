import { useConfigContext } from '@contexts/config'
import React from 'react'
import { GeneralState, IPaths, ITopFilters } from '../types'
import { getStoredFilters } from '../utils/storage'

// Steps:
// 1. Initialize an array, maximum length is topFiltersCount
// 2. Iterate through all root paths
// 3. Iterate through parameters array for each path
// 4. Compare count values between each parameter
// 5. Iterate through subpaths array
// 6. Repeat steps 3-5 until end of array

const useTopFilters = (
  hostname: string
): {
  state: GeneralState
  topFilters: ITopFilters | null
} => {
  const {
    loading,
    config: { excludedParameters, topFiltersCount }
  } = useConfigContext()

  const [state, setState] = React.useState<GeneralState>('loading')
  const [topFilters, setTopFilters] = React.useState<ITopFilters | null>(null)

  const recursiveTopFilterFunc = (
    topFilters: ITopFilters,
    paths: IPaths,
    pathname?: string
  ) => {
    for (const { name, parameters, subpaths } of paths) {
      let subpathname = pathname ? `${pathname}${name}` : name

      // Find out the maximum count of the parameters
      for (const param of parameters) {
        const { uuid, count, paramKey, paramValue } = param
        if (
          // Continue if current `count` is less than
          // the minimum value of the `topFilters` array
          (topFilters.length === topFiltersCount &&
            count < topFilters[topFiltersCount - 1].count) ||
          // Continue if user excludes current `paramKey`
          // in the options page
          excludedParameters.includes(paramKey)
        ) {
          continue
        }
        topFilters.push({
          path: subpathname,
          uuid,
          count,
          paramKey,
          paramValue
        })

        // Always sort the parameter count in an ascending
        // order
        topFilters.sort((a, b) => b.count - a.count)

        // Remove excess `count` if `topFilters` length
        // exceeds the `topFiltersCount`
        if (topFilters.length > topFiltersCount) {
          topFilters.pop()
        }
      }
      recursiveTopFilterFunc(topFilters, subpaths, subpathname)
    }
  }

  const getTopFilters = () => {
    try {
      getStoredFilters().then((filters) => {
        setState('loading')
        const hostnameFilters = filters[hostname]
        const localTopFilters: ITopFilters = []
        recursiveTopFilterFunc(localTopFilters, hostnameFilters)
        setTopFilters(localTopFilters)
        setState('ready')
      })
    } catch (e: any) {
      setTopFilters(null)
      setState('error')
    }
  }

  React.useEffect(() => {
    if (!loading) {
      getTopFilters()
    }
  }, [loading, topFiltersCount, hostname])

  return { state, topFilters }
}

export default useTopFilters
