import { BasicCardHeader } from '@components/BasicCard/header'
import { useConfigContext } from '@contexts/config'
import React from 'react'
import { Flex } from 'rebass'
import { IParameters } from '../../types'
import { EntryAction } from './action'
import { EntryLeaf } from './leaf'
import { NoEntries } from './no-entries'

interface Props {
  parameters: IParameters
}

export const EntryParameters: React.FC<Props> = (props) => {
  const { parameters } = props
  const {
    config: { excludedParameters }
  } = useConfigContext()

  const renderParameters = (parameters: IParameters) => {
    const localEntries = parameters.filter(
      ({ paramKey }) => !excludedParameters.includes(paramKey)
    )
    if (localEntries.length === 0) {
      return (
        <NoEntries text="No query parameters available for this path name." />
      )
    } else {
      return localEntries
        .sort((a, b) => b.count - a.count)
        .map((entry, i) => <EntryLeaf index={i} key={entry.uuid} {...entry} />)
    }
  }

  return (
    <Flex
      flexDirection="column"
      sx={{
        bg: 'white',
        borderRadius: 10
      }}>
      <BasicCardHeader>Parameters</BasicCardHeader>
      <Flex
        px={3}
        py={2}
        flexDirection="column"
        maxHeight={220}
        overflow="auto">
        {renderParameters(parameters)}
      </Flex>
      <EntryAction />
    </Flex>
  )
}
