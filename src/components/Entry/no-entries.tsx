import React from 'react'
import { Flex, Text } from 'rebass'

interface Props {
  text: string
}

export const NoEntries: React.FC<Props> = (props) => {
  const { text } = props
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        px: 3,
        py: 4,
        bg: 'white',
        borderRadius: 10
      }}>
      <Text>{text}</Text>
    </Flex>
  )
}
