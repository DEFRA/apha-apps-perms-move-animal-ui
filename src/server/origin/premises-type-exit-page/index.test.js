import { ExitPagePremisesType } from './index.js'

describe('#AnotherDestinationController', () => {
  it('should have the correct properties', () => {
    const page = new ExitPagePremisesType()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe('/origin/can-not-use-service-premises-type')
    expect(page.view).toBe('origin/premises-type-exit-page/index')
  })
})
