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
