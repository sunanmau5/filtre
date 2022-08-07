import * as chrome from 'sinon-chrome'

describe('background', () => {
  afterEach(chrome.flush)

  it('should add listener on install', () => {
    expect(chrome.runtime.onInstalled.addListener.notCalled).toBe(true)
    require('../background')
    expect(chrome.runtime.onInstalled.addListener.calledOnce).toBe(true)
  })
})
