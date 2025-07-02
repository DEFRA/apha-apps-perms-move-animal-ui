import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Contact the TB restricted farm exit page', () => {
  beforeEach('Log in and navigate to page', async () => {
    await loginAndSaveSession(signInPage)
    await contactTbRestrictedFarmExitPage.navigateToPageAndVerifyTitle()
  })

  it('should display a page', async () => {
    await contactTbRestrictedFarmExitPage.navigateToPageAndVerifyTitle()
  })
})
