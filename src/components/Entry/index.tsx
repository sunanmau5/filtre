import { BasicCardHeader } from '@components/BasicCard/header'
import { EntryLeaf } from '@components/Entry/leaf'
import { EntryNode } from '@components/Entry/node'
import { useConfigContext } from '@contexts/config'
import React from 'react'
import { Flex } from 'rebass'
import { Parameters, Paths, PathType } from '../../types/entry-type'
import { BackButton } from '../Button/back'
import { NoEntries } from './no-entries'

interface EntryProps {
  entry: PathType
}

export const Entry: React.FC<EntryProps> = (props) => {
  const { entry } = props
  const { config } = useConfigContext()
  const { excludedParameters } = config

  const renderSubpaths = (paths: Paths) => {
    //
    //
    if (paths.length === 0) {
      //
      //
      return <NoEntries text="You currently have no subpaths available." />
    } else {
      //
      //
      return paths.map((path, i) => {
        const { name } = path
        return <EntryNode index={i} key={name} nodeKey={name} paths={paths} />
      })
    }
  }

  const renderParameters = (parameters: Parameters) => {
    //
    //
    const localEntries = parameters.filter(
      ({ paramKey }) => !excludedParameters.includes(paramKey)
    )
    if (localEntries.length === 0) {
      //
      //
      return (
        <NoEntries text="You currently have no query parameters available for this pathname." />
      )
    } else {
      //
      //
      return (
        <Flex flexDirection="column" overflow="auto">
          {localEntries
            .sort((a, b) => b.count - a.count)
            .map((entry, i) => (
              <EntryLeaf index={i} key={entry.uuid} {...entry} />
            ))}
        </Flex>
      )
    }
  }

  return (
    <Flex flexDirection="column" maxHeight={400}>
      <BackButton />
      <BasicCardHeader>Subpaths</BasicCardHeader>
      {renderSubpaths(entry.subpaths)}
      <BasicCardHeader>Parameters</BasicCardHeader>
      {renderParameters(entry.parameters)}
    </Flex>
  )
}
