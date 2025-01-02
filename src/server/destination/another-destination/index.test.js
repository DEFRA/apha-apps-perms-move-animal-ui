import { AnotherDestinationExitPage } from './index.js'

describe('#AnotherDestinationController', () => {
  it('should have the correct properties', () => {
    const page = new AnotherDestinationExitPage()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe('/destination/can-not-use-service')
    expect(page.view).toBe('destination/another-destination/index')
  })
})
