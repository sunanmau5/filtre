import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex } from 'rebass'
import { Entry } from '../types/entry-type'
import { useParamContext } from '../utils/param-context'
import { EntryWrapper } from './entry-wrapper'
import { Param } from './param'

type Props = Entry & {
  index: number
}

export const PopupEntryLeaf: React.FC<Props> = (props) => {
  const { lastUpdatedAt, paramKey, paramValue, count, index } = props
  const { setSearchParams } = useParamContext()

  const handleClick = () => {
    setSearchParams((prev) => ({
      ...prev,
      [paramKey]: paramValue
    }))
  }

  return (
    <EntryWrapper index={index} onClick={handleClick}>
      <Flex sx={{ flexDirection: 'column', gap: 2 }}>
        <Param paramKey={paramKey} value={paramValue} />
        <span>{formatDistance(lastUpdatedAt, new Date())}</span>
      </Flex>
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          bg: 'rgb(96, 165, 250)',
          width: '2rem',
          height: '2rem',
          borderRadius: 9999,
          fontSize: '14px'
        }}>
        {count}
      </Flex>
    </EntryWrapper>
  )
}
