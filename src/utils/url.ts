export const convertURLtoJSON = (url: string): Record<string, any> => {
  const json: Record<string, any> = {}
  url
    .split('/')
    .filter((v) => !!v)
    .reduce((obj, path, i, parts) => {
      if (i + 1 === parts.length) {
        obj[path] = [] // Initialize empty array for search params
      } else {
        obj[path] = obj[path] || {}
        return obj[path]
      }
    }, json)
  return json
}

export const groupParamsByKey = (params: URLSearchParams) => {
  return [...params.entries()].reduce((acc, tuple) => {
    const [key, val] = tuple

    if (acc.hasOwnProperty(key)) {
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val]
      } else {
        acc[key] = [acc[key] as string, val]
      }
    } else {
      acc[key] = val
    }

    return acc
  }, {} as Record<string, string | string[]>)
}
