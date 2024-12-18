import { Page } from './page-model.js'

describe('Page', () => {
  it('should have a path', () => {
    const page = new Page()
    expect(page).toHaveProperty('urlPath')
  })

  it('should have a urlKey', () => {
    const page = new Page()
    expect(page).toHaveProperty('urlKey')
  })

  it('should have a sectionKey', () => {
    const page = new Page()
    expect(page).toHaveProperty('sectionKey')
  })

  it('should have a key', () => {
    const page = new Page()
    expect(page).toHaveProperty('key')
  })

  it('should have a view', () => {
    const page = new Page()
    expect(page).toHaveProperty('view')
  })

  it('should have a pageHeading', () => {
    const page = new Page()
    expect(page).toHaveProperty('pageHeading')
  })

  it('should have a pageTitle', () => {
    const page = new Page()
    expect(page).toHaveProperty('pageTitle')
  })

  it('should return pageHeading as heading', () => {
    const page = new Page()
    expect(page.heading).toBe(page.pageHeading)
  })

  it('should return pageTitle as title', () => {
    const page = new Page()
    expect(page.title).toBe(page.pageTitle)
  })

  it('should throw an error on next page by default', () => {
    const page = new Page()
    expect(() => page.nextPage()).toThrow()
  })
})
