import React from 'react'

const withLoadingIndicator =
  <P extends {}>(
    Component: React.ComponentType<P>
  ): React.ComponentType<
    P & {
      isLoading: boolean
      loader?: React.ReactElement
    }
  > =>
  ({ isLoading, loader, ...props }) => {
    if (isLoading) {
      if (loader) {
        return loader
      } else {
        return <span>Loading...</span>
      }
    } else {
      return <Component {...(props as P)} />
    }
  }

export { withLoadingIndicator }
