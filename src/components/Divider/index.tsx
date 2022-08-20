import { withPadding } from '@hoc/styles'
import React from 'react'
import { Box } from 'rebass'

export const Divider: React.FC = () => {
  const PaddedBox = withPadding(Box)
  return (
    <PaddedBox
      sx={{
        borderBottom: '2px solid rgb(229, 231, 235)'
      }}
    />
  )
}
