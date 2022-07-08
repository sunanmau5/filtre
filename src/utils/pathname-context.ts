import React, { useContext } from 'react'

export interface IPathnameContext {
  pathname: string
  setPathname: React.Dispatch<React.SetStateAction<string>>
}

export const PathnameContext = React.createContext<IPathnameContext>({
  pathname: '',
  setPathname: () => {}
})

export const usePathnameContext = () => useContext(PathnameContext)
