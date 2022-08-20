import { withHover, withPadding, withTransition } from '@hoc/styles'
import React from 'react'
import { Flex } from 'rebass'

interface Props {
  index: number
  onClick: () => void
}

export const EntryWrapper: React.FC<Props> = (props) => {
  const { onClick, index, children } = props

  const Wrapper = withHover(withTransition(withPadding(Flex)))

  return (
    <Wrapper
      onClick={onClick}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        bg: index % 2 ? 'white' : 'rgb(243, 244, 246)'
      }}>
      {children}
    </Wrapper>
  )
}
