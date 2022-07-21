import React from 'react'
import { Flex } from 'rebass'
import { Entries } from 'src/types/entry-type'
import { BackButton } from './back-button'
import { PopupEntryLeaf } from './entry-leaf'
import { PopupEntryNode } from './entry-node'
import { NoEntries } from './no-entries'

interface Props {
  entries: Record<string, Entries> | Entries
}

export const PopupEntries: React.FC<Props> = (props) => {
  const { entries } = props

  const renderContent = () => {
    if (Array.isArray(entries)) {
      if (entries.length === 0) {
        return (
          <NoEntries text="You currently have no query parameters available for this pathname." />
        )
      } else {
        return entries
          .sort((a, b) => b.count - a.count)
          .map((entry, i) => (
            <PopupEntryLeaf index={i} key={entry.uuid} {...entry} />
          ))
      }
    } else {
      return Object.keys(entries).map((key, i) => (
        <PopupEntryNode index={i} key={key} nodeKey={key} entries={entries} />
      ))
    }
  }

  return (
    <Flex flexDirection="column" maxHeight={400} overflow="auto">
      <BackButton />
      {renderContent()}
    </Flex>
  )
}
