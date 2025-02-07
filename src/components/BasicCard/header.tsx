import React from 'react'
import { Text, TextProps } from 'rebass'

import { withPadding } from '@hoc/styles'

const _BasicCardHeader: React.FC<TextProps> = (props) => {
  const { sx, children, ...textProps } = props
  return (
    <Text
      fontSize={16}
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

export const BasicCardHeader = React.memo(withPadding(_BasicCardHeader))
