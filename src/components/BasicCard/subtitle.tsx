import React from 'react'
import { Text } from 'rebass'

export const BasicCardSubtitle: React.FC = (props) => {
  return (
    <Text
      fontWeight='normal'
      color='rgb(107, 114, 128)'
    >
      {props.children}
    </Text>
  )
}
