import { useUrlContext } from '@contexts/url'
import React from 'react'
import { GeneralState, IPaths } from '../types'
import { getStoredFilters } from '../utils/storage'

const useStoredFilters = (): {
  state: GeneralState
  entries: IPaths | null
} => {
  const {
    url: { hostname, pathname }
  } = useUrlContext()

  const [state, setState] = React.useState<GeneralState>('loading')
  const [entries, setEntries] = React.useState<IPaths | null>(null)

  const fetchParams = () => {
    setState('loading')
    try {
      getStoredFilters().then((filters) => {
        if (filters[hostname]) {
          setEntries(filters[hostname])
        } else {
          setEntries(null)
        }
      })
      setState('ready')
    } catch (e: unknown) {
      setEntries(null)
      setState('error')
    }
  }

  React.useEffect(fetchParams, [hostname, pathname])

  return { state, entries }
}

export default useStoredFilters
