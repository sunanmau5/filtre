import { Parameter } from '@components/Parameter'
import { useParameterContext } from '@contexts/parameter'
import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex } from 'rebass'
import { ParameterType } from '../../types'
import { EntryWrapper } from './wrapper'

type Props = ParameterType & {
  index: number
}

export const EntryLeaf: React.FC<Props> = (props) => {
  const { lastUpdatedAt, paramKey, paramValue, count, index } = props
  const { setSearchParameters } = useParameterContext()

  const handleClick = () => {
    setSearchParameters((prev) => ({
      ...prev,
      [paramKey]: paramValue
    }))
  }

  return (
    <EntryWrapper index={index} onClick={handleClick}>
      <Flex sx={{ flexDirection: 'column', gap: 2 }}>
        <Parameter paramKey={paramKey} paramValue={paramValue} />
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
