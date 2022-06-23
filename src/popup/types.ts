export type Entry = {
  createdAt: number
  params: Record<string, string>
  uuid: string
  version: string
}

export type Entries = Entry[]
