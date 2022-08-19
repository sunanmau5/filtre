import React from 'react'
import { getCurrentTab } from '../utils/tabs'

export type IURL = Pick<URL, 'origin' | 'hostname' | 'pathname' | 'search'>

export interface IUrlContext {
  url: IURL
  setUrl: React.Dispatch<React.SetStateAction<IURL>>
}

export const UrlContext = React.createContext<IUrlContext>({
  url: { origin: '', hostname: '', pathname: '', search: '' },
  setUrl: () => {}
})

export const useUrlContext = () => {
  const context = React.useContext(UrlContext)
  if (context === undefined || context === null) {
    throw new Error('useUrlContext must be called within UrlProvider')
  }
  return context
}

export const UrlProvider: React.FC = ({ children }) => {
  const [url, setUrl] = React.useState<IURL>({
    origin: '',
    hostname: '',
    pathname: '',
    search: ''
  })

  const fetchUrl = () => {
    getCurrentTab().then((result) => {
      if (result.url) {
        const { origin, hostname, pathname, search } = new URL(result.url)
        setUrl({ origin, hostname, pathname, search })
      }
    })
  }

  React.useEffect(fetchUrl, [])

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  )
}
