import React from 'react'
import { Box } from 'rebass'

export const BasicCardContent: React.FC = (props) => {
  return (
    <Box pt={4}>
      {props.children}
    </Box>
  )
}
