import React from 'react'
import { GeneralState } from '../types'

const useCustomPathname = (
  hostname: string,
  pathname: string
): {
  state: GeneralState
  customPathname: string
} => {
  const [state, setState] = React.useState<GeneralState>('loading')
  const [customPathname, setCustomPathname] = React.useState<string>(
    hostname + pathname
  )

  React.useEffect(() => {
    try {
      setState('loading')
      setCustomPathname((hostname + pathname).replace(/[\/]/g, ' > '))
      setState('ready')
    } catch (e: any) {
      setCustomPathname('')
      setState('error')
    }
  }, [hostname, pathname])

  return { state, customPathname }
}

export default useCustomPathname
