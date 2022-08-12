import { BasicCard } from '@components/BasicCard'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import { BasicCardTitle } from '@components/BasicCard/title'
import { NoEntries } from '@components/Entry/no-entries'
import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { Box } from 'rebass'
import { useUrlContext } from '../contexts/url'
import { PopupWithAction } from './popup-with-action'
import { PopupWithRouter } from './popup-with-router'

export const Popup: React.FC = () => {
  const { url } = useUrlContext()
  const { pathname } = usePathnameContext()
  const [customPathname, setCustomPathname] = React.useState<string>(pathname)

  React.useEffect(() => {
    setCustomPathname(pathname.replace(/[\/]/g, ' > '))
  }, [pathname])

  return (
    <BasicCard>
      <Box
        p={3}
        sx={{
          borderBottom: '1px solid rgb(209, 213, 219)',
          bg: 'white'
        }}>
        <BasicCardTitle>{url.hostname}</BasicCardTitle>
        <BasicCardSubtitle truncate>{customPathname}</BasicCardSubtitle>
      </Box>
      <PopupWithRouter
        errorView={() => (
          <NoEntries
            text={'You currently have no entries available for this website.'}
          />
        )}>
        {(paths) => <PopupWithAction paths={paths} />}
      </PopupWithRouter>
    </BasicCard>
  )
}
