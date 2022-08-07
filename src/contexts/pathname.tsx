import React from 'react'

export interface IPathnameContext {
  pathname: string
  setPathname: React.Dispatch<React.SetStateAction<string>>
}

export const PathnameContext = React.createContext<IPathnameContext>({
  pathname: '',
  setPathname: () => {}
})

export const usePathnameContext = () => {
  const context = React.useContext(PathnameContext)
  if (context === undefined || context === null) {
    throw new Error('usePathnameContext must be called within PathnameProvider')
  }
  return context
}

export const PathnameProvider: React.FC = ({ children }) => {
  const [pathname, setPathname] = React.useState<string>('')
  return (
    <PathnameContext.Provider value={{ pathname, setPathname }}>
      {children}
    </PathnameContext.Provider>
  )
}
