import { BasicCard } from '@components/BasicCard'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { BasicCardTitle } from '@components/BasicCard/title'
import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { UrlType } from 'src/utils/url-context'
import { Entries } from '../types/entry-type'
import { getStoredFilters } from '../utils/storage'
import { PopupEntries } from './entries'
import { PopupNoEntries } from './popup-no-entries'

export const PopupWithUrl: React.FC<UrlType> = (props) => {
  const { hostname, pathname } = props
  const url = hostname + pathname
  const [entries, setEntries] = useState<Entries | null>(null)

  const fetchParams = () => {
    getStoredFilters().then((filters) => {
      if (!filters[url]) {
        setEntries(null)
      } else {
        setEntries(filters[url])
      }
    })
  }

  useEffect(fetchParams, [url])

  return (
    <BasicCard>
      <Box
        p={3}
        sx={{
          borderBottom: '1px solid rgb(209, 213, 219)',
          backgroundColor: 'white'
        }}>
        <BasicCardTitle>{hostname}</BasicCardTitle>
        <BasicCardSubtitle>{url}</BasicCardSubtitle>
      </Box>
      {entries ? <PopupEntries entries={entries} /> : <PopupNoEntries />}
    </BasicCard>
  )
}
