import React from 'react'
import { Box } from 'rebass'

export const Divider: React.FC = () => {
  return (
    <Box
      px={3}
      py={2}
      sx={{
        borderBottom: '2px solid rgb(229, 231, 235)'
      }}
    />
  )
}
