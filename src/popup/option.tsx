import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex } from 'rebass'
import { Param } from './param'
import { Entry } from './types'

// A single search param option

export const Option: React.FC<Entry> = (entry) => {
  const { createdAt, uuid, params } = entry

  return (
    <Flex
      key={uuid}
      flexDirection='column'
      sx={{ gap: 2 }}
    >
      <Flex sx={{ gap: 4 }}>
        {Object.entries(params).map(([key, value]) => <Param paramKey={key} value={value} />)}
      </Flex>
      <span>{formatDistance(createdAt, new Date())}</span>
    </Flex>
  )
}
