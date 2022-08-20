import { withPadding } from '@hoc/styles'
import React, { isValidElement } from 'react'
import { Card, CardProps } from 'rebass'
import { BasicCardTitle } from './title'

type Props = CardProps & {
  title?: string | JSX.Element
  children: JSX.Element | JSX.Element[]
}

export const BasicCard: React.FC<Props> = (props) => {
  const { title, children, sx, ...cardProps } = props
  const PaddedCard = withPadding(Card)

  return (
    <PaddedCard
      sx={{
        width: 450,
        ...sx
      }}
      {...cardProps}>
      {isValidElement(title) ? title : <BasicCardTitle>{title}</BasicCardTitle>}
      {children}
    </PaddedCard>
  )
}
