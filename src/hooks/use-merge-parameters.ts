import React from 'react'
import { GeneralState } from 'src/types'

const useMergeParameters = (
  currentPathname: string,
  currentParameters: string,
  path: string,
  paramKey: string,
  paramValue: string
): { state: GeneralState; mergedParameters: string } => {
  const [state, setState] = React.useState<GeneralState>('ready')
  const [mergedParameters, setMergedParameters] = React.useState<string>(
    `?${paramKey}=${paramValue}`
  )

  if (currentPathname !== path) {
    return { state, mergedParameters }
  }

  const mergeSearch = () => {
    setState('loading')
    try {
      const params = new URLSearchParams(currentParameters)
      params.set(paramKey, paramValue)

      const mergedParamsArray: string[] = []
      for (const [key, value] of params.entries()) {
        mergedParamsArray.push(`${key}=${value}`)
      }

      setMergedParameters(`?${mergedParamsArray.join('&')}`)
      setState('ready')
    } catch (e: any) {
      setMergedParameters('')
      setState('error')
    }
  }

  React.useEffect(mergeSearch, [
    currentPathname,
    currentParameters,
    paramKey,
    paramValue
  ])

  return { state, mergedParameters }
}

export default useMergeParameters
