import { BasicCardHeader } from '@components/BasicCard/header'
import { BackButton } from '@components/Button/back'
import { EntryLeaf } from '@components/Entry/leaf'
import { EntryNode } from '@components/Entry/node'
import { useConfigContext } from '@contexts/config'
import React from 'react'
import { Flex } from 'rebass'
import { IParameters, IPath, IPaths } from '../../types'
import { EntryAction } from './action'
import { NoEntries } from './no-entries'

interface EntryProps {
  entry: IPath
}

export const Entry: React.FC<EntryProps> = (props) => {
  const { entry } = props
  const {
    config: { excludedParameters }
  } = useConfigContext()

  const renderSubpaths = (paths: IPaths) => {
    if (paths.length === 0) {
      return <NoEntries text="No subpaths available." />
    } else {
      return paths.map((path, i) => {
        const { name } = path
        return <EntryNode index={i} key={name} nodeKey={name} paths={paths} />
      })
    }
  }
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
    <Flex pb={3} flexDirection="column" sx={{ gap: 3 }}>
      <Flex flexDirection="column">
        <Flex alignItems="center" sx={{ gap: 2 }}>
          <BackButton />
          <BasicCardHeader px={0} fontSize={18}>
            Subpaths
          </BasicCardHeader>
        </Flex>
        <Flex flexDirection="column" sx={{ gap: 2 }}>
          {renderSubpaths(entry.subpaths)}
        </Flex>
      </Flex>
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
          {renderParameters(entry.parameters)}
        </Flex>
        <EntryAction />
      </Flex>
    </Flex>
  )
}
