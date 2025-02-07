import { BasicCard } from '@components/BasicCard'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { BasicCardTitle } from '@components/BasicCard/title'
import { CustomPathname } from '@components/CustomPathname'
import { EntryDecider } from '@components/Entry/decider'
import { NoEntries } from '@components/Entry/no-entries'
import { withTransition } from '@hoc/styles'
import React from 'react'
import { Settings, X } from 'react-feather'
import { Box, Flex, Image } from 'rebass'
import { PopupWithRouter } from './popup-with-router'

export function Popup() {
  return (
    <BasicCard>
      <Box
        px={3}
        py={2}
        sx={{
          borderBottom: '2px solid rgb(229, 231, 235)'
        }}>
        <Flex sx={{ alignItems: 'center', gap: 3 }}>
          <Image src="icons/filtre-icon-48.png" width={24} height={24} />
          <BasicCardTitle>Filtre</BasicCardTitle>
          <Flex sx={{ marginLeft: 'auto', gap: 2 }}>
            <FlexWithTransition
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 9999,
                p: 1,
                ':hover': { bg: 'rgb(229, 231, 235)' }
              }}
              onClick={() => chrome.runtime.openOptionsPage()}>
              <Settings size={16} strokeWidth={2} color="rgb(156, 163, 175)" />
            </FlexWithTransition>
            <FlexWithTransition
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 9999,
                p: '2px',
                ':hover': { bg: 'rgb(229, 231, 235)' }
              }}
              onClick={() => window.close()}>
              <X size={20} strokeWidth={2} color="rgb(156, 163, 175)" />
            </FlexWithTransition>
          </Flex>
        </Flex>
        <BasicCardSubtitle my={1} display="flex" truncate>
          <CustomPathname />
        </BasicCardSubtitle>
      </Box>
      <PopupWithRouter
        emptyView={() => (
          <Box py={3}>
            <NoEntries text={'No entries available for this website.'} />
          </Box>
        )}>
        {(paths) => <EntryDecider paths={paths} />}
      </PopupWithRouter>
    </BasicCard>
  )
}

const FlexWithTransition = React.memo(withTransition(Flex))
