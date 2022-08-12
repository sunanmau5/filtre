import { useUrlContext } from '@contexts/url'
import React from 'react'
import { Router } from 'react-chrome-extension-router'
import { Paths } from '../types/entry-type'
import { getStoredFilters } from '../utils/storage'

interface Props {
  errorView: () => React.ReactElement
  children(data: Paths): React.ReactElement
}

export const PopupWithRouter: React.FC<Props> = (props) => {
  const { errorView, children } = props

  const { url } = useUrlContext()
  const { hostname, pathname } = url

  const [entries, setEntries] = React.useState<Paths | null>(null)

  const fetchParams = () => {
    getStoredFilters().then((filters) => {
      if (filters[hostname]) {
        setEntries(filters[hostname])
      } else {
        setEntries(null)
      }
    })
  }

  React.useEffect(fetchParams, [hostname, pathname])

  if (!entries) {
    return errorView()
  }

  return <Router>{children(entries)}</Router>
}
