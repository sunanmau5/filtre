import * as chrome from 'sinon-chrome'
import { getStoredFilters, setStoredFilters } from '../utils/storage'

describe('storage', () => {
  afterEach(chrome.flush)

  it('should call chrome storage local set 1 time', () => {
    expect(chrome.storage.local.set.notCalled).toBe(true)
    setStoredFilters({ 'www.google.com': { '/search': [] } })
    expect(chrome.storage.local.set.calledOnce).toBe(true)
    expect(chrome.storage.local.set.calledTwice).toBe(false)
  })

  it('should call chrome storage local get 1 time', () => {
    expect(chrome.storage.local.get.notCalled).toBe(true)
    getStoredFilters()
    expect(chrome.storage.local.get.calledOnce).toBe(true)
    expect(chrome.storage.local.get.calledTwice).toBe(false)
  })

  it('should return empty filters', () => {
    expect(getStoredFilters()).resolves.toEqual({})
  })
})

export {}
