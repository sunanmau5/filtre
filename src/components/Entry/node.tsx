import { useParameterContext } from '@contexts/parameter'
import { usePathnameContext } from '@contexts/pathname'
import { withHover, withPadding, withTransition } from '@hoc/styles'
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

  const Wrapper = withHover(withTransition(withPadding(Flex)))

  const handleClick = () => {
    setPathname((prev) => `${prev}${nodeKey}`)
    setSearchParameters({})
    goTo(EntryDecider, { paths: paths[index] })
  }

  return (
    <Wrapper
      onClick={handleClick}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        bg: 'white',
        borderRadius: 10
      }}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </Wrapper>
  )
}
