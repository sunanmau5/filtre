import { BasicCard } from '@components/BasicCard'
import { BasicCardTitle } from '@components/BasicCard/title'
import { EntryList } from '@components/EntryList'
import React, { useEffect, useState } from 'react'
import { Router } from 'react-chrome-extension-router'
import { Box } from 'rebass'
import { NoEntries } from '../components/EntryList/no-entries'
import { UrlType } from '../contexts/url'
import { Entries } from '../types/entry-type'
import { getStoredFilters } from '../utils/storage'
import { NavigateAction } from './navigate-action'

export const PopupWithUrl: React.FC<UrlType> = (props) => {
  const { hostname, pathname } = props
  const [entries, setEntries] = useState<Record<string, Entries> | null>(null)

  const fetchParams = () => {
    getStoredFilters().then((filters) => {
      if (filters[hostname]) {
        setEntries(filters[hostname])
      } else {
        setEntries(null)
      }
    })
  }

  useEffect(fetchParams, [hostname, pathname])

  return (
    <BasicCard>
      <Box
        p={3}
        sx={{
          borderBottom: '1px solid rgb(209, 213, 219)',
          bg: 'white'
        }}>
        <BasicCardTitle>{hostname}</BasicCardTitle>
      </Box>

      {entries ? (
        <Router>
          <EntryList entries={entries} />
        </Router>
      ) : (
        <NoEntries text="You currently have no entries available for this website." />
      )}

      <NavigateAction />
    </BasicCard>
  )
}
