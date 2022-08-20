import React from 'react'

const withLoadingIndicator =
  <P extends {}>(
    Component: React.ComponentType<P>
  ): React.ComponentType<P & { loading: boolean }> =>
  ({ loading, ...props }) =>
    loading ? <span>Loading...</span> : <Component {...(props as P)} />

export { withLoadingIndicator }
