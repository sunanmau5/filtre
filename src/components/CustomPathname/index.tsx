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
  const { state, customPathname } = useCustomPathname(hostname, pathname)

  // TODO: show skeleton when loading
  if (state === 'loading') return null
  if (state === 'error') throw Error('Error loading custom pathname')

  return <Text title={customPathname}>{customPathname}</Text>
}
