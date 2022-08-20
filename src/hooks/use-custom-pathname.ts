import React from 'react'

const useCustomPathname = (hostname: string, pathname: string): string => {
  const [customPathname, setCustomPathname] = React.useState<string>(
    hostname + pathname
  )

  React.useEffect(() => {
    setCustomPathname((hostname + pathname).replace(/[\/]/g, ' > '))
  }, [hostname, pathname])

  return customPathname
}

export default useCustomPathname
