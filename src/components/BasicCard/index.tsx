import React, { isValidElement } from 'react'
import { Card, CardProps } from 'rebass'
import { BasicCardTitle } from './title'

type Props = CardProps & {
  title?: string | JSX.Element
  children: JSX.Element | JSX.Element[]
}

export const BasicCard: React.FC<Props> = (props) => {
  const { title, children, sx, ...cardProps } = props

  return (
    <Card
      px={3}
      py={2}
      sx={{
        width: 450,
        boxShadow:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        ...sx
      }}
      {...cardProps}>
      {isValidElement(title) ? title : <BasicCardTitle>{title}</BasicCardTitle>}
      {children}
    </Card>
  )
}
