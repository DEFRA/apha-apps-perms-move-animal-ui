import { nextPageRedirect } from './index.js'

const nextPage = {
  urlPath: '/dummy-section/dummy-page'
}

describe('#next-page-redirect', () => {
  it('should return the correct URL when no query params are provided', () => {
    const query = {}
    const result = nextPageRedirect('', nextPage, query)
    expect(result).toBe(nextPage.urlPath)
  })

  it('should return the correct URL when redirect params are provided', () => {
    const query = { param1: 'value1', param2: 'value2' }
    const result = nextPageRedirect('', nextPage, query)
    expect(result).toBe(`${nextPage.urlPath}?param1=value1&param2=value2`)
  })

  it('should avoid percent encoding (which is our current approach)', () => {
    const query = { redirect_uri: '/destination/address' }
    const result = nextPageRedirect('', nextPage, query)
    expect(result).toBe(`${nextPage.urlPath}?redirect_uri=/destination/address`)
  })

  it('should return the correct URL when query params are empty', () => {
    const query = {}
    const result = nextPageRedirect('', nextPage, query)
    expect(result).toBe(nextPage.urlPath)
  })
})
