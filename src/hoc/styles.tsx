import React from 'react'
import { SxProps, SxStyleProp } from 'rebass'

type StyleType = SxStyleProp

const hoverStyle: StyleType = {
  ':hover': { bg: 'rgb(219, 234, 254)' },
  ':active': { bg: 'rgb(191, 219, 254)' }
}

const transitionStyle: StyleType = {
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms'
}

const paddingStyle: StyleType = {
  px: 3,
  py: 2
}

const truncateStyle: StyleType = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const wrapStyle =
  (baseStyle: StyleType) =>
  <P extends SxProps>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const { sx, ...otherProps } = props
    return <Component {...(otherProps as P)} sx={{ ...baseStyle, ...sx }} />
  }

const withHover = wrapStyle(hoverStyle)
const withTransition = wrapStyle(transitionStyle)
const withPadding = wrapStyle(paddingStyle)
const withTruncate = wrapStyle(truncateStyle)

export { wrapStyle, withHover, withTransition, withPadding, withTruncate }
