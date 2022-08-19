import { Parameter } from '@components/Parameter'
import { useParameterContext } from '@contexts/parameter'
import { formatDistance } from 'date-fns'
import React from 'react'
import { Flex, Text } from 'rebass'
import { IParameter } from '../../types'
import { EntryWrapper } from './wrapper'

type Props = IParameter & {
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
        <Text as="span">
          {formatDistance(lastUpdatedAt, new Date(), { addSuffix: true })}
        </Text>
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
