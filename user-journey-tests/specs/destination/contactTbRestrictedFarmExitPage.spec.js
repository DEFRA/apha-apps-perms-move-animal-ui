import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'

describe('Contact the TB restricted farm exit page', () => {
  it('should display a page', async () => {
    await contactTbRestrictedFarmExitPage.navigateToPageAndVerifyTitle()
  })
})
