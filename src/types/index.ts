export type IParameter = {
  uuid: string
  createdAt: number
  version: string
  paramKey: string
  paramValue: string
  count: number
  lastUpdatedAt: number
}

export type IParameters = IParameter[]

export type IPath = {
  name: string
  subpaths: IPath[]
  parameters: IParameters
}

export type IPaths = IPath[]

export type IEntry = {
  [host: string]: IPaths
}
