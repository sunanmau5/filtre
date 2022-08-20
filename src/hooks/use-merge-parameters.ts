import React from 'react'
import { GeneralState } from 'src/types'

const useMergeParameters = (
  currentParameters: string,
  paramKey: string,
  paramValue: string
): { state: GeneralState; mergeParameters: () => string } => {
  const [state, setState] = React.useState<GeneralState>('ready')

  const mergeParameters = (): string => {
    setState('loading')
    try {
      const params = new URLSearchParams(currentParameters)
      params.set(paramKey, paramValue)

      const mergedParamsArray: string[] = []
      for (const [key, value] of params.entries()) {
        mergedParamsArray.push(`${key}=${value}`)
      }

      setState('ready')
      return `?${mergedParamsArray.join('&')}`
    } catch (e: any) {
      setState('error')
      return ''
    }
  }

  return { state, mergeParameters }
}

export default useMergeParameters
