import React from 'react'
import { DEFAULT_TOP_FILTERS_COUNT } from '../constants'
import { getStoredConfig } from '../utils/storage'

type ConfigType = {
  excludedParameters: string[]
  topFiltersCount: number
}

export interface IConfigContext {
  loading: boolean
  config: ConfigType
  setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export const ConfigContext = React.createContext<IConfigContext>({
  loading: false,
  config: {
    excludedParameters: [],
    topFiltersCount: DEFAULT_TOP_FILTERS_COUNT
  },
  setConfig: () => {}
})

export const useConfigContext = () => {
  const context = React.useContext(ConfigContext)
  if (context === undefined || context === null) {
    throw new Error('useConfigContext must be called within ConfigProvider')
  }
  return context
}

export const ConfigProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [config, setConfig] = React.useState<ConfigType>({
    excludedParameters: [],
    topFiltersCount: DEFAULT_TOP_FILTERS_COUNT
  })

  const fetchConfig = () => {
    setLoading(true)
    getStoredConfig().then((config) => {
      setConfig(config as ConfigType)
    })
    setLoading(false)
  }

  React.useEffect(fetchConfig, [])

  return (
    <ConfigContext.Provider value={{ loading, config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}
