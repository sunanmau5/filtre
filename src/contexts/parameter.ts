import React, { useContext } from 'react'

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

export const useParameterContext = () => useContext(ParameterContext)
