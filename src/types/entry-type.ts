export type ParameterType = {
  uuid: string
  createdAt: number
  version: string
  paramKey: string
  paramValue: string
  count: number
  lastUpdatedAt: number
}

export type Parameters = ParameterType[]

export type PathType = {
  name: string
  subpaths: PathType[]
  parameters: Parameters
}

export type Paths = PathType[]

export type Entry = {
  [host: string]: Paths
}
