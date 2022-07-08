import React from 'react'
import { Flex, Heading, Text } from 'rebass'

interface Props {
  paramKey: string
  value: string
}

export const Param: React.FC<Props> = (props) => {
  const { paramKey, value } = props

  return (
    <Flex flexDirection="column" maxWidth={250}>
      <Heading
        fontSize={16}
        fontWeight={600}
        my={0}
        title={paramKey}
        fontFamily="Poppins, sans-serif">
        {paramKey}:
      </Heading>
      <Text
        color="rgb(107, 114, 128)"
        as="p"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        title={value}>
        {value}
      </Text>
    </Flex>
  )
}
