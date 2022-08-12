import { useConfigContext } from '@contexts/config'
import React from 'react'
import { Flex } from 'rebass'
import { Entries } from '../../types/entry-type'
import { BackButton } from '../Button/back'
import { EntryLeaf } from '../Entry/leaf'
import { EntryNode } from '../Entry/node'
import { NoEntries } from './no-entries'

export interface EntryListProps {
  entries: Record<string, Entries> | Entries
}

export const EntryList: React.FC<EntryListProps> = (props) => {
  const { entries } = props
  const { config } = useConfigContext()
  const { excludedParameters } = config

  const renderContent = () => {
    if (Array.isArray(entries)) {
      const localEntries = entries.filter(
        ({ paramKey }) => !excludedParameters.includes(paramKey)
      )
      if (localEntries.length === 0) {
        return (
          <NoEntries text="You currently have no query parameters available for this pathname. You can nevertheless navigate to the page!" />
        )
      } else {
        return localEntries
          .sort((a, b) => b.count - a.count)
          .map((entry, i) => (
            <EntryLeaf index={i} key={entry.uuid} {...entry} />
          ))
      }
    } else {
      return Object.keys(entries).map((key, i) => (
        <EntryNode index={i} key={key} nodeKey={key} entries={entries} />
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
