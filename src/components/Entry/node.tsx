import { EntryList } from '@components/EntryList'
import { usePathnameContext } from '@contexts/pathname'
import React from 'react'
import { goTo } from 'react-chrome-extension-router'
import { ChevronRight } from 'react-feather'
import { Text } from 'rebass'
import { Entries } from '../../types/entry-type'
import { EntryWrapper } from './wrapper'

interface Props {
  index: number
  nodeKey: string
  entries: Record<string, Entries>
}

export const EntryNode: React.FC<Props> = (props) => {
  const { index, nodeKey, entries } = props
  const { setPathname } = usePathnameContext()

  const handleClick = () => {
    setPathname((prev) => `${prev}/${nodeKey}`)
    goTo(EntryList, { entries: entries[nodeKey] })
  }

  return (
    <EntryWrapper index={index} onClick={handleClick}>
      <Text fontSize={14}>{decodeURIComponent(nodeKey)}</Text>
      <ChevronRight />
    </EntryWrapper>
  )
}
