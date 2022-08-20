import { withTruncate } from '@hoc/styles'
import React from 'react'
import { Text, TextProps } from 'rebass'

type Props = TextProps & {
  truncate?: boolean
}

export const BasicCardSubtitle: React.FC<Props> = (props) => {
  const { truncate = true, children, ...textProps } = props
  const TruncatedText = withTruncate(Text)

  return (
    <TruncatedText
      color="rgb(107, 114, 128)"
      fontWeight="normal"
      as="p"
      {...textProps}>
      {children}
    </TruncatedText>
  )
}
