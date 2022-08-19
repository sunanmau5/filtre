import { usePathnameContext } from '@contexts/pathname'
import { useUrlContext } from '@contexts/url'
import useCustomPathname from '@hooks/use-custom-pathname'
import React from 'react'
import { Text } from 'rebass'

export const CustomPathname: React.FC = () => {
  const {
    url: { hostname }
  } = useUrlContext()
  const { pathname } = usePathnameContext()
  const { state: customPathnameState, customPathname } = useCustomPathname(
    hostname,
    pathname
  )

  switch (customPathnameState) {
    // TODO: show skeleton when loading
    case 'loading': {
      return null
    }
    case 'error': {
      throw Error('Error loading custom pathname')
    }
    case 'ready': {
      return <Text title={customPathname}>{customPathname}</Text>
    }
    default: {
      throw Error('State not implemented')
    }
  }
}
