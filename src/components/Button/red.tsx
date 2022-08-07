import React from 'react'
import { ButtonProps } from 'rebass'
import { PrimaryButton } from './primary'

export const RedButton: React.FC<ButtonProps> = (props) => {
  const { children, sx, ...buttonProps } = props
  return (
    <PrimaryButton
      sx={{
        bg: 'rgb(248, 113, 113)',
        ':hover': { bg: 'rgb(239, 68, 68)' },
        ':active': { bg: 'rgb(220, 38, 38)' },
        ...sx
      }}
      {...buttonProps}>
      {children}
    </PrimaryButton>
  )
}
