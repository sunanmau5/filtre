// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
})

const groupParamsByKey = (params: URLSearchParams) => [...params.entries()].reduce((acc, tuple) => {
  const [key, val] = tuple

  if (acc.hasOwnProperty(key)) {
    if (Array.isArray(acc[key])) {
      acc[key] = [...acc[key], val]
    } else {
      acc[key] = [acc[key], val]
    }
  } else {
    acc[key] = val
  }

  return acc
}, {})


const upsert = (origin: string, pathname: string, params: Record<string, any>) => {
  //
  //
  chrome.storage.sync.get([origin], res => {
    const obj = { pathname, params }
    const newArray = !!res[origin] ? [...res[origin], obj] : [obj]
    chrome.storage.sync.set({ [origin]: newArray })
  })
}

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  //
  //
  if (changeInfo.status === 'complete' && tab.active) {
    //
    //
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const { origin, pathname, search } = new URL(tabs[0].url)
      const params = new URLSearchParams(search)

      const groupedParams = groupParamsByKey(params)

      if (!!params.toString()) {
        upsert(origin, pathname, groupedParams)
      } else {
        console.log('no params provided')
      }
    })
  }
})
