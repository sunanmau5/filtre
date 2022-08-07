import { ConfigProvider } from '@contexts/config'
import { ParameterProvider } from '@contexts/parameter'
import { PathnameProvider } from '@contexts/pathname'
import { UrlProvider } from '@contexts/url'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Popup } from './popup'

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <UrlProvider>
        <PathnameProvider>
          <ParameterProvider>
            <Popup />
          </ParameterProvider>
        </PathnameProvider>
      </UrlProvider>
    </ConfigProvider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
