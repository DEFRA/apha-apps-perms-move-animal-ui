import { AnotherDestinationExitPage } from './index.js'

describe('#AnotherDestinationController', () => {
  let page

  beforeEach(() => {
    page = new AnotherDestinationExitPage()
  })

  it('should have the correct title', () => {
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
  })

  it('should have the correct path', () => {
    expect(page.urlPath).toBe('/destination/another-destination')
  })

  it('should have the correct view', () => {
    expect(page.view).toBe('destination/another-destination/index')
  })
})
