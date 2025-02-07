import React from 'react'
import { Button, ButtonProps } from 'rebass'

import { withTransition } from '@hoc/styles'

const _PrimaryButton: React.FC<ButtonProps> = (props) => {
  const { children, sx, ...buttonProps } = props
  return (
    <Button
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 75,
        p: 2,
        cursor: 'pointer',
        borderRadius: 5,
        bg: 'rgb(96, 165, 250)',
        ':hover': { bg: 'rgb(59, 130, 246)' },
        ':active': { bg: 'rgb(37, 99, 235)' },
        ':disabled': { bg: 'rgb(191, 219, 254)', cursor: 'not-allowed' },
        ...sx
      }}
      {...buttonProps}>
      {children}
    </Button>
  )
}

export const PrimaryButton = React.memo(withTransition(_PrimaryButton))
