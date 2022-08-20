import React from 'react'
import { Flex } from 'rebass'
import { IPath } from '../../types'
import { EntryParameters } from './parameters'
import { EntryPaths } from './paths'

interface EntryProps {
  entry: IPath
}

export const Entry: React.FC<EntryProps> = (props) => {
  const {
    entry: { subpaths, parameters }
  } = props

  return (
    <Flex pb={3} flexDirection="column" sx={{ gap: 3 }}>
      <EntryPaths entity="subpaths" paths={subpaths} />
      <EntryParameters parameters={parameters} />
    </Flex>
  )
}
