import React from 'react'
import { Text, TextProps } from 'rebass'

export const BasicCardHeader: React.FC<TextProps> = (props) => {
  const { sx, children, ...textProps } = props
  return (
    <Text
      fontSize={16}
      px={3}
      py={2}
      sx={{
        my: 0,
        fontWeight: 600,
        ...sx
      }}
      {...textProps}>
      {children}
    </Text>
  )
}
