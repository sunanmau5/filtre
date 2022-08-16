import React from 'react'
import { PathType } from 'src/types'
import { Entry } from '.'
import { EntryRoot } from './root'

interface Props {
  paths: PathType | PathType[]
}

export const EntryDecider: React.FC<Props> = (props) => {
  const { paths } = props
  if (Array.isArray(paths)) {
    return <EntryRoot paths={paths} />
  }
  return <Entry entry={paths} />
}
