import React from 'react'
import { Text, TextProps } from 'rebass'

import { withTruncate } from '@hoc/styles'

type Props = TextProps & {
  truncate?: boolean
}

const _BasicCardSubtitle: React.FC<Props> = (props) => {
  const { truncate = true, children, ...textProps } = props
  return (
    <Text color="rgb(107, 114, 128)" fontWeight="normal" as="p" {...textProps}>
      {children}
    </Text>
  )
}

export const BasicCardSubtitle = React.memo(withTruncate(_BasicCardSubtitle))
