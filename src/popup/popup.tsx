import { BasicCard } from '@components/BasicCard'
import { BasicCardTitle } from '@components/BasicCard/title'
import { EntryList } from '@components/EntryList'
import React from 'react'
import { Box } from 'rebass'
import { NoEntries } from '../components/EntryList/no-entries'
import { useUrlContext } from '../contexts/url'
import { PopupAction } from './popup-action'
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
        {(entries) => <EntryList entries={entries} />}
      </PopupWithRouter>
      <PopupAction />
    </BasicCard>
  )
}
