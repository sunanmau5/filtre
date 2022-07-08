import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { getCurrentTab } from 'src/background/utils'
import { PopupWithUrl } from './popup-with-url'
import './popup.css'

const App: React.FC = () => {
  const [hostname, setHostname] = useState<string | null>(null)
  const [pathname, setPathname] = useState<string | null>(null)

  const fetchUrl = () => {
    getCurrentTab().then((result) => {
      if (result.url) {
        const { hostname, pathname } = new URL(result.url)
        setHostname(hostname)
        setPathname(pathname)
      }
    })
  }

  useEffect(fetchUrl, [])

  if (!hostname || !pathname) {
    return null
  }

  return <PopupWithUrl hostname={hostname} pathname={pathname} />
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
