import React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { ChevronRight } from 'react-feather'
import { Text } from 'rebass'
import { usePathnameContext } from '../utils/pathname-context'
import { PopupEntries } from './entries'
import { EntryWrapper } from './entry-wrapper'

interface Props {
  index: number
  nodeKey: string
  entries: any
}

export const PopupEntryNode: React.FC<Props> = (props) => {
  const { index, nodeKey, entries } = props
  const { setPathname } = usePathnameContext()

  const handleClick = () => {
    setPathname((prev) => `${prev}/${nodeKey}`)
    goTo(PopupEntries, { entries: entries[nodeKey] })
  }

  return (
    <EntryWrapper index={index} onClick={handleClick}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </EntryWrapper>
  )
}
