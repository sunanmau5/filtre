import crypto from 'crypto'
import { queryStringToJson, upsertParams } from '../background'

const defaultUUID = '4162d44a-51e2-4de6-9128-a4c6b33090fc'
const defaultDate = 123456789
const defaultVersion = '1.0.0'

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID()
  }
})

jest.spyOn(Date, 'now').mockReturnValue(defaultDate)
jest.spyOn(crypto, 'randomUUID').mockReturnValue(defaultUUID)

describe('query string to JSON', () => {
  let filters: Record<string, any>

  beforeEach(() => (filters = {}))

  it('URL with only pathname', () => {
    const url = 'https://app.marta.de/caregivers'
    const hostnameFilters = queryStringToJson(filters, url)
    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [],
        parameters: []
      }
    ])
  })

  it('URL with pathname and parameter', () => {
    const url = 'https://app.marta.de/caregivers?parameter=one'
    const hostnameFilters = queryStringToJson(filters, url)
    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [],
        parameters: [
          {
            count: 1,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'parameter',
            paramValue: 'one',
            uuid: defaultUUID,
            version: defaultVersion
          }
        ]
      }
    ])
  })

  it('URL with long pathname and a parameter', () => {
    const url =
      'https://app.marta.de/caregivers/cool/yeah/this-is-it/really/is-it/true/damn/man?parameter=one'
    const hostnameFilters = queryStringToJson(filters, url)
    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [
          {
            name: '/cool',
            subpaths: [
              {
                name: '/yeah',
                subpaths: [
                  {
                    name: '/this-is-it',
                    subpaths: [
                      {
                        name: '/really',
                        subpaths: [
                          {
                            name: '/is-it',
                            subpaths: [
                              {
                                name: '/true',
                                subpaths: [
                                  {
                                    name: '/damn',
                                    subpaths: [
                                      {
                                        name: '/man',
                                        subpaths: [],
                                        parameters: [
                                          {
                                            count: 1,
                                            createdAt: defaultDate,
                                            lastUpdatedAt: defaultDate,
                                            paramKey: 'parameter',
                                            paramValue: 'one',
                                            uuid: defaultUUID,
                                            version: defaultVersion
                                          }
                                        ]
                                      }
                                    ],
                                    parameters: []
                                  }
                                ],
                                parameters: []
                              }
                            ],
                            parameters: []
                          }
                        ],
                        parameters: []
                      }
                    ],
                    parameters: []
                  }
                ],
                parameters: []
              }
            ],
            parameters: []
          }
        ],
        parameters: []
      }
    ])
  })

  it('URL with pathname and multiple parameters', () => {
    const url =
      'https://app.marta.de/caregivers?first_parameter=one&second_parameter=two'
    const hostnameFilters = queryStringToJson(filters, url)
    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [],
        parameters: [
          {
            count: 1,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'first_parameter',
            paramValue: 'one',
            uuid: defaultUUID,
            version: defaultVersion
          },
          {
            count: 1,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'second_parameter',
            paramValue: 'two',
            uuid: defaultUUID,
            version: defaultVersion
          }
        ]
      }
    ])
  })

  it('URL with only parameter', () => {
    const url = 'https://app.marta.de/?parameter=one'
    const hostnameFilters = queryStringToJson(filters, url)
    expect(hostnameFilters).toEqual([
      {
        name: '/',
        subpaths: [],
        parameters: [
          {
            count: 1,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'parameter',
            paramValue: 'one',
            uuid: defaultUUID,
            version: defaultVersion
          }
        ]
      }
    ])
  })

  it('URLs with parameters on same pathnames should update parameter count', () => {
    const url = 'https://app.marta.de/caregivers?parameter=one'
    const count = 50

    let hostnameFilters
    for (let index = 0; index < count; index++) {
      hostnameFilters = queryStringToJson(filters, url)
    }

    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [],
        parameters: [
          {
            count: 50,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'parameter',
            paramValue: 'one',
            uuid: defaultUUID,
            version: defaultVersion
          }
        ]
      }
    ])
  })

  it('URLs with parameters on two pathnames', () => {
    const url1 = 'https://app.marta.de/caregivers?parameter=one'
    const url2 = 'https://app.marta.de/caregivers/bad-ones?parameter=two'

    let hostnameFilters
    ;[url1, url2].map((url) => {
      hostnameFilters = queryStringToJson(filters, url)
    })

    expect(hostnameFilters).toEqual([
      {
        name: '/caregivers',
        subpaths: [
          {
            name: '/bad-ones',
            subpaths: [],
            parameters: [
              {
                count: 1,
                createdAt: defaultDate,
                lastUpdatedAt: defaultDate,
                paramKey: 'parameter',
                paramValue: 'two',
                uuid: defaultUUID,
                version: defaultVersion
              }
            ]
          }
        ],
        parameters: [
          {
            count: 1,
            createdAt: defaultDate,
            lastUpdatedAt: defaultDate,
            paramKey: 'parameter',
            paramValue: 'one',
            uuid: defaultUUID,
            version: defaultVersion
          }
        ]
      }
    ])
  })

  it('URLs with different hostnames', () => {
    const url1 = 'https://app.marta.de'
    const url2 = 'https://www.dict.cc'

    ;[url1, url2].map((url) => queryStringToJson(filters, url))

    expect(filters).toEqual({
      'app.marta.de': [
        {
          name: '/',
          subpaths: [],
          parameters: []
        }
      ],
      'www.dict.cc': [
        {
          name: '/',
          subpaths: [],
          parameters: []
        }
      ]
    })
  })

  it('URLs with different hostnames but same pathnames and parameters', () => {
    const url1 =
      'https://app.marta.de/caregivers/are-my-life/always?first=one&second=two&third=three&fourth=four'
    const url2 =
      'https://www.dict.cc/caregivers/are-my-life/always?first=one&second=two&third=three&fourth=four'

    ;[url1, url2].map((url) => queryStringToJson(filters, url))

    expect(filters).toEqual({
      'app.marta.de': [
        {
          name: '/caregivers',
          subpaths: [
            {
              name: '/are-my-life',
              subpaths: [
                {
                  name: '/always',
                  subpaths: [],
                  parameters: [
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'first',
                      paramValue: 'one',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'second',
                      paramValue: 'two',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'third',
                      paramValue: 'three',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'fourth',
                      paramValue: 'four',
                      uuid: defaultUUID,
                      version: defaultVersion
                    }
                  ]
                }
              ],
              parameters: []
            }
          ],
          parameters: []
        }
      ],
      'www.dict.cc': [
        {
          name: '/caregivers',
          subpaths: [
            {
              name: '/are-my-life',
              subpaths: [
                {
                  name: '/always',
                  subpaths: [],
                  parameters: [
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'first',
                      paramValue: 'one',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'second',
                      paramValue: 'two',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'third',
                      paramValue: 'three',
                      uuid: defaultUUID,
                      version: defaultVersion
                    },
                    {
                      count: 1,
                      createdAt: defaultDate,
                      lastUpdatedAt: defaultDate,
                      paramKey: 'fourth',
                      paramValue: 'four',
                      uuid: defaultUUID,
                      version: defaultVersion
                    }
                  ]
                }
              ],
              parameters: []
            }
          ],
          parameters: []
        }
      ]
    })
  })
})

describe('upserting parameters', () => {
  let currentParams: Array<any>

  beforeEach(() => (currentParams = []))

  it('upsert happy path', () => {
    const query = '?parameter=one'
    const searchParams = new URLSearchParams(query)
    const resultParams = upsertParams(currentParams, searchParams)
    expect(resultParams).toEqual([
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'parameter',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert increment count', () => {
    const query = '?parameter=one'
    const count = 50

    const searchParams = new URLSearchParams(query)

    let resultParams
    for (let index = 0; index < count; index++) {
      resultParams = upsertParams(currentParams, searchParams)
    }
    expect(resultParams).toEqual([
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'parameter',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert multiple parameters', () => {
    const query = '?first=one&second=two&third=three&fourth=four&fifth=five'
    const searchParams = new URLSearchParams(query)
    const resultParams = upsertParams(currentParams, searchParams)
    expect(resultParams).toEqual([
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'first',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'second',
        paramValue: 'two',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'third',
        paramValue: 'three',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'fourth',
        paramValue: 'four',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'fifth',
        paramValue: 'five',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert multiple parameters increment count', () => {
    const query = '?first=one&second=two&third=three&fourth=four&fifth=five'
    const count = 100

    const searchParams = new URLSearchParams(query)

    let resultParams
    for (let index = 0; index < count; index++) {
      resultParams = upsertParams(currentParams, searchParams)
    }

    expect(resultParams).toEqual([
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'first',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'second',
        paramValue: 'two',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'third',
        paramValue: 'three',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'fourth',
        paramValue: 'four',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'fifth',
        paramValue: 'five',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert parameters with different keys, same values', () => {
    const query = '?first=one&second=one&third=one'
    const searchParams = new URLSearchParams(query)
    const resultParams = upsertParams(currentParams, searchParams)
    expect(resultParams).toEqual([
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'first',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'second',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'third',
        paramValue: 'one',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert parameters with same keys, different values', () => {
    const query =
      '?parameter=one&another_parameter=two&parameter=three&another_parameter=four'
    const searchParams = new URLSearchParams(query)
    const resultParams = upsertParams(currentParams, searchParams)
    expect(resultParams).toEqual([
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'parameter',
        paramValue: 'one,three',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'another_parameter',
        paramValue: 'two,four',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })

  it('upsert parameter only key no value', () => {
    const query = '?parameter&another_parameter'
    const searchParams = new URLSearchParams(query)
    const resultParams = upsertParams(currentParams, searchParams)
    expect(resultParams).toEqual([
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'parameter',
        paramValue: '',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      },
      {
        count: 1,
        createdAt: 123456789,
        lastUpdatedAt: 123456789,
        paramKey: 'another_parameter',
        paramValue: '',
        uuid: '4162d44a-51e2-4de6-9128-a4c6b33090fc',
        version: '1.0.0'
      }
    ])
  })
})

export {}
