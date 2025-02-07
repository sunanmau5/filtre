import { withPadding } from '@hoc/styles'
import React from 'react'
import { Box } from 'rebass'

function _Divider() {
  return (
    <Box
      sx={{
        borderBottom: '2px solid rgb(229, 231, 235)'
      }}
    />
  )
}

export const Divider = React.memo(withPadding(_Divider))
