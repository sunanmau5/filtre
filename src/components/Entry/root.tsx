import { BasicCardHeader } from '@components/BasicCard/header'
import React from 'react'
import { Flex } from 'rebass'
import { Paths } from '../../types/entry-type'
import { EntryNode } from './node'

export interface EntryRootProps {
  paths: Paths
}

export const EntryRoot: React.FC<EntryRootProps> = (props) => {
  const { paths } = props
  return (
    <Flex flexDirection="column" maxHeight={400} overflow="auto">
      <BasicCardHeader>Paths</BasicCardHeader>
      {paths.map((path, i) => {
        //
        //
        const { name } = path
        return <EntryNode index={i} key={name} nodeKey={name} paths={paths} />
      })}
    </Flex>
  )
}
