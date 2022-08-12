import { BasicCard } from '@components/BasicCard'
import { BasicCardTitle } from '@components/BasicCard/title'
import { NoEntries } from '@components/EntryList/no-entries'
import React from 'react'
import { Box } from 'rebass'
import { useUrlContext } from '../contexts/url'
import { PopupWithAction } from './popup-with-action'
import { PopupWithRouter } from './popup-with-router'

export const Popup: React.FC = () => {
  const { url } = useUrlContext()

  return (
    <BasicCard>
      <Box
        p={3}
        sx={{
          borderBottom: '1px solid rgb(209, 213, 219)',
          bg: 'white'
        }}>
        <BasicCardTitle>{url.hostname}</BasicCardTitle>
      </Box>
      <PopupWithRouter
        errorView={() => (
          <NoEntries
            text={'You currently have no entries available for this website.'}
          />
        )}>
        {(entries) => <PopupWithAction entries={entries} />}
      </PopupWithRouter>
    </BasicCard>
  )
}
