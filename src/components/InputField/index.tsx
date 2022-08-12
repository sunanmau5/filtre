import { Input, InputProps } from '@rebass/forms'
import React from 'react'

export const InputField: React.FC<InputProps> = (props) => {
  const { sx, ...inputProps } = props

  return (
    <Input
      sx={{
        cursor: 'text',
        borderRadius: 5,
        borderColor: 'rgb(229, 231, 235)',
        ':disabled': { bg: 'rgb(243, 244, 246)' },
        ...sx
      }}
      {...inputProps}
    />
  )
}
