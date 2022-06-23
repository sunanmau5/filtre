import React, { HTMLAttributes } from 'react'
import { Heading } from 'rebass'

/**
 * 
 * @see {@link HTMLAttributes} for available properties
 * @returns 
 */
export const BasicCardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <Heading
      {...props}
      as='h3'
      my={0}
      color='black'
      fontWeight={600}
    >
      {props.children}
    </Heading>
  )
}
