import React from 'react'
import { Flex } from 'rebass'
import { Option } from './option'
import { Entries } from './types'

// A list of search param options

interface Props { entries: Entries }

export const Options: React.FC<Props> = ({ entries }) => {
  return (
    <Flex
      flexDirection='column'
      sx={{
        gap: 4
      }}
    >
      {entries.map(entry => <Option {...entry} />)}
    </Flex>
  )
}
