import React from 'react'
import ContentLoader from 'react-content-loader'

export const BodyLoader: React.FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={418}
      height={240}
      backgroundColor="#e4e4e7"
      foregroundColor="#d4d4d8"
      {...props}>
      <rect x="17" y="16" rx="5" ry="5" width="120" height="24" />
      <rect x="1" y="54" rx="10" ry="10" width="418" height="82" />
      <rect x="17" y="150" rx="5" ry="5" width="120" height="24" />
      <rect x="1" y="188" rx="10" ry="10" width="418" height="40" />
    </ContentLoader>
  )
}
