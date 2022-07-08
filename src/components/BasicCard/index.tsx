import React, {
  forwardRef,
  ForwardRefExoticComponent,
  isValidElement,
  RefAttributes
} from 'react'
import { Card } from 'rebass'
import { BasicCardTitle } from './title'

interface Props {
  title?: string | JSX.Element
  children: JSX.Element | JSX.Element[]
}

export const BasicCard: ForwardRefExoticComponent<
  Props & RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
  const { title, children } = props

  return (
    <Card
      ref={ref}
      backgroundColor="white"
      p={4}
      width={1}
      sx={{
        minWidth: 300,
        borderWidth: 1,
        borderRadius: 2,
        boxShadow:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}>
      {isValidElement(title) ? title : <BasicCardTitle>{title}</BasicCardTitle>}
      {children}
    </Card>
  )
})
