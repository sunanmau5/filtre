import React from 'react'
import { Flex } from 'rebass'
import { Entries } from 'src/types/entry-type'
import { BackButton } from './back-button'
import { PopupEntryLeaf } from './entry-leaf'
import { PopupEntryNode } from './entry-node'

interface Props {
  entries: Record<string, Entries> | Entries
}

export const PopupEntries: React.FC<Props> = (props) => {
  const { entries } = props

  return (
    <Flex flexDirection="column" maxHeight={400} overflow="auto">
      <BackButton />
      {Array.isArray(entries)
        ? entries
            .sort((a, b) => b.count - a.count)
            .map((entry, i) => (
              <PopupEntryLeaf index={i} key={entry.uuid} {...entry} />
            ))
        : Object.keys(entries).map((key, i) => (
            <PopupEntryNode
              index={i}
              key={key}
              nodeKey={key}
              entries={entries}
            />
          ))}
    </Flex>
  )
}
