import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ParamContext } from '../utils/param-context'
import { getCurrentTab } from '../utils/tabs'
import { UrlContext, UrlType } from '../utils/url-context'
import { PopupWithUrl } from './popup-with-url'
import './popup.css'

const App: React.FC = () => {
  const [url, setUrl] = useState<UrlType>({
    origin: '',
    hostname: '',
    pathname: ''
  })
  const [searchParams, setSearchParams] = useState<Record<string, string>>({})

  const fetchUrl = () => {
    getCurrentTab().then((result) => {
      if (result.url) {
        const { origin, hostname, pathname } = new URL(result.url)
        setUrl({ origin, hostname, pathname })
      }
    })
  }

  useEffect(fetchUrl, [])

  if (!url) {
    return null
  }

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      <ParamContext.Provider value={{ searchParams, setSearchParams }}>
        <PopupWithUrl {...url} />
      </ParamContext.Provider>
    </UrlContext.Provider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
