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
