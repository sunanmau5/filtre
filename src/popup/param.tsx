import React from 'react'
import { Flex, Heading, Text } from 'rebass'

interface Props {
  paramKey: string
  value: string
  count: number
}

export const Param: React.FC<Props> = (props) => {
  const { paramKey, value, count } = props

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Flex flexDirection="column" maxWidth={100}>
        <Heading fontSize={16} fontWeight={600} my={0} title={paramKey}>
          {paramKey}:
        </Heading>
        <Text
          color="rgb(107, 114, 128)"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={value}>
          {value}
        </Text>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        sx={{
          color: 'white',
          bg: 'rgb(96, 165, 250)',
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: 9999,
          fontSize: '14px'
        }}>
        {count}
      </Flex>
    </Flex>
  )
}
