import React from 'react'
import { getCurrentTab } from '../utils/tabs'

export type UrlType = {
  origin: string
  hostname: string
  pathname: string
}

export interface IUrlContext {
  url: UrlType
  setUrl: React.Dispatch<React.SetStateAction<UrlType>>
}

export const UrlContext = React.createContext<IUrlContext>({
  url: { origin: '', hostname: '', pathname: '' },
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
  const [url, setUrl] = React.useState<UrlType>({
    origin: '',
    hostname: '',
    pathname: ''
  })

  const fetchUrl = () => {
    getCurrentTab().then((result) => {
      if (result.url) {
        const { origin, hostname, pathname } = new URL(result.url)
        setUrl({ origin, hostname, pathname })
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
