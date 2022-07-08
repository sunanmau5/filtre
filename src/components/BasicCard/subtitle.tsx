import React from 'react'
import { Text } from 'rebass'

export const BasicCardSubtitle: React.FC<{ truncate?: boolean }> = (props) => {
  const { truncate = true } = props
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
              whiteSpace: 'nowrap'
            }
          : undefined
      }>
      {props.children}
    </Text>
  )
}
