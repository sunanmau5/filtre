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
  const customPathname = useCustomPathname(hostname, pathname)
  return <Text title={customPathname}>{customPathname}</Text>
}
