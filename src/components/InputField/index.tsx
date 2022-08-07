import { Input, InputProps } from '@rebass/forms'
import React from 'react'

export const InputField: React.FC<InputProps> = (props) => {
  const { sx, ...inputProps } = props

  return (
    <Input
      sx={{
        cursor: 'text',
        borderColor: 'rgb(209, 213, 219)',
        ':disabled': { bg: 'rgb(243, 244, 246)' },
        ...sx
      }}
      {...inputProps}
    />
  )
}
