import { BasicCard } from '@components/BasicCard'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { BasicCardTitle } from '@components/BasicCard/title'
import { EntryDecider } from '@components/Entry/decider'
import { NoEntries } from '@components/Entry/no-entries'
import { usePathnameContext } from '@contexts/pathname'
import { useUrlContext } from '@contexts/url'
import React from 'react'
import { X } from 'react-feather'
import { Box, Flex, Image } from 'rebass'
import { PopupWithRouter } from './popup-with-router'

export const Popup: React.FC = () => {
  const { url } = useUrlContext()
  const { pathname } = usePathnameContext()
  const [customPathname, setCustomPathname] = React.useState<string>(
    url.hostname + pathname
  )

  React.useEffect(() => {
    setCustomPathname((url.hostname + pathname).replace(/[\/]/g, ' > '))
  }, [url.hostname, pathname])

  return (
    <BasicCard>
      <Box
        px={3}
        py={2}
        sx={{
          borderBottom: '2px solid rgb(229, 231, 235)'
        }}>
        <Flex sx={{ alignItems: 'center', gap: 3 }}>
          <Image src="icons/icon.png" width={24} height={24} />
          <BasicCardTitle>Filtre</BasicCardTitle>
          <Flex
            sx={{
              marginLeft: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: 9999,
              p: '2px',
              ':hover': { bg: 'rgb(229, 231, 235)' }
            }}
            onClick={() => window.close()}>
            <X size={20} strokeWidth={2} color="rgb(156, 163, 175)" />
          </Flex>
        </Flex>
        <BasicCardSubtitle
          title={customPathname}
          my={1}
          display="flex"
          truncate>
          {customPathname}
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
