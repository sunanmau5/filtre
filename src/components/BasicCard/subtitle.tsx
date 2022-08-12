import React from 'react'
import { Text, TextProps } from 'rebass'

type Props = TextProps & {
  truncate?: boolean
}

export const BasicCardSubtitle: React.FC<Props> = (props) => {
  const { truncate = true, sx, children, ...textProps } = props
  return (
    <Text
      color="rgb(107, 114, 128)"
      fontWeight="normal"
      as="p"
      sx={
        truncate
          ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ...sx
            }
          : sx
      }
      {...textProps}>
      {children}
    </Text>
  )
}
