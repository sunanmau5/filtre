import React from 'react'
import { getStoredConfig } from '../utils/storage'

type ConfigType = {
  excludedParameters: string[]
}

export interface IConfigContext {
  config: ConfigType
  setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}

export const ConfigContext = React.createContext<IConfigContext>({
  config: { excludedParameters: [] },
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
  const [config, setConfig] = React.useState<ConfigType>({
    excludedParameters: []
  })

  const fetchConfig = () => {
    getStoredConfig().then((config) => {
      setConfig(config as ConfigType)
    })
  }

  React.useEffect(fetchConfig, [])

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}
