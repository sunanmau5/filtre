import { ParameterProvider } from '@contexts/parameter'
import { PathnameProvider } from '@contexts/pathname'
import { UrlProvider } from '@contexts/url'
import React from 'react'
import ReactDOM from 'react-dom'
import { Popup } from './popup'
import './index.css'

const App: React.FC = () => {
  return (
    <UrlProvider>
      <PathnameProvider>
        <ParameterProvider>
          <Popup />
        </ParameterProvider>
      </PathnameProvider>
    </UrlProvider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
