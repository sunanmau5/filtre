import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ParameterContext } from '../contexts/parameter'
import { PathnameContext } from '../contexts/pathname'
import { UrlContext, UrlType } from '../contexts/url'
import { getCurrentTab } from '../utils/tabs'
import { PopupWithUrl } from './popup-with-url'
import './popup.css'

const App: React.FC = () => {
  const [url, setUrl] = useState<UrlType>({
    origin: '',
    hostname: '',
    pathname: ''
  })
  const [searchParameters, setSearchParameters] = useState<
    Record<string, string>
  >({})
  const [pathname, setPathname] = useState<string>('')

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
      <PathnameContext.Provider value={{ pathname, setPathname }}>
        <ParameterContext.Provider
          value={{ searchParameters, setSearchParameters }}>
          <PopupWithUrl {...url} />
        </ParameterContext.Provider>
      </PathnameContext.Provider>
    </UrlContext.Provider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
