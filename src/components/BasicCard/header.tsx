import React from 'react'
import { Text, TextProps } from 'rebass'

export const BasicCardHeader: React.FC<TextProps> = (props) => {
  const { sx, children, ...textProps } = props
  return (
    <Text
      fontSize={16}
      p={2}
      sx={{
        my: 0,
        fontWeight: 500,
        ...sx
      }}
      {...textProps}>
      {children}
    </Text>
  )
}
