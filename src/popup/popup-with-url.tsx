import { BasicCard } from '@components/BasicCard'
import { BasicCardContent } from '@components/BasicCard/card-content'
import { BasicCardSubtitle } from '@components/BasicCard/subtitle'
import React, { useEffect, useState } from 'react'
import { Options } from './options'
import { Entries } from './types'

interface Props {
  url: string
}

export const PopupWithUrl: React.FC<Props> = (props) => {
  const { url } = props
  const [entries, setEntries] = useState<Entries | null>(null)

  const fetchParams = () => {
    chrome.storage.local.get({ filters: {} }, (res) => {
      const filters = res.filters
      if (!filters[url]) setEntries(null)
      else setEntries(filters[url])
    })
  }

  useEffect(() => fetchParams(), [url])

  if (!entries) {
    return null
  }

  return (
    <BasicCard title={url}>
      <BasicCardSubtitle>This is a subtitle</BasicCardSubtitle>
      <BasicCardContent>
        <Options entries={entries} />
      </BasicCardContent>
    </BasicCard>
  )
}
