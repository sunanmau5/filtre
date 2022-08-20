import { BasicCardHeader } from '@components/BasicCard/header'
import { BackButton } from '@components/Button/back'
import { capitalize } from 'lodash'
import React from 'react'
import { Flex } from 'rebass'
import { IPaths } from '../../types'
import { NoEntries } from './no-entries'
import { EntryNode } from './node'

interface Props {
  entity: 'paths' | 'subpaths'
  paths: IPaths
}

export const EntryPaths: React.FC<Props> = (props) => {
  const { entity, paths } = props

  const renderHeader = () => {
    const Header = (
      <BasicCardHeader px={0} fontSize={18}>
        {capitalize(entity)}
      </BasicCardHeader>
    )
    if (entity === 'paths') {
      return Header
    } else {
      return (
        <Flex alignItems="center" sx={{ gap: 2 }}>
          <BackButton />
          {Header}
        </Flex>
      )
    }
  }

  const renderPaths = (paths: IPaths) => {
    if (paths.length === 0) {
      return <NoEntries text={`No ${entity} available.`} />
    } else {
      return paths.map((path, i) => {
        const { name } = path
        return <EntryNode index={i} key={name} nodeKey={name} paths={paths} />
      })
    }
  }

  return (
    <Flex flexDirection="column">
      {renderHeader()}
      <Flex flexDirection="column" sx={{ gap: 2 }}>
        {renderPaths(paths)}
      </Flex>
    </Flex>
  )
}
