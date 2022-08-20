import { NoEntries } from '@components/Entry/no-entries'
import { TopFilter } from '@components/TopFilter'
import { useUrlContext } from '@contexts/url'
import { withLoadingIndicator } from '@hoc/indicator'
import useTopFilters from '@hooks/use-top-filters'
import React from 'react'
import { Flex } from 'rebass'

export const TopFilters: React.FC = () => {
  const {
    url: { hostname }
  } = useUrlContext()
  const { state, topFilters } = useTopFilters(hostname)
  const WrapperWithLoader = withLoadingIndicator(Flex)

  return topFilters && topFilters.length > 0 ? (
    <WrapperWithLoader
      isLoading={state === 'loading'}
      as="ul"
      sx={{
        flexDirection: 'column',
        gap: 2,
        paddingInlineStart: 0
      }}>
      {topFilters.map((topFilter) => (
        <TopFilter topFilter={topFilter} />
      ))}
    </WrapperWithLoader>
  ) : (
    <NoEntries text={'No top filters available for this host name.'} />
  )
}
