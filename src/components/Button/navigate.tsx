import React from 'react'
import { ButtonProps } from 'rebass'
import { navigateToUrl } from '../../utils/tabs'
import { PrimaryButton } from './primary'

type Props = ButtonProps & {
  url: string
  text?: string
}

export const NavigateButton: React.FC<Props> = (props) => {
  const { url, text = 'Navigate' } = props
  return (
    <PrimaryButton onClick={() => navigateToUrl(url)}>{text}</PrimaryButton>
  )
}
