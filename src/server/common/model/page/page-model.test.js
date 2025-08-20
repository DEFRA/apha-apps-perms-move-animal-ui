import { Page } from './page-model.js'

describe('Page', () => {
  let page

  beforeEach(() => {
    page = new Page()
  })

  it('should have a path', () => {
    expect(page).toHaveProperty('urlPath')
  })

  it('should have urlKey set to null by default', () => {
    expect(page.urlKey).toBeNull()
  })

  it('should have a sectionKey', () => {
    expect(page).toHaveProperty('sectionKey')
  })

  it('should have a key', () => {
    expect(page).toHaveProperty('key')
  })

  it('should have a view', () => {
    expect(page).toHaveProperty('view')
  })

  it('should have a pageHeading', () => {
    expect(page).toHaveProperty('pageHeading')
  })

  it('should have a pageTitle', () => {
    expect(page).toHaveProperty('pageTitle')
  })

  it('should return pageHeading as heading', () => {
    expect(page.heading).toBe(page.pageHeading)
  })

  it('should return pageTitle as title', () => {
    expect(page.title).toBe(page.pageTitle)
  })

  it('should throw an error on next page by default', () => {
    expect(() => page.nextPage()).toThrow()
  })

  it('should return an empty object for viewProps', async () => {
    expect(await page.viewProps()).toEqual({})
  })

  it('should have isInterstitial set to false by default', () => {
    expect(page.isInterstitial).toBe(false)
  })

  it('should have skipAuth set to false by default', () => {
    expect(page.skipAuth).toBe(false)
  })

  it('should have overrideRedirects set to false by default', () => {
    expect(page.overrideRedirects).toBe(false)
  })
})
