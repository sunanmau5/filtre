import { useUrlContext } from '@contexts/url'
import React from 'react'
import { Router } from 'react-chrome-extension-router'
import { Entries } from '../types/entry-type'
import { getStoredFilters } from '../utils/storage'

interface Props {
  errorView: () => React.ReactElement
  children(data: Record<string, Entries>): React.ReactElement
}

export const PopupWithRouter: React.FC<Props> = (props) => {
  const { errorView, children } = props

  const { url } = useUrlContext()
  const { hostname, pathname } = url

  const [entries, setEntries] = React.useState<Record<string, Entries> | null>(
    null
  )

  const fetchParams = () => {
    getStoredFilters().then((filters) => {
      if (filters[hostname]) {
        if (filters[hostname][pathname]) {
          setEntries(filters[hostname][pathname])
          return
        }
      }
      setEntries(null)
    })
  }

  React.useEffect(fetchParams, [hostname, pathname])

  if (!entries) {
    return errorView()
  }

  return <Router>{children(entries)}</Router>
}
