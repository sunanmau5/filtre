import { TextLoader } from '@components/Loader/text'
import { usePathnameContext } from '@contexts/pathname'
import { useUrlContext } from '@contexts/url'
import { withLoadingIndicator } from '@hoc/indicator'
import useCustomPathname from '@hooks/use-custom-pathname'
import React from 'react'
import { Text } from 'rebass'

export const CustomPathname: React.FC = () => {
  const {
    url: { hostname }
  } = useUrlContext()
  const { pathname } = usePathnameContext()
  const { state, customPathname } = useCustomPathname(hostname, pathname)

  const TextWithLoader = withLoadingIndicator(Text)

  return (
    <TextWithLoader
      isLoading={state === 'loading'}
      loader={<TextLoader />}
      title={customPathname}>
      {customPathname}
    </TextWithLoader>
  )
}
