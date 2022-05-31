import React from 'react'
import ReactDOM from 'react-dom'
import { Text } from 'rebass'
import './popup.css'

const App: React.FC = () => {
  return (
    <div>
      <Text color={'white'}>Placeholder</Text>
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
