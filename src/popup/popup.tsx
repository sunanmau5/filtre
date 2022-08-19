import { BasicCard } from '@components/BasicCard'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { BasicCardTitle } from '@components/BasicCard/title'
import { CustomPathname } from '@components/CustomPathname'
import { EntryDecider } from '@components/Entry/decider'
import { NoEntries } from '@components/Entry/no-entries'
import React from 'react'
import { Settings, X } from 'react-feather'
import { Box, Flex, Image } from 'rebass'
import { PopupWithRouter } from './popup-with-router'

export const Popup: React.FC = () => {
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
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 9999,
                p: 1,
                ':hover': { bg: 'rgb(229, 231, 235)' },
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms'
              }}
              onClick={() => chrome.runtime.openOptionsPage()}>
              <Settings size={16} strokeWidth={2} color="rgb(156, 163, 175)" />
            </Flex>
            <Flex
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: 9999,
                p: '2px',
                ':hover': { bg: 'rgb(229, 231, 235)' },
                transitionProperty: 'all',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms'
              }}
              onClick={() => window.close()}>
              <X size={20} strokeWidth={2} color="rgb(156, 163, 175)" />
            </Flex>
          </Flex>
        </Flex>
        <BasicCardSubtitle my={1} display="flex" truncate>
          <CustomPathname />
        </BasicCardSubtitle>
      </Box>
      <PopupWithRouter
        errorView={() => (
          <Box py={3}>
            <NoEntries
              text={'You currently have no entries available for this website.'}
            />
          </Box>
        )}>
        {(paths) => <EntryDecider paths={paths} />}
      </PopupWithRouter>
    </BasicCard>
  )
}
