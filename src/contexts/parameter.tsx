import React from 'react'

export interface IParameterContext {
  searchParameters: Record<string, string>
  setSearchParameters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >
}

export const ParameterContext = React.createContext<IParameterContext>({
  searchParameters: {},
  setSearchParameters: () => {}
})

export const useParameterContext = () => {
  const context = React.useContext(ParameterContext)
  if (context === undefined || context === null) {
    throw new Error(
      'useParameterContext must be called within ParameterProvider'
    )
  }
  return context
}

export const ParameterProvider: React.FC = ({ children }) => {
  const [searchParameters, setSearchParameters] = React.useState<
    Record<string, string>
  >({})

  return (
    <ParameterContext.Provider
      value={{
        searchParameters,
        setSearchParameters
      }}>
      {children}
    </ParameterContext.Provider>
  )
}
