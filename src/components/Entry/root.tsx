import { BasicCardHeader } from '@components/BasicCard/header'
import { Divider } from '@components/Divider'
import { TopFilters } from '@components/TopFilters'
import React from 'react'
import { Flex } from 'rebass'
import { IPaths } from '../../types'
import { EntryPaths } from './paths'

export interface EntryRootProps {
  paths: IPaths
}

export const EntryRoot: React.FC<EntryRootProps> = (props) => {
  const { paths } = props
  return (
    <Flex pb={3} flexDirection="column" maxHeight={400} overflow="auto">
      <BasicCardHeader fontSize={18}>Top Filters</BasicCardHeader>
      <TopFilters />
      <Divider />
      <EntryPaths entity="paths" paths={paths} />
    </Flex>
  )
}
