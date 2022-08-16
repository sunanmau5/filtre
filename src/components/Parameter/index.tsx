import React from 'react'
import { Flex, Heading, Text } from 'rebass'

interface Props {
  paramKey: string
  paramValue: string
}

export const Parameter: React.FC<Props> = (props) => {
  const { paramKey, paramValue } = props
  const decodedValue = decodeURIComponent(paramValue)
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
        title={decodedValue}>
        {decodedValue}
      </Text>
    </Flex>
  )
}
