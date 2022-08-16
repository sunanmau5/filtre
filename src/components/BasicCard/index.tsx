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
        ...sx
      }}
      {...cardProps}>
      {isValidElement(title) ? title : <BasicCardTitle>{title}</BasicCardTitle>}
      {children}
    </Card>
  )
}
