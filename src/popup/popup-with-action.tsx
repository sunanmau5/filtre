import { Entry } from '@components/Entry'
import { EntryRoot } from '@components/Entry/root'
import React from 'react'
import { PathType } from '../types/entry-type'
import { PopupAction } from './popup-action'

interface Props {
  paths: PathType | PathType[]
}

export const PopupWithAction: React.FC<Props> = (props) => {
  const { paths } = props
  console.log({ paths })

  return (
    <>
      {Array.isArray(paths) ? (
        <EntryRoot paths={paths} />
      ) : (
        <Entry entry={paths} />
      )}
      <PopupAction />
    </>
  )
}
