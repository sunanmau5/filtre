import { getSubdirectories } from '../background'

describe('pathname to subdirectories', () => {
  it('simple single pathname', () => {
    const subdir = getSubdirectories('/caregivers')
    expect(subdir).toEqual(['/caregivers'])
  })

  it('simple pathname with one subpath', () => {
    const subdir = getSubdirectories('/caregivers/good-ones')
    expect(subdir).toEqual(['/caregivers', '/good-ones'])
  })

  it('simple pathname with multiple subpaths', () => {
    const subdir = getSubdirectories(
      '/caregivers/first/second/third/fourth/fifth/sixth/seventh/eighth/ninth/tenth'
    )
    expect(subdir).toEqual([
      '/caregivers',
      '/first',
      '/second',
      '/third',
      '/fourth',
      '/fifth',
      '/sixth',
      '/seventh',
      '/eighth',
      '/ninth',
      '/tenth'
    ])
  })

  it('no pathname', () => {
    const subdir = getSubdirectories('/')
    expect(subdir).toEqual(['/'])
  })

  it('pathname with slash before parameter', () => {
    const subdir = getSubdirectories('/caregivers/')
    expect(subdir).toEqual(['/caregivers', '/'])
  })
})

export {}
