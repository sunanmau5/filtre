import React from 'react'
import { Flex } from 'rebass'
import { Option } from './option'
import { Entries } from './types'

interface Props {
  entries: Entries
}

export const Options: React.FC<Props> = (props) => {
  const { entries } = props

  return (
    <Flex flexDirection="column" sx={{ gap: 4 }}>
      {entries.map((entry) => (
        <Option key={entry.uuid} {...entry} />
      ))}
    </Flex>
  )
}
