import React, { useContext } from 'react'

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

export const useUrlContext = () => useContext(UrlContext)
