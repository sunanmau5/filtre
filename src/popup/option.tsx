import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex } from 'rebass'
import { Param } from './param'
import { Entry } from './types'

export const Option: React.FC<Entry> = (entry) => {
  const { lastUpdatedAt, uuid, paramKey, paramValue, count } = entry

  return (
    <Flex key={uuid} flexDirection="column" sx={{ gap: 2 }}>
      <Param paramKey={paramKey} value={paramValue} count={count} />
      <span>{formatDistance(lastUpdatedAt, new Date())}</span>
    </Flex>
  )
}
