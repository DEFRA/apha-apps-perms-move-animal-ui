import { Page } from './page-model.js'

describe('Page', () => {
  let page

  beforeEach(() => {
    page = new Page()
  })

  it('should have a path', () => {
    expect(page).toHaveProperty('urlPath')
  })

  it('should have a urlKey', () => {
    expect(page).toHaveProperty('urlKey')
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

  it('should return an empty object for viewProps', () => {
    expect(page.viewProps()).toEqual({})
  })
})
