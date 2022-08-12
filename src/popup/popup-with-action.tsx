import { EntryList, EntryListProps } from '@components/EntryList'
import React from 'react'
import { PopupAction } from './popup-action'

export const PopupWithAction: React.FC<EntryListProps> = (props) => {
  const { entries } = props
  return (
    <>
      <EntryList entries={entries} />
      <PopupAction />
    </>
  )
}
