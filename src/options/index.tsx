import { ConfigProvider } from '@contexts/config'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Options } from './options'

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Options />
    </ConfigProvider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
