import { withPadding } from '@hoc/styles'
import React from 'react'
import { Text, TextProps } from 'rebass'

export const BasicCardHeader: React.FC<TextProps> = (props) => {
  const { sx, children, ...textProps } = props
  const PaddedText = withPadding(Text)

  return (
    <PaddedText
      fontSize={16}
      sx={{
        my: 0,
        fontWeight: 600,
        ...sx
      }}
      {...textProps}>
      {children}
    </PaddedText>
  )
}
