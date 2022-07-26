import React, { useContext } from 'react'

export interface IParamContext {
  searchParams: Record<string, string>
  setSearchParams: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export const ParamContext = React.createContext<IParamContext>({
  searchParams: {},
  setSearchParams: () => {}
})

export const useParamContext = () => useContext(ParamContext)
