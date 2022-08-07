import React from 'react'
import { Box, BoxProps } from 'rebass'

/**
 *
 * @see {@link BoxProps} for available properties
 * @returns
 */
export const BasicCardContent: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props} pt={4}>
      {props.children}
    </Box>
  )
}
