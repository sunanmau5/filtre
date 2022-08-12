import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { ChevronRight } from 'react-feather'
import { Text } from 'rebass'
import { PopupWithAction } from '../../popup/popup-with-action'
import { Paths } from '../../types/entry-type'
import { EntryWrapper } from './wrapper'

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
    goTo(PopupWithAction, { paths: paths[index] })
  }

  return (
    <EntryWrapper index={index} onClick={handleClick}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </EntryWrapper>
  )
}
