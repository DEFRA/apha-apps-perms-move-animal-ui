import contactTbRestrictedFarmExitPage from '../../page-objects/origin/contactTbRestrictedFarmExitPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Contact the TB restricted farm exit page', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await contactTbRestrictedFarmExitPage.navigateToPageAndVerifyTitle()
  })

  it('should display a page', async () => {
    await contactTbRestrictedFarmExitPage.navigateToPageAndVerifyTitle()
  })
})
