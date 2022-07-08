import React from 'react'
import { Flex } from 'rebass'
import { Entries } from 'src/types/entry-type'
import { PopupEntry } from './entry'
import { NavigateAction } from './navigate-action'

interface Props {
  entries: Entries
}

export const PopupEntries: React.FC<Props> = (props) => {
  const { entries } = props

  return (
    <>
      <Flex flexDirection="column" maxHeight={400} overflow="auto">
        {entries
          .sort((a, b) => b.count - a.count)
          .map((entry, i) => (
            <PopupEntry index={i} key={entry.uuid} {...entry} />
          ))}
      </Flex>
      <NavigateAction />
    </>
  )
}
