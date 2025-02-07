import React from 'react'
import { Card, CardProps } from 'rebass'

import { withPadding } from '@hoc/styles'

import { BasicCardTitle } from './title'

type Props = CardProps & {
  title?: string | JSX.Element
  children: JSX.Element | JSX.Element[]
}

const _BasicCard: React.FC<Props> = (props) => {
  const { title, children, sx, ...cardProps } = props
  return (
    <Card
      sx={{
        width: 450,
        ...sx
      }}
      {...cardProps}>
      {React.isValidElement(title) ? (
        title
      ) : (
        <BasicCardTitle>{title}</BasicCardTitle>
      )}
      {children}
    </Card>
  )
}

export const BasicCard = React.memo(withPadding(_BasicCard))
