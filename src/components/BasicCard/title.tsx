import React from 'react'
import { Heading, HeadingProps } from 'rebass'

/**
 *
 * @see {@link HeadingProps} for available properties
 * @returns
 */
export const BasicCardTitle: React.FC<HeadingProps> = (props) => {
  const { sx, children, ...headingProps } = props
  return (
    <Heading
      as="h2"
      sx={{
        my: 0,
        fontWeight: 600,
        ...sx
      }}
      fontFamily="Poppins, sans-serif"
      {...headingProps}>
      {children}
    </Heading>
  )
}
