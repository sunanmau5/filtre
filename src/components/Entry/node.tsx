import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { ChevronRight } from 'react-feather'
import { Flex, Text } from 'rebass'
import { Paths } from '../../types/entry-type'
import { EntryDecider } from './decider'

interface Props {
  index: number
  nodeKey: string
  paths: Paths
}

export const EntryNode: React.FC<Props> = (props) => {
  const { index, nodeKey, paths } = props
  const { setPathname } = usePathnameContext()

  const handleClick = () => {
    setPathname((prev) => `${prev}${nodeKey}`)
    goTo(EntryDecider, { paths: paths[index] })
  }

  return (
    <Flex
      onClick={handleClick}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        cursor: 'pointer',
        bg: 'white',
        ':hover': { bg: 'rgb(219, 234, 254)' },
        ':active': { bg: 'rgb(191, 219, 254)' },
        borderRadius: 10
      }}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </Flex>
  )
}
