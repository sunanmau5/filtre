import React from 'react'
import { Flex } from 'rebass'

interface Props {
  index: number
  onClick: () => void
}

export const EntryWrapper: React.FC<Props> = (props) => {
  const { onClick, index, children } = props
  return (
    <Flex
      onClick={onClick}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        cursor: 'pointer',
        bg: index % 2 ? 'white' : 'rgb(243, 244, 246)',
        ':hover': { bg: 'rgb(219, 234, 254)' },
        ':active': { bg: 'rgb(191, 219, 254)' }
      }}>
      {children}
    </Flex>
  )
}
