import { NoEntries } from '@components/Entry/no-entries'
import { TopFilter } from '@components/TopFilter'
import { useUrlContext } from '@contexts/url'
import useTopFilters from '@hooks/use-top-filters'
import React from 'react'
import { Flex } from 'rebass'

export const TopFilters: React.FC = () => {
  const {
    url: { hostname }
  } = useUrlContext()
  const { state, topFilters } = useTopFilters(hostname)

  if (state === 'loading') return null
  if (state === 'error') throw Error('Error loading top filters')

  return topFilters && topFilters.length > 0 ? (
    <Flex
      as="ul"
      sx={{
        flexDirection: 'column',
        gap: 2,
        paddingInlineStart: 0
      }}>
      {topFilters.map((topFilter) => (
        <TopFilter topFilter={topFilter} />
      ))}
    </Flex>
  ) : (
    <NoEntries text={'No top filters available for this host name.'} />
  )
}
