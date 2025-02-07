import React from 'react'
import { Flex } from 'rebass'

import { withHover, withPadding, withTransition } from '@hoc/styles'

interface Props {
  index: number
  onClick: () => void
}

export const EntryWrapper: React.FC<Props> = (props) => {
  const { onClick, index, children } = props

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

const Wrapper = React.memo(withHover(withTransition(withPadding(Flex))))
