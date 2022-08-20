import { withTruncate } from '@hoc/styles'
import React from 'react'
import { Flex, Heading, Text } from 'rebass'

interface Props {
  paramKey: string
  paramValue: string
}

export const Parameter: React.FC<Props> = (props) => {
  const { paramKey, paramValue } = props
  const decodedValue = decodeURIComponent(paramValue)
  const TruncatedText = withTruncate(Text)

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
      <TruncatedText color="rgb(107, 114, 128)" as="p" title={decodedValue}>
        {decodedValue}
      </TruncatedText>
    </Flex>
  )
}
