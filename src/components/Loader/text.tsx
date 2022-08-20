import React from 'react'
import ContentLoader from 'react-content-loader'

export const TextLoader: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={180}
      height={18}
      backgroundColor="#e4e4e7"
      foregroundColor="#d4d4d8"
      {...props}>
      <rect x="1" y="1" rx="3" ry="3" width="178" height="16" />
    </ContentLoader>
  )
}
