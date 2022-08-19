import { useParameterContext } from '@contexts/parameter'
import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { ChevronRight } from 'react-feather'
import { Flex, Text } from 'rebass'
import { IPaths } from '../../types'
import { EntryDecider } from './decider'

interface Props {
  index: number
  nodeKey: string
  paths: IPaths
}

export const EntryNode: React.FC<Props> = (props) => {
  const { index, nodeKey, paths } = props
  const { setPathname } = usePathnameContext()
  const { setSearchParameters } = useParameterContext()

  const handleClick = () => {
    setPathname((prev) => `${prev}${nodeKey}`)
    setSearchParameters({})
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
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        borderRadius: 10
      }}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </Flex>
  )
}
