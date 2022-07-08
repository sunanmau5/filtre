import React from 'react'
import { Heading, HeadingProps } from 'rebass'

/**
 *
 * @see {@link HeadingProps} for available properties
 * @returns
 */
export const BasicCardTitle: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      {...props}
      as="h3"
      my={0}
      fontWeight={600}
      fontFamily="Poppins, sans-serif">
      {props.children}
    </Heading>
  )
}
