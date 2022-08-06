import React from 'react'
import { Button, ButtonProps } from 'rebass'
import { navigateToUrl } from '../../utils/tabs'

type Props = ButtonProps & {
  url: string
  text?: string
}

export const NavigateButton: React.FC<Props> = (props) => {
  const { url, text = 'Navigate' } = props

  return (
    <Button
      sx={{
        minWidth: 75,
        py: 1,
        px: 2,
        cursor: 'pointer',
        borderRadius: 0,
        bg: 'rgb(96, 165, 250)',
        ':hover': { bg: 'rgb(59, 130, 246)' },
        ':active': { bg: 'rgb(37, 99, 235)' }
      }}
      onClick={() => navigateToUrl(url)}>
      {text}
    </Button>
  )
}
